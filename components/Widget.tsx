import { Box, Pressable } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { WidgetItem } from "../store";
import { generateColorPalette } from "../utils/colors";

export interface WidgetContainerProps {
  size: number;
  onPress?: (id: string) => void;
}


export const generateNewWidgetData = (
  type: WidgetItem["type"]
): WidgetItem["data"] => {
  switch (type) {
    case "large-counter":
      return {
        id: Math.random().toString(36).substring(2),
        label: "",
        count: 50,
        colors: generateColorPalette(),
      };
    case "small-counter":
      return {
        left: {
          id: Math.random().toString(36).substring(2),
          label: "",
          count: 50,
          colors: generateColorPalette(),
        },
        right: {
          id: Math.random().toString(36).substring(2),
          label: "",
          count: 50,
          colors: generateColorPalette(),
        },
      };
  }
};

const WidgetContainer: React.FC<
  WidgetContainerProps & RenderItemParams<WidgetItem>
> = ({ size, children, item, drag, isActive, onPress }) => {
  const { width } = Dimensions.get("window");

  return (
    <Pressable
      disabled={isActive}
      onPress={() => {
        onPress?.(item.id);
      }}
      onLongPress={drag}
    >
      <Box
        display="flex"
        flexDir="column"
        w={width / size - 16}
        m={2}
        borderRadius="2xl"
        overflow="hidden"
      >
        {children}
      </Box>
    </Pressable>
  );
};

export default WidgetContainer;
