export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: ICategory;
  description: string;
  images: string[];
  creationAt: Date;
  updatedAt: Date;
  variants?: IVariant[];
}

export interface IVariant {
  id: string;
  title: string;
  price: number;
  image: string;
}
export interface ICategory {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface IProductPurchase {
  product: IProduct;
  quantity: number;
  variant?: IVariant;
}

export interface ICart {
  created: Date;
  updated: Date;
  products: IProductPurchase[];
}
