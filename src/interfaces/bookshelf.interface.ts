export interface IBookSample {
  id: string;
  thumbnail: string;
}

export interface IBookshelfData {
  tbr: IBookSample[];
  wishlist: IBookSample[];
  reading: IBookSample[];
  read: IBookSample[];
  favorites: IBookSample[];
}
