import {
  ChevronRightIcon,
  Heading, Pressable,
  ScrollView, useDisclose,
  VStack
} from "native-base";
import React, { useContext } from "react";
import { DeleteModal } from "../components/DeleteModal";
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
      zIndex="10"
    >
      <Heading {...theme.heading}>{name}</Heading>

      {type === "link" && <ChevronRightIcon />}
    </Pressable>
  );
};

const SettingsPage: React.FC<SettingsProps> = ({ navigation, route }) => {
  const { settings, setDeveloperMode } = useContext(AppSettingsContext);
  const { deleteAllProjects } = useContext(ProjectContext);
  const { onOpen, isOpen, onClose } = useDisclose();

  const handleOnDeleteConfirm = () => {
    deleteAllProjects();
    onClose();
    navigation.reset({
      index: 0,
      routes: [{ key: "Root", name: "Home" }],
    });
  };

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
          onClick={() => {
            navigation.navigate("Privacy" as any);
          }}
          type="link"
        />
        <SettingsPageRowItem
          name="Delete All Data"
          onClick={() => {
            onOpen();
          }}
          type="link"
        />
        <SettingsPageRowItem
          name={`${developerModeEnabled ? "Disable" : "Enable"} Developer Mode`}
          onClick={() => {
            setDeveloperMode(!developerModeEnabled);
          }}
          type="checkbox"
        />
      </VStack>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleOnDeleteConfirm}
      />
    </ScrollView>
  );
};

export default SettingsPage;
