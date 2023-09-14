# Spletno programiranje 2021/2022

Dokumentacija lastnega projekta pri predmetu **Spletno programiranje** v študijskem letu **2021/2022**.

Opis projekta:
Ideja projekta je izdelati spletno stran, na kateri lahko uporabniki prodajajo in kupujejo ter posojajo in izposojajo knjige. 
Uporabniki se bodo lahko na strani registrirali in objavljali svoje knjige, katere bodo lahko drugi uporabniki kupili ali pa najeli za določen čas.
Obstajal bo tudi administrator, ki bo previrjal, ali so objave ustrezne ter jih bo lahko tudi odstranil.

index.html
Indeks predstavlja glavno stran, kjer predstavimo idejo projekta, nudimo hitro iskanje po knjigah z vnosom naslova ali skok na 
strani z interaktivnim iskanjem z kvalifikatorji, login/register, nekaj podatkov o ekipi ter najpopularnejše knjige meseca.

addEditBook.html
Ta stran se odpre, ko želi uporabnik objaviti novo knjigo ali pa urediti svojo že obstoječo. Če uporabnik dodaja novo knjigo, so polja za vnašanje 
prazna in jih mora izpolniti, če pa ureja že obstoječo, pa se vnašalna okna sama izpolnijo in jih lahko uporabnik uredi. Na dnu se nalaga tudi slike. 
S tipko Post Book se objavi oziroma posodobi knjigo.

bookDetail.html
Ko kliknemo na katero knjigo, se nam odpre ta maska, na kateri so prikazani vsi detajli te knjige (opis, slike, podatki o knjigi), poleg tega pa še
podatki o prodajalcu te knjige in gumba za nakup in izposojo knjige. Slike bomo lahko povečali s klikom na njih.

login.html
Ta maska nam omogoča prijavo uporabnika, ki je že predhodhodno registriran. Prijavi se z uporabniškim imenom in geslom, če pa računa še nima, se lahko
s povezavo Sign up prmakne na registracijo. V primeru, da so vpisani podatki ustrezni, gumb login prijavi uporabnika in ga prestavi na glavno stran.

myBooks.html
Do te strani dostopamo preko gumba My Profile -> My Sales, na njej pa so pokazane vse objave prijavljenega uporabnika. Po objavah lahko išče z vnosnim 
poljem za iskanje. Vsaka knjiga ima gumba Edit in Delete. Edit nam omogoča urejanje objave, Delete pa izbriše objavo.

myProfile.html
Na tej maski si lahko ogledamo svoje podatke, lahko jih urejamo s klikom na Edit profile.

register.html
Nov uporabnik lahko na tej maski vnese vse podatke za nov profil in ga ustvari s klikom na gumb Sign up. Če ima uporabnik že ustvarjen profil, se
lahko s povezavo Sign in premakne na masko Login. Podatki, ki so označeni z zvezdico, so pri registraciji obvezni, ostale pa lahko uporabnik izpolni
po želji.

searchContentsView.html
Na tej strani lahko uporabnik vidi vse oglase, lahko jih filtrira (po žanru, jih ureja po vrsti...) ali pa išče po objavah preko vnosnega polja. 
Pri vsaki objavi, je še gumb Show more, ki pripelje na stran bookDetail te knjige. Vse knjige niso na isti strani ampak se po potrebi razporedijo na 
več strani, med kateri se lahko sprehajamo.

usersProfileView.html
Ta maska omogoča ogled profila nekega drugega uporabinika, katerega lahko tudi ocenijo in oddajo komentar, ki ga vidijo tudi vsi drugi uporabniki. 
Na tej strani lahko vidimo podate o temu uporabniku ter njegovo vlogo na tej strani. Prikazani so samo trije komentarji, če želimo videti vse moramo
pritisniti tipko show more.

master/detail
Ko v searchContentsView.html pri knjigi pritisnemo na gumb show more, se nam prikažejo informacije o objavi te knjige.

zunaji vir
Kot zunanji vir smo uporabili api http://api.quotable.io/random, ki vsakič ko se glavna stran naloži, pridobi naključni citat nekega avtorja in ga prikaže.

dApps princip:
Naša aplikacija bo omogočala nakup knjig s kriptovalutami.


________________________________________________________________________________________________________________________________________________________________________
LP2

