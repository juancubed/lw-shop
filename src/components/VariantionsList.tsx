import { Box, Flex, Select, Text } from "native-base";
import { IChosenVariationObj, IVariation, IVariationObj } from "../types";
import React, { useEffect, useState } from "react";
import { BasicCard } from "./BasicCard";
import { useNavigation } from "@react-navigation/native";

type VariantsProps = {
  variants: IVariation[];
  chosenVariationObject?: IChosenVariationObj;
  onSelect: (chosenObj: IVariationObj | undefined) => void;
};
type VariantListItemProps = {
  variant: IVariation;
  chosenVariationObject?: IVariationObj;
  onSelect: (chosenObj: IVariationObj | undefined) => void;
};

interface Props {
  variation: IVariationObj;
  onSelect: (chosenObj: IVariationObj | undefined) => void;
  chosenVariationObject?: IChosenVariationObj;
}

const VariationGroupElement: React.FC<Props> = (props) => {
  const { variation, chosenVariationObject, onSelect } = props;
  const [subVariation, setSubVariation] = useState<IVariationObj>();
  if (variation.subGroup === undefined || variation.subGroup.length == 0)
    return undefined;
  // useEffect(() => {}, [chosenVariationObject]);
  return (
    <Box>
      <Text style={{ textTransform: "capitalize" }}>
        {variation.subGroup[0].group}
      </Text>
      <Select
        height={"10"}
        onValueChange={(value) => {
          if (value && variation.subGroup) {
            let v = variation.subGroup.find((v) => v.value === value);
            setSubVariation(v);
            if (v) onSelect(v);
          }
        }}
      >
        {variation.subGroup.map((v, i) => {
          return <Select.Item key={i} label={v.value} value={v.value} />;
        })}
      </Select>
      {subVariation && subVariation.subGroup && (
        <VariationGroupElement
          onSelect={onSelect}
          chosenVariationObject={chosenVariationObject}
          variation={{
            group: subVariation.group,
            value: subVariation.value,
            price: subVariation.price,
            subGroup: subVariation.subGroup,
          }}
        />
      )}
    </Box>
  );
};

export const ProductVariationsSelection: React.FC<VariantsProps> = (props) => {
  const { variants, chosenVariationObject, onSelect } = props;
  const [chosenVariant, setChosenVariant] = useState<IVariation>();

  return (
    <Flex>
      {variants.length > 0 && (
        <Text style={{ textTransform: "capitalize", fontWeight: "bold" }}>
          {variants[0].group}
        </Text>
      )}
      <Select
        h={"10"}
        onValueChange={(value) => {
          let v = variants.find((t) => t.value === value);
          if (v) {
            setChosenVariant(v);
            let c: IChosenVariationObj = {};
            if (v) {
              c[v.group] = v.value;

              onSelect(v);
            }
          }
        }}
      >
        {variants.map((v, i) => {
          return <Select.Item label={`${v.value}`} value={v.value} key={i} />;
        })}
      </Select>

      {chosenVariant?.variation && (
        <VariationGroupElement
          onSelect={onSelect}
          chosenVariationObject={chosenVariationObject}
          variation={{
            group: chosenVariant.group,
            value: chosenVariant.value,
            price: chosenVariant.price,
            subGroup: chosenVariant.variation,
          }}
        />
      )}
    </Flex>
  );
};
