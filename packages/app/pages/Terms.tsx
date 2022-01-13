import { AntDesign } from "@expo/vector-icons";
import { Box, ScrollView } from "native-base";
import React from "react";
import Markdown from "react-native-markdown-display";
import { termsOfServiceCopy } from "../constants/terms";
import { theme } from "../utils/theme";

const TermsOfServicePage = ({ navigation }: any) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerLeft: () => (
        <AntDesign name="left" size={24} onPress={() => navigation.goBack()} />
      ),
      title: "Terms of Service",
    });
  }, [navigation]);

  return (
    <Box h="100%" display="flex" {...theme.background} safeAreaBottom mb="8">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        h="full"
        p="8"
        _contentContainerStyle={{
            paddingBottom: "8"
        }}
      >
        <Markdown>{termsOfServiceCopy}</Markdown>
      </ScrollView>
    </Box>
  );
};

export default TermsOfServicePage;
