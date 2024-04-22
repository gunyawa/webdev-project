import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { FoodsComponent } from './foods/foods.component';
import { AllfoodComponent } from './allfood/allfood.component';
import { FavoritesComponent } from './favorites/favorites.component';
import {AuthInterceptor} from "./AuthInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    NavBarComponent,
    AboutComponent,
    LoginComponent,
    CategoriesComponent,
    FoodsComponent,
    AllfoodComponent,
    FavoritesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass :AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
