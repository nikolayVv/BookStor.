import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BookstorDataService} from '../bookstor-data.service';
import {Book} from '../classes/book';
import {User} from '../classes/user';
import {LayoutComponent} from "../layout/layout.component";
import {PovezavaService} from "../povezava.service";
import Web3 from 'web3';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {

  public novaKnjiga: Book = {
    "_id": '',
    "title": '',
    "author": '',
    "bookReleaseYear": NaN,
    "description": '',
    "genres": [],
    "condition": '',
    "buy": true,
    "rent": true,
    "buyPrice": 0,
    "rentPrice": 0,
    "location": '',
    "phone": '',
    "pictures": [],
    "timesRented": 0,
    "sellerId": '',
    "sellerName": '',
    "created": '',
    "ethereumAddress": ''
  }


  public addBookError = "";
  logged: User = new User();

  public dodajKnjigo(): void {
    //loading pictures
    this.mainPicture(); //preveri ce je naslovna slika dodana, doda default
    this.novaKnjiga.pictures[0] = localStorage.getItem('pic0') + '';
    this.novaKnjiga.pictures[1] = localStorage.getItem('pic1') + '';
    this.novaKnjiga.pictures[2] = localStorage.getItem('pic2') + '';
    this.novaKnjiga.pictures[3] = localStorage.getItem('pic3') + '';
    this.novaKnjiga.pictures[4] = localStorage.getItem('pic4') + '';

    this.addBookError = "";
    this.logged = this.layout.getCurrentUser();
    this.novaKnjiga.sellerId = this.logged._id;
    this.novaKnjiga.sellerName = this.logged.name;
    if (this.preveriPodatke()) {
      this.bookstorDataService
        .addBook(this.logged._id, this.novaKnjiga)
        .subscribe({
          next: (knjiga) => {
            console.log("knjiga shranjena" + knjiga)
            this.router.navigate(['/books/myBooks']);
          },
          error: (napaka) => {
            this.addBookError = napaka;
          },
        });
    }

  }

  private preveriPodatke() {
    //check entered fields
    if (this.novaKnjiga.title == '' ||
      Number.isNaN(this.novaKnjiga.bookReleaseYear) ||
      this.novaKnjiga.genres[0] == undefined) {
      alert("Required fields: Title, Book release year, Genre")

      return false;
    }
    if (!Web3.utils.isAddress(this.novaKnjiga.ethereumAddress) && this.novaKnjiga.ethereumAddress !== '') {
      alert("The ethereum address you have typed is not valid!");
      return false;
    }
    return true;
  }

  public change() {
    console.log(this.novaKnjiga.pictures);
  }

  public file0() {
    const file0 = <HTMLInputElement>document.querySelector("#file0");
    file0!.addEventListener("change", function (this: any, err: any) {
      //console.log(file0.value);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        //console.log(this.novaKnjiga.title);
        document
          .querySelector("#slikaURL0")!
          .setAttribute("value", reader.result!.toString());
        document.querySelector("#slika0")!.setAttribute("src", reader.result!.toString());
        document.querySelector("#slika0")!.removeAttribute("hidden");
        document.querySelector("#remove0")!.removeAttribute("hidden");
        localStorage.setItem('pic0', reader.result!.toString());
      });
      reader.readAsDataURL(this.files[0]);
    });
  }

  public file1() {
    const file0 = document.querySelector("#file1");
    file0!.addEventListener("change", function (this: any, err: any) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        //console.log(this.novaKnjiga.title);
        document
          .querySelector("#slikaURL1")!
          .setAttribute("value", reader.result!.toString());
        document.querySelector("#slika1")!.setAttribute("src", reader.result!.toString());
        document.querySelector("#slika1")!.removeAttribute("hidden");
        document.querySelector("#remove1")!.removeAttribute("hidden");
        localStorage.setItem('pic1', reader.result!.toString());
      });
      reader.readAsDataURL(this.files[0]);
    });
  }

  public file2() {
    const file0 = document.querySelector("#file2");
    file0!.addEventListener("change", function (this: any, err: any) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        //console.log(this.novaKnjiga.title);
        document
          .querySelector("#slikaURL2")!
          .setAttribute("value", reader.result!.toString());
        document.querySelector("#slika2")!.setAttribute("src", reader.result!.toString());
        document.querySelector("#slika2")!.removeAttribute("hidden");
        document.querySelector("#remove2")!.removeAttribute("hidden");
        localStorage.setItem('pic2', reader.result!.toString());
      });
      reader.readAsDataURL(this.files[0]);
    });
  }

  public file3() {
    const file0 = document.querySelector("#file3");
    file0!.addEventListener("change", function (this: any, err: any) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        //console.log(this.novaKnjiga.title);
        document
          .querySelector("#slikaURL3")!
          .setAttribute("value", reader.result!.toString());
        document.querySelector("#slika3")!.setAttribute("src", reader.result!.toString());
        document.querySelector("#slika3")!.removeAttribute("hidden");
        document.querySelector("#remove3")!.removeAttribute("hidden");
        localStorage.setItem('pic3', reader.result!.toString());
      });
      reader.readAsDataURL(this.files[0]);
    });
  }

  public file4() {
    const file0 = document.querySelector("#file4");
    file0!.addEventListener("change", function (this: any, err: any) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        //console.log(this.novaKnjiga.title);
        document
          .querySelector("#slikaURL4")!
          .setAttribute("value", reader.result!.toString());
        document.querySelector("#slika4")!.setAttribute("src", reader.result!.toString());
        document.querySelector("#slika4")!.removeAttribute("hidden");
        document.querySelector("#remove4")!.removeAttribute("hidden");
        localStorage.setItem('pic4', reader.result!.toString());
      });
      reader.readAsDataURL(this.files[0]);
    });
  }

  public removeButtons() {
    const remove0 = document.getElementById("remove0");
    remove0!.addEventListener("click", function () {
      document.querySelector("#slikaURL0")!.setAttribute("value", "");
      document.querySelector("#slika0")!.setAttribute("src", "");
      document.querySelector("#slika0")!.setAttribute("hidden", "");
      document.querySelector("#remove0")!.setAttribute("hidden", "");
      localStorage.setItem('pic0', '');
    });

    const remove1 = document.getElementById("remove1");
    remove1!.addEventListener("click", function () {
      document.querySelector("#slikaURL1")!.setAttribute("value", "");
      document.querySelector("#slika1")!.setAttribute("src", "");
      document.querySelector("#slika1")!.setAttribute("hidden", "");
      document.querySelector("#remove1")!.setAttribute("hidden", "");
      localStorage.setItem('pic1', '');
    });

    const remove2 = document.getElementById("remove2");
    remove2!.addEventListener("click", function () {
      document.querySelector("#slikaURL2")!.setAttribute("value", "");
      document.querySelector("#slika2")!.setAttribute("src", "");
      document.querySelector("#slika2")!.setAttribute("hidden", "");
      document.querySelector("#remove2")!.setAttribute("hidden", "");
      localStorage.setItem('pic2', '');
    });

    const remove3 = document.getElementById("remove3");
    remove3!.addEventListener("click", function () {
      document.querySelector("#slikaURL3")!.setAttribute("value", "");
      document.querySelector("#slika3")!.setAttribute("src", "");
      document.querySelector("#slika3")!.setAttribute("hidden", "");
      document.querySelector("#remove3")!.setAttribute("hidden", "");
      localStorage.setItem('pic3', '');
    });

    const remove4 = document.getElementById("remove4");
    remove4!.addEventListener("click", function () {
      document.querySelector("#slikaURL4")!.setAttribute("value", "");
      document.querySelector("#slika4")!.setAttribute("src", "");
      document.querySelector("#slika4")!.setAttribute("hidden", "");
      document.querySelector("#remove4")!.setAttribute("hidden", "");
      localStorage.setItem('pic4', '');
    });
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  constructor(
    private bookstorDataService: BookstorDataService,
    private router: Router,
    private layout: LayoutComponent,
    private povezavaStoritev: PovezavaService
  ) {
  }

  ngOnInit(): void {
    localStorage.setItem('pic0', '');
    localStorage.setItem('pic1', '');
    localStorage.setItem('pic2', '');
    localStorage.setItem('pic3', '');
    localStorage.setItem('pic4', '');
    this.file0();
    this.file1();
    this.file2();
    this.file3();
    this.file4();
    this.removeButtons();
    this.validation();
  }


  public validation() {
    var titleIn = <HTMLInputElement>document.getElementById("title");
    var authorIn = <HTMLInputElement>document.getElementById("author");
    var yearIn = <HTMLInputElement>document.getElementById("year");
    var descriptionIn = <HTMLInputElement>document.getElementById("description");
    var genreIn = <HTMLInputElement>document.getElementById("genre");
    var conditionIn = <HTMLInputElement>document.getElementById("condition");
    var price1In = <HTMLInputElement>document.getElementById("price1");
    var price2In = <HTMLInputElement>document.getElementById("price2");
    var buy = <HTMLInputElement>document.getElementById("buyable");
    var rent = <HTMLInputElement>document.getElementById("rentable");
    var locationIn = <HTMLInputElement>document.getElementById("location");
    var phoneIn = <HTMLInputElement>document.getElementById("phone");
    var submit = <HTMLInputElement>document.getElementById("submit");

    function validateWords(input: string) {
      const words = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
      return words.test(input);
    }

    function validateNumber(input: string) {
      const number = /^\(?\d{3}\) \d{3}-\d{4}$/;
      return number.test(input);
    }

    function validateAddress(input: string) {
      const address = /^[A-Za-z0-9'\.\-\s\,]*$/;
      return address.test(input);
    }

    function submitControl() {
      if (
        document.getElementsByClassName("is-invalid").length == 0
      ) {
        document.querySelector("#submit")!.removeAttribute("disabled");
      } else {
        document.querySelector("#submit")!.setAttribute("disabled", "");
      }
    }

    buy.addEventListener("change", (e) => {
      if (buy.checked) {
        price1In.disabled = false;
        submitControl();
        document.getElementById("sporociloBuyRent")!.innerHTML = "";
      } else {
        price1In.value = "";
        price1In.disabled = true;
        submitControl();
        if (!rent.checked) {
          document.getElementById("sporociloBuyRent")!.innerHTML =
            "At least one must be checked";
        }
      }
    });
    rent.addEventListener("change", (e) => {
      if (rent.checked) {
        price2In.disabled = false;
        submitControl();
        document.getElementById("sporociloBuyRent")!.innerHTML = "";
      } else {
        price2In.value = "";
        price2In.disabled = true;
        submitControl();
        if (!buy.checked) {
          document.getElementById("sporociloBuyRent")!.innerHTML =
            "At least one must be checked";
        }
      }
    });
    //preverjanje vnesenih podatkov
    authorIn.addEventListener("input", function () {
      let naslov = authorIn.value;
      let sporocilo = <HTMLInputElement>document.getElementById("sporociloAuthor");

      if (!naslov || !validateAddress(naslov)) {
        submit.disabled = true;
        authorIn.className =
          "form-control is-invalid";
        sporocilo.innerHTML = "Invalid title!";
      } else {
        authorIn.className =
          "form-control is-valid";
        sporocilo.innerHTML = "";
        submitControl();
      }
    });
    descriptionIn.addEventListener("input", function () {
      let naslov = descriptionIn.value;
      let sporocilo = <HTMLInputElement>document.getElementById("sporociloDescription");

      if (!naslov || !validateAddress(naslov)) {
        submit.disabled = true;
        descriptionIn.className =
          "form-control is-invalid";
        sporocilo.innerHTML = "Invalid description!";
      } else {
        descriptionIn.className =
          "form-control is-valid";
        sporocilo.innerHTML = "";
        submitControl();
      }
    });
    locationIn.addEventListener("input", function () {
      let naslov = locationIn.value;
      let sporocilo = <HTMLInputElement>document.getElementById("sporociloLocation");

      if (!naslov || !validateAddress(naslov)) {
        submit.disabled = true;
        locationIn.className =
          "form-control is-invalid";
        sporocilo.innerHTML = "Invalid location!";
      } else {
        locationIn.className =
          "form-control is-valid";
        sporocilo.innerHTML = "";
        submitControl();
      }
    });
    phoneIn.addEventListener("input", function () {
      let naslov = phoneIn.value;
      let sporocilo = <HTMLInputElement>document.getElementById("sporociloPhone");

      if (!naslov || !validateNumber(naslov)) {
        submit.disabled = true;
        phoneIn.className =
          "form-control is-invalid";
        sporocilo.innerHTML =
          "Phone number must be of form: (###) ###-####";
      } else {
        phoneIn.className =
          "form-control is-valid";
        sporocilo.innerHTML = "";
        submitControl();
        //window.scrollBy(0, 1000);
      }
    });
  }

  public mainPicture() {
    //default picture
    if (localStorage.getItem('pic0') == '') {
      //console.log("adding default");
      localStorage.setItem('pic0', 'data:image/png;base64,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');

    }
  }


}
