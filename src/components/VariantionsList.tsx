import { Box, Flex, Select, Text } from "native-base";
import { IVariation, IVariationObj } from "../types";
import React, { useEffect, useState } from "react";
import { BasicCard } from "./BasicCard";
import { useNavigation } from "@react-navigation/native";

type VariantListItemProps = {
  variant: IVariation;
  chosenVariationObject?: IVariationObj;
  onSelect: (chosenObj: IVariationObj | undefined) => void;
};

interface Props {
  variation: IVariationObj;
  onSelect: (chosenObj: IVariationObj | undefined) => void;
  chosenVariationObject?: IVariationObj;
}

const VariationGroupElement: React.FC<Props> = (props) => {
  const { variation, chosenVariationObject, onSelect } = props;
  if (variation.subGroup === undefined) return undefined;
  useEffect(() => {}, [chosenVariationObject]);
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
            if (v) onSelect(v);
          }
        }}
      >
        {variation.subGroup.map((v, i) => {
          return <Select.Item key={i} label={v.value} value={v.value} />;
        })}
      </Select>

      {/* {<Box>

</Box>} */}
    </Box>
  );
};

export const VariationsList: React.FC<VariantListItemProps> = (props) => {
  const { variant, chosenVariationObject, onSelect } = props;
  const [subGroup, setSubGroup] = useState<IVariationObj>();

  return (
    <Flex>
      {variant.variation.length > 0 && (
        <Text style={{ textTransform: "capitalize", fontWeight: "bold" }}>
          {variant.variation[0].group}
        </Text>
      )}
      <Select
        height={"10"}
        onValueChange={(value) => {
          if (value) {
            let v = variant.variation.find((v) => v.value === value);
            if (v) onSelect(v);
          }
        }}
      >
        {variant.variation.map((v, i) => {
          return <Select.Item key={i} label={v.value} value={v.value} />;
        })}
      </Select>
      {/* {chosenVariationObject && (
        <VariationGroupElement
          onSelect={onSelect}
          variation={variant.variation.find}
        />
      )} */}
    </Flex>
  );
};
