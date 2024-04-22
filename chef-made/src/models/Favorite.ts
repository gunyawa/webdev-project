import {Food} from "./Food";
import {User} from "./User";

export interface Favorite{
  id:number,
  user:User,
  foods:Food[]
}
