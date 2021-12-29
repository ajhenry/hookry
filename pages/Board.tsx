import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Flex, Heading, useDisclose } from "native-base";
import React, { useContext, useState } from "react";
import { Pressable } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator
} from "react-native-draggable-flatlist";
import WidgetContainer from "../components/Widget";
import { WidgetLibrary } from "../components/WidgetLibrary";
import { HeadingRow } from "../components/Widgets/Heading";
import { LargeCounterWidget } from "../components/Widgets/LargeCounter";
import { NotesWidget } from "../components/Widgets/Notes";
import { SmallCounterWidget } from "../components/Widgets/SmallCounter";
import { TimerWidget } from "../components/Widgets/Timestamp";
import { BoardContext, ProjectContext, WidgetItem } from "../store";
import { generateNewWidgetData } from "../utils/defaults";
import { generateRandom } from "../utils/random";

interface BoardProps {
  route: any;
  navigation: any;
}

const Board: React.FC<BoardProps> = ({ route, navigation }) => {
  const { projectId } = route.params;
  const {
    isOpen: widgetLibraryIsOpen,
    onOpen: widgetLibraryOnOpen,
    onClose: widgetLibraryOnClose,
  } = useDisclose();

  const {
    getWidgetList,
    getProject,
    projectData,
    addWidget,
    setBoardWidgetList,
  } = useContext(ProjectContext);
  const { name } = getProject(projectId);

  const router = useNavigation();
  const { data, setData } = useContext(BoardContext);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclose();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerRight: () => (
        <Box mr={2}>
          <AntDesign
            name="plus"
            size={24}
            onPress={() => widgetLibraryOnOpen()}
          />
        </Box>
      ),
      title: name,
    });
  }, [navigation, name]);

  const onWidgetPress = (rowId: string) => {
    setSelectedItemId(rowId);
  };

  const onWidgetAdd = (type: WidgetItem["type"]) => {
    let data = generateNewWidgetData(type);

    const newEntry = {
      id: generateRandom(),
      type,
      data,
    };

    widgetLibraryOnClose();
    addWidget(projectId, newEntry);
  };

  const renderItem = (props: RenderItemParams<WidgetItem>) => {
    const { isActive, drag, item } = props;
    return (
      <ScaleDecorator>
        <Pressable
          disabled={isActive}
          onPress={() => console.log("Pressed outer")}
          onLongPress={drag}
        >
          {item.type === "large-counter" && (
            <LargeCounterWidget
              widgetId={item.id}
              projectId={projectId}
              {...props}
            />
          )}
          {item.type === "timer" && (
            <TimerWidget widgetId={item.id} projectId={projectId} {...props} />
          )}
          {item.type === "small-counter" && (
            <SmallCounterWidget
              widgetId={item.id}
              projectId={projectId}
              {...props}
            />
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
            <NotesWidget
              navigation={navigation}
              widgetId={item.id}
              projectId={projectId}
              {...props}
            />
          )}
        </Pressable>
      </ScaleDecorator>
    );
  };

  const widgets = getWidgetList(projectId);

  return (
    <>
      <Box
        display="flex"
        flexDir="column"
        flex={1}
        h="full"
        bgColor="white"
        safeAreaBottom
      >
        <Box h="full">
          {widgets.length === 0 && (
            <Flex alignItems="center" justifyContent="center">
              <Heading>Add widgets above</Heading>
            </Flex>
          )}
          <DraggableFlatList
            data={widgets}
            onDragEnd={({ data }) => setBoardWidgetList(projectId, data)}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </Box>
      </Box>
      <WidgetLibrary
        isOpen={widgetLibraryIsOpen}
        onClose={widgetLibraryOnClose}
        onWidgetSelect={onWidgetAdd}
      />
    </>
  );
};

export default Board;
