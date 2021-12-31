import { useNavigation } from "@react-navigation/native";
import { Box, Button, ChevronRightIcon, Heading, Stack } from "native-base";
import React, { useContext } from "react";
import { Pressable } from "react-native";
import { ProjectContext } from "../store";

interface ProjectsProps {}

const ProjectItem = ({
  name,
  projectId,
  navigation,
}: {
  name: string;
  projectId: string;
  navigation: any;
}) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Board", {
          projectId,
        });
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        mx="4"
        borderRadius="3xl"
        p={4}
        bg={{
          linearGradient: {
            colors: ["rgb(255,215,215)", "rgb(254,175,145)"],
            start: [1, 1],
            end: [0, 0],
          },
        }}
      >
        <Box bg="black" borderRadius="full" w="12" h="12" />
        <Box display="flex" flexDirection="column" ml="4" flex="1">
          <Heading fontSize="lg" fontWeight="bold" color="black">
            {name}
          </Heading>
          <Heading fontSize="md" fontWeight="semibold">
            230+ hours
          </Heading>
        </Box>
        <Box>
          <ChevronRightIcon />
        </Box>
      </Box>
    </Pressable>
  );
};

const CreateProjectItem = () => {
  const router = useNavigation();

  return (
    <Button
      onPress={() => {
        router.navigate("NewProject" as any);
      }}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      h="16"
      mx="4"
      borderRadius="2xl"
      p={4}
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
  );
};

const Projects: React.FC<ProjectsProps> = ({ navigation }: any) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      title: "Projects",
    });
  }, [navigation]);

  const { getAllProjects } = useContext(ProjectContext);

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      bgColor="rgb(255,255,255)"
      safeAreaBottom
    >
      <Box flex="1" flexDir="column" width="100%">
        <Stack space="4" mt="4">
          {getAllProjects().map((project) => (
            <ProjectItem
              name={project.name}
              key={project.id}
              projectId={project.id}
              navigation={navigation}
            />
          ))}
        </Stack>
      </Box>
      <Box flexDir="column" width="100%">
        <CreateProjectItem />
      </Box>
    </Box>
  );
};

export default Projects;
