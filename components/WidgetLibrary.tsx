import { Actionsheet, Box, Flex, Heading, ScrollView } from "native-base";
import React from "react";
import { Counter, SmallCounterRow } from "./Widgets/Counter";
import { Timestamp } from "./Widgets/Timestamp";

interface WidgetLibraryProps {
  isOpen: boolean;
  onClose: () => void;
}

const WidgetLibraryRowItem = ({ label, children }: any) => {
  return (
    <Flex w="full" mb="6">
      <Heading mb="2" fontSize="xl" fontWeight="semibold">
        {label}
      </Heading>
      {children}
    </Flex>
  );
};

export const WidgetLibrary: React.FC<WidgetLibraryProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box w="100%" h={60} px={4} justifyContent="center" alignItems="center">
          <Heading>Widgets</Heading>
        </Box>

        <ScrollView w="full">
          <WidgetLibraryRowItem label="Large Counter">
            <Counter count={90} label="Example Label" size="large" />
          </WidgetLibraryRowItem>
          <WidgetLibraryRowItem label="Small Counters">
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
          <WidgetLibraryRowItem label="Timestamp">
            <Timestamp />
          </WidgetLibraryRowItem>
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
