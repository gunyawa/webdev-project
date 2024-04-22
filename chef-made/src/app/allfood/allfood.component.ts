import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category/category.service";
import {Food} from "../../models/Food";
import {FavoriteService} from "../services/favorite/favorite.service";
import {LoginService} from "../services/login/login.service";

@Component({
  selector: 'app-allfood',
  templateUrl: './allfood.component.html',
  styleUrls: ['./allfood.component.css']
})
export class AllfoodComponent implements OnInit{
  foods: Food[] = []
  logged:boolean = false;
  ngOnInit() {
    this.loginService.isAuthenticated().subscribe((data)=>{
      this.logged = data;
    })
    this.getFoods();
  }
  getFoods(){
    this.categoryService.getFoods().subscribe((foods) => {
      this.foods = foods
    })
  }
  constructor(private categoryService : CategoryService,
              private favoriteService: FavoriteService, private loginService:LoginService) {
  }

  addToFavorite(food_id:number){
    this.favoriteService.addToFavorite(food_id).subscribe();
    window.alert("The food has been added to the favorites")
  }
}
