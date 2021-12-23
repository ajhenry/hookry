import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Box,
  Center,
  Code,
  Divider,
  extendTheme,
  Heading,
  HStack,
  Icon,
  Link,
  NativeBaseProvider,
  Pressable,
  Switch,
  Text,
  useColorMode,
  VStack
} from "native-base";
import React from "react";
import NewProject from "./pages/NewProject";
import Projects from "./pages/Projects";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function Component(props: any) {
  return (
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <Heading size="lg">Projects</Heading>
        <HStack space={2} alignItems="center">
          <Text>Edit</Text>
          <Code>App.tsx</Code>
          <Text>and save to reload.</Text>
        </HStack>
        <Link href="https://docs.nativebase.io" isExternal>
          <Text color="primary.500" underline fontSize={"xl"}>
            Learn NativeBase
          </Text>
        </Link>
        <ToggleDarkMode />
      </VStack>
    </Center>
  );
}

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

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            Mail
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            john_doe@gmail.com
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            <Pressable
              px="5"
              py="3"
              rounded="md"
              bg={"rgba(6, 182, 212, 0.1)"}
              onPress={(event) => {
                props.navigation.navigate("Home");
              }}
            >
              <HStack space="7" alignItems="center">
                <Icon
                  color={"primary.500"}
                  size="5"
                  as={<MaterialCommunityIcons name={undefined} />}
                />
                <Text fontWeight="500" color={"primary.500"}>
                  Home
                </Text>
              </HStack>
            </Pressable>
          </VStack>
          <VStack space="5">
            <Text fontWeight="500" fontSize="14" px="5" color="gray.500">
              Labels
            </Text>
            <VStack space="3">
              <Pressable px="5" py="3">
                <HStack space="7" alignItems="center">
                  <Icon
                    color="gray.500"
                    size="5"
                    as={<MaterialCommunityIcons name="bookmark" />}
                  />
                  <Text color="gray.700" fontWeight="500">
                    Family
                  </Text>
                </HStack>
              </Pressable>
              <Pressable px="5" py="2">
                <HStack space="7" alignItems="center">
                  <Icon
                    color="gray.500"
                    size="5"
                    as={<MaterialCommunityIcons name="bookmark" />}
                  />
                  <Text color="gray.700" fontWeight="500">
                    Friends
                  </Text>
                </HStack>
              </Pressable>
              <Pressable px="5" py="3">
                <HStack space="7" alignItems="center">
                  <Icon
                    color="gray.500"
                    size="5"
                    as={<MaterialCommunityIcons name="bookmark" />}
                  />
                  <Text fontWeight="500" color="gray.700">
                    Work
                  </Text>
                </HStack>
              </Pressable>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}

const RootDrawer = () => {
  return (
    <Box flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={Projects} />
        <Drawer.Screen name="Outbox" component={Component} />
        <Drawer.Screen name="Favorites" component={Component} />
        <Drawer.Screen name="Archive" component={Component} />
        <Drawer.Screen name="Trash" component={Component} />
        <Drawer.Screen name="Spam" component={Component} />
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
      <Stack.Screen name="Projects" component={Projects} />
      <Stack.Screen name="NewProject" component={NewProject} />
    </Stack.Navigator>
  );
};

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
  return (
    <NavigationContainer>
      <NativeBaseProvider config={config}>
        <DefaultNavigator />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
