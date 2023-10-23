export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: ICategory;
  description: string;
  images: string[];
  creationAt: Date;
  updatedAt: Date;
  variants?: IVariation[];
}

export interface IChosenVariationObj {
  [key: string]: string;
}

export interface IVariationObj {
  group: string;
  value: string;
  price?: number;
  subGroup?: IVariationObj[];
}

export interface IVariation {
  id: string;
  variantId: string;
  image: string;
  price?: number;
  group: string;
  value: string;
  variation: IVariationObj[];
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
  variant?: IVariationObj;
}

export interface ICart {
  created: Date;
  updated: Date;
  products: IProductPurchase[];
}

export type TCartOperation = { success: boolean; message: string };
