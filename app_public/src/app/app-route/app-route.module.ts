import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SearchContentsComponent } from '../search-contents/search-contents.component';
import { MyBooksComponent } from '../my-books/my-books.component';
import { CountBooksPipe } from '../count-books.pipe';
import { ShowPricePipe } from '../show-price.pipe';
import { LayoutComponent } from '../layout/layout.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { HeadComponent } from '../head/head.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { UsersProfileViewComponent } from "../users-profile-view/users-profile-view.component";
import { AddEditBookComponent } from '../add-edit-book/add-edit-book.component';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {DbComponent} from "../db/db.component";

const paths: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'books', component: SearchContentsComponent },
  { path: 'usersProfileView/:idUser', component: UsersProfileViewComponent },
  { path: 'books/myBooks', component: MyBooksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'books/addEditBook', component: AddEditBookComponent },
  { path: 'books/editBook/:idBook', component: EditBookComponent },
  { path: 'books/bookDetails/:idBook', component: BookDetailsComponent },
  { path: 'myProfile', component: MyProfileComponent },
  { path: 'myProfile/editProfile', component: EditProfileComponent },
  { path: 'db', component: DbComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(paths)],
  exports: [RouterModule],
})
export class AppRouteModule {}
