import { SSRProvider } from "@react-aria/ssr";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import * as Updates from "expo-updates";
import { cloneDeep } from "lodash";
import { extendTheme, NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import DefaultNavigator from "./pages/DefaultNavigator";
import {
  initialProjectData,
  Project,
  ProjectContext,
  WidgetItem
} from "./store";

Updates.releaseChannel;

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  const [fromStorage, setFromStorage] = useState<ProjectContext | null>(null);
  const [projectData, setProjectData] = useState(initialProjectData);

  const getData = async () => {
    try {
      //await AsyncStorage.clear()
      const value = await AsyncStorage.getItem("@storage_Key");
      setFromStorage(value ? JSON.parse(value) : initialProjectData);
    } catch (e) {
      // error reading value
      console.error("There was a bad error reading data");
    }
  };

  const storeData = async (value: ProjectContext) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      // saving error
      console.error("There was a bad error reading data");
    }
  };

  // Load from storage on load
  useEffect(() => {
    getData();
  }, []);

  // Let the app know we're ready to show data
  useEffect(() => {
    if (!fromStorage) return;
    setProjectData(fromStorage);
  }, [fromStorage]);

  useEffect(() => {
    if (!projectData) return;
    storeData(projectData);
  }, [projectData]);

  const getProject = (projectId: string) => projectData[projectId];

  const getAllProjects = () =>
    Object.keys(projectData).map((projectId) => projectData[projectId]);

  function getWidgetData(projectId: string, widgetId: string) {
    return projectData[projectId].board.data.find(({ id }) => id === widgetId)!;
  }

  function removeWidget(projectId: string, widgetId: string) {
    const idToRemove = projectData[projectId].board.data.findIndex(
      ({ id }) => id === widgetId
    )!;
    const newProjectData = cloneDeep(projectData);
    newProjectData[projectId].board.data.splice(idToRemove, 1);
    setProjectData(newProjectData);
  }

  const getWidgetList = (projectId: string) => {
    return projectData[projectId].board.data ?? [];
  };

  const createProject = (data: Project) => {
    setProjectData((prev) => ({ ...prev, [data.id]: data }));
  };

  function saveWidgetData(
    projectId: string,
    widgetId: string,
    data: WidgetItem["data"]
  ) {
    const newProjectData = cloneDeep(projectData);

    newProjectData[projectId].board.data.find(
      ({ id }) => id === widgetId
    )!.data = data;

    setProjectData(newProjectData);
  }

  function addWidget(projectId: string, data: WidgetItem) {
    const newProjectData = cloneDeep(projectData);
    const updatedWidgetData = [...newProjectData[projectId].board.data, data];
    newProjectData[projectId].board.data = updatedWidgetData;
    setProjectData(newProjectData);
  }

  function setBoardWidgetList(projectId: string, data: WidgetItem[]) {
    const newProjectData = cloneDeep(projectData);
    newProjectData[projectId].board.data = data;
    setProjectData(newProjectData);
  }

  const value = {
    projectData,
    getProject,
    getWidgetList,
    getAllProjects,
    getWidgetData,
    saveWidgetData,
    createProject,
    addWidget,
    setBoardWidgetList,
    removeWidget,
  };

  return (
    <SSRProvider>
      <NavigationContainer>
        <NativeBaseProvider config={config}>
          <ProjectContext.Provider value={value}>
            <StatusBar barStyle="dark-content" />
            <DefaultNavigator />
          </ProjectContext.Provider>
        </NativeBaseProvider>
      </NavigationContainer>
    </SSRProvider>
  );
}
