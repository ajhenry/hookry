import { AntDesign } from "@expo/vector-icons";
import { Box, Button, Flex, Heading, KeyboardAvoidingView } from "native-base";
import React, { useContext, useState } from "react";
import { ProjectContext } from "../store";
import { generateRandom } from "../utils/random";
import NewProjectDetails from "./NewProjectDetails";

const NewProject = ({ navigation }: any) => {
  const [projectName, setProjectName] = useState<string>("");
  const { createProject } = useContext(ProjectContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerLeft: () => (
        <AntDesign name="left" size={24} onPress={() => navigation.goBack()} />
      ),
      title: projectName.length > 0 ? projectName : "New Project",
    });
  }, [navigation]);

  const handleDetailsNext = () => {
    const id = generateRandom();
    createProject({
      id,
      name: projectName,
      board: {
        id: generateRandom(),
        data: [],
      },
    });
    
    navigation.navigate("Root", { screen: "Board", params: { projectId: id } });
  };

  return (
    <Box h="100%" display="flex" safeAreaBottom bgColor="rgb(255,255,255)">
      <KeyboardAvoidingView flex={1}>
        <Flex flex={1}>
          <NewProjectDetails
            onProjectNameChange={(text) => setProjectName(text)}
          />
        </Flex>
        <Button
          onPress={handleDetailsNext}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          h="16"
          mx="4"
          borderRadius="2xl"
          p={4}
          isDisabled={projectName.length === 0}
          _stack={
            {
              linearGradient: {
                colors: ["rgb(0, 75, 99)", "rgb(0,107,167)"],
                start: [1, 0],
                end: [0, 0],
              },
            } as any
          }
        >
          <Heading fontSize="lg" fontWeight="bold" color="black">
            Create a New Project
          </Heading>
        </Button>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default NewProject;
