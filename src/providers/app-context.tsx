import React, { createContext, useEffect, useState } from "react";
import { ICart, IProduct, IVariation, TCartOperation } from "../types";

import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useProductList } from "../api";
import { generateVariations } from "../utils/utils";

interface AppContextProps {
  loading: boolean;
  products?: IProduct[];
  revalidateList: () => void;
  cart: ICart;
  setLoading: (value: boolean) => void;
  addToCart: (id: number, quantity: number, variant?: string) => void;
  updateCart: (
    product: IProduct,
    variant: IVariation,
    quantity: number
  ) => Promise<TCartOperation>;
  clearCart: () => void;
}

const appContext = createContext<AppContextProps | undefined>(undefined);

function useAppContext() {
  const c = React.useContext(appContext);
  if (!c) throw new Error("App Context must be inside a Provider with a value");
  return c;
}
const MainProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<ICart>({
    created: new Date(),
    updated: new Date(),
    products: [],
  });

  const {
    data: products,
    mutate: revalidateList,
    isLoading: loadingProducts,
  } = useProductList(0, 25);

  const productsEnhanced = products?.map((p) => {
    let variations = generateVariations(p, p.images.length);
    let variants =
      p.images.length > 1
        ? p.images.map((image, index) => {
            let variation = variations[index];
            return {
              id: `p_${p.id}_v_${index + 1}`,
              variantId: `Variant ${index + 1}`,
              image: image,
              price: p.price + 5 * index,
              group: variation.group,
              value: variation.value,
              variation: variation.subGroup ?? [],
            };
          })
        : undefined;

    return { ...p, variants };
  });

  useEffect(() => {
    setLoading(true);
    AsyncStorageLib.getItem("Cart").then((value) => {
      if (value) {
        // // console.log({ value });
        // resolve();
      } else {
        // reject("Library pictures");
        setLoading(false);
      }
    });
  }, []);

  const addToCart = (id: number, quantity: number, variant?: string) => {};
  const updateCart = (
    product: IProduct,
    variant: IVariation,
    quantity: number
  ) => {
    return new Promise<TCartOperation>((resolve, reject) => {
      resolve({ message: "OK", success: false });
    });
  };
  const clearCart = () => {};

  return (
    <appContext.Provider
      value={{
        products: productsEnhanced,
        cart,
        loading,
        setLoading,
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
