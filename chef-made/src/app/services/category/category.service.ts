import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../../models/Category";
import {FoodsComponent} from "../../foods/foods.component";
import {Food} from "../../../models/Food";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private client : HttpClient) { }
  BASE_URL = "http://127.0.0.1:8000/api";

  getCategories():Observable<Category[]>{
    return this.client.get<Category[]>(`${this.BASE_URL}/categories`);
  }
  getCategory(category_id:number):Observable<Category>{
    return this.client.get<Category>(`${this.BASE_URL}/categories/${category_id}/`)
  }

  getFoodByCategory(category_id:number):Observable<Food[]>{
    return this.client.get<Food[]>(`${this.BASE_URL}/categories/${category_id}/foods`);
  }
  getFoods():Observable<Food[]>{
    return this.client.get<Food[]>(`${this.BASE_URL}/foods`)
  }
}
