import { AntDesign } from "@expo/vector-icons";
import { Box, Button, Heading, useDisclose } from "native-base";
import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";
import { TabBar } from "../components/NewProjectTabBar";
import NewProjectCounters from "./NewProjectBoard";
import NewProjectDetails from "./NewProjectDetails";
import NewProjectNotes from "./NewProjectNotes";

const NewProject = ({ navigation }: any) => {
  const layout = useWindowDimensions();

  const {
    isOpen: widgetLibraryIsOpen,
    onOpen: widgetLibraryOpen,
    onClose: widgetLibraryClose,
  } = useDisclose();
  const [counters, setCounters] = useState<any>({});
  const [projectName, setProjectName] = useState<string>("");
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: "details", title: "Details" },
    { key: "counters", title: "Counters" },
    { key: "notes", title: "Notes" },
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerLeft: () => (
        <AntDesign name="left" size={24} onPress={() => navigation.goBack()} />
      ),
      title: projectName.length > 0 ? projectName : "New Project",
      headerRight: () =>
        index > 0 ? (
          <AntDesign name="plus" size={24} onPress={widgetLibraryOpen} />
        ) : undefined,
    });
  }, [navigation, index]);

  const handleDetailsNext = () => {
    setIndex(1);
  };

  const handleCountersNext = () => {
    setIndex(2);
  };

  const handleFinish = () => {
    setIndex(0);
  };

  const handleOnTabPress = ({ route, preventDefault }: any) => {
    const toIndex = routes.findIndex((r) => r.key === route.key);

    if (toIndex > index) {
      preventDefault();
    }
  };

  const onCountersChange = (counters: any) => {
    console.log(counters);
  };

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "details":
        return (
          <NewProjectDetails
            onProjectNameChange={(text) => setProjectName(text)}
          />
        );
      case "counters":
        return (
          <NewProjectCounters
            onCountersChange={onCountersChange}
            widgetLibraryIsOpen={widgetLibraryIsOpen}
            widgetLibraryOpen={widgetLibraryOpen}
            widgetLibraryClose={widgetLibraryClose}
          />
        );

      case "notes":
        return <NewProjectNotes />;
      default:
        return null;
    }
  };

  return (
    <Box h="100%" display="flex" safeAreaBottom bgColor="rgb(255,255,255)">
      <Box flex="1">
        <TabView
          renderTabBar={(props) => (
            <TabBar {...props} onTabPress={handleOnTabPress} />
          )}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </Box>
      <Box>
        {index === 0 && (
          <Button
            onPress={handleDetailsNext}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            h="16"
            mx="4"
            borderRadius="2xl"
            p={4}
            isDisabled={projectName.length === 0}
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
        )}
        {index === 1 && (
          <Button
            onPress={handleFinish}
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
              Finish
            </Heading>
          </Button>
        )}
        {index === 2 && (
          <Button
            onPress={handleFinish}
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
              Finish
            </Heading>
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default NewProject;
