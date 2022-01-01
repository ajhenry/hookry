import { AntDesign } from "@expo/vector-icons";
import { Box, Flex, Heading, useDisclose } from "native-base";
import React, { useContext } from "react";
import { Pressable } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { useDelete } from "../../hooks/useDelete";
import { LargeCounter, ProjectContext, WidgetItem } from "../../store";
import { generateColorPalette } from "../../utils/colors";
import { generateRandom } from "../../utils/random";
import WidgetContainer from "../Widget";
import { WidgetLibraryBase } from "../WidgetLibrary";
import { CounterSettingsSheet } from "./CounterSettingsModal";

interface LargeCounterWidgetProps {
  widgetId: string;
  projectId: string;
}

export const newLargeCounterDefaults = {
  count: 1,
  label: "Global Counter",
  colors: generateColorPalette(),
  id: generateRandom(),
};

export const largeCounterLibraryDefaults = {
  count: 29,
  label: "Global Counter",
  colors: generateColorPalette(),
  id: "large-counter",
};

export const LargeCounterSettingsSheet: React.FC<
  LargeCounterWidgetProps & { isOpen: boolean; onClose: () => void }
> = ({ projectId, widgetId, isOpen, onClose }) => {
  const { saveWidgetData, getWidgetData } = useContext(ProjectContext);
  const { data } = getWidgetData(projectId, widgetId);
  const { label, count } = data;

  const onSaveClick = (val: { count: number; label: string }) => {
    saveWidgetData(projectId, widgetId, {
      ...data,
      label: val.label,
      count: val.count,
    });
    onClose();
  };

  return (
    <CounterSettingsSheet
      onClose={onClose}
      isOpen={isOpen}
      label={label}
      count={count}
      onSave={onSaveClick}
    />
  );
};

export const LargeCounterWidget: React.FC<
  LargeCounterWidgetProps & Omit<RenderItemParams<WidgetItem>, "item">
> = ({ widgetId, projectId, drag, isActive }) => {
  const { getWidgetData, saveWidgetData, removeWidget } =
    useContext(ProjectContext);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [showDelete, onDelete] = useDelete();

  const { data } = getWidgetData(projectId, widgetId);
  const { colors, count, label, id } = data;

  const handleMinusPress = () => {
    if (count - 1 < 0) {
      return;
    }

    saveWidgetData(projectId, widgetId, {
      ...data,
      count: count - 1,
    });
  };

  const handlePlusPress = () => {
    saveWidgetData(projectId, widgetId, {
      ...data,
      count: count + 1,
    });
  };

  const handleLongPress = () => {
    onDelete();
    drag();
  };

  const handlePress = () => {
    onOpen();
  };

  const handleDoublePress = () => {};

  const onPressDelete = () => {
    removeWidget(projectId, widgetId);
  };

  return (
    <>
      <WidgetContainer
        size={1}
        drag={drag}
        isActive={isActive}
        showDelete={showDelete}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onDeletePress={onPressDelete}
      >
        <Widget
          id={id}
          colors={colors}
          count={count}
          label={label}
          onPress={handlePress}
          onLongPress={handleLongPress}
          onMinusPress={handleMinusPress}
          onPlusPress={handlePlusPress}
        />
      </WidgetContainer>
      {
        <LargeCounterSettingsSheet
          widgetId={widgetId}
          projectId={projectId}
          isOpen={isOpen}
          onClose={onClose}
        />
      }
    </>
  );
};

export const LargeCounterLibraryItem = ({
  colors,
  count,
  label,
  id,
  onPress,
}: WidgetItem["data"] & WidgetLibraryBase) => {
  const noop = () => onPress();

  return (
    <Flex flexDir="column" m={2} borderRadius="2xl" overflow="hidden">
      <Widget
        id={id}
        colors={colors}
        count={count}
        label={label}
        onLongPress={noop}
        onMinusPress={noop}
        onPlusPress={noop}
        onPress={noop}
      />
    </Flex>
  );
};

interface WidgetProps {
  onPress: () => void;
  onLongPress: () => void;
  onPlusPress: () => void;
  onMinusPress: () => void;
}

const Widget: React.FC<LargeCounter["data"] & WidgetProps> = ({
  label,
  count,
  colors,
  onPress,
  onLongPress,
  onPlusPress,
  onMinusPress,
}) => {
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress}>
      <Box
        h={32}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="2xl"
        flex={1}
        bg={{
          linearGradient: {
            colors: colors ?? ["#ffffff"],
            start: [0, 0.6],
            end: [0.8, 0.3],
          },
        }}
      >
        <Box display="flex" flexDir="row" alignItems="center">
          <Pressable onPress={onMinusPress} onLongPress={onLongPress}>
            <Box mr={8}>
              <AntDesign name="minus" size={48} />
            </Box>
          </Pressable>
          <Box
            display="flex"
            flexDir="column"
            alignItems="center"
            maxW="1/3"
            flexWrap="nowrap"
            textAlign="center"
          >
            <Heading fontSize="5xl">{count}</Heading>
          </Box>
          <Pressable onPress={onPlusPress} onLongPress={onLongPress}>
            <Box ml={8}>
              <AntDesign name="plus" size={48} />
            </Box>
          </Pressable>
        </Box>
        <Heading fontSize="xl" position="absolute" bottom={0} mb={2}>
          {label}
        </Heading>
      </Box>
    </Pressable>
  );
};
