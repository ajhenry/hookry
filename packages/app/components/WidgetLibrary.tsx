import { Actionsheet, Box, Flex, Heading, ScrollView } from "native-base";
import React from "react";
import { WidgetItem } from "../store";
import { theme } from "../utils/theme";
import {
  largeCounterLibraryDefaults,
  LargeCounterLibraryItem
} from "./Widgets/LargeCounter";
import { notesLibraryDefaults, NotesLibraryItem } from "./Widgets/Notes";
import {
  smallCounterLibraryDefaults,
  SmallCounterLibraryItem
} from "./Widgets/SmallCounter";
import { timerLibraryDefaults, TimerLibraryItem } from "./Widgets/Timer";

export interface WidgetLibraryBase {
  onPress: () => void;
}

interface WidgetLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onWidgetSelect: (type: WidgetItem["type"]) => void;
}

const WidgetLibraryRowItem = ({ label, children }: any) => {
  return (
    <Flex w="full" mb="6">
      <Heading
        mb="2"
        fontSize="xl"
        fontWeight="semibold"
        {...theme.text.heading}
      >
        {label}
      </Heading>
      {children}
    </Flex>
  );
};

export const WidgetLibrary: React.FC<WidgetLibraryProps> = ({
  isOpen,
  onClose,
  onWidgetSelect,
}) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content {...theme.background}>
        <Box w="100%" h={60} px={4} justifyContent="center" alignItems="center">
          <Heading {...theme.text.heading}>Widgets</Heading>
        </Box>

        <ScrollView w="full">
          <WidgetLibraryRowItem label="Large Counter">
            <LargeCounterLibraryItem
              {...largeCounterLibraryDefaults}
              onPress={() => onWidgetSelect("large-counter")}
            />
          </WidgetLibraryRowItem>
          <WidgetLibraryRowItem label="Small Counters">
            <SmallCounterLibraryItem
              {...smallCounterLibraryDefaults}
              onPress={() => onWidgetSelect("small-counter")}
            />
          </WidgetLibraryRowItem>
          <WidgetLibraryRowItem label="Timer">
            <TimerLibraryItem
              {...timerLibraryDefaults}
              onPress={() => onWidgetSelect("timer")}
            />
          </WidgetLibraryRowItem>
          <WidgetLibraryRowItem label="Notes">
            <NotesLibraryItem
              {...notesLibraryDefaults}
              onPress={() => onWidgetSelect("notes")}
            />
          </WidgetLibraryRowItem>
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
