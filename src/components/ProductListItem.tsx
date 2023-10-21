import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "native-base";
import { IProduct } from "../types";
import React from "react";
import { BasicCard } from "./BasicCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navTypes";
import { useNavigation } from "@react-navigation/native";

type ProductListItemProps = {
  product: IProduct;
};

type Props = NativeStackScreenProps<RootStackParamList, "Main"> &
  ProductListItemProps;

export const ProductListItem: React.FC<ProductListItemProps> = (props) => {
  const { product } = props;
  const navigation = useNavigation<any>();

  return (
    <BasicCard
      w="100%"
      onPress={() => {
        navigation.navigate("Product", {
          productId: product.id,
        });
      }}
    >
      <HStack>
        <AspectRatio w="25%" ratio={2 / 2}>
          <Image
            source={{
              uri: product.images[0],
            }}
            alt="image"
          />
        </AspectRatio>
        <Stack w={"70%"} py={2} px={4} space={0}>
          <Stack space={2}>
            <Heading size="sm" ml="-1">
              {product.title}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "lightBlue.600",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {product.category.name}
            </Text>
          </Stack>
          <Text fontSize={"xs"} fontWeight="400" numberOfLines={2}>
            {product.description}
          </Text>
        </Stack>
      </HStack>
      {product.variants && (
        <Flex flexDir={"row"} justifyContent={"flex-end"}>
          {product.variants.map((variant, i) => {
            return (
              <Badge colorScheme="coolGray" fontSize={"xs"}>
                {variant.title}
              </Badge>
            );
          })}
        </Flex>
      )}
    </BasicCard>
  );
};
