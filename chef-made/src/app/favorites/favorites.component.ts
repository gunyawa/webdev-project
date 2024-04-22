import {Component, OnInit} from '@angular/core';
import {FavoriteService} from "../services/favorite/favorite.service";
import {UserService} from "../services/user/user.service";
import {Favorite} from "../../models/Favorite";
import {CategoryService} from "../services/category/category.service";
import {Food} from "../../models/Food";
import {User} from "../../models/User";
import {LoginService} from "../services/login/login.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  constructor(private favoriteService:FavoriteService, private userService: UserService,
              private categoryService:CategoryService, private loginService:LoginService) {}

  favorite!:Favorite;
  favoriteFoods: Food []= [];
  user_id!:number;
  user!:User;
  logged: boolean = false;
  ngOnInit() {
    this.loginService.isAuthenticated().subscribe((data)=> {
      this.logged = data;
    })
    if(this.logged) {
      this.getFoods();
      this.userService.get_id().subscribe((data) => {
        this.user_id = data.user_id
        if (this.user_id) {
          this.getFavorite();
        }
      })
    }
  }
  getFavorite(){
    this.favoriteService.getFavorite(this.user_id).subscribe((data) => {
      this.favorite = data;
      this.favoriteFoods = data.foods;
      this.user = data.user;
    })
  }
  getFoods(){
    this.categoryService.getFoods().subscribe((foods) => {
      this.favoriteFoods = foods
    })
  }
  remove(food_id:number){
    this.favoriteService.removeFromFavorite(food_id).subscribe((data) =>{
      this.favoriteFoods = this.favoriteFoods.filter((food) => food.id!== food_id);
    })
  }
}
