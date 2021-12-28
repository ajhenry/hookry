import { Actionsheet, Box, Flex, Heading, ScrollView } from "native-base";
import React from "react";
import { Pressable } from "react-native";
import { WidgetItem } from "../store";
import { generateColorPalette } from "../utils/colors";
import { Counter, SmallCounterRow } from "./Widgets/Counter";
import { Notes } from "./Widgets/Notes";
import { Timestamp } from "./Widgets/Timestamp";


interface WidgetLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onWidgetSelect: (type: WidgetItem["type"]) => void;
}

const WidgetLibraryRowItem = ({ label, children, onPress }: any) => {
  return (
    <Pressable onPress={onPress}>
      <Flex w="full" mb="6">
        <Heading mb="2" fontSize="xl" fontWeight="semibold">
          {label}
        </Heading>
        {children}
      </Flex>
    </Pressable>
  );
};

const libraryData = {
  largeCounter: {
    count: 29,
    label: "Global Counter",
    colors: generateColorPalette(),
    id: "large-counter",
    size: "large" as const,
  },
  smallCounter: {
    data: {
      left: {
        id: "asdf",
        label: "Small Label",
        count: 100,
        colors: generateColorPalette(),
      },
      right: {
        id: "asdf",
        label: "Test Label",
        count: 100,
        colors: generateColorPalette(),
      },
    },
  },
  timestamp: {
    total: 32948234,
  },
  notes: {
    notes: "Add some notes here",
    title: "",
  },
};

export const WidgetLibrary: React.FC<WidgetLibraryProps> = ({
  isOpen,
  onClose,
  onWidgetSelect,
}) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box w="100%" h={60} px={4} justifyContent="center" alignItems="center">
          <Heading>Widgets</Heading>
        </Box>

        <ScrollView w="full">
          <WidgetLibraryRowItem
            label="Large Counter"
            onPress={() => onWidgetSelect("large-counter")}
          >
            <Counter {...libraryData.largeCounter} />
          </WidgetLibraryRowItem>
          <WidgetLibraryRowItem
            label="Small Counters"
            onPress={() => onWidgetSelect("small-counter")}
          >
            <SmallCounterRow {...libraryData.smallCounter} />
          </WidgetLibraryRowItem>
          <WidgetLibraryRowItem
            label="Timestamp"
            onPress={() => onWidgetSelect("timestamp")}
          >
            <Timestamp {...libraryData.timestamp} />
          </WidgetLibraryRowItem>
          <WidgetLibraryRowItem
            label="Notes"
            onPress={() => onWidgetSelect("notes")}
          >
            <Notes {...libraryData.notes} />
          </WidgetLibraryRowItem>
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
