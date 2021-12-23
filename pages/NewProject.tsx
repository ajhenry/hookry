import { Box, Button, Center, Heading, HStack } from "native-base";
import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";
import { TabBar } from "../components/NewProjectTabBar";
import NewProjectCounters from "./NewProjectCounters";
import NewProjectDetails from "./NewProjectDetails";
import NewProjectNotes from "./NewProjectNotes";

const NewProject = () => {
  const layout = useWindowDimensions();

  const [counters, setCounters] = useState<any>({})
  const [projectName, setProjectName] = useState<string>("");
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: "details", title: "Details" },
    { key: "counters", title: "Counters" },
    { key: "notes", title: "Notes" },
  ]);

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

  const onCountersChange = (counters:any) => {
    console.log(counters)
  }


  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "details":
        return (
          <NewProjectDetails
            onProjectNameChange={(text) => setProjectName(text)}
          />
        );
      case "counters":
        return <NewProjectCounters onCountersChange={onCountersChange}/>;

      case "notes":
        return <NewProjectNotes />;
      default:
        return null;
    }
  };

  return (
    <Box h="100%" display="flex" safeAreaBottom bgColor="rgb(255,255,255)">
      <Center>
        <Heading mb="2">Create a new Project</Heading>
      </Center>
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
          <HStack display="flex">
            <Button
              onPress={handleCountersNext}
              display="flex"
              flex="1"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              h="16"
              mx="2"
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
                Add Notes
              </Heading>
            </Button>
            <Button
              onPress={handleFinish}
              display="flex"
              flex="1"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              h="16"
              mx="2"
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
          </HStack>
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
