import React, { useEffect, useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  ScrollView,
  Skeleton,
  Stack,
  Text,
} from "native-base";
import { useRoute } from "@react-navigation/native";
import { IProduct } from "../types";
import { fetchProductDetail } from "../api";
import { useAppContext } from "../providers/app-context";
import { View } from "react-native";

export const ProductDetailScreen: React.FC = ({ navigation, ...rest }: any) => {
  const route = useRoute<any>();
  const { addToCart, clearCart, updateCart } = useAppContext();
  const { productId } = route.params;
  const [product, setProduct] = useState<IProduct>();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleAddToCart = () => {};

  useEffect(() => {
    if (productId) {
      fetchProductDetail(productId)
        .then((res) => {
          setProduct(res.data);
          setIsLoaded(true);
        })
        .catch((err) => {});
    }
  }, [productId]);

  return (
    <ScrollView
      style={[
        { flex: 1, paddingHorizontal: 10 },
        { flexDirection: "column", backgroundColor: "white" },
      ]}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: 36,
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 18}>
            <Image
              source={{
                uri: product?.images[0],
              }}
              alt="image"
            />
          </AspectRatio>
          <Flex
            bg="lightBlue.600"
            _dark={{
              bg: "violet.400",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            <Text
              color={"white"}
              fontSize="4xl"
              fontWeight="500"
              ml="-0.5"
              mt="-1"
              textAlign={"right"}
            >
              ${product?.price}
            </Text>
          </Flex>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {product?.title}
            </Heading>
          </Stack>
          <Text fontWeight="400">{product?.description}</Text>
        </Stack>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: 36,
        }}
      >
        <Button
          colorScheme={"lightBlue"}
          _text={{ fontSize: "lg" }}
          m="4"
          onPress={handleAddToCart}
        >
          Add to Cart
        </Button>
      </View>
    </ScrollView>
  );
};
