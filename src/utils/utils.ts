import {
  IChosenVariationObj,
  IProduct,
  IVariation,
  IVariationObj,
} from "../types";

export type ProductCategory = "Azul" | "Flores Cristales";

export const VARIATION_COLORS = ["Red", "Blue", "Green", "Black"];
export const VARIATION_DARK_COLORS = ["Gray", "Black"];
export const VARIATION_SIZES = ["Small", "Medium", "Large", "Extra Large"];
export const VARIATION_PROCESSOR = [
  "Intel i5",
  "Intel i7",
  "AMD Razor",
  "Intel i9",
];
export const VARIATION_CAPACITY = ["64 GB", "128 GB", "256 GB"];
export const VARIATION_SHOES_SIZE = ["6 UK", "7 UK", "8 UK", "9 UK"];

export const VARIATION_GROUPS: variationGroups = {
  smartphones: { color: VARIATION_COLORS, capacity: VARIATION_CAPACITY },
  laptops: { processor: VARIATION_PROCESSOR, darkColor: VARIATION_DARK_COLORS },
  Electronics: {
    capacity: VARIATION_CAPACITY,
    processor: VARIATION_PROCESSOR,
  },
  Clothes: { color: VARIATION_COLORS, size: VARIATION_SIZES },
  Shoes: { size: VARIATION_SHOES_SIZE, color: VARIATION_COLORS },
  Furniture: { color: VARIATION_COLORS },
};
export type variationGroup = { [key: string]: string[] };
export type variationGroups = { [key: string]: { [key: string]: string[] } };

export const getVariationGroup = (categoryName: string) => {
  let variationTypes: variationGroup = { color: VARIATION_COLORS };
  Object.keys(VARIATION_GROUPS).forEach((group) => {
    if (group === categoryName) {
      variationTypes = VARIATION_GROUPS[group];
    }
  });
  return variationTypes;
};

export const generateVariations = (
  product: IProduct,
  numberOfVariations: number
) => {
  let variations: IVariationObj[] = [];

  let variationTypes: variationGroup = getVariationGroup(product.category.name);

  Object.keys(variationTypes).forEach((key, keyIndex) => {
    let variants = variationTypes[key].map((val) => {
      return {
        group: key,
        value: val,
        price: product.price + product.price * (keyIndex / 40),
        subGroup: undefined,
      };
    });
    if (variations.length === 0) {
      variations = variants;
    } else {
      variations.forEach((v) => {
        if (v.subGroup === undefined) {
          v.subGroup = variants;
        } else {
          v.subGroup.forEach((sb) => {
            if (sb.subGroup === undefined) {
              sb.subGroup = variants;
            }
          });
        }
      });
    }
  });

  return variations;
};

export const getPriceFromVariations = (
  product: IProduct,
  chosenVariations: IChosenVariationObj
) => {
  const { variants } = product;
  if (!variants) return product.price;
  let price = product.price;
  const recursivePriceLookup = (
    variant: IVariationObj | IVariationObj | undefined,
    variationsLeft: IChosenVariationObj,
    price: number
  ): number => {
    if (Object.keys(variationsLeft).length === 0 || variant === undefined) {
      return price;
    }
    if (
      Object.keys(variationsLeft).indexOf(variant.group) >= 0 &&
      variant.value === variationsLeft[variant.group]
    ) {
      delete variationsLeft[variant.group];
      if (Object.keys(variationsLeft).length === 0) {
        return variant.price ?? price;
      }

      if (variant.subGroup) {
        for (let i = 0; i < variant.subGroup.length; i++) {
          const v_price = recursivePriceLookup(
            variant.subGroup[i],
            { ...variationsLeft },
            variant.price ?? price
          );
          if (v_price >= 0) {
            return v_price;
          }
        }
      }
    }
    return -1;
  };

  variants.forEach((v) => {
    const { group, value, image, price: priceValue, variation } = v;
    let v_price = recursivePriceLookup(
      { group, value, price: priceValue, subGroup: variation },
      { ...chosenVariations },
      price
    );
    if (v_price >= 0) {
      price = v_price;
      return;
    }
  });
  return price;
};
export const isValidChosenVariant = (
  product: IProduct,
  chosenVariations?: IChosenVariationObj
) => {
  const { variants } = product;
  if (!variants) return true;
  if (variants && !chosenVariations) return false;

  const recursiveValidation = (
    variant: IVariationObj | undefined,
    variationsLeft: IChosenVariationObj
  ): boolean => {
    if (Object.keys(variationsLeft).length === 0 || variant === undefined) {
      return true;
    }
    if (
      Object.keys(variationsLeft).indexOf(variant.group) >= 0 &&
      variant.value === variationsLeft[variant.group]
    ) {
      delete variationsLeft[variant.group];
      if (Object.keys(variationsLeft).length === 0) {
        if (variant.subGroup == undefined || variant.subGroup.length === 0) {
          return true;
        } else {
          return false;
        }
      }

      if (variant.subGroup) {
        for (let i = 0; i < variant.subGroup.length; i++) {
          const _sbVariant = recursiveValidation(variant.subGroup[i], {
            ...variationsLeft,
          });
          if (_sbVariant) {
            return _sbVariant;
          }
        }
      }
    }
    return false;
  };

  for (let i = 0; i < variants.length; i++) {
    const { group, value, image, price: priceValue, variation } = variants[i];

    const _sbVariant = recursiveValidation(
      { group, value, price: priceValue, subGroup: variation },
      { ...chosenVariations }
    );
    if (_sbVariant) {
      return true;
    }
  }
  return false;
};

export const isVariationIncluded = (
  object1: IChosenVariationObj | undefined,
  object2: IChosenVariationObj | undefined
) => {
  if (object1 == undefined && object1 == object2) return true;
  if (object1 != undefined && object2 != undefined) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
  }

  return true;
};
