import { ScrollView, Text } from "native-base";
import React, { useContext } from "react";
import { Project, ProjectContext } from "../store";
import { theme } from "../utils/theme";
import { ProjectDeveloperProps } from "./DefaultNavigator";

const ProjectDeveloperPage: React.FC<ProjectDeveloperProps> = ({
  navigation,
  route,
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Projects",
    });
  }, [navigation]);

  const { projectId } = route.params;
  const { getProject, saveProject } = useContext(ProjectContext);
  const projectDetails = getProject(projectId);

  const onSave = (project: Project) => {
    saveProject(projectDetails.id, project);
  };

  return (
    <ScrollView {...theme.background} h="full" w="full">
      <Text>{JSON.stringify(projectDetails, null, 2)}</Text>
    </ScrollView>
  );
};

export default ProjectDeveloperPage;
