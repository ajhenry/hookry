import { AntDesign } from "@expo/vector-icons";
import {
    Box,

    FormControl,
    Heading,
    Input,
    Modal,
    useDisclose
} from "native-base";
import React, { useContext } from "react";
import { LargeCounter, ProjectContext } from "../../store";

interface LargeCounterWidgetProps {
  widgetId: string;
  projectId: string;
}

export const SettingsSheet: React.FC<LargeCounterWidgetProps> = ({
  projectId,
  widgetId,
}) => {
  const { isOpen, onClose } = useDisclose();
  const { saveWidgetData, getWidgetData } = useContext(ProjectContext);
  const { data } = getWidgetData<LargeCounter>(projectId, widgetId);
  const { label } = data;

  const onSaveClick = (label: string) => {
    saveWidgetData<LargeCounter["data"]>(projectId, widgetId, {
      ...data,
      label,
    });
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
                onChangeText={(text) => onSaveClick(text)}
                autoCorrect={false}
                value={label}
              />
            </Box>
          </FormControl>
        </Modal.Body>
        <Modal.Footer
          bgColor="rgb(255, 255, 255)"
          display="flex"
          justifyContent="center"
        >
          {/* <Button px="12" borderRadius="2xl" onPress={onSaveClick}>
            Save
          </Button> */}
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export const LargeCounterWidget: React.FC<LargeCounterWidgetProps> = ({
  widgetId,
  projectId,
}) => {
  const { getWidgetData } = useContext(ProjectContext);

  const {
    data: { colors, count, label },
  } = getWidgetData<LargeCounter>(projectId, widgetId);

  return (
    <>
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
    </>
  );
};
