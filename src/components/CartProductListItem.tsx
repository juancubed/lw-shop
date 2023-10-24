import {
  AspectRatio,
  Badge,
  Button,
  CloseIcon,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "native-base";
import { IProductPurchase } from "../types";
import React from "react";
import { BasicCard } from "./BasicCard";

type ProductListItemProps = {
  isCheckout: boolean;
  product: IProductPurchase;
  handleRemoveFromCart: (product: IProductPurchase) => void;
};

export const CartProductListItem: React.FC<ProductListItemProps> = (props) => {
  const { product, isCheckout, handleRemoveFromCart } = props;

  const handleRemove = () => {
    handleRemoveFromCart(product);
  };

  return (
    <BasicCard w="100%">
      <HStack justifyContent={"space-around"}>
        <Flex alignContent={"center"} justifyContent={"center"}>
          <Badge>{product.quantity}</Badge>
        </Flex>
        <Stack w={"70%"} py={2} px={4} space={0}>
          <Stack space={2}>
            <Heading size="sm" ml="-1">
              {product.product.title}
            </Heading>
            {product.variant && (
              <Flex flexDir={"row"} justifyContent={"flex-start"}>
                {Object.keys(product.variant).map((key, i) => {
                  return product.variant ? (
                    <Badge key={i} colorScheme="emerald" fontSize={"sm"}>
                      {product.variant[key]}
                    </Badge>
                  ) : null;
                })}
              </Flex>
            )}
          </Stack>
        </Stack>
        <Flex>
          {!isCheckout && (
            <IconButton
              size={"sm"}
              onPress={handleRemove}
              icon={<CloseIcon />}
            ></IconButton>
          )}
          <Flex flexDir={"row"} mt={2}>
            <Text fontWeight={"medium"} fontSize={"sm"}>
              ${product.price.toString()}
            </Text>
          </Flex>
        </Flex>
      </HStack>
    </BasicCard>
  );
};
