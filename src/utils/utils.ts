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

export const VARIATION_GROUPS: variationGroups = {
  smartphones: { color: VARIATION_COLORS, capacity: VARIATION_CAPACITY },
  laptops: { processor: VARIATION_PROCESSOR, darkColor: VARIATION_DARK_COLORS },
  Electronics: {
    capacity: VARIATION_CAPACITY,
    processor: VARIATION_PROCESSOR,
  },
  Clothes: { color: VARIATION_COLORS, size: VARIATION_SIZES },
  Furniture: { color: VARIATION_COLORS },
};
export type variationGroup = { [key: string]: string[] };
export type variationGroups = { [key: string]: { [key: string]: string[] } };
export const generateVariations = (
  product: IProduct,
  numberOfVariations: number
) => {
  let variations: IVariationObj[] = [];

  let variationTypes: variationGroup = { color: VARIATION_COLORS };
  Object.keys(VARIATION_GROUPS).forEach((group) => {
    if (group === product.category.name) {
      variationTypes = VARIATION_GROUPS[group];
    }
  });

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
    variant: IVariationObj | undefined,
    variationsLeft: IChosenVariationObj,
    price: number
  ) => {
    if (Object.keys(variationsLeft).length === 0 || variant === undefined) {
      return price;
    }
    if (
      Object.keys(variationsLeft).indexOf(variant.group) >= 0 &&
      variant.value === variationsLeft[variant.group]
    ) {
      delete variationsLeft[variant.group];
      if (Object.keys(variationsLeft).length === 0)
        return variant.price ?? price;
      if (variant.subGroup) {
        variant.subGroup.forEach((v) => {
          return recursivePriceLookup(
            v,
            { ...variationsLeft },
            variant.price ?? price
          );
        });
      }
    } else {
      return null;
    }
  };

  variants.forEach((v) => {
    let v_price = recursivePriceLookup(v, { ...chosenVariations }, price);
    if (v_price) {
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

  const recursivePriceLookup = (
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
        // variant.subGroup.forEach((v) => {
        //   return recursivePriceLookup(v, { ...variationsLeft });
        // });
        let _sbVariant = variant.subGroup.find((sb) => {
          return recursivePriceLookup(sb, { ...chosenVariations }) === true;
        });
        return _sbVariant != undefined;
      }
    }
    return false;
  };

  let variant = variants.find((v) => {
    return (
      recursivePriceLookup(
        { value: v.value, group: v.group, subGroup: v.variation },
        { ...chosenVariations }
      ) === true
    );
  });
  return variant != undefined;
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
