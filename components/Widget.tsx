import { Box, Pressable } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";

interface WidgetContainerProps {
  size: number;
  onPress?: (id: string) => void;
}

export interface WidgetItem {
  id: string;
  type:
    | "timestamp"
    | "large-counter"
    | "small-counter"
    | "notes"
    | "heading"
    | "add-widget"
    | "heading";
  data?: any;
}

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
