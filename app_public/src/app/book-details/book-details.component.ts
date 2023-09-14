import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BookstorDataService} from '../bookstor-data.service';
import {Book} from '../classes/book';
import {User} from '../classes/user';
import {LayoutComponent} from "../layout/layout.component";
import {switchMap} from 'rxjs/operators';
import emailjs, {init} from 'emailjs-com';

declare let window: any;
declare let require: any;
import Web3 from 'web3';
import myContractDef from '../../../../app_dapp/build/contracts/BuyBook.json';

import {AuthenticationService} from "../authentication.service";
import {PovezavaService} from "../povezava.service";

init("user_wSeLCpldhxvBMLzpQtGXd");



@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  contract: any;
  wayOfPaying: string = "euro";
  gasLimit: number = 200000;
  ether: number = 0;

  private describedStatusTransaction = "Unknown status";

  public curentBook: Book = {
    "_id": '',
    "title": '',
    "author": '',
    "bookReleaseYear": 2000,
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
  public seller = {
    "id": '',
    "email": '',
    "name": '',
  }

  public addBookError = "";
  public logged: User = new User();

  public isLogged = false; //DELA
  public currentUserId = '';
  public loggedName = '';

  public sellerBuyer = false; //seller == buyer

  constructor(
    private bookstorDataService: BookstorDataService,
    private router: Router,
    private layout: LayoutComponent,
    private pot: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private povezavaStoritev: PovezavaService
  ) {
  }

  ngOnInit(): void {
    this.logged = this.layout.getCurrentUser();
    //this.loggedName = this.logged.name; //ne dela

    this.isLogged = this.authenticationService.isLoggedIn();
    this.currentUserId = this.authenticationService.returnCurrentUserId() + '';
    //console.log(this.currentUserId);

    this.pot.paramMap
      .pipe(
        switchMap((parametri: ParamMap) => {
          let idKnjige: string = (parametri.get('idBook') || '').toString();
          //console.log(idKnjige);
          return this.bookstorDataService.bookDetails(
            idKnjige
          );
        })
      )
      .subscribe(async (knjiga: Book) => {
        this.curentBook = knjiga;
        //console.log(this.curentBook);
        if (this.curentBook.ethereumAddress != '') {
          await this.connectEthereum();
        }
        this.getSellerInfo();
      });

    if (this.isLogged) {
      this.bookstorDataService
        .getUser(this.currentUserId)
        .subscribe({
          next: (rez) => {
            //console.log(rez.name);
            this.loggedName = rez.name;

          },
          error: (napaka) => {

          },
        });
    }

    this.wayOfPaying = "euro";
  }

  async connectEthereum() {
    if (typeof window.ethereum !== "undefined") {
      let TruffleContract = require("truffle-contract");
      let BuyBook = await TruffleContract(myContractDef);
      BuyBook.setProvider(window.ethereum);
      let web3 = new Web3(window.ethereum);
      let account = await this.getEthereumUser();
      this.contract = await BuyBook.deployed();
      (await this.contract.ChangeStatusTransactionEvent()).on("data", () => {
        this.refreshStatusTransaction();
      });
      this.refreshStatusTransaction();
    }
  }

  private async addBookInBlockchain() {
    let addressUser = await this.getEthereumUser();
    if (addressUser == null) {
      alert("Please connect to MetaMask to be able to buy with ether!");
    }
    let afterPhaseForPaying = (await this.contract.getStatusTransaction()) == 1;
    if (afterPhaseForPaying) {
      await this.contract.buyingEnd(this.curentBook.title, new Uint32Array(this.ether), { from: addressUser, gas: this.gasLimit });
      return true;
    } else {
      return false;
    }
  }

  private async getEthereumUser() {
    const accounts: any = await window.ethereum.request({method: "eth_requestAccounts"});
    if (accounts != null) {
      return accounts[0]
    }
    return null
  }

  private async pay() {
    let addressUser = await this.getEthereumUser();
    if (addressUser == null) {
        alert("Please connect to MetaMask to be able to buy with ether!");
    }
    let inPhaseForPaying = (await this.contract.getStatusTransaction()) == 0;
    if (inPhaseForPaying) {
      console.log(this.curentBook.ethereumAddress);
      console.log(parseInt(Web3.utils.toWei(this.ether.toFixed(4).toString(), 'ether')));
      console.log(addressUser);
      await this.contract.buyingStart(this.curentBook.ethereumAddress, parseInt(Web3.utils.toWei(this.ether.toFixed(4).toString(), 'ether')), new Uint32Array(this.ether), { from: addressUser, gas: this.gasLimit, value: parseInt(Web3.utils.toWei(this.ether.toFixed(4).toString(), 'ether')) });
      return true;
    } else {
      return false;
    }
  }

  private async refreshStatusTransaction() {
    let statusTransaction = (await this.contract.getStatusTransaction()).toNumber();
    let allStatusTransaction = [
      "BuyingStart",
      "BuyingEnd"
    ]
    if (statusTransaction < allStatusTransaction.length) {
      this.describedStatusTransaction = allStatusTransaction[statusTransaction];
    }
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public getSellerInfo() {
    this.bookstorDataService
      .getUser(this.curentBook.sellerId)
      .subscribe({
        next: (rez) => {
          //console.log(this.curentBook.sellerId);
          //console.log(rez);
          this.seller.email = rez.email;
          this.seller.id = rez._id;
          this.seller.name = rez.name;
          //console.log(rez.email);
          if (this.currentUserId == this.curentBook.sellerId) {
            this.sellerBuyer = true;
          }
        },
        error: (napaka) => {

        },
      });
  }

  public async kupiKnjigo() {
    let eth = this.wayOfPaying === "euro" ? false : true;
    if (eth) {
      if (typeof window.ethereum !== "undefined") {
          this.ether = this.curentBook.buyPrice * 0.00037;
          let transaction = await this.pay();
          transaction = await this.addBookInBlockchain();
          if (transaction) {
            var tempParams = {
              to_mail: this.seller.email,
              from_name: this.loggedName,
              to_name: this.seller.name,
              message: "Your book " + this.curentBook.title + " has just been bought for " + this.ether + " ETH.",
            };
            emailjs.send('gmail', 'template', tempParams)
              .then(function (res) {
                console.log("success", res.status);
                alert("Email sent to seller!");
              });
          } else {
            alert("There was an error paying with ether. Please try again later and check if your metamask is active!");
          }
      } else {
        alert("Please connect to MetaMask to be able to buy with ether!");
      }
    } else {
      var tempParams = {
        to_mail: this.seller.email,
        from_name: this.loggedName,
        to_name: this.seller.name,
        message: this.loggedName + "wants to buy your book " + this.curentBook.title + ". You can contact him on email " + this.logged.email +".",
      };
      emailjs.send('gmail', 'template', tempParams)
        .then(function (res) {
          console.log("success", res.status);
          alert("Email sent to seller!");
        });
    }
  }

  public async najemiKnjigo() {
    let eth = this.wayOfPaying === "euro" ? false : true;
    if (eth) {
      if (typeof window.ethereum !== "undefined") {
        this.ether = this.curentBook.rentPrice * 0.00037;
        let transaction = await this.pay();
        if (transaction) {
          transaction = await this.addBookInBlockchain();
        }
        if (transaction) {
          var tempParams = {
            to_mail: this.seller.email,
            from_name: this.loggedName,
            to_name: this.seller.name,
            message: "Your book " + this.curentBook.title + " has just been rented for " + this.ether + " ETH.",
          };
          emailjs.send('gmail', 'template', tempParams)
            .then(function (res) {
              console.log("success", res.status);
              alert("Email sent to seller!");
            });
        } else {
          alert("There was an error paying with ether. Please try again later and check if your metamask is active!");
        }
      } else {
        alert("Please connect to MetaMask to be able to rent with ether!");
      }
    } else {
        var tempParams = {
          to_mail: this.seller.email,
          from_name: this.loggedName,
          to_name: this.seller.name,
          message: this.loggedName + "wants to rent your book " + this.curentBook.title + ". You can contact him on email " + this.logged.email + ".",
        };
        emailjs.send('gmail', 'template', tempParams)
          .then(function (res) {
            console.log("success", res.status);
            alert("Email sent to seller!");
          });
    }
  }

  changeWayOfPaying(event: any)  {
    let way = event.srcElement;

    if (way.value !== this.wayOfPaying) {
      this.wayOfPaying = way.value;
    }
  }

}
