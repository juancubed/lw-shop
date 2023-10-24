import React, { createContext, useEffect, useState } from "react";
import {
  ICart,
  IChosenVariationObj,
  IProduct,
  IVariation,
  TCartOperation,
} from "../types";

import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useProductList } from "../api";
import {
  generateVariations,
  getPriceFromVariations,
  isVariationIncluded,
} from "../utils/utils";

interface AppContextProps {
  loading: boolean;
  products?: IProduct[];
  revalidateList: () => void;
  cart: ICart;
  setLoading: (value: boolean) => void;
  removeFromCart: (index: number) => void;
  updateCart: (
    product: IProduct,
    variant: IChosenVariationObj | undefined,
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
    AsyncStorageLib.getItem("cart").then((value) => {
      if (value) {
        let _cart = JSON.parse(value);
        setCart(_cart);
        // // console.log({ value });
        setLoading(true);
      } else {
        // reject("Library pictures");
        setLoading(false);
      }
    });
  }, []);

  const addToCart = (id: number, quantity: number, variant?: string) => {};
  const removeFromCart = (index: number) => {
    let _products = JSON.parse(JSON.stringify(cart.products));
    _products.splice(index, 1);
    setCart((prevState) => ({
      ...prevState,
      products: _products,
      updated: new Date(),
    }));
  };
  const updateCart = (
    product: IProduct,
    variant: IChosenVariationObj | undefined,
    quantity: number
  ) => {
    return new Promise<TCartOperation>((resolve, reject) => {
      const existingElement = cart.products
        .filter((p) => p.product.id === product.id)
        .find((p) => {
          return isVariationIncluded(p.variant, variant);
        });
      if (existingElement) {
        resolve({
          message: "The product has already been added",
          success: false,
        });
        return;
      }
      let _products = JSON.parse(JSON.stringify(cart.products));
      _products.push({
        product,
        variant,
        price: variant
          ? getPriceFromVariations(product, variant)
          : product.price,
        quantity,
      });
      setCart((prevState) => ({
        ...prevState,
        products: _products,
        updated: new Date(),
      }));
      let _cart = JSON.stringify(cart);
      AsyncStorageLib.setItem("cart", _cart);
      resolve({
        message: "The product has been added successfully",
        success: true,
      });
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
        removeFromCart,
        updateCart,
        clearCart,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export { useAppContext, MainProvider };
