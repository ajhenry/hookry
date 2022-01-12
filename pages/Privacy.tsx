import { AntDesign } from "@expo/vector-icons";
import { Box, ScrollView } from "native-base";
import React from "react";
import Markdown from "react-native-markdown-display";
import { privacyPolicyCopy } from "../constants/privacy";
import { theme } from "../utils/theme";

const PrivacyPolicyPage = ({ navigation }: any) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerLeft: () => (
        <AntDesign name="left" size={24} onPress={() => navigation.goBack()} />
      ),
      title: "Privacy Policy",
    });
  }, [navigation]);

  return (
    <Box h="100%" display="flex" {...theme.background} safeAreaBottom mb="8">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        h="full"
        p="8"
        _contentContainerStyle={{
          paddingBottom: "8",
        }}
      >
        <Markdown>{privacyPolicyCopy}</Markdown>
      </ScrollView>
    </Box>
  );
};

export default PrivacyPolicyPage;
