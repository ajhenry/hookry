import { useNavigation } from "@react-navigation/native";
import { Box, useDisclose } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Pressable } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator
} from "react-native-draggable-flatlist";
import { SettingsSheet } from "../components/SettingsSheet";
import WidgetContainer, {
  generateNewWidgetData
} from "../components/Widget";
import { WidgetLibrary } from "../components/WidgetLibrary";
import { Counter, SmallCounterRow } from "../components/Widgets/Counter";
import { HeadingRow } from "../components/Widgets/Heading";
import { Timestamp } from "../components/Widgets/Timestamp";
import { BoardContext, WidgetItem } from "../store";

interface NewProjectCountersProps {
  widgetLibraryIsOpen: boolean;
  widgetLibraryOpen: () => void;
  widgetLibraryClose: () => void;
}

const NewProjectCounters: React.FC<NewProjectCountersProps> = ({
  widgetLibraryIsOpen,
  widgetLibraryOpen,
  widgetLibraryClose,
}) => {
  const router = useNavigation();
  const { data, setData } = useContext(BoardContext);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclose();

  const onWidgetPress = (rowId: string) => {
    setSelectedItemId(rowId);
  };

  const onWidgetAdd = (type: WidgetItem["type"]) => {
    let data = generateNewWidgetData(type);

    const newEntry = {
      id: Math.random().toString(36).substring(2),
      type,
      data,
    };

    widgetLibraryClose();
    setData((prev) => [...prev, newEntry]);
    setSelectedItemId(newEntry.id);
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

  useEffect(() => {
    if (!selectedItemId) return;
    onOpen();
  }, [selectedItemId]);

  const onSettingsClose = () => {
    setSelectedItemId(null);
    onClose();
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
      {selectedItemId && (
        <SettingsSheet
          isOpen={isOpen}
          onClose={onSettingsClose}
          onDataChange={onWidgetDataChange}
          id={selectedItemId!}
        />
      )}
    </>
  );
};

export default NewProjectCounters;
