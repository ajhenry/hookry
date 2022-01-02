import { Flex } from "native-base";
import React, { useContext } from "react";
import ProjectDetails from "../components/ProjectDetails";
import { Project, ProjectContext } from "../store";
import { theme } from "../utils/theme";
import { BoardSettingsProps } from "./DefaultNavigator";

const BoardSettingsPage: React.FC<BoardSettingsProps> = ({
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
    <Flex {...theme.background} h="full">
      <ProjectDetails projectDetails={projectDetails} onSave={onSave} />
    </Flex>
  );
};

export default BoardSettingsPage;
