import { Actionsheet, Box, Flex, Heading, ScrollView } from "native-base";
import React from "react";
import { Pressable } from "react-native";
import { WidgetItem } from "../store";
import {
  largeCounterLibraryDefaults,
  LargeCounterLibraryItem
} from "./Widgets/LargeCounter";
import { notesLibraryDefaults, NotesLibraryItem } from "./Widgets/Notes";
import {
  smallCounterLibraryDefaults,
  SmallCounterLibraryItem
} from "./Widgets/SmallCounter";
import { timerLibraryDefaults, TimerLibraryItem } from "./Widgets/Timestamp";

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

export const WidgetLibrary: React.FC<WidgetLibraryProps> = ({
  isOpen,
  onClose,
  onWidgetSelect,
}) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bgColor="white">
        <Box w="100%" h={60} px={4} justifyContent="center" alignItems="center">
          <Heading>Widgets</Heading>
        </Box>

        <ScrollView w="full">
          <WidgetLibraryRowItem
            label="Large Counter"
            onPress={() => onWidgetSelect("large-counter")}
          >
            <LargeCounterLibraryItem {...largeCounterLibraryDefaults} />
          </WidgetLibraryRowItem>
          <WidgetLibraryRowItem
            label="Small Counters"
            onPress={() => onWidgetSelect("small-counter")}
          >
            <SmallCounterLibraryItem {...smallCounterLibraryDefaults} />
          </WidgetLibraryRowItem>
          <WidgetLibraryRowItem
            label="Timer"
            onPress={() => onWidgetSelect("timer")}
          >
            <TimerLibraryItem {...timerLibraryDefaults} />
          </WidgetLibraryRowItem>
          <WidgetLibraryRowItem
            label="Notes"
            onPress={() => onWidgetSelect("notes")}
          >
            <NotesLibraryItem {...notesLibraryDefaults} />
          </WidgetLibraryRowItem>
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
