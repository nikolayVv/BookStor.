const hbs = require("hbs");

hbs.registerHelper("getRanking", (rankings, logged) => {
    let rankingReturn = 0.0;
    rankings.forEach((ranking) => {
        if (ranking.userId === logged.id) {
            rankingReturn = ranking.rank;
        }
    });
    return rankingReturn;
});

hbs.registerHelper("generateButton", (logged) => {
    if (!logged) {
        return "";
    } else if (logged.name && logged.img && logged.id) {
        return `<div class="btn-group dropstart d-none d-lg-block">
                        <button type="button" class="btn btn-outline-success" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-user"></i> My Profile </button>
                        <ul class="dropdown-menu dropdown-menu-dark">
                            <li>
                                <span class="dropdown-item disabled"><img src=${logged.img} alt="profile picture" class="rounded-circle d-inline" width="40" height="40">
                                    <h6 class="d-inline ms-2">Hello, ${logged.name}!</h6>
                                </span>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="/books/addEditBook">Add New Post</a></li>
                            <li><a class="dropdown-item" href="/myProfile/${logged.id}">My Profile</a></li>
                            <li><a class="dropdown-item" href="/books/myBooks/${logged.id}">My Sales</a></li>
                            <li><a class="dropdown-item" href="/logout">Log out</a></li>
                        </ul>
                    </div>
                    <div class="btn-group d-lg-none">
                        <button type="button" class="btn btn-outline-success" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-user"></i> My Profile </button>
                        <ul class="dropdown-menu dropdown-menu-dark">
                            <li>
                                <span class="dropdown-item disabled"><img src=${logged.img} alt="profile picture" class="rounded-circle d-inline" width="40" height="40">
                                    <h6 class="d-inline ms-2">Hello, ${logged.name}!</h6>
                                </span>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="/books/addEditBook">Add New Post</a></li>
                            <li><a class="dropdown-item" href="/myProfile/${logged.id}">My Profile</a></li>
                            <li><a class="dropdown-item" href="/books/myBooks/${logged.id}">My Sales</a></li>
                            <li><a class="dropdown-item" href="/logout">Log out</a></li>
                        </ul>
                    </div>`;
    }
    return '<button class="btn btn-outline-success" onclick="location.href=\'/login\'">Login</button>';
});

hbs.registerHelper("showBook", (book, logged) => {
    let slika = book.pictures[0];
    if (slika == "../images/book.png") {
        slika = book.pictures[0] = "/images/book.png";
    }
    let deleteButton = "";
    if (logged.role === "admin")
        deleteButton = `<div class="text-center col"><form action = "/users/${book.sellerId}/books/${book._id}" method="post"><button type="submit" class="btn bg-danger btn-outline-dark mt-auto" >Delete</button></form></div>`;
    price = "";
    type = [];
    cost = [];
    if (book.buy) {
        price += "B $" + book.buyPrice;
        type.push("buy");
        cost.push(book.buyPrice);
    } else {
        cost.push(0.0);
    }
    if (book.rent) {
        if (price === "") {
            price += "R $" + book.rentPrice;
        } else {
            price += " | R $" + book.rentPrice;
        }
        type.push("rent");
        cost.push(book.rentPrice);
    } else {
        cost.push(0.0);
    }

    return `<div class="col mb-5 book">
                        <div class="card h-100">
                            <img class="card-img-top slika" src="${book.pictures[0]}" alt="book photo" height="250"/>
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h6 class="fw-bolder">${book.title}</h6>
                                            ${price}<br />
                                    <h5 class="visually-hidden">${type}</h5>
                                    <h3 class="visually-hidden">${cost}</h3>
                                    <h2 class="visually-hidden">${book.timesRented}</h2>
                                    <h1 class="visually-hidden">${book.created}</h1>
                                    <p class="visually-hidden">${book.genres}</p>
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent row">
                                <div class="text-center col"><a class="btn btn-light btn-outline-dark mt-auto" href="/books/bookDetails/${book._id}">Show
                                    more...</a></div>
                                    ${deleteButton} 
                            </div>
                        </div>
                    </div>`;
});

