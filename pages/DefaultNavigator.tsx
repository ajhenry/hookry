import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from "@react-navigation/native-stack";
import Constants from "expo-constants";
import {
  Box,
  HStack,
  Pressable,
  Switch,
  Text,
  useColorMode,
  VStack
} from "native-base";
import React from "react";
import { NotesSettingsPage } from "../components/Widgets/Notes";
import { hotPatchVersion } from "../utils/constants";
import Board from "./Board";
import BoardSettingsPage from "./BoardSettings";
import NewProject from "./NewProject";
import Projects from "./Projects";
import SettingsPage from "./Settings";

type RootStackParamList = {
  Root: undefined;
  NewProject: { projectId: string };
  Notes: { projectId: string; widgetId: string };
};

type RootDrawerParamList = {
  Home: undefined;
  Board: { projectId: string };
  Settings: undefined;
  BoardSettings: { projectId: string };
};

export type HomeProps = NativeStackScreenProps<RootDrawerParamList, "Home">;
export type BoardProps = NativeStackScreenProps<RootDrawerParamList, "Board">;
export type BoardSettingsProps = NativeStackScreenProps<
  RootDrawerParamList,
  "BoardSettings"
>;
export type SettingsProps = NativeStackScreenProps<
  RootDrawerParamList,
  "Settings"
>;

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light" ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}

const DrawerRoute = ({ label, isActive, onPress, iconName }: any) => {
  return (
    <Pressable
      px="5"
      py="3"
      rounded="md"
      bg={isActive ? "rgba(100, 100, 100, 0.1)" : "transparent"}
      onPress={(event) => {
        onPress();
      }}
    >
      <HStack space="7" alignItems="center">
        <AntDesign
          name={iconName}
          size={24}
          color={isActive ? "black" : "rgba(0, 0, 0, 0.5)"}
        />
        <Text
          fontWeight="500"
          color={isActive ? "black" : "rgba(0, 0, 0, 0.5)"}
        >
          {label}
        </Text>
      </HStack>
    </Pressable>
  );
};

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const currentRouteName = props.state.routeNames[props.state.index];

  const { projectId } = (props.state.routes[props.state.index]
    ?.params as any) ?? { projectId: undefined };
  const isBoardPage = Boolean(projectId);

  return (
    <DrawerContentScrollView {...props}>
      <VStack space="6" my="2" mx="1">
        <Box h={8} />
        <VStack space="4">
          <VStack space="3">
            <DrawerRoute
              label="Projects"
              isActive={currentRouteName === "Home"}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
              iconName="home"
            />
            <DrawerRoute
              label="Settings"
              isActive={currentRouteName === "Settings"}
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
              iconName="setting"
            />
          </VStack>
          {isBoardPage && (
            <VStack space="5">
              <Text
                fontWeight="bold"
                fontSize="md"
                px="5"
                color="gray.500"
                mt={4}
              >
                Project Options
              </Text>
              <VStack space="3">
                <DrawerRoute
                  label="Project Board"
                  isActive={currentRouteName === "Board"}
                  onPress={() => {
                    props.navigation.navigate("Board", { projectId });
                  }}
                  iconName="layout"
                />
                <DrawerRoute
                  label="Project Settings"
                  isActive={currentRouteName === "BoardSettings"}
                  onPress={() => {
                    props.navigation.navigate("BoardSettings", { projectId });
                  }}
                  iconName="setting"
                />
              </VStack>
            </VStack>
          )}
          <VStack space="3" ml={4}>
            <Text fontSize="xs" fontWeight="semibold" color="black" mt={8}>
              v{Constants.manifest?.version ?? "0.0.0"} - {hotPatchVersion}
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}

const RootDrawer = ({ navigation }: any) => {
  return (
    <Box flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={Projects}
          options={{
            headerShadowVisible: false,
            headerLeft: () => {
              return (
                <Pressable
                  ml={4}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                >
                  <Ionicons name="menu-outline" size={32} />
                </Pressable>
              );
            },
          }}
        />
        <Drawer.Screen
          name="Board"
          component={Board}
          options={{
            headerShadowVisible: false,
            headerLeft: () => {
              return (
                <Pressable
                  ml={4}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                >
                  <Ionicons name="menu-outline" size={32} />
                </Pressable>
              );
            },
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsPage}
          options={{
            headerShadowVisible: false,
            headerLeft: () => {
              return (
                <Pressable
                  ml={4}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                >
                  <Ionicons name="menu-outline" size={32} />
                </Pressable>
              );
            },
          }}
        />
        <Drawer.Screen
          name="BoardSettings"
          component={BoardSettingsPage}
          options={{
            headerShadowVisible: false,
            headerLeft: () => {
              return (
                <Pressable
                  ml={4}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                >
                  <Ionicons name="menu-outline" size={32} />
                </Pressable>
              );
            },
          }}
        />
      </Drawer.Navigator>
    </Box>
  );
};

const DefaultNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={RootDrawer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="NewProject" component={NewProject} />
      <Stack.Screen name="Notes" component={NotesSettingsPage} />
    </Stack.Navigator>
  );
};

export default DefaultNavigator;
