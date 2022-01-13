import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import {
    Box,
    Heading,
    HStack,
    Input,
    Pressable,
    ScrollView,
    Text,
    VStack
} from "native-base";
import React, { useContext, useState } from "react";
import { ProjectContext } from "../store";
import { AppSettingsContext } from "../store/settings";
import { theme } from "../utils/theme";

const DeveloperPage = ({ navigation }: any) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      title: "Developer Settings",
    });
  }, [navigation]);

  const { settings } = useContext(AppSettingsContext);
  const { projectData, uploadProjectData } = useContext(ProjectContext);

  const [projectContext, setProjectContext] = useState<string | null>(null);

  const contextState = JSON.stringify(
    {
      appSettingsContext: settings,
      projectDataContext: projectData,
    },
    null,
    2
  );

  const copyToClipboard = () => {
    Clipboard.setString(contextState);
  };

  const handleClose = () => {
    setProjectContext(null);
  };

  const handleAccept = () => {
    const data = JSON.parse(projectContext ?? "null") as {
      projectDataContext: ProjectContext;
    };

    uploadProjectData(data.projectDataContext);
    setProjectContext(null);
  };

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
        <VStack>
          <Box>
            <Heading fontSize="lg" {...theme.heading}>
              Overwrite Context Data
            </Heading>

            <HStack display="flex" justifyContent="center" alignItems="center">
              {projectContext && (
                <Box mr="4">
                  <Ionicons
                    name="close-circle-outline"
                    onPress={handleClose}
                    size={36}
                  />
                </Box>
              )}
              <Box
                {...theme.input}
                borderRadius="2xl"
                paddingX={2}
                mt="2"
                flex={1}
              >
                <Input
                  borderColor="transparent"
                  bgColor="transparent"
                  borderWidth={0}
                  fontSize="lg"
                  h={10}
                  onChangeText={(text) => setProjectContext(text)}
                  value={projectContext ?? ""}
                  autoCorrect={false}
                />
              </Box>
              {projectContext && (
                <Box ml="4">
                  <Ionicons
                    name="checkmark-circle-outline"
                    onPress={handleAccept}
                    size={36}
                  />
                </Box>
              )}
            </HStack>
          </Box>

          <Box mt="4">
            <Heading fontSize="lg" {...theme.heading}>
              Full Context (click to copy)
            </Heading>
            <Pressable onPress={copyToClipboard}>
              <Text w="full">{contextState}</Text>
            </Pressable>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default DeveloperPage;
