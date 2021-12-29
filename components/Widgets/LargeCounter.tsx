import { AntDesign } from "@expo/vector-icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Modal,
  useDisclose
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Pressable } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { ProjectContext, WidgetItem } from "../../store";
import { generateColorPalette } from "../../utils/colors";
import { generateRandom } from "../../utils/random";
import WidgetContainer from "../Widget";

interface LargeCounterWidgetProps {
  widgetId: string;
  projectId: string;
  disablePresses?: string;
  defaultData?: WidgetItem["data"];
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
  const { label } = data;
  const [counterLabel, setCounterLabel] = useState(label);

  useEffect(() => {
    setCounterLabel(label);
  }, [label]);

  const onSaveClick = () => {
    saveWidgetData(projectId, widgetId, {
      ...data,
      label: counterLabel,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} avoidKeyboard size="xl">
      <Modal.Content bgColor="rgb(255, 255, 255)">
        <Modal.CloseButton />
        <Modal.Header borderBottomColor="transparent">
          Edit Large Counter
        </Modal.Header>
        <Modal.Body
          borderWidth={0}
          bgColor="rgb(255, 255, 255)"
          px="4"
          minH="40"
        >
          <FormControl mt="3">
            <FormControl.Label>Counter Label</FormControl.Label>
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
                onChangeText={(text) => setCounterLabel(text)}
                autoCorrect={false}
                value={counterLabel}
              />
            </Box>
          </FormControl>
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

export const LargeCounterWidget: React.FC<
  LargeCounterWidgetProps & Omit<RenderItemParams<WidgetItem>, "item">
> = ({ widgetId, projectId, drag, isActive }) => {
  const { getWidgetData, saveWidgetData } = useContext(ProjectContext);
  const { isOpen, onOpen, onClose } = useDisclose();

  const { data } = getWidgetData(projectId, widgetId);
  const { colors, count, label } = data;

  const handleMinusPress = () => {
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
          <>
            <Box display="flex" flexDir="row" alignItems="center">
              <Pressable onPress={handleMinusPress} onLongPress={drag}>
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
              <Pressable onPress={handlePlusPress} onLongPress={drag}>
                <Box ml={8}>
                  <AntDesign name="plus" size={48} />
                </Box>
              </Pressable>
            </Box>
            <Heading fontSize="xl" position="absolute" bottom={0} mb={2}>
              {label}
            </Heading>
          </>
        </Box>
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
}: WidgetItem["data"]) => {
  return (
    <Flex flexDir="column" m={2} borderRadius="2xl" overflow="hidden">
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
        <>
          <Box display="flex" flexDir="row" alignItems="center">
            <Box mr={8}>
              <AntDesign name="minus" size={48} />
            </Box>
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
            <Box ml={8}>
              <AntDesign name="plus" size={48} />
            </Box>
          </Box>
          <Heading fontSize="xl" position="absolute" bottom={0} mb={2}>
            {label}
          </Heading>
        </>
      </Box>
    </Flex>
  );
};
