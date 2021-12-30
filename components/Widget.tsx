import { AntDesign } from "@expo/vector-icons";
import { Box, Pressable } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { ProjectContext, WidgetItem } from "../store";

export interface WidgetContainerProps {
  size: number;
  onPress?: () => void;
  projectId: string;
  widgetId: string;
}

const WidgetContainer: React.FC<
  WidgetContainerProps & Omit<RenderItemParams<WidgetItem>, "item">
> = ({ size, children, drag, isActive, onPress, projectId, widgetId }) => {
  const { width } = Dimensions.get("window");
  const { removeWidget } = useContext(ProjectContext);

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

  const onPressDelete = () => {
    removeWidget(projectId, widgetId);
  };

  return (
    <Pressable
      disabled={isActive}
      onPress={() => {
        onPress?.();
      }}
      onLongPress={onLongPress}
    >
      {showDelete && (
        <Pressable onPress={onPressDelete} zIndex={100}>
          <Box
            position="absolute"
            borderRadius="full"
            bgColor="rgb(243, 32, 19)"
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
        ml={2}
        borderRadius="2xl"
      >
        {children}
      </Box>
    </Pressable>
  );
};

export default WidgetContainer;
