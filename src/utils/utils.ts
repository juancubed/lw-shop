import { IProduct, IVariationObj } from "../types";

export type ProductCategory = "Azul" | "Flores Cristales";

export const VARIATION_COLORS = ["Red", "Blue", "Green", "Black"];
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
  laptops: { processor: VARIATION_PROCESSOR, color: VARIATION_COLORS },
  Electronics: {
    color: VARIATION_COLORS,
    processor: VARIATION_PROCESSOR,
    capacity: VARIATION_CAPACITY,
  },
  Clothes: { color: VARIATION_COLORS, size: VARIATION_SIZES },
  Furniture: { color: VARIATION_COLORS },
};
type variationGroup = { [key: string]: string[] };
type variationGroups = { [key: string]: { [key: string]: string[] } };
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
        price: product.price + product.price * (keyIndex / 10),
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
