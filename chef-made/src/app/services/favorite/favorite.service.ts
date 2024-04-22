import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Favorite} from "../../../models/Favorite";
import {UserId} from "../../../models/UserId";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  BASE_URL = "http://127.0.0.1:8000/api";

  constructor(private client : HttpClient) { }

  getFavorite(user_id:number):Observable<Favorite>{
    return this.client.get<Favorite>(`${this.BASE_URL}/favorites/${user_id}`)
  }
  addToFavorite(food_id: number):Observable<Favorite>{
    return this.client.post<Favorite>(`${this.BASE_URL}/add-to-favorite/${food_id}/`,{});
  }
  removeFromFavorite(food_id:number):Observable<any>{
    return this.client.delete<Favorite>(`${this.BASE_URL}/remove-from-favorite/${food_id}`)
  }
}
