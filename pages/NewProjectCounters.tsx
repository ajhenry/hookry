import { Box, useDisclose } from "native-base";
import React, { useState } from "react";
import { Pressable } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator
} from "react-native-draggable-flatlist";
import WidgetContainer, { WidgetItem } from "../components/Widget";
import { WidgetLibrary } from "../components/WidgetLibrary";
import { AddWidget } from "../components/Widgets/AddWidget";
import { Counter, SmallCounterRow } from "../components/Widgets/Counter";
import { HeadingRow } from "../components/Widgets/Heading";
import { Timestamp } from "../components/Widgets/Timestamp";

interface NewProjectCountersProps {
  onCountersChange: (counters: any) => void;
}

const NewProjectCounters: React.FC<NewProjectCountersProps> = ({
  onCountersChange,
}) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  const [data, setData] = useState<WidgetItem[]>([
    {
      id: "2314",
      type: "large-counter",
      data: {
        type: "large",
        id: "sdfio0",
        label: "Test Label",
        count: 45,
      },
    },
    {
      id: "1245",
      type: "timestamp",
      data: {},
    },
    {
      id: "2333",
      type: "small-counter",
      data: {
        left: {
          id: "asdf",
          label: "Test Label",
          count: 100,
        },
      },
    },
    {
      id: "3i9459",
      type: "heading",
      data: {
        label: "This is a heading",
      },
    },
    {
      id: "32",
      type: "add-widget",
    },
  ]);

  const onSmallCounterAdd = () => {
    console.log("clicked new add");
  };

  const onCounterPress = (rowId: string) => {
    console.log("clicked on", rowId);
  };

  const onAddWidgetClick = () => {
    onOpen();
  };

  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<WidgetItem>) => {
    return (
      <ScaleDecorator>
        <Pressable
          disabled={isActive}
          onPress={() => console.log("Pressed outer")}
          onLongPress={drag}
        >
          {item.type === "large-counter" && (
            <WidgetContainer
              size={1}
              item={item}
              drag={drag}
              isActive={isActive}
              onPress={onCounterPress}
            >
              <Counter {...item.data} size="large" />
            </WidgetContainer>
          )}
          {item.type === "timestamp" && (
            <WidgetContainer
              size={1}
              item={item}
              drag={drag}
              isActive={isActive}
            >
              <Timestamp {...item.data} />
            </WidgetContainer>
          )}
          {item.type === "small-counter" && (
            <WidgetContainer
              size={1}
              item={item}
              drag={drag}
              isActive={isActive}
            >
              <SmallCounterRow {...item} />
            </WidgetContainer>
          )}
          {item.type === "add-widget" && (
            <WidgetContainer
              size={1}
              item={item}
              drag={drag}
              isActive={isActive}
              onPress={onAddWidgetClick}
            >
              <AddWidget />
            </WidgetContainer>
          )}
          {item.type === "heading" && (
            <WidgetContainer
              size={1}
              item={item}
              drag={drag}
              isActive={isActive}
              onPress={onAddWidgetClick}
            >
              <HeadingRow {...item.data} />
            </WidgetContainer>
          )}
          {item.type === "notes" && (
            <WidgetContainer
              size={1}
              item={item}
              drag={drag}
              isActive={isActive}
              onPress={onAddWidgetClick}
            >
              <HeadingRow {...item.data} />
            </WidgetContainer>
          )}
        </Pressable>
      </ScaleDecorator>
    );
  };

  return (
    <>
      <Box display="flex" flexDir="column" flex={1} h="full">
        <Box h="full">
          <DraggableFlatList
            data={data}
            onDragEnd={({ data }) => setData(data)}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </Box>
      </Box>
      <WidgetLibrary isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default NewProjectCounters;
