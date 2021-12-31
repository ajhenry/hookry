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
import { RenderItemParams } from "react-native-draggable-flatlist";
import { ProjectContext, WidgetItem } from "../../store";
import WidgetContainer from "../Widget";

function secondsToTime(secs: number) {
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  var obj = {
    h: hours,
    m: minutes,
    s: seconds,
  };
  return obj;
}

interface TimerWidgetProps {
  widgetId: string;
  projectId: string;
}

export const newTimerDefaults = {
  total: 0,
};

export const timerLibraryDefaults = {
  total: 123873,
};

export const TimerSettingsSheet: React.FC<
  TimerWidgetProps & { isOpen: boolean; onClose: () => void }
> = ({ projectId, widgetId, isOpen, onClose }) => {
  const { saveWidgetData, getWidgetData } = useContext(ProjectContext);
  const { data } = getWidgetData(projectId, widgetId);
  const { total } = data;
  const [counterLabel, setCounterLabel] = useState(total);

  useEffect(() => {
    setCounterLabel(total);
  }, [total]);

  const onSaveClick = () => {
    saveWidgetData(projectId, widgetId, {
      ...data,
      total: counterLabel,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} avoidKeyboard size="xl">
      <Modal.Content bgColor="rgb(255, 255, 255)">
        <Modal.CloseButton />
        <Modal.Header borderBottomColor="transparent">Edit Timer</Modal.Header>
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

export const TimerWidget: React.FC<
  TimerWidgetProps & Omit<RenderItemParams<WidgetItem>, "item">
> = ({ widgetId, projectId, drag, isActive }) => {
  const { getWidgetData, saveWidgetData } = useContext(ProjectContext);
  const { isOpen, onOpen, onClose } = useDisclose();
  const { data } = getWidgetData(projectId, widgetId);
  const { total } = data;
  const [runningTotal, setRunningTotal] = useState<number>(total);
  const [paused, setPaused] = useState(true);

  const updateTime = (total: number) => {
    saveWidgetData(projectId, widgetId, {
      ...data,
      total,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRunningTotal((c) => c + 1);
    }, 1000);

    if (paused) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    updateTime(runningTotal);
  }, [runningTotal]);

  const { h, m, s } = secondsToTime(runningTotal);

  const handlePress = () => {
    setPaused((v) => !v);
  };

  return (
    <>
      <WidgetContainer
        size={1}
        drag={drag}
        isActive={isActive}
        onPress={handlePress}
        projectId={projectId}
        widgetId={widgetId}
      >
        <Box
          w="full"
          h="16"
          display="flex"
          flexDir="row"
          justifyContent="center"
          alignItems="center"
        >
          <Heading mr={2} color={paused? "rgba(0, 0, 0, 0.5)": "black"}>
            {h > 0 && `${h} hrs`} {m} mins {s} secs
          </Heading>
        </Box>
      </WidgetContainer>
      {
        <TimerSettingsSheet
          widgetId={widgetId}
          projectId={projectId}
          isOpen={isOpen}
          onClose={onClose}
        />
      }
    </>
  );
};

export const TimerLibraryItem = ({ total }: WidgetItem["data"]) => {
  const { h, m, s } = secondsToTime(total);
  return (
    <Flex flexDir="column" m={2} borderRadius="2xl" overflow="hidden">
      <Box
        w="full"
        h="16"
        display="flex"
        flexDir="row"
        justifyContent="center"
        alignItems="center"
      >
        <Heading mr={2}>
          {h > 0 && `${h} hrs`} {m} mins {s} secs
        </Heading>
      </Box>
    </Flex>
  );
};
