import { FoodImage } from "../views/menu/FoodView";

export interface IMenu {
  id?: number;
  foto?: string;
  emri?: string;
  cmimi?: number;
  categorie?: keyof typeof FoodImage;
  pershkrimi?: string;
  fotot?: Array<String>
}
