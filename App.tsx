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
import { AppSettingsContext, initialAppSettings } from "./store/settings";

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
  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState(initialProjectData);
  const [appSettings, setAppSettings] = useState(initialAppSettings);

  const getData = async () => {
    try {
      //await AsyncStorage.clear()

      // Read project data from storage
      const storageProjectData = await AsyncStorage.getItem("@storage_Key");
      setProjectData(
        storageProjectData ? JSON.parse(storageProjectData) : initialProjectData
      );

      // Read project settings from storage
      const storageAppSettings = await AsyncStorage.getItem(
        "@hookry_app_settings"
      );
      setAppSettings(
        storageAppSettings ? JSON.parse(storageAppSettings) : initialAppSettings
      );

      setLoading(false);
    } catch (e) {
      // error reading value
      console.error("There was a bad error reading data");
    }
  };

  const storeData = async ({
    projectContext,
    appSettingsContext,
  }: {
    projectContext?: ProjectContext;
    appSettingsContext?: AppSettingsContext;
  }) => {
    try {
      if (projectContext) {
        const stringProjectContext = JSON.stringify(projectContext);
        await AsyncStorage.setItem("@storage_Key", stringProjectContext);
      }

      if (appSettingsContext) {
        const stringAppSettingsContext = JSON.stringify(appSettingsContext);
        await AsyncStorage.setItem(
          "@hookry_app_settings",
          stringAppSettingsContext
        );
        const appSettingsValue = await AsyncStorage.getItem(
          "@hookry_app_settings"
        );
      }
    } catch (e) {
      // saving error
      console.error("There was a bad error reading data");
    }
  };

  // Load from storage on load
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (loading || !projectData) return;
    storeData({ projectContext: projectData });
  }, [projectData]);

  useEffect(() => {
    if (loading || !appSettings) return;
    storeData({ appSettingsContext: appSettings });
  }, [appSettings]);

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

  function saveProject(projectId: string, data: Project) {
    const newProjectData = cloneDeep(projectData);
    newProjectData[projectId] = data;
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
    saveProject,
  };

  function setDeveloperMode(mode: boolean) {
    const newSettings = {
      ...cloneDeep(appSettings),
      developerModeEnabled: mode,
    };
    setAppSettings(newSettings);
  }

  const appSettingsContext = {
    settings: appSettings,
    setDeveloperMode,
  };

  return (
    <SSRProvider>
      <NavigationContainer>
        <NativeBaseProvider config={config}>
          <AppSettingsContext.Provider value={appSettingsContext}>
            <ProjectContext.Provider value={value}>
              <StatusBar barStyle="dark-content" />
              <DefaultNavigator />
            </ProjectContext.Provider>
          </AppSettingsContext.Provider>
        </NativeBaseProvider>
      </NavigationContainer>
    </SSRProvider>
  );
}
