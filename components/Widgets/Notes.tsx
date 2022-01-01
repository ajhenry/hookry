import {
  Box,
  Flex,
  Heading,
  Input,
  KeyboardAvoidingView,
  Pressable,
  ScrollView
} from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, Platform } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import RenderHtml from "react-native-render-html";
import { useDelete } from "../../hooks/useDelete";
import { Notes, ProjectContext, WidgetItem } from "../../store";
import { generateRandom } from "../../utils/random";
import WidgetContainer from "../Widget";
import { WidgetLibraryBase } from "../WidgetLibrary";

interface NotesProps {
  title?: string;
  notes: string;
}

interface NotesWidgetProps {
  widgetId: string;
  projectId: string;
  disablePresses?: string;
  defaultData?: WidgetItem["data"];
  navigation: any;
  route?: any;
}

export const notesLibraryDefaults = {
  notes: "These are just some Notes",
  title: "Just a title",
};

export const newNotesDefaults = {
  notes: "",
  title: undefined,
  id: generateRandom(),
};

export const NotesSettingsPage: React.FC<
  NotesWidgetProps & { isOpen: boolean; onClose: () => void }
> = ({ route }) => {
  const { saveWidgetData, getWidgetData } = useContext(ProjectContext);
  const { projectId, widgetId } = route.params;
  const { data } = getWidgetData(projectId, widgetId);
  const { title, notes } = data;
  const [modifiedTitle, setModifiedTitle] = useState(title);
  const [modifiedNotes, setModifiedNotes] = useState(notes);
  let richText = useRef(null);
  let scrollRef = useRef(null);

  const saveData = () => {
    saveWidgetData(projectId, widgetId, {
      ...data,
      notes: modifiedNotes,
      title: modifiedTitle,
    });
  };

  useEffect(() => {
    saveData();
  }, [modifiedNotes, modifiedTitle]);

  const handleCursor = (scrollY: number) => {
    const ref = scrollRef.current as any;
    ref.scrollTo({ y: scrollY - 30, duration: 100, animated: true });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        height: "100%",
      }}
    >
      <Flex w="full" h="full" flexDir="row" bgColor="white" safeAreaBottom>
        <Flex bgColor="rgb(240,240,240)" px="4" pt="4">
          <Input
            fontSize="2xl"
            borderColor="transparent"
            _focus={{
              borderColor: "transparent",
            }}
            placeholder="Title your work"
            value={modifiedTitle}
            onChangeText={setModifiedTitle}
          />
        </Flex>
        <Flex w="full">
          <RichToolbar editor={richText} />
        </Flex>
        <ScrollView flex={1} ref={scrollRef} mb={12}>
          <RichEditor
            ref={richText}
            style={{
              display: "flex",
              flex: 1,
            }}
            onChange={setModifiedNotes}
            initialContentHTML={notes}
            useContainer
            onCursorPosition={handleCursor}
            placeholder="Write to your heart's content"
          />
        </ScrollView>
      </Flex>
    </KeyboardAvoidingView>
  );
};

export const NotesWidget: React.FC<
  NotesWidgetProps & Omit<RenderItemParams<WidgetItem>, "item">
> = ({ widgetId, projectId, drag, isActive, navigation }) => {
  const [showDelete, onDelete] = useDelete();
  const { getWidgetData, saveWidgetData, removeWidget } =
    useContext(ProjectContext);
  const { data } = getWidgetData(projectId, widgetId);
  const { notes, title } = data;

  const handlePress = () => {
    navigation.navigate("Notes", {
      projectId,
      widgetId,
    });
  };

  const handleLongPress = () => {
    onDelete();
    drag();
  };

  const onPressDelete = () => {
    removeWidget(projectId, widgetId);
  };

  return (
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
        notes={notes}
        title={title}
        onLongPress={handleLongPress}
        onPress={handlePress}
      />
    </WidgetContainer>
  );
};

export const NotesLibraryItem = ({
  notes,
  title,
  onPress,
}: Notes["data"] & WidgetLibraryBase) => {
  const { width } = Dimensions.get("window");
  const noop = () => onPress();

  return (
    <Box
      display="flex"
      flexDir="column"
      w={width - 16}
      m={2}
      borderRadius="2xl"
      overflow="hidden"
    >
      <Widget notes={notes} title={title} onLongPress={noop} onPress={noop} />
    </Box>
  );
};

interface WidgetProps {
  onLongPress: () => void;
  onPress: () => void;
}

const Widget: React.FC<Notes["data"] & WidgetProps> = ({
  notes,
  title,
  onLongPress,
  onPress,
}) => {
  const { width } = Dimensions.get("window");

  const source = {
    html: notes.length !== 0 ? notes : "<div>This note is blank 😞</div>",
  };

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress}>
      <Box p={2}>
        <Heading>{title}</Heading>
        <RenderHtml contentWidth={width} source={source} />
      </Box>
    </Pressable>
  );
};
