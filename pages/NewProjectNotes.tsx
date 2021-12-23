import { AntDesign } from "@expo/vector-icons";
import { Box, Heading } from "native-base";
import React from "react";
import WidgetContainer from "../components/Widget";
import { Counter } from "../components/Widgets/Counter";

interface NewProjectNotesProps {}

const widgetStyle = {};

const NewProjectNotes: React.FC<NewProjectNotesProps> = () => {
  return (
    <Box display="flex" h="full" w="full" flexDir="row" flexWrap="wrap">
      <WidgetContainer size={1}>
        <Counter count={10} label="Test Row" size="large" />
      </WidgetContainer>
      <WidgetContainer size={2}>
        <Counter count={10} label="Test Row" size="small" />
      </WidgetContainer>
      <WidgetContainer size={1}>
        <Box
          w="full"
          h="16"
          display="flex"
          flexDir="row"
          justifyContent="center"
          alignItems="center"
        >
          <Heading mr={2}>Add Widget</Heading>
          <AntDesign name="plus" size={36} />
        </Box>
      </WidgetContainer>
    </Box>
  );
};

export default NewProjectNotes;
