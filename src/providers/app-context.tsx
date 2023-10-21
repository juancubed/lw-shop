import React, { createContext } from "react";
import { ICart, IProduct } from "../types";
import { useProductList } from "../api";

const variants = [];
interface AppContextProps {
  products?: IProduct[];
  revalidateList: () => void;
  cart?: ICart;
  addToCart: (id: number, quantity: number, variant?: string) => void;
  updateCart: (cartInfo: ICart) => void;
  clearCart: () => void;
}

const appContext = createContext<AppContextProps | undefined>(undefined);

function useAppContext() {
  const c = React.useContext(appContext);
  if (!c) throw new Error("App Context must be inside a Provider with a value");
  return c;
}
const MainProvider = ({ children }: any) => {
  const {
    data: products,
    mutate: revalidateList,
    isLoading: loadingProducts,
  } = useProductList(0, 10);

  const productsEnhanced = products?.map((p) => {
    let variants =
      p.images.length > 1
        ? p.images.map((image, index) => {
            return {
              id: `p_${p.id}_v_${index + 1}`,
              title: `Variant ${index + 1}`,
              image: image,
              price: p.price + p.price * 0.1,
            };
          })
        : undefined;
    return { ...p, variants };
  });

  const addToCart = (id: number, quantity: number, variant?: string) => {};
  const updateCart = (cartInfo: ICart) => {};
  const clearCart = () => {};

  return (
    <appContext.Provider
      value={{
        products: productsEnhanced,
        revalidateList,
        addToCart,
        updateCart,
        clearCart,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export { useAppContext, MainProvider };
