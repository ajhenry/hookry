import { createContext } from "react";

export interface AppSettingsContext {
  developerModeEnabled?: boolean;
}

export const initialAppSettings: AppSettingsContext = {
  developerModeEnabled: false,
};

export const AppSettingsContext = createContext<{
  settings: AppSettingsContext;
  setDeveloperMode: (val: boolean) => void;
}>({
  settings: initialAppSettings,
  setDeveloperMode: (val: boolean) => {},
});
