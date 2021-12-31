import { AntDesign } from "@expo/vector-icons";
import { Box, Heading, Pressable, useDisclose } from "native-base";
import React, { useContext, useState } from "react";
import { Dimensions } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { ProjectContext, WidgetItem } from "../../store";
import { generateColorPalette } from "../../utils/colors";
import { generateRandom } from "../../utils/random";
import WidgetContainer from "../Widget";
import { CounterSettingsSheet } from "./CounterSettingsModal";

interface SmallCounterWidgetProps {
  widgetId: string;
  projectId: string;
  disablePresses?: string;
  defaultData?: WidgetItem["data"];
  dir?: "left" | "right";
}

export const smallCounterLibraryDefaults = {
  left: {
    count: 29,
    label: "Global Counter",
    colors: generateColorPalette(),
    id: "small-counter",
  },
  right: {
    count: 29,
    label: "Global Counter",
    colors: generateColorPalette(),
    id: "small-counter",
  },
};

export const newSmallCounterDefaults = {
  left: {
    count: 1,
    label: "Small Counter",
    colors: generateColorPalette(),
    id: generateRandom(),
  },
  right: {
    count: 1,
    label: "Small Counter",
    colors: generateColorPalette(),
    id: generateRandom(),
  },
};

export const SmallCounterSettingsSheet: React.FC<
  SmallCounterWidgetProps & { isOpen: boolean; onClose: () => void }
> = ({ dir, projectId, widgetId, isOpen, onClose }) => {
  const { saveWidgetData, getWidgetData } = useContext(ProjectContext);
  const { data } = getWidgetData(projectId, widgetId);
  const { left, right } = data;

  const onSaveClick = (val: { count: number; label: string }) => {
    saveWidgetData(projectId, widgetId, {
      ...data,
      [dir!]: {
        ...data[dir!],
        label: val.label,
        count: val.count,
      },
    });
    onClose();
  };

  return (
    <CounterSettingsSheet
      onClose={onClose}
      isOpen={isOpen}
      label={dir === "left" ? left.label : right.label}
      count={dir === "left" ? left.count : right.count}
      onSave={onSaveClick}
    />
  );
};

export const SmallCounterWidget: React.FC<
  SmallCounterWidgetProps & Omit<RenderItemParams<WidgetItem>, "item">
