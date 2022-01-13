import { AntDesign } from "@expo/vector-icons";
import { Box, Pressable } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { WidgetItem } from "../store";
import { theme } from "../utils/theme";

export interface WidgetContainerProps {
  size: number;
  onPress?: () => void;
  onLongPress?: () => void;
  showDelete?: boolean;
  onDeletePress?: () => void;
}

const WidgetContainer: React.FC<
  WidgetContainerProps & Omit<RenderItemParams<WidgetItem>, "item">
> = ({
  size,
  children,
  drag,
  isActive,
  onPress,
  onLongPress,
  onDeletePress,
  showDelete,
}) => {
  const { width } = Dimensions.get("window");

  return (
    <Pressable
      disabled={isActive}
      onPress={() => {
        onPress?.();
      }}
      onLongPress={onLongPress}
    >
      {showDelete && (
        <Pressable onPress={() => onDeletePress?.()} zIndex={100}>
          <Box
            position="absolute"
            borderRadius="full"
            bgColor={theme.colors.danger}
            p={2}
            right={0}
          >
            <AntDesign name="close" size={20} color="white" />
          </Box>
        </Pressable>
      )}
      <Box
        display="flex"
        flexDir="column"
        w={width / size - 16}
        m={2}
        borderRadius="2xl"
      >
        {children}
      </Box>
    </Pressable>
  );
};

export default WidgetContainer;
