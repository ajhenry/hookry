import { Feather } from "@expo/vector-icons";
import { Flex, Heading, HStack } from "native-base";
import React from "react";
import { theme } from "../utils/theme";

export const BlankBoardText = () => {
  return (
    <HStack
      alignItems="center"
      justifyContent="center"
      h="full"
      w="full"
      flexDir="row"
    >
      <Flex w="1/2" alignItems="flex-end">
        <Heading textAlign="right" {...theme.text.heading}>
          Add widgets above
        </Heading>
      </Flex>
      <Flex w={4} />
      <Flex w="1/4">
        <Feather name="corner-right-up" size={48} {...theme.text.heading} />
      </Flex>
    </HStack>
  );
};
