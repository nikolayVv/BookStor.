/**
 * Funkcionalni testi
 * 
 * RUN:
 * -terminal1
 * cd selenium
 * java -jar selenium-server-4.1.1.jar standalone --port 4445
 * -terminal2
 * npm test
 * 
 */
 (async function Bookstor() {
    // Knjižnice
    const { exec } = require("child_process");
    const { describe, it, after, before } = require("mocha");
    const { Builder, By, until } = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");
    const expect = require("chai").expect;
    
    // URL naslov aplikacije, ki jo želimo testirati
    //let aplikacijaUrl = "http://localhost:4200"; 
    let aplikacijaUrl = "https://bookstor-6e9e66d864cd.herokuapp.com/";
    
    // URL naslov Selenium strežnika. V primeru, da uporabljamo Docker v OS Windows 10 je potrebno URL posodobiti iz localhost na dodeljen IP.
    let seleniumStreznikUrl = "http://localhost:4445/wd/hub";
    let brskalnik, jwtZeton;
  
    const axios = require('axios').create({
      baseURL: aplikacijaUrl + "api/",
      timeout: 5000
    });
    
    // Obvladovanje napak
    process.on("unhandledRejection", (napaka) => {
      console.log(napaka);
    });
  
    // Počakaj določeno število sekund na zahtevani element na strani
    let pocakajStranNalozena = async (brskalnik, casVS, xpath) => {
      await brskalnik.wait(() => {
        return brskalnik.findElements(By.xpath(xpath)).then(elementi => {
          return elementi[0];
        });
      }, casVS * 1000, `Stran se ni naložila v ${casVS} s.`);
    };
  
    try {
  
      before(() => {
        brskalnik = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options()
          .addArguments("start-maximized")
          .addArguments("disable-infobars")
          .addArguments("allow-insecure-localhost")
          .addArguments("allow-running-insecure-content")
        )
        .usingServer(seleniumStreznikUrl)
        .build();
      });
  
      // Primer testa funkcionalnosti
      describe("home page, registration, login", function() {
        this.timeout(30 * 1000);
        // Pred začetkom testa funkcionalnosti shranimo URL naslov aplikacije
        before(() => { brskalnik.get(aplikacijaUrl); });

        // nalaganje home page, klik na button login
        it("home page loaded", async () => {
          await pocakajStranNalozena(brskalnik, 10, "//h1");
        });
        it("login button, login page loaded", async () => {
          let prijavaPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Login')]"));
          expect(prijavaPovezava).to.not.be.empty;
          prijavaPovezava.click();
          await pocakajStranNalozena(brskalnik, 10, "//h3[contains(text(), 'Sign In')]");
        });
        context("register new user", function () {
          // klik na button registracija
          it("click: Sign up, register page loaded", async () => {
            //await pocakajStranNalozena(brskalnik, 10, "//h3[contains(text(), 'Sign In')]");
            let registracijaPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Sign up')]"));
            expect(registracijaPovezava).to.not.be.empty;
            registracijaPovezava.click();
            await pocakajStranNalozena(brskalnik, 10, "//h3[contains(text(), 'Register')]");
          });

          // klik na button registracija
          it("register page - enter data, register", async () => {
            await pocakajStranNalozena(brskalnik, 10, "//h3[contains(text(), 'Register')]");
            
            let name = await brskalnik.findElement(By.css("input[name='name']"));
            expect(name).to.not.be.empty;
            name.sendKeys("Test");

            let surname = await brskalnik.findElement(By.css("input[name='surname']"));
            expect(surname).to.not.be.empty;
            surname.sendKeys("User");

            let email = await brskalnik.findElement(By.css("input[name='email']"));
            expect(email).to.not.be.empty;
            email.sendKeys("test@gmail.com");

            let username = await brskalnik.findElement(By.css("input[name='username']"));
            expect(username).to.not.be.empty;
            username.sendKeys("test");

            let password = await brskalnik.findElement(By.css("input[name='password']"));
            expect(password).to.not.be.empty;
            password.sendKeys("!Qa2ws3ed");

            let country = await brskalnik.findElement(By.css("input[name='country']"));
            expect(country).to.not.be.empty;
            country.sendKeys("Afganistan");

            let city = await brskalnik.findElement(By.css("input[name='city']"));
            expect(city).to.not.be.empty;
            city.sendKeys("Sarajevo");

            let address = await brskalnik.findElement(By.css("input[name='address']"));
            expect(address).to.not.be.empty;
            address.sendKeys("Presernova 69");

            let phoneNumber = await brskalnik.findElement(By.css("input[name='phoneNumber']"));
            expect(phoneNumber).to.not.be.empty;
            phoneNumber.sendKeys("(111) 111-1111");

            brskalnik.findElement(
              By.xpath("//button[contains(text(), 'Sign up')]")).click();
          });

          // home page loaded, logged in
          it("home page loaded, logged in", async () => {
            await pocakajStranNalozena(brskalnik, 10, "//h1");
            let profilPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'My Profile')]"));
            expect(profilPovezava).to.not.be.empty;
            
          });
        });

      });

      describe("JWT, test logout, login", function() {
        this.timeout(30 * 1000);
        // Pred začetkom testa funkcionalnosti shranimo URL naslov aplikacije
        before(() => { brskalnik.get(aplikacijaUrl); });

        it("pridobi JWT žeton", async () => {
          jwtZeton = await brskalnik.executeScript(function () {
              return localStorage.getItem("bookstor-token");
          });
          expect(jwtZeton).to.not.be.empty;
        });
        context("logout, login", function () {
          // logged out, home page loaded
          it("logging out, home page loaded", async () => {
            let profilPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'My Profile')]"));
            expect(profilPovezava).to.not.be.empty;
            profilPovezava.click();
            let odjavaPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Log out')]"));
            expect(odjavaPovezava).to.not.be.empty;
            odjavaPovezava.click();
            await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Login')]");
          });

          //login page loaded, logging in
          it("login page loaded, logging in", async () => {
            let prijavaPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Login')]"));
            expect(prijavaPovezava).to.not.be.empty;
            prijavaPovezava.click();
            await pocakajStranNalozena(brskalnik, 10, "//button[contains(text(), 'Login')]");

            let username = await brskalnik.findElement(By.css("input[name='username']"));
            expect(username).to.not.be.empty;
            username.sendKeys("test");

            let password = await brskalnik.findElement(By.css("input[name='password']"));
            expect(password).to.not.be.empty;
            password.sendKeys("!Qa2ws3ed");

            brskalnik.findElement(
              By.xpath("//button[contains(text(), 'Login')]")).click();
          });

          // home page loaded, logged in
          it("home page loaded, logged in", async () => {
            await pocakajStranNalozena(brskalnik, 10, "//h1");
            let profilPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'My Profile')]"));
            expect(profilPovezava).to.not.be.empty;
            
          });
        });

      });

      describe("post book, view book, edit book", function() {
        this.timeout(30 * 1000);
        // Pred začetkom testa funkcionalnosti shranimo URL naslov aplikacije
        before(() => { brskalnik.get(aplikacijaUrl); });

        it("open AddNewBook", async () => {
          await pocakajStranNalozena(brskalnik, 10, "//h1");
          let profilPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'My Profile')]"));
          expect(profilPovezava).to.not.be.empty;
          profilPovezava.click();
          let addPostPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Add New Post')]"));
          expect(addPostPovezava).to.not.be.empty;
          addPostPovezava.click();
          await pocakajStranNalozena(brskalnik, 10, "//h3[contains(text(), 'Add your book')]");
        });

        it("add new book", async () => {
          await pocakajStranNalozena(brskalnik, 10, "//h3[contains(text(), 'Add your book')]");
          
          let title = await brskalnik.findElement(By.css("input[name='title']"));
          expect(title).to.not.be.empty;
          title.sendKeys("Dominus Vobiscus o7g5a8ha7");

          let author = await brskalnik.findElement(By.css("input[name='author']"));
          expect(author).to.not.be.empty;
          author.sendKeys("France Preseren");

          let year = await brskalnik.findElement(By.css("input[name='year']"));
          expect(year).to.not.be.empty;
          year.sendKeys("1945");

          let description = await brskalnik.findElement(By.css("textarea[name='description']"));
          expect(description).to.not.be.empty;
          description.sendKeys("Knjiga Franceta Preserna oziroma po domace znana kot Oce Janez");

          let genre = await brskalnik.findElement(By.css("select[name='genre']"));
          expect(genre).to.not.be.empty;
          genre.click();
          let option = await brskalnik.findElement(By.css("option[value='Classics']"));
          expect(option).to.not.be.empty;
          option.click();

          let condition = await brskalnik.findElement(By.css("select[name='condition']"));
          expect(condition).to.not.be.empty;
          condition.click();
          let option2 = await brskalnik.findElement(By.css("option[value='Used']"));
          expect(option2).to.not.be.empty;
          option2.click();

          let price1 = await brskalnik.findElement(By.css("input[name='price1']"));
          expect(price1).to.not.be.empty;
          price1.sendKeys("22");
          let price2 = await brskalnik.findElement(By.css("input[name='price2']"));
          expect(price2).to.not.be.empty;
          price2.sendKeys("5");

          let location = await brskalnik.findElement(By.css("input[name='location']"));
          expect(location).to.not.be.empty;
          location.sendKeys("Sarajevo");

          let phone = await brskalnik.findElement(By.css("input[name='phone']"));
          expect(phone).to.not.be.empty;
          phone.sendKeys("(111) 111-1111");

          brskalnik.findElement(
            By.xpath("//button[contains(text(), 'Max')]")).click();
          
          await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Edit')]");
        });
        context("editing book", function () {
          it("open EditBook", async () => {
            await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Edit')]");
            let editPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Edit')]"));
            expect(editPovezava).to.not.be.empty;
            editPovezava.click();
            await pocakajStranNalozena(brskalnik, 10, "//h3[contains(text(), 'Edit your book')]");
          });

          it("edit book", async () => {
            let title = await brskalnik.findElement(By.css("input[name='title']"));
            expect(title).to.not.be.empty;
            title.sendKeys(" TestBook");

            brskalnik.findElement(
              By.xpath("//button[contains(text(), 'Max')]")).click();
            
            await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Edit')]");

          });
        });
      });

      describe("view book, view sellers profile, edit profile, delete book", function() {
        this.timeout(30 * 1000);
        // Pred začetkom testa funkcionalnosti shranimo URL naslov aplikacije
        before(() => { brskalnik.get(aplikacijaUrl); });


        it("open contents page", async () => {

          //click bookstor icon
          await pocakajStranNalozena(brskalnik, 10, "//h1");
          //brskalnik.findElement(
            //By.xpath("//a[contains(text(), 'Contents')]")).click();
          let contents = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Contents')]"));
          expect(contents).to.not.be.empty;
          contents.click();
        });

        it("search book name", async () => {  
          await pocakajStranNalozena(brskalnik, 10, "//button[contains(text(), 'Filters')]");
          let search = await brskalnik.findElement(By.css("input[id='search']"));
          expect(search).to.not.be.empty;
          search.sendKeys("Dominus Vobiscus o7g5a8ha7 TestBook");
        });
      
        it("open book details, view seller profile", async () => {
          await brskalnik.sleep(1000);
          await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Show more')]");
          brskalnik.findElement(
            By.xpath("//a[contains(text(), 'Show more')]")).click();
          
          await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Seller')]");
          let seller = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Seller Profile')]"));
          expect(seller).to.not.be.empty;
          seller.click();

          await pocakajStranNalozena(brskalnik, 10, "//button[contains(text(), 'Edit Profile')]");

        });

        context("edit profile, removing added items", function () {
          it("edit profile", async () => {
            let comment = await brskalnik.findElement(By.xpath("//button[contains(text(), 'Edit Profile')]"));
            expect(comment).to.not.be.empty;
            comment.click();
            await brskalnik.sleep(1000);
            await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Close')]");

            let country = await brskalnik.findElement(By.css("input[id='country']"));
            expect(country).to.not.be.empty;
            country.sendKeys("Kazakhstan");

            

          });
        
          it("save profile", async () => {
            let save = await brskalnik.findElement(By.xpath("//button[contains(text(), 'Save profile')]"));
            expect(save).to.not.be.empty;
            save.click();
            let close = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Close')]"));
            expect(close).to.not.be.empty;
            close.click();
            await brskalnik.sleep(500);

            await pocakajStranNalozena(brskalnik, 10, "//div[contains(text(), 'AfganistanKazakhstan')]");
          });

          it("open yourSales, delete book", async () => {
            let profilPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'My Profile')]"));
            expect(profilPovezava).to.not.be.empty;
            profilPovezava.click();
            let mySales = await brskalnik.findElement(By.xpath("//a[contains(text(), 'My Sales')]"));
            expect(mySales).to.not.be.empty;
            mySales.click();

            await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Delete')]");
            let del = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Delete')]"));
            expect(del).to.not.be.empty;
            del.click();
          });
        });
      });

      describe("add new book, logout, login as admin, delete user", function() {
        this.timeout(30 * 1000);
        // Pred začetkom testa funkcionalnosti shranimo URL naslov aplikacije
        before(() => { brskalnik.get(aplikacijaUrl); });

        it("open AddNewBook", async () => {
          await pocakajStranNalozena(brskalnik, 10, "//h1");
          let profilPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'My Profile')]"));
          expect(profilPovezava).to.not.be.empty;
          profilPovezava.click();
          let addPostPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Add New Post')]"));
          expect(addPostPovezava).to.not.be.empty;
          addPostPovezava.click();
          await pocakajStranNalozena(brskalnik, 10, "//h3[contains(text(), 'Add your book')]");
        });

        it("add new book", async () => {
          await pocakajStranNalozena(brskalnik, 10, "//h3[contains(text(), 'Add your book')]");
          
          let title = await brskalnik.findElement(By.css("input[name='title']"));
          expect(title).to.not.be.empty;
          title.sendKeys("Dominus Vobiscus o7g5a8ha7 TestBook");

          let author = await brskalnik.findElement(By.css("input[name='author']"));
          expect(author).to.not.be.empty;
          author.sendKeys("France Preseren");

          let year = await brskalnik.findElement(By.css("input[name='year']"));
          expect(year).to.not.be.empty;
          year.sendKeys("1945");

          let description = await brskalnik.findElement(By.css("textarea[name='description']"));
          expect(description).to.not.be.empty;
          description.sendKeys("Knjiga Franceta Preserna oziroma po domace znana kot Oce Janez");

          let genre = await brskalnik.findElement(By.css("select[name='genre']"));
          expect(genre).to.not.be.empty;
          genre.click();
          let option = await brskalnik.findElement(By.css("option[value='Classics']"));
          expect(option).to.not.be.empty;
          option.click();

          let condition = await brskalnik.findElement(By.css("select[name='condition']"));
          expect(condition).to.not.be.empty;
          condition.click();
          let option2 = await brskalnik.findElement(By.css("option[value='Used']"));
          expect(option2).to.not.be.empty;
          option2.click();

          let price1 = await brskalnik.findElement(By.css("input[name='price1']"));
          expect(price1).to.not.be.empty;
          price1.sendKeys("22");
          let price2 = await brskalnik.findElement(By.css("input[name='price2']"));
          expect(price2).to.not.be.empty;
          price2.sendKeys("5");

          let location = await brskalnik.findElement(By.css("input[name='location']"));
          expect(location).to.not.be.empty;
          location.sendKeys("Sarajevo");

          let phone = await brskalnik.findElement(By.css("input[name='phone']"));
          expect(phone).to.not.be.empty;
          phone.sendKeys("(111) 111-1111");

          brskalnik.findElement(
            By.xpath("//button[contains(text(), 'Max')]")).click();
          
          await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Edit')]");
        });

        it("logout", async () => {

          let profilPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'My Profile')]"));
          expect(profilPovezava).to.not.be.empty;
          profilPovezava.click();
          let odjavaPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Log out')]"));
          expect(odjavaPovezava).to.not.be.empty;
          odjavaPovezava.click();
          await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Login')]");
        });
        context("testing admin, remove created user", function () {
          it("login page loaded, logging in", async () => {
            let prijavaPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Login')]"));
            expect(prijavaPovezava).to.not.be.empty;
            prijavaPovezava.click();
            await pocakajStranNalozena(brskalnik, 10, "//button[contains(text(), 'Login')]");

            let username = await brskalnik.findElement(By.css("input[name='username']"));
            expect(username).to.not.be.empty;
            username.sendKeys("johnnyAndr");

            let password = await brskalnik.findElement(By.css("input[name='password']"));
            expect(password).to.not.be.empty;
            password.sendKeys("Johnny123");

            brskalnik.findElement(
              By.xpath("//button[contains(text(), 'Login')]")).click();

              await pocakajStranNalozena(brskalnik, 10, "//h1");
          });

          it("open contents page, search book name", async () => {
            let contents = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Contents')]"));
            expect(contents).to.not.be.empty;
            contents.click();
            
            await pocakajStranNalozena(brskalnik, 10, "//button[contains(text(), 'Filters')]");
            let search = await brskalnik.findElement(By.css("input[id='search']"));
            expect(search).to.not.be.empty;
            search.sendKeys("Dominus Vobiscus o7g5a8ha7 TestBook");
            
            
          });

          it("open book, view seller profile", async () => {
            await brskalnik.sleep(1000);
            await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Show more')]");
            brskalnik.findElement(
              By.xpath("//a[contains(text(), 'Show more')]")).click();
            
            await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Seller')]");
            let seller = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Seller Profile')]"));
            expect(seller).to.not.be.empty;
            seller.click();
          }); 
          it("delete user", async () => {
            await pocakajStranNalozena(brskalnik, 10, "//button[contains(text(), 'Rate profile')]");

            let del = await brskalnik.findElement(By.xpath("//button[contains(text(), 'Delete')]"));
            expect(del).to.not.be.empty;
            del.click();

            await pocakajStranNalozena(brskalnik, 10, "//button[contains(text(), 'Filters')]");
          });
        
          it("logout", async () => {

            let profilPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'My Profile')]"));
            expect(profilPovezava).to.not.be.empty;
            profilPovezava.click();
            let odjavaPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Log out')]"));
            expect(odjavaPovezava).to.not.be.empty;
            odjavaPovezava.click();
            await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Login')]");
          });
        });

      });
  
      after(async () => {
        brskalnik.quit();
      });
  
    } catch (napaka) {
      console.log("Med testom je prišlo do napake!");
    }
  })();