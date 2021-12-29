import { AntDesign } from "@expo/vector-icons";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Modal,
  Pressable,
  useDisclose
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { ProjectContext, WidgetItem } from "../../store";
import { generateColorPalette } from "../../utils/colors";
import { generateRandom } from "../../utils/random";
import WidgetContainer from "../Widget";

interface SmallCounterWidgetProps {
  widgetId: string;
  projectId: string;
  disablePresses?: string;
  defaultData?: WidgetItem["data"];
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
> = ({ projectId, widgetId, isOpen, onClose }) => {
  const { saveWidgetData, getWidgetData } = useContext(ProjectContext);
  const { data } = getWidgetData(projectId, widgetId);
  const { left, right } = data;
  const [counterLabelLeft, setCounterLabelLeft] = useState(left.label);
  const [counterLabelRight, setCounterLabelRight] = useState(right.label);

  useEffect(() => {
    setCounterLabelLeft(left.label);
    setCounterLabelRight(right.label);
  }, [left, right]);

  const onSaveClick = () => {
    saveWidgetData(projectId, widgetId, {
      ...data,
      left: {
        ...data.left,
        label: counterLabelLeft,
      },
      right: {
        ...data.right,
        label: counterLabelRight,
      },
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} avoidKeyboard size="xl">
      <Modal.Content bgColor="rgb(255, 255, 255)">
        <Modal.CloseButton />
        <Modal.Header borderBottomColor="transparent">
          Edit Small Counter
        </Modal.Header>
        <Modal.Body
          borderWidth={0}
          bgColor="rgb(255, 255, 255)"
          px="4"
          minH="40"
        >
          <Box>
            <FormControl mt="3">
              <FormControl.Label>Left Counter Label</FormControl.Label>
              <Box
                borderColor={"transparent"}
                bgColor={"rgb(239,239,239)"}
                borderRadius="2xl"
                paddingX={2}
              >
                <Input
                  borderColor="transparent"
                  bgColor="transparent"
                  borderWidth={0}
                  fontSize="lg"
                  h={10}
                  onChangeText={(text) => setCounterLabelLeft(text)}
                  autoCorrect={false}
                  value={counterLabelLeft}
                />
              </Box>
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Right Counter Label</FormControl.Label>
              <Box
                borderColor={"transparent"}
                bgColor={"rgb(239,239,239)"}
                borderRadius="2xl"
                paddingX={2}
              >
                <Input
                  borderColor="transparent"
                  bgColor="transparent"
                  borderWidth={0}
                  fontSize="lg"
                  h={10}
                  onChangeText={(text) => setCounterLabelRight(text)}
                  autoCorrect={false}
                  value={counterLabelRight}
                />
              </Box>
            </FormControl>
          </Box>
        </Modal.Body>
        <Modal.Footer
          bgColor="rgb(255, 255, 255)"
          display="flex"
          justifyContent="center"
        >
          <Button px="12" borderRadius="2xl" onPress={onSaveClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export const SmallCounterWidget: React.FC<
  SmallCounterWidgetProps & Omit<RenderItemParams<WidgetItem>, "item">
> = ({ widgetId, projectId, drag, isActive }) => {
  const { getWidgetData, saveWidgetData } = useContext(ProjectContext);
  const { isOpen, onOpen, onClose } = useDisclose();

  const { data } = getWidgetData(projectId, widgetId);
  const { left, right } = data;

  const handleMinusPress = (dir: "left" | "right") => {
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

  const handlePress = () => {
    console.log("Pressed it");
    onOpen();
  };

  return (
    <>
      <WidgetContainer
        size={1}
        drag={drag}
        isActive={isActive}
        onPress={handlePress}
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
        </Box>
      </WidgetContainer>
      {
        <SmallCounterSettingsSheet
          widgetId={widgetId}
          projectId={projectId}
          isOpen={isOpen}
          onClose={onClose}
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