hbs.registerHelper("showMyBook", (book) => {
    let slika = book.pictures[0];
    if (slika == "../images/book.png") {
        slika = book.pictures[0] = "/images/book.png";
    }
    price = "";
    type = [];
    cost = [];
    if (book.buy) {
        price += "B $" + book.buyPrice;
        type.push("buy");
        cost.push(book.buyPrice);
    } else {
        cost.push(0.0);
    }
    if (book.rent) {
        if (price === "") {
            price += "R $" + book.rentPrice;
        } else {
            price += " | R $" + book.rentPrice;
        }
        type.push("rent");
        cost.push(book.rentPrice);
    } else {
        cost.push(0.0);
    }
    return `<div class="col mb-5 book">
                        <div class="card h-100">
                        <img class="card-img-top" src="${book.pictures[0]}" alt="book photo" height="250"/>
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h6 class="fw-bolder">${book.title}</h6>
                                        ${price}<br />
                                <h5 class="visually-hidden">${type}</h5>
                                <h3 class="visually-hidden">${cost}</h3>
                                <h2 class="visually-hidden">${book.timesRented}</h2>
                                <h1 class="visually-hidden">${book.created}</h1>
                                <p class="visually-hidden">${book.genres}</p>
                            </div>
                        </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent row">
                                <div class="text-center col"><button type="button" class="btn btn-light btn-outline-dark mt-auto" onclick="location.href='/books/editBook/${book._id}'">Edit</button></div>
                                
                                <div class="text-center col">  <form action = "" method = post> <input type="hidden" name = "bookId" value = '${book._id}' /><button type="submit" class="btn bg-danger btn-outline-dark mt-auto" >Delete</button>  </form></div>
                              
                            </div>
                        </div>
                    </div>`;
});

hbs.registerHelper("showGenresFilter", (genre, books) => {
    let counter = 0;
    if (books) {
        for (let i = 0; i < books.length; i++) {
            for (let j = 0; j < books[i].genres.length; j++) {
                if (genre === books[i].genres[j]) counter++;
            }
        }
    }

    return `<div class="d-flex justify-content-between mt-2">
                        <div class="form-check"> <input class="form-check-input" type="checkbox" value="${genre}" name="genres"> ${genre} </div> <span>${counter}</span>
                    </div>`;
});

hbs.registerHelper("showTypesFilter", (type, books) => {
    let counter = 0;
    if (books) {
        for (let i = 0; i < books.length; i++) {
            if (
                (type === "Books for sale" && books[i].buy) ||
                (type === "Books for rental" && books[i].rent)
            )
                counter++;
        }
    }

    return `<div class="d-flex justify-content-between mt-2">
                        <div class="form-check"> <input class="form-check-input" type="checkbox" value="${type}" name="type"> ${type} </div> <span>${counter}</span>
                    </div>`;
});

hbs.registerHelper("showOrderByFilter", (order) => {
    return `<div class="d-flex justify-content-between mt-2">
                        <div class="form-check"> <input class="form-check-input" type="radio" value="${order.first}" name="orderBy"> ${order.first} </div>
                        <div class="form-check"> <input class="form-check-input" type="radio" value="${order.second}" name="orderBy"> ${order.second} </div>
                    </div>`;
});

hbs.registerHelper("createPagination", (books) => {
    if (books) {
        let pages = Math.ceil(books.length / 6);
        let next = "";
        if (pages <= 1) {
            next = "disabled";
        }
        return `<nav aria-label="pagination">
                    <ul class="pagination text-secondary justify-content-center">
                        <p>Page <span id="currentPage"><strong>1</strong></span> of <span id="allPages"><strong>${pages}</strong></span></p>
                    </ul>
                    <ul class="pagination text-secondary justify-content-center">
                        <li id="prev" class="page-item disabled"><a class="page-link" href="javascript:prevPage()">&laquo; Previous</a></li>
                        <li id="next" class="page-item ${next}"><a class="page-link" href="javascript:nextPage()">Next &raquo;</a></li>
                    </ul>
                </nav>`;
    } else {
        return `<nav aria-label="pagination">
                    <ul class="pagination text-secondary justify-content-center">
                      <li id="prev" class="page-item disabled"><a class="page-link" href="javascript:prevPage()">&laquo; Previous</a></li>
                        <li id="next" class="page-item disabled"><a class="page-link" href="javascript:nextPage()">Next &raquo;</a></li>
                    </ul>
                </nav>`;
    }
});

