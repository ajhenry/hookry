import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  ChevronRightIcon,
  Flex,
  Heading,
  HStack,
  Pressable,
  ScrollView
} from "native-base";
import React, { useContext } from "react";
import { ProjectLogo } from "../components/ProjectLogo";
import { Project, ProjectContext } from "../store";
import { theme } from "../utils/theme";
import { calculateTotalTime } from "../utils/time";
import { HomeProps } from "./DefaultNavigator";

const ProjectItem: React.FC<HomeProps & { project: Project }> = ({
  project,
  navigation,
}) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Board", {
          projectId: project.id,
        });
      }}
      mt={4}
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
            colors: project.colors ?? ["rgb(255,215,215)"],
            start: [1, 1],
            end: [0, 0],
          },
        }}
      >
        <Box>
          <ProjectLogo
            color={project.colors?.[0] ?? "#fff"}
            projectImage={project.image}
            projectName={project.name}
            size={12}
          />
        </Box>
        <Box display="flex" flexDirection="column" ml="4" flex="1">
          <Heading fontSize="lg" fontWeight="bold" {...theme.text.heading}>
            {project.name}
          </Heading>
          <Heading fontSize="md" fontWeight="semibold" {...theme.text.heading}>
            {calculateTotalTime(project)}
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
      <Heading
        fontSize="lg"
        fontWeight="bold"
        color="black"
        {...theme.text.heading}
      >
        Create a New Project
      </Heading>
    </Button>
  );
};

const Projects: React.FC<HomeProps> = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Projects",
    });
  }, [navigation]);

  const { getAllProjects } = useContext(ProjectContext);
  const projects = getAllProjects();

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      safeAreaBottom
      {...theme.background}
    >
      <Box flex="1" flexDir="column" width="100%">
        {projects.length === 0 && (
          <HStack
            alignItems="center"
            justifyContent="center"
            h="full"
            w="full"
            flexDir="row"
          >
            <Flex w="1/2" alignItems="flex-end">
              <Heading textAlign="right" {...theme.text.heading}>
                Create a project
              </Heading>
            </Flex>
            <Flex w={4} />
            <Flex w="1/4">
              <Feather
                name="corner-right-down"
                size={48}
                {...theme.text.heading}
              />
            </Flex>
          </HStack>
        )}
        {projects.length > 0 && (
          <ScrollView mt="4">
            {projects.map((project) => (
              <ProjectItem
                project={project}
                key={project.id}
                navigation={navigation}
                route={route}
              />
            ))}
          </ScrollView>
        )}
      </Box>
      <Box flexDir="column" width="100%" mt="4">
        <CreateProjectItem />
      </Box>
    </Box>
  );
};

export default Projects;
