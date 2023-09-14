import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRouteModule } from './app-route/app-route.module';

import { SearchContentsComponent } from './search-contents/search-contents.component';
import { CountBooksPipe } from './count-books.pipe';
import { ShowPricePipe } from './show-price.pipe';
import { LayoutComponent } from './layout/layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeadComponent } from './head/head.component';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HtmlBreakLinesPipe } from './html-break-lines.pipe';
import { AllowUrlPipe } from './allow-url.pipe';
import { MyBooksComponent } from './my-books/my-books.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookListComponent } from './book-list/book-list.component';
import { FixLengthPipe } from './fix-length.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookListButtonsPipe } from './book-list-buttons.pipe';
import { UsersProfileViewComponent } from './users-profile-view/users-profile-view.component';
import { UserInfoPipe } from './user-info.pipe';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserCommentsComponent } from './user-comments/user-comments.component';
import { UserCommentsPipe } from './user-comments.pipe';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { EmptyPicturePipe } from './empty-picture.pipe';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AboutUserPipe } from './about-user.pipe';
import { BookstorDataService } from "./bookstor-data.service";
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { DbComponent } from './db/db.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    SearchContentsComponent,
    CountBooksPipe,
    ShowPricePipe,
    LayoutComponent,
    HomePageComponent,
    HtmlBreakLinesPipe,
    AllowUrlPipe,
    MyBooksComponent,
    LoginComponent,
    RegisterComponent,
    BookListComponent,
    FixLengthPipe,
    PaginationComponent,
    BookListButtonsPipe,
    UsersProfileViewComponent,
    UserInfoPipe,
    UserDetailsComponent,
    UserCommentsComponent,
    UserCommentsPipe,
    AddEditBookComponent,
    EditBookComponent,
    BookDetailsComponent,
    EmptyPicturePipe,
    MyProfileComponent,
    EditProfileComponent,
    AboutUserPipe,
    ChartComponent,
    DbComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouteModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStarRatingModule,
    NgChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    BookstorDataService
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
