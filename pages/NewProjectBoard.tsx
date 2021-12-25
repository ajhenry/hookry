import { useNavigation } from "@react-navigation/native";
import { Box, useDisclose } from "native-base";
import React, { useState } from "react";
import { Pressable } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator
} from "react-native-draggable-flatlist";
import { SettingsSheet } from "../components/SettingsSheet";
import WidgetContainer, { WidgetItem } from "../components/Widget";
import { WidgetLibrary } from "../components/WidgetLibrary";
import { AddWidget } from "../components/Widgets/AddWidget";
import { Counter, SmallCounterRow } from "../components/Widgets/Counter";
import { HeadingRow } from "../components/Widgets/Heading";
import { Timestamp } from "../components/Widgets/Timestamp";

interface NewProjectCountersProps {
  widgetLibraryIsOpen: boolean;
  widgetLibraryOpen: () => void;
  widgetLibraryClose: () => void;
  onCountersChange: (counters: any) => void;
}

const NewProjectCounters: React.FC<NewProjectCountersProps> = ({
  onCountersChange,
  widgetLibraryIsOpen,
  widgetLibraryOpen,
  widgetLibraryClose,
}) => {
  const router = useNavigation();
  const [data, setData] = useState<WidgetItem[]>([
    {
      id: "1245",
      type: "timestamp",
      data: {},
    },
    {
      id: "2314",
      type: "large-counter",
      data: {
        type: "large",
        id: "sdfio0",
        label: "Test Label",
        count: 45,
        colors: ["#ff7ca6", "#fc9fa0", "#ef819e"],
      },
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
      id: "sdoj",
      type: "notes",
      data: {
        title: "This is a heading",
        notes: "These are some notes that are really long",
      },
    },
  ]);

  const { isOpen, onOpen, onClose } = useDisclose();

  const onWidgetPress = (rowId: string) => {
    console.log("clicked on", rowId);
    setSelectedItem(data.find((widget) => widget.id === rowId)!);
    onOpen();
  };

  const onWidgetAdd = (type: WidgetItem["type"]) => {
    let data = {};

    switch (type) {
      case "large-counter":
        data = {
          id: Math.random().toString(36).substring(2),
          label: "",
          count: 50,
        };
    }

    const newEntry = {
      id: Math.random().toString(36).substring(2),
      type,
      data,
    };
    console.log("new entry", newEntry);

    widgetLibraryClose();
    setData((prev) => [...prev, newEntry]);
    setSelectedItem(newEntry);
    onOpen();
  };

  // Replaces the widget data when a user saves it
  const onWidgetDataChange = (rowId: string, newData: any) => {
    const indexToReplace = data.findIndex(({ id }) => id === rowId);
    const oldEntry = data[indexToReplace];
    const replacedData = Object.assign([], data, {
      [indexToReplace]: { ...oldEntry, data: newData },
    });
    console.log(replacedData);
    setData(replacedData);
  };

  const [selectedItem, setSelectedItem] = useState<WidgetItem>(data[0]);

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
              onPress={onWidgetPress}
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
              onPress={onWidgetPress}
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
              onPress={onWidgetPress}
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
              onPress={onWidgetPress}
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
              onPress={onWidgetPress}
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
              onPress={() => router.navigate("Notes" as any)}
            >
              <Box>For Notes</Box>
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
      <WidgetLibrary
        isOpen={widgetLibraryIsOpen}
        onClose={widgetLibraryClose}
        onWidgetSelect={onWidgetAdd}
      />
      <SettingsSheet
        isOpen={isOpen}
        onClose={onClose}
        onDataChange={onWidgetDataChange}
        {...selectedItem}
      />
    </>
  );
};

export default NewProjectCounters;