Spletna stran se nahaja na https://bookstor-fri.herokuapp.com/.  
Aplikacija deluje na telefonu tablici in računalniku. 
Na strani register so nekateri vnosi obvezni in so označeni z zvezdico. Vnosna polja imajo zahtevano obliko: name: 1 beseda sestavljena samo iz črk; 
													     surname: 1 beseda sestavljena samo iz črk;  
													     email: standardna email oblika; 
													     username: črke, številke in podčrtaj; 
													     password: imeti mora vsaj 8 znakov, 1 številko, 1 malo in 1 veliko  črko; 
													     (neobvezno) country: ena ali več besed sestavljenih iz črk;  
													     (neobvezno) city: ena ali več besed sestavljenih iz črk;  
											    		     (neobvezno) address: sestavljen je lahko iz črk, številk,  presledkov, pik in vejic; 
													     (neobvezno) phoneNumber: sprejme telefonske številke oblike (###) ###-####; 

Na strani edit profile morajo vnosi imeti isto obliko kot pri register. 
Na strani addEditBook morajo vnosna polja imeti obliko: author: 1 ali več besed sestavljenih iz črk; 
							location: sestavljen je lahko iz črk, številk, pik in vejic; 
							phone number: sprejme telefonske številke oblike (###) ###-####;  
							book description: sestavljen je lahko iz črk, številk, presledkov, pik in vejic; 
							title: ima lahko poljubno obliko, ne sme biti prazen; 


Node.js knjiznica:
	Knjinžnjica ki smo jo uporabili, se imenuje bootstrap-star-rating. Pri ogledu profila nekega drugega uporabnika, obstaja gumb rate, ki nam odpre okno za ocenjevanja tega uporabnika ki je realizirano s pomočjo te knjižnjice.
	

Docker namestitev
	"docker-compose up", spletna stran bo na voljo na localhost:3000
	
Navodila
	Pred uporabo na naslovu /db z gumbom vnos zečetnih podatkov zgeneriramo testno podatkovno bazo, z gumbom izbris vsebine podatkovne baze pa jo izpraznimo.
	Na glavno stran lahko dostopamo s pritiskom na bookstor ikono na napravah z večjim zaslonom ali s pritiskom gumba home na mobilnih napravah. Na glavni strani lahko najdemo osnovne informacije in hitro iskanje po naslovih knjig. Iz glavne strani
	se lahko premaknemo na stran contents, kjer so vidne objave in informacije o njih dostopne za vse, informacije o ostalih uporabnikih in možnost nakupa ter izposoje pa samo za prijavljene uporabnike. Če se hočemo prijavit pritisnemo na gumb login,
	ki omogoča prijavo in registracijo. Uporabniki ki bodo že zgenerirani iz /db: 
										     admin: username = "johnnyAndr", password = "Johnny123"; 
 										     uporabniki: username = "IamAndrew_S", password = "Smith111"; 
												 username = "GretaLovesGerman123", password = "GretaSh002"; 
												 username = "Lity1968", password = "PasswordD222"; 
												 username = "edward_abe1978", password = "Eed8Hee5Ch"; 
	Ko se uporabnik prijavi, se na mestu login gumba prikaže My profile gumb, ki mu omogoča odjavo, ter premik na strani za dodajanje objav, pregled svojih objav, pregled profila in odjavo. Edina razlika med uporabnikom in adminom je v tem, da admin lahko izbriše objave, uporabnike in komentarje vseh uporabnikov. 
	
_______________________________________________________________________________________________________________________________________________________________________________
LP3

docker namestitev: 
	docker-compose build
	docker-compose up
odpremo aplikaciji na localhost:3000
testne podatke dodamo na localhost:3000/db
ALI
angular app zaženemo z "ng serve --open" v imeniku app_public
testne podatke dodamo na localhost:4200/db

________________________________________________________________________________________________________________________________________________________________________________
LP4

V spletni alipkaciji imamo 3 različne vrste uporabnikov:
	-Gost (neprijavljen uporabnik): lahko dostopa da glavne strani, strani s objavljenimi knjigami ter strani s podatki o izbrani knjigi. Na vseh straneh do katerih dosopa lahko podatke le bere.
	-Prijavljen uporabnik: Lahko poleg stvari do katerih lahko dostopa gost še dodaja ali uredi svoje knjige, dostopa do strani s svojimi knjigami, kupi knjige, si ogleda profil drugih registritanih uporabnikov, ter na njihov profil odda komentar ali oceno.
	-Admin: poleg možnosti prijavljenega uporabnika lahko še izbriše katerokoli knjigo, izbriše profil drugih uporabnikov ter komentarje vsh uporabnikov.
	
Pametne pogodbe, ki smo jih naredili za našo aplikacijo, dajejo prijavljenim uporabnikom (kupcem) možnost nakupa knjig z uporabo ETH. Prav tako hranijo, koliko ETH so bili placani za vsako knjigo in nam omogoča ustvariti graf top 5 kupljenih knjig z ETH
	

													     	


		    




