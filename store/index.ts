import { createContext } from "react";

export interface LargeCounter {
  type: "large-counter";
  data: {
    count: number;
    label: string;
    id: string;
    colors: string[];
  };
}

export interface SmallCounter {
  type: "small-counter";
  data: {
    left: { count: number; label: string; id: string; colors: string[] };
    right: { count: number; label: string; id: string; colors: string[] };
  };
}

export interface Timer {
  type: "timer";
  data: { total: number };
}

export interface Heading {
  type: "heading";
  data: { label: string };
}

export interface Notes {
  type: "notes";
  data: { notes: string; title: string };
}

interface BaseWidgetItem {
  id: string;
  type:
    | "timer"
    | "large-counter"
    | "small-counter"
    | "notes"
    | "heading"
    | "add-widget"
    | "heading";
  data?: any;
}

export type WidgetItem = BaseWidgetItem &
  (LargeCounter | SmallCounter | Timer | Heading | Notes);

export interface Board {
  id: string;
  data: WidgetItem[];
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  board: Board;
}

export interface ProjectContext {
  [projectId: string]: Project;
}

export const initialData = [];

export const initialProjectData: ProjectContext = {};

export const ProjectContext = createContext<{
  projectData: ProjectContext;
  getProject: (projectId: string) => Project;
  getAllProjects: () => Project[];
  getWidgetList: (projectId: string) => WidgetItem[];
  getWidgetData: (projectId: string, widgetId: string) => WidgetItem;
  saveWidgetData: (
    projectId: string,
    widgetId: string,
    data: WidgetItem
  ) => void;
  createProject: (data: Project) => void;
  addWidget: (projectId: string, data: WidgetItem) => void;
  setBoardWidgetList: (projectId: string, data: WidgetItem[]) => void;
  removeWidget: (projectId: string, widgetId: string) => void;
}>({
  projectData: initialProjectData,
  getProject: (projectId: string) => ({} as Project),
  getAllProjects: () => [],
  getWidgetList: (projectId: string) => [],
  getWidgetData: (projectId: string, widgetId: string) => ({} as WidgetItem),
  saveWidgetData: (projectId: string, widgetId: string, data: WidgetItem) => {},
  createProject: (data: Project) => {},
  addWidget: (projectId: string, data: WidgetItem) => {},
  setBoardWidgetList: (projectId: string, data: WidgetItem[]) => {},
  removeWidget: (projectId: string, widgetId: string) => ({}),
});

export const BoardContext = createContext<{
  data: WidgetItem[];
  setData: React.Dispatch<React.SetStateAction<WidgetItem[]>>;
}>({
  data: initialData,
  setData: () => {},
});
