import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  ChevronRightIcon,
  Heading,
  Pressable,
  ScrollView
} from "native-base";
import React, { useContext } from "react";
import { ProjectLogo } from "../components/ProjectLogo";
import { Project, ProjectContext } from "../store";
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
          <Heading fontSize="lg" fontWeight="bold" color="black">
            {project.name}
          </Heading>
          <Heading fontSize="md" fontWeight="semibold">
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
      <Heading fontSize="lg" fontWeight="bold" color="black">
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
        <ScrollView mt="4">
          {getAllProjects().map((project) => (
            <ProjectItem
              project={project}
              key={project.id}
              navigation={navigation}
              route={route}
            />
          ))}
        </ScrollView>
      </Box>
      <Box flexDir="column" width="100%" mt="4">
        <CreateProjectItem />
      </Box>
    </Box>
  );
};

export default Projects;
