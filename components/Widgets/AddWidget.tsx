import { AntDesign } from "@expo/vector-icons";
import { Box, Heading } from "native-base";
import React from "react";

interface AddWidgetProps {}

export const AddWidget: React.FC<AddWidgetProps> = () => {
  return (
    <Box
      w="full"
      h="16"
      display="flex"
      flexDir="row"
      justifyContent="center"
      alignItems="center"
    >
      <Heading mr={2}>Add Widget</Heading>
      <AntDesign name="plus" size={36} />
    </Box>
  );
};
