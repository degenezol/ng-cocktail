export interface Cocktails<T> {
  drinks: T[];
}

export interface Category {
  strCategory: string;
  checked?: boolean;
}

export interface Cocktail {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}
