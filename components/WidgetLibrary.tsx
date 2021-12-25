import { Actionsheet, Box, Flex, Heading, ScrollView } from "native-base";
import React from "react";
import { Pressable } from "react-native";
import { WidgetItem } from "./Widget";
import { Counter, SmallCounterRow } from "./Widgets/Counter";
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
            <Counter count={90} label="Example Label" size="large" />
          </WidgetLibraryRowItem>
          <WidgetLibraryRowItem
            label="Small Counters"
            onPress={() => onWidgetSelect("small-counter")}
          >
            <SmallCounterRow
              {...{
                data: {
                  left: {
                    id: "asdf",
                    label: "Small Label",
                    count: 100,
                  },
                  right: {
                    id: "asdf",
                    label: "Test Label",
                    count: 100,
                  },
                },
              }}
            />
          </WidgetLibraryRowItem>
          <WidgetLibraryRowItem
            label="Timestamp"
            onPress={() => onWidgetSelect("timestamp")}
          >
            <Timestamp />
          </WidgetLibraryRowItem>
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
