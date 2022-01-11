import { createContext } from "react";

export interface AppSettings {
  developerModeEnabled?: boolean;
}

export const initialAppSettings: AppSettings = {
  developerModeEnabled: false,
};

export const AppSettingsContext = createContext<{
  settings: AppSettings;
  setDeveloperMode: (val: boolean) => void;
}>({
  settings: initialAppSettings,
  setDeveloperMode: (val: boolean) => {},
});
