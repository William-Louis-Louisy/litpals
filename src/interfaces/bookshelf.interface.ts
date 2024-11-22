export interface IBookSample {
  id: string;
  thumbnail: string;
}

export interface IShelf {
  name: string;
  type: string;
  books: IBookSample[];
}

export interface IBookshelf {
  shelves: IShelf[];
}

export interface IInitialBookshelf {
  tbr: IBookSample[];
  wishlist: IBookSample[];
  reading: IBookSample[];
  read: IBookSample[];
  favorites: IBookSample[];
}

// export interface IBookshelfData {
//   tbr: IBookSample[];
//   wishlist: IBookSample[];
//   reading: IBookSample[];
//   read: IBookSample[];
//   favorites: IBookSample[];
// }
