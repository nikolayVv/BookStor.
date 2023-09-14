import { Pipe, PipeTransform } from '@angular/core';
import {User} from "./classes/user";

@Pipe({
  name: 'userInfo'
})
export class UserInfoPipe implements PipeTransform {

  transform(user: User): string {
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
  }

}
