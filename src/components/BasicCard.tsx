import { Box, IBoxProps, Pressable } from "native-base";
import React from "react";

interface Props extends IBoxProps {
  isActive?: boolean;
  onPress?: () => void;
  noEffect?: boolean;
}

export const BasicCard: React.FC<Props> = (props) => {
  return (
    <Pressable onPress={props.onPress}>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            p="3"
            my={1}
            maxW={"95%"}
            borderRadius="md"
            background={"white"}
            alignSelf={"center"}
            shadow={"2"}
            style={
              !props.noEffect
                ? {
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }
                : undefined
            }
            {...props}
          >
            {props.children}
          </Box>
        );
      }}
    </Pressable>
  );
};
