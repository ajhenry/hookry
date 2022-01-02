import * as ImagePicker from "expo-image-picker";
import {
    Box,
    Button,
    Checkbox,
    Heading,
    Input,
    Pressable,
    TextArea,
    useToast,
    VStack
} from "native-base";
import React, { useEffect, useState } from "react";
import { Project } from "../store";
import { generateColorPalette } from "../utils/colors";
import { generateRandom } from "../utils/random";
import { theme } from "../utils/theme";
import { ProjectLogo } from "./ProjectLogo";

interface ProjectDetailsProps {
  projectDetails?: Project;
  onSave: (project: Project) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  projectDetails,
  onSave,
}) => {
  const toast = useToast();
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [projectComplete, setProjectComplete] = useState(
    projectDetails?.completed ?? false
  );
  const [projectName, setProjectName] = useState(projectDetails?.name);
  const [projectDescription, setProjectDescription] = useState(
    projectDetails?.description
  );
  const [projectColor, setProjectColor] = useState<string[]>(
    projectDetails?.colors ?? generateColorPalette()
  );

  useEffect(() => {
    setProjectImage(projectDetails?.image ?? null);
    setProjectComplete(projectDetails?.completed ?? false);
    setProjectName(projectDetails?.name ?? undefined);
    setProjectDescription(projectDetails?.description ?? undefined);
    setProjectColor(projectDetails?.colors ?? generateColorPalette());
  }, [projectDetails]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProjectImage(result.uri);
    }
  };

  const showToast = () => {
    toast.show({
      title: "Project Updated",
      status: "success",
      description: "Your project has been successfully updated!",
      placement: "top",
    });
  };

  const handleSave = () => {
    if (!projectDetails) {
      const newProject: Project = {
        name: projectName!,
        description: projectDescription,
        colors: projectColor,
        image: projectImage,
        completed: projectComplete,
        id: generateRandom(),
        board: {
          id: generateRandom(),
          data: [],
        },
      };

      onSave(newProject);
      return;
    }

    onSave({
      ...projectDetails,
      name: projectName!,
      description: projectDescription,
      colors: projectColor,
      image: projectImage,
      completed: projectComplete,
    });
    showToast();
  };

  console.log(projectImage);

  return (
    <VStack display="flex" h="full" safeAreaBottom>
      <Box flex={1} display="flex">
        <Pressable
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={8}
          onPress={pickImage}
        >
          <ProjectLogo
            projectImage={projectImage}
            projectName={projectName}
            color={projectColor[0]}
          />
        </Pressable>
        <Box marginX={6} mt={4}>
          <Heading fontSize="md" mb={2}>
            Project Name
          </Heading>
          <Box {...theme.input} borderRadius="2xl" paddingX={2}>
            <Input
              borderColor="transparent"
              bgColor="transparent"
              borderWidth={0}
              fontSize="lg"
              h={10}
              onChangeText={(text) => setProjectName(text)}
              value={projectName}
              autoCorrect={false}
            />
          </Box>
          <Box mt={4}>
            <Heading fontSize="md" mb={2}>
              Project Description (optional)
            </Heading>
            <Box {...theme.input} borderRadius="2xl" paddingX={2}>
              <TextArea
                borderColor="transparent"
                bgColor="transparent"
                borderWidth={0}
                fontSize="lg"
                multiline
                numberOfLines={2}
                onChangeText={(text) => setProjectDescription(text)}
                value={projectDescription}
                autoCorrect={false}
              />
            </Box>
          </Box>
          {projectDetails && (
            <Box mt={4}>
              <Checkbox
                colorScheme="blue"
                value=""
                isChecked={projectComplete}
                onChange={setProjectComplete}
              >
                Project Complete
              </Checkbox>
            </Box>
          )}
        </Box>
      </Box>
      <Box>
        <Button
          onPress={handleSave}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          h="16"
          mx="4"
          borderRadius="2xl"
          p={4}
          isDisabled={!projectName || projectName?.length === 0}
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
            {projectDetails ? "Save Project" : "Create Project"}
          </Heading>
        </Button>
      </Box>
    </VStack>
  );
};

export default ProjectDetails;
