import { AntDesign } from "@expo/vector-icons";
import { Box, Pressable } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { WidgetItem } from "../store";

export interface WidgetContainerProps {
  size: number;
  onPress?: () => void;
}

const WidgetContainer: React.FC<
  WidgetContainerProps & Omit<RenderItemParams<WidgetItem>, "item">
> = ({ size, children, drag, isActive, onPress }) => {
  const { width } = Dimensions.get("window");

  const [showDelete, setShowDelete] = useState(false);

  const onLongPress = () => {
    setShowDelete(true);

    drag();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowDelete(false);
    }, 3000);
    if (!setShowDelete) {
      () => clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [showDelete]);

  return (
    <Pressable
      disabled={isActive}
      onPress={() => {
        onPress?.();
      }}
      onLongPress={onLongPress}
    >
      <Box
        display="flex"
        flexDir="column"
        w={width / size - 16}
        m={2}
        borderRadius="2xl"
      >
        {children}
        {showDelete && (
          <Pressable onPress={() => console.log("pressed remove")}>
            <Box
              position="absolute"
              borderRadius="full"
              bgColor="rgb(243, 32, 19)"
              p={2}
              mt="-2"
              right={0}
            >
              <AntDesign name="close" size={32} color="white" />
            </Box>
          </Pressable> 
        )}
      </Box>
    </Pressable>
  );
};

export default WidgetContainer;
