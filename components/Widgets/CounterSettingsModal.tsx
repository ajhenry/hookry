import {
    Box,
    Button,
    Flex,
    FormControl,

    Input,
    Modal
} from "native-base";
import React, { useEffect, useState } from "react";
import { useKeyboardState } from "../../hooks/keyboard";
import { WidgetItem } from "../../store";

export const CounterSettingsSheet: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  label: string;
  count: number;
  onSave: (data: WidgetItem["data"]) => void;
}> = ({ label, count, isOpen, onClose, onSave }) => {
  const [open] = useKeyboardState();
  const [counterLabel, setCounterLabel] = useState(label);
  const [counterValue, setCounterValue] = useState(count);

  useEffect(() => {
    setCounterLabel(label);
  }, [label]);

  useEffect(() => {
    setCounterValue(count);
  }, [count]);

  const onSaveClick = () => {
    onSave({
      label: counterLabel,
      count: Number(counterValue),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      paddingBottom={open ? 80 : 0}
    >
      <Modal.Content bgColor="rgb(255, 255, 255)">
        <Modal.CloseButton />
        <Modal.Header borderBottomColor="transparent">
          Edit Counter
        </Modal.Header>
        <Modal.Body
          borderWidth={0}
          bgColor="rgb(255, 255, 255)"
          px="4"
          minH="40"
        >
          <FormControl mt="3">
            <Flex justifyContent="center" alignItems="center">
              <Input
                borderColor="transparent"
                bgColor="transparent"
                borderWidth={0}
                fontSize="4xl"
                keyboardType="numeric"
                onChangeText={(text) => setCounterValue(text)}
                autoCorrect={false}
                placeholder={String(count)}
                placeholderTextColor="black"
                textAlign="center"
                _focus={{
                  textAlign: "center",
                }}
              />
            </Flex>
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