hbs.registerHelper("showUserCard", (user, type, logged) => {
    var admin = "";
    if (user.role === "admin") {
        admin = '<i class="fa fa-check-circle"></i>';
    }
    if (type === "myProfile") {
        return `<div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-column align-items-center text-center">
                            <img src="${user.profilePicture}" class="rounded-circle" alt="profile picture" width="150" height="150">
                            <div class="mt-3"> <h4>${user.name} ${user.surname} ${admin}</h4>
                                <p class="text-secondary  p-3"><i class="far fa-star"></i> ${user.ranking} </p>
                                <button id="editProfile" onclick="editOn()" class="btn btn-primary">Edit Profile</button> 
                            </div> 
                        </div>
                    </div>
                </div>`;
    }

    let deleteButton =
        logged.role === "admin"
            ? `<div class="text-center col">
                            <form action="/users/${user._id}" method="post">
                                <button type="submit" class="btn bg-danger btn-outline-dark mt-auto" >Delete</button>
                            </form>
                        </div>`
            : "";
    return `<div class="card">
                <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                        <img src="${user.profilePicture}" class="rounded-circle" alt="profile picture" width="150" height="150">
                        <div class="mt-3"> <h4>${user.name} ${user.surname} ${admin}</h4>
                            <p class="text-secondary  p-3"><i class="far fa-star"></i> ${user.ranking} </p>
                               
                        </div> 
                    </div> 
                    <div class="row"> 
                        <div class="text-center col">
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#rating">Rate profile</button>         
                        </div>
                        ${deleteButton}
                    </div>
                </div>
            </div>`;
});

hbs.registerHelper("showUserInfo", (user) => {
    let info = "";
    const date = new Date(user.joined);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const d = date.getDate();
    const m = months[date.getMonth()];
    const l = date.getFullYear();
    let address = "";
    let phone = "...";
    if (user.country) {
        address += user.country;
    }
    if (user.city) {
        if (address !== "") {
            address += ", " + user.city;
        } else {
            address += user.city;
        }
    }
    if (user.address) {
        if (address !== "") {
            address += ", " + user.address;
        } else {
            address += user.address;
        }
    }
    if (address === "") {
        address = "...";
    }
    if (user.phoneNumber) {
        phone = user.phoneNumber;
    }
    var userInfo = [
        {
            name: "Email",
            value: user.email,
        },
        {
            name: "Phone",
            value: phone,
        },
        {
            name: "Address",
            value: address,
        },
        {
            name: "Successful sales",
            value: user.successfulSales,
        },
        {
            name: "Active sales",
            value: user.activeSales,
        },
        {
            name: "Joined",
            value: `${d}. ${m}, ${l}`,
        },
    ];
    for (let i = 0; i < userInfo.length; i++) {
        info += `<div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">${userInfo[i].name}:</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                ${userInfo[i].value}
                            </div>
                        </div>`;
        if (i + 1 < userInfo.length) {
            info += "<hr>";
        }
    }
    return info;
});

hbs.registerHelper("showComment", (comment, logged, user) => {
    const date = new Date(comment.created);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const m = months[date.getMonth()];
    const l = date.getFullYear();
    const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const min =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const s =
        date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    let deleteComment =
        comment.email === logged.email || logged.role === "admin"
            ? `<form action="/usersProfileView/${user._id}/deleteComment/${comment._id}" method="post">
                            <span class="text-secondary">${d}. ${m}, ${l} - ${h}:${min}:${s}</span>
                            <input type="submit" class="btn btn-link text-decoration-none" value="Delete comment">
                         </form>`
            : `<span class="text-secondary">${d}. ${m}, ${l} - ${h}:${min}:${s}</span>`;
    return `<li class="comment list-group-item d-flex justify-content-between align-items-center flex-wrap list-group-item-action">
                        <div class=" mt-4 text-justify float-left"> <img src="${comment.profilePicture}" alt="profile picture" class="rounded-circle d-inline" width="40" height="40">
                            <h5 class="d-inline ms-2"> ${comment.name} <span class="text-secondary">(${comment.email})</span></h5>
                            <p class="mt-2">${comment.text}
                            </p>
                            <h1 class="visually-hidden">${comment.created}</h1>
                            ${deleteComment}
                        </div>
                    </li>`;
});

