import { useIsFocused } from "@react-navigation/native";
import {
  Box, Flex, Heading, Pressable,
  useDisclose
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { useDelete } from "../../hooks/useDelete";
import { ProjectContext, Timer, WidgetItem } from "../../store";
import { theme } from "../../utils/theme";
import { secondsToTime } from "../../utils/time";
import WidgetContainer from "../Widget";
import { WidgetLibraryBase } from "../WidgetLibrary";

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

export const TimerWidget: React.FC<
  TimerWidgetProps & Omit<RenderItemParams<WidgetItem>, "item">
> = ({ widgetId, projectId, drag, isActive }) => {
  const { getWidgetData, saveWidgetData, removeWidget } =
    useContext(ProjectContext);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [showDelete, onDelete] = useDelete();
  const { data } = getWidgetData(projectId, widgetId);
  const { total } = data as Timer["data"];
  const [runningTotal, setRunningTotal] = useState<number>(total);
  const [paused, setPaused] = useState(true);
  const isFocused = useIsFocused();
  const isPaused = !isFocused || paused;

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

  const handlePress = () => {
    setPaused((v) => !v);
  };

  const handleLongPress = () => {
    onDelete();
    drag();
  };

  const onPressDelete = () => {
    removeWidget(projectId, widgetId);
  };

  return (
    <>
      <WidgetContainer
        size={1}
        drag={drag}
        isActive={isActive}
        onPress={handlePress}
        showDelete={showDelete}
        onLongPress={handleLongPress}
        onDeletePress={onPressDelete}
      >
        <Widget
          total={runningTotal}
          paused={isPaused}
          onPress={handlePress}
          onLongPress={handleLongPress}
        />
      </WidgetContainer>
    </>
  );
};

export const TimerLibraryItem = ({
  total,
  onPress,
}: Timer["data"] & WidgetLibraryBase) => {
  const noop = () => onPress();

  return (
    <Flex flexDir="column" m={2} borderRadius="2xl" overflow="hidden">
      <Widget total={total} onLongPress={noop} onPress={noop} />
    </Flex>
  );
};

interface WidgetProps {
  onLongPress: () => void;
  onPress: () => void;
  paused?: boolean;
}

const Widget: React.FC<Timer["data"] & WidgetProps> = ({
  total,
  paused,
  onLongPress,
  onPress,
}) => {
  const { h, m, s } = secondsToTime(total);

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress}>
      <Box
        w="full"
        h="16"
        display="flex"
        flexDir="row"
        justifyContent="center"
        alignItems="center"
      >
        <Heading
          mr={2}
          color={paused ? "rgba(0, 0, 0, 0.5)" : theme.text.heading.color}
        >
          {h > 0 && `${h} hrs`} {m} mins {s} secs
        </Heading>
      </Box>
    </Pressable>
  );
};
