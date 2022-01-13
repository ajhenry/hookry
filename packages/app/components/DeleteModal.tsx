import { Button, Modal, Text } from "native-base";
import React from "react";
import { theme } from "../utils/theme";

export const DeleteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <Modal.Content {...theme.background}>
        <Modal.CloseButton />
        <Modal.Header borderBottomColor="transparent">
          Delete All Data
        </Modal.Header>
        <Modal.Body borderWidth={0} px="4" minH="40">
          <Text>
            Are you sure you want to delete all data? All of your project data
            will be lost!
          </Text>
        </Modal.Body>
        <Modal.Footer
          display="flex"
          justifyContent="center"
          {...theme.background}
        >
          <Button
            px="12"
            borderRadius="2xl"
            onPress={onConfirm}
            bgColor={theme.colors.danger}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
