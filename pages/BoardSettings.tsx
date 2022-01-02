import { Flex } from "native-base";
import React from "react";
import { BoardSettingsProps } from "./DefaultNavigator";

const BoardSettingsPage: React.FC<BoardSettingsProps> = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Projects",
    });
  }, [navigation]);

  return <Flex>Board Settings Page</Flex>;
};

export default BoardSettingsPage;
