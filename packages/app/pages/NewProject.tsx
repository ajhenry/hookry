import { AntDesign } from "@expo/vector-icons";
import { Box } from "native-base";
import React, { useContext, useState } from "react";
import ProjectDetails from "../components/ProjectDetails";
import { Project, ProjectContext } from "../store";
import { theme } from "../utils/theme";

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

  const handleSave = (project: Project) => {
    createProject(project);

    navigation.navigate("Root", { screen: "Board", params: { projectId: project.id } });
  };

  return (
    <Box h="100%" display="flex" {...theme.background}>
      <ProjectDetails onSave={handleSave} />
    </Box>
  );
};

export default NewProject;
