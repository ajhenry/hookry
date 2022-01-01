import { AntDesign } from "@expo/vector-icons";
import { useKeepAwake } from "expo-keep-awake";
import { Box, Flex, Heading, useDisclose } from "native-base";
import React, { useContext } from "react";
import { Pressable } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator
} from "react-native-draggable-flatlist";
import { WidgetLibrary } from "../components/WidgetLibrary";
import { LargeCounterWidget } from "../components/Widgets/LargeCounter";
import { NotesWidget } from "../components/Widgets/Notes";
import { SmallCounterWidget } from "../components/Widgets/SmallCounter";
import { TimerWidget } from "../components/Widgets/Timer";
import { ProjectContext, WidgetItem } from "../store";
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

  const { getWidgetList, getProject, addWidget, setBoardWidgetList } =
    useContext(ProjectContext);
  const { name } = getProject(projectId);

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
  
  
  useKeepAwake();
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
