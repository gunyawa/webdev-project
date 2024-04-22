import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category/category.service";
import {ActivatedRoute} from "@angular/router";
import {Food} from "../../models/Food";
import {FavoriteService} from "../services/favorite/favorite.service";
import {LoginService} from "../services/login/login.service";

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit{
  constructor(private categoryService: CategoryService, private route: ActivatedRoute,
              private favoriteService: FavoriteService, private loginService:LoginService) {

  }
  logged:boolean = false;
  foods: Food[] = [];
  ngOnInit() {
    this.loginService.isAuthenticated().subscribe((data)=>{
      this.logged = data;
    })
    this.route.paramMap.subscribe((params) =>{
      if(params.get('category_id')){
        let id = Number(params.get('category_id'))
        this.categoryService.getFoodByCategory(id).subscribe((foods)=>{
          this.foods =foods;
        })
      }
    })
  }
  addToFavorite(food_id:number){
    this.favoriteService.addToFavorite(food_id).subscribe();
    window.alert("The food has been added to the favorites")
  }
}
