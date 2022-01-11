import {
  ChevronRightIcon,
  Heading,
  Pressable,
  ScrollView,
  Text,
  VStack
} from "native-base";
import React, { useContext } from "react";
import { ProjectContext } from "../store";
import { AppSettingsContext } from "../store/settings";
import { theme } from "../utils/theme";
import { SettingsProps } from "./DefaultNavigator";

interface SettingsRowItemProps {
  name: string;
  onClick: () => void;
  type: "link" | "checkbox";
  value?: boolean;
}

const SettingsPageRowItem: React.FC<SettingsRowItemProps> = ({
  name,
  onClick,
  type,
  value,
}) => {
  return (
    <Pressable
      display="flex"
      h="16"
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      onPress={onClick}
    >
      <Heading {...theme.heading}>{name}</Heading>

      {type === "link" && <ChevronRightIcon />}
    </Pressable>
  );
};

const SettingsPage: React.FC<SettingsProps> = ({ navigation, route }) => {
  const { settings, setDeveloperMode } = useContext(AppSettingsContext);
  const { projectData } = useContext(ProjectContext);

  const { developerModeEnabled } = settings;
  return (
    <ScrollView
      {...theme.background}
      h="full"
      _contentContainerStyle={{
        w: "full",
        px: 8,
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
      }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      <VStack flex={1}>
        <SettingsPageRowItem
          name="Privacy Policy"
          onClick={() => {}}
          type="link"
        />
        <SettingsPageRowItem
          name="Terms & Service"
          onClick={() => {}}
          type="link"
        />
        <SettingsPageRowItem
          name={`${developerModeEnabled ? "Disable" : "Enable"} Developer Mode`}
          onClick={() => {
            setDeveloperMode(!developerModeEnabled);
          }}
          type="checkbox"
        />

        {developerModeEnabled && (
          <VStack mt="12">
            <Heading fontSize="lg" {...theme.heading}>
              Stats for nerds
            </Heading>
            <Text w="full">
              {JSON.stringify(
                {
                  appSettingsContext: settings,
                  projectDataContext: projectData,
                },
                null,
                2
              )}
            </Text>
          </VStack>
        )}
      </VStack>
    </ScrollView>
  );
};

export default SettingsPage;
