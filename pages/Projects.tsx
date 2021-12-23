import { useNavigation } from "@react-navigation/native";
import { Box, Button, ChevronRightIcon, Heading, Stack } from "native-base";
import React from "react";
import { Pressable } from "react-native";

interface ProjectsProps {}

const ProjectItem = ({ name }: { name: string }) => {
  const router = useNavigation();
  return (
    <Pressable
      onPress={() => {
        router.navigate("NewProject" as any);
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

const Projects: React.FC<ProjectsProps> = () => {
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
      <Heading fontSize="4xl" mt="4" fontWeight="bold" color="black">
        Projects
      </Heading>
      <Box flex="1" flexDir="column" width="100%">
        <Stack space="4" mt="4">
          <ProjectItem name="My First Project" />
          <ProjectItem name="My First Project" />
        </Stack>
      </Box>
      <Box flexDir="column" width="100%">
        <CreateProjectItem />
      </Box>
    </Box>
  );
};

export default Projects;