> = ({ widgetId, projectId, drag, isActive }) => {
  const { getWidgetData, saveWidgetData } = useContext(ProjectContext);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [dir, setDir] = useState<"left" | "right" | null>(null);

  const { data } = getWidgetData(projectId, widgetId);
  const { left, right } = data;

  const handleMinusPress = (dir: "left" | "right") => {
    if ((dir === "left" ? left : right).count - 1 < 0) {
      return;
    }

    saveWidgetData(projectId, widgetId, {
      ...data,
      [dir]: { ...data[dir], count: (dir === "left" ? left : right).count - 1 },
    });
  };

  const handlePlusPress = (dir: "left" | "right") => {
    saveWidgetData(projectId, widgetId, {
      ...data,
      [dir]: { ...data[dir], count: (dir === "left" ? left : right).count + 1 },
    });
  };

  const handlePress = (dir: "left" | "right") => {
    setDir(dir);
    onOpen();
  };

  const handleClose = () => {
    setDir(null);
    onClose();
  };

  return (
    <>
      <WidgetContainer
        size={1}
        drag={drag}
        isActive={isActive}
        projectId={projectId}
        widgetId={widgetId}
      >
        <Box display="flex" height={24} flexDir="row">
          <Pressable
            onLongPress={drag}
            onPress={() => handlePress("left")}
            flex={1}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="2xl"
              flex={1}
              bg={{
                linearGradient: {
                  colors: left.colors ?? ["#ffffff"],
                  start: [0, 0.6],
                  end: [0.8, 0.3],
                },
              }}
            >
              <Box
                display="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="space-around"
                flex={1}
                width="100%"
              >
                <Pressable
                  onPress={() => handleMinusPress("left")}
                  onLongPress={drag}
                >
                  <Box>
                    <AntDesign name="minus" size={36} />
                  </Box>
                </Pressable>
                <Box maxW="1/3">
                  <Heading fontSize="3xl">{left.count}</Heading>
                </Box>
                <Pressable
                  onPress={() => handlePlusPress("left")}
                  onLongPress={drag}
                >
                  <Box>
                    <AntDesign name="plus" size={36} />
                  </Box>
                </Pressable>
              </Box>
              <Heading fontSize="md" position="absolute" bottom={0} mb={2}>
                {left.label}
              </Heading>
            </Box>
          </Pressable>
          <Box w={4} />
          <Pressable
            onLongPress={drag}
            onPress={() => handlePress("right")}
            flex={1}
          >
            <Box
              h={24}
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="2xl"
              flex={1}
              bg={{
                linearGradient: {
                  colors: right.colors ?? ["#ffffff"],
                  start: [0, 0.6],
                  end: [0.8, 0.3],
                },
              }}
            >
              <Box
                display="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="space-around"
                flex={1}
                width="100%"
              >
                <Pressable
                  onPress={() => handleMinusPress("right")}
                  onLongPress={drag}
                >
                  <Box>
                    <AntDesign name="minus" size={36} />
                  </Box>
                </Pressable>
                <Box maxW="1/3">
                  <Heading fontSize="3xl">{right.count}</Heading>
                </Box>
                <Pressable
                  onPress={() => handlePlusPress("right")}
                  onLongPress={drag}
                >
                  <Box>
                    <AntDesign name="plus" size={36} />
                  </Box>
                </Pressable>
              </Box>
              <Heading fontSize="md" position="absolute" bottom={0} mb={2}>
                {right.label}
              </Heading>
            </Box>
          </Pressable>
        </Box>
      </WidgetContainer>
      {
        <SmallCounterSettingsSheet
          widgetId={widgetId}
          projectId={projectId}
          isOpen={isOpen}
          onClose={handleClose}
          dir={dir!}
        />
      }
    </>
  );
};

export const SmallCounterLibraryItem = ({
  left,
  right,
}: WidgetItem["data"]) => {
  const { width } = Dimensions.get("window");
  return (
    <Box
      display="flex"
      flexDir="column"
      w={width - 16}
      borderRadius="2xl"
      overflow="hidden"
    >
      <Box display="flex" height={24} flexDir="row">
        <Box
          h={24}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="2xl"
          flex={1}
          bg={{
            linearGradient: {
              colors: left.colors ?? ["#ffffff"],
              start: [0, 0.6],
              end: [0.8, 0.3],
            },
          }}
        >
          <Box
            display="flex"
            flexDir="row"
            alignItems="center"
            justifyContent="space-around"
            flex={1}
            width="100%"
          >
            <Box>
              <AntDesign name="minus" size={36} />
            </Box>

            <Box maxW="1/3">
              <Heading fontSize="3xl">{left.count}</Heading>
            </Box>

            <Box>
              <AntDesign name="plus" size={36} />
            </Box>
          </Box>
          <Heading fontSize="md" position="absolute" bottom={0} mb={2}>
            {left.label}
          </Heading>
        </Box>
        <Box w={4} />
        <Box
          h={24}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="2xl"
          flex={1}
          bg={{
            linearGradient: {
              colors: right.colors ?? ["#ffffff"],
              start: [0, 0.6],
              end: [0.8, 0.3],
            },
          }}
        >
          <Box
            display="flex"
            flexDir="row"
            alignItems="center"
            justifyContent="space-around"
            flex={1}
            width="100%"
          >
            <Box>
              <AntDesign name="minus" size={36} />
            </Box>

            <Box maxW="1/3">
              <Heading fontSize="3xl">{right.count}</Heading>
            </Box>

            <Box>
              <AntDesign name="plus" size={36} />
            </Box>
          </Box>
          <Heading fontSize="md" position="absolute" bottom={0} mb={2}>
            {right.label}
          </Heading>
        </Box>
      </Box>
    </Box>
  );
};
