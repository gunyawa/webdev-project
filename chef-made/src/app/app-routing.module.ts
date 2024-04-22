import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {AboutComponent} from "./about/about.component";
import {LoginComponent} from "./login/login.component";
import {CategoriesComponent} from "./categories/categories.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {FoodsComponent} from "./foods/foods.component";
import {AllfoodComponent} from "./allfood/allfood.component";
import {FavoriteService} from "./services/favorite/favorite.service";
import {FavoritesComponent} from "./favorites/favorites.component";

const routes: Routes = [
  {
    path:'home',
    component: WelcomePageComponent
  },
  {
    path:'about',
    component: AboutComponent

  },
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'categories/:category_id/foods',
    component: FoodsComponent
  },
  {
    path: 'allfood',
    component: AllfoodComponent
  },
  {
    path: 'favorites',
    component: FavoritesComponent
  },
  {
    path: '',
    redirectTo:'login',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