hbs.registerHelper("showMoreButton", (count, user, logged) => {
    let leaveComment = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#comment">
                            Leave a comment
                        </button>`
    if (user._id.toString() === logged.id) {
        leaveComment = '';
    }
    if (count > 3) {
        return `<li id="lastField" class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <button id="showMoreButton" class="btn btn-link">Show more</button>
                        ${leaveComment}
                    </li>`;
    }
    return `<li id="lastField" class="list-group-item d-flex justify-content-end align-items-center flex-wrap">
                        ${leaveComment}
                    </li>`;
});

hbs.registerHelper("showBookPicture", (picture) => {
    return `<div className="card col-mb-5">
                <img className="card-img-top" src=${picture.src} class="img-fluid">
                    <div className="card-body">
                        <button type="button" className="btn btn-danger btn-sm">Remove</button>
                    </div>
            </div>`;
});

hbs.registerHelper("showBookPicture2", (picture) => {
    if (picture === "../images/book.png") {
        return `<div class="card">
                <img src="../${picture}" class="card-img-top" alt="book img">
            </div>`;
    } else if (picture != "") {
        return `<div class="card">
                <img src="${picture}" class="card-img-top" alt="book img">
            </div>`;
    } else {
        return "";
    }
});

hbs.registerHelper("prikaziSlike3", (picture, st) => {
    if (!picture) {
        return `
            <img src="" id="slika${st}" alt="Slika" width="200" height="200" hidden>
            <button type="button" id="remove${st}" type="edit" hidden>Remove</button>
        `;
    } else {
        if (picture == "../images/book.png") {
            picture = "/images/book.png";
        }
        return `
            <img src="${picture}" id="slika${st}" alt="Slika" width="200" height="200">
            <button type="button" id="remove${st}" type="edit">Remove</button>
        `;
    }
});

hbs.registerHelper("ifRent", (rent, rentPrice) => {
    if (rent == true) {
        return `<div>Rent price: ${rentPrice}€/week</div>`;
    }
    return "";
});

hbs.registerHelper("ifRent2", (rent, rentPrice) => {
    if (rent == true) {
        return `<tr>
                    <th scope="row">Rent price:</th>
                    <td>${rentPrice}€/week</td>
                </tr>`;
    }
    return "";
});

hbs.registerHelper("ifRent3", (rent, email, sellerId, logged) => {
    if (logged.id !== sellerId) {
        if (!logged.name && !logged.id && !logged.email) {
            return `<a id="rentBtn" type="button" class="btn btn-success" href="/login">RENT</a>`;
        } else if (rent == true) {
            return `<button id="rentBtn" type="button" class="btn btn-success">RENT</button>`;
        }
    }

    return "";
});

hbs.registerHelper("ifBuy", (buy, buyPrice) => {
    if (buy == true) {
        return `<div>Buy price: ${buyPrice}€</div>`;
    }
    return "";
});

hbs.registerHelper("ifBuy2", (buy, buyPrice) => {
    if (buy == true) {
        return `<tr>
                    <th scope="row">Buy price:</th>
                    <td>${buyPrice}€</td>
                </tr>`;
    }
    return "";
});

hbs.registerHelper("ifBuy3", (buy, email, sellerId, logged) => {
    if (logged.id !== sellerId) {
        if (!logged.name && !logged.id && !logged.email) {
            return `<a id="buyBtn" type="button" class="btn btn-primary" href="/login">BUY</a>`;
        } else if (buy == true) {
            return `<button id="buyBtn" type="button" class="btn btn-primary">BUY</button>`;
        }
    }

    return "";
});

hbs.registerHelper("optionGenre", (genre) => {
    return '<option value="' + genre + '" selected>' + genre + "</option>";
});

hbs.registerHelper("optionCondition", (condition) => {
    return (
        '<option value="' + condition + '" selected>' + condition + "</option>"
    );
});

hbs.registerHelper("optionBuyable", (buy) => {
    if (buy) {
        return '<input type="checkbox" id="buyable" name="buyable" checked> <label htmlFor="buyable">This book can be bought</label>';
    } else {
        return '<input type="checkbox" id="buyable" name="buyable"> <label htmlFor="buyable">This book can be bought</label>';
    }
});

hbs.registerHelper("optionRentable", (rent) => {
    if (rent) {
        return '<input type="checkbox" id="rentable" name="rentable" checked> <label htmlFor="rentable">This book can be rented</label>';
    } else {
        return '<input type="checkbox" id="rentable" name="rentable"> <label htmlFor="rentable">This book can be rented</label>';
    }
});

hbs.registerHelper("showEditProfile", (user) => {
    let city = "";
    let country = "";
    let address = "";
    let phone = "";
    if (user.city) {
        city = user.city;
    }
    if (user.country) {
        country = user.country;
    }
    if (user.address) {
        address = user.address;
    }
    if (user.phoneNumber) {
        phone = user.phoneNumber;
    }
    return `
    <div class="d-flex flex-column align-items-center text-center">
        <img id="imageId" src="${user.profilePicture}" class="rounded-circle h-100" alt="profile picture" width="150" height="150">
    </div>
    <form method="post">
        <div class="input-group mb-3 p-4">
            <input type="file" class="form-control" id="changePhoto" name="profilePhotoChange" accept="image/png, image/jpeg, image/jpg">
        </div>
        <img src="" id="editImage" class="rounded-circle" alt="profile picture edit" width="200" height="200" hidden>
                <button type="button" id="removeEditImage" hidden>Remove</button>
        <input type="text" name="editImageURL" id="editImageURL" value="${user.profilePicture}" hidden>
        <div class="p-4">
            <div class="input-group mb-3">
                <input name="name" type="text" class="form-control" value="${user.name}"
                    style="margin-right: 5%" readonly>
                <input name="surname" type="text" class="form-control" value="${user.surname}" readonly>
            </div>
            <div class="input-group mb-3">
                <input name="email" type="email" id="email" class="form-control" value="${user.email}" readonly>
                <div id="sporociloEmail" class="invalid-feedback"></div>
            </div>
            <div class="input-group mb-3">
                <input name="username" type="text" id="username" class="form-control" value="${user.username}" readonly>
                <div id="sporociloUsername" class="invalid-feedback"></div>
            </div>
            <div class="input-group mb-3">
                <input name="password" type="password" id="password" placeholder="Password" class="form-control" value="${user.password}">
                <div id="sporociloPassword" class="invalid-feedback"></div>
            </div>
            <div class="input-group mb-3">
                <input name="country" type="text" id="country" placeholder="Country" class="form-control" value="${country}">
                <div id="sporociloCountry" class="invalid-feedback"></div>
            </div>
            <div class="input-group mb-3">
                <input name="city" type="text" id="city" placeholder="City" class="form-control" value="${city}">
                <div id="sporociloCity" class="invalid-feedback"></div>
            </div>
            <div class="input-group mb-3">
                <input name="address" type="text" id="address" placeholder="Address" class="form-control" value="${address}">
                <div id="sporociloAddress" class="invalid-feedback"></div>
            </div>
            <div class="input-group mb-3">
                <input name="phoneNumber" type="text" id="phoneNumber" placeholder="Phone Number" class="form-control" value="${phone}">
                <div id="sporociloNumber" class="invalid-feedback"></div>
            </div>
            <div class="d-flex justify-content-center">
                <button id="saveProfile" onclick="editOff()" class="btn btn-primary text-center m-1"
                    type="submit">Save profile</button>
                <a id="closeProfile" onclick="editOff()" class="btn btn-outline-primary text-center m-1">Close</a>
            </div>
        </div>
    </form>
    `;
});

hbs.registerHelper("showTopBooks", (topBooks) => {
    // determine how many books do we want to display
    let noDisplay = 3;
    noDisplay >= topBooks ? (noDisplay = topBooks.length) : "";
    let output = ``;
    if (topBooks) {
        for (let i = 0; i < noDisplay; i++) {
            let book = topBooks[i];
            if (book) {
                let id = book._id;
                let heading = book.title;
                let author = book.author;
                let desc = book.description;
                let images = book.pictures;
                output += `<div class="row featurette whiteboard rounded">
                        <div class="col-md-7">
                            <h2 id=${id} class="featurette-heading">${heading}<span class="text-muted">  ${author}</span></h2>
                            <p class="lead">${desc}</p>
                            <div class="text-center"><a class="btn btn-light btn-outline-dark mt-auto" href="/books/bookDetails/${id}">Show more</a></div>
                        </div>
                        <div class="col-md-5">
                            <img class="featurette-image img-fluid mx-auto" alt=${heading}(cover)
                                src=${images[0]} data-holder-rendered="true">
                        </div>
                    </div>`;
            }
        }
    } else {
        output = `<div class="row featurette whiteboard rounded text-center">
                        <h1 class="text-secondary">There aren't any books in the database yet!</h1>
                    </div>`;
    }

    return output;
});
