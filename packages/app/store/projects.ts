import { createContext } from "react";

export interface LargeCounter extends BaseWidgetItem {
  type: "large-counter";
  data: {
    count: number;
    label: string;
    id: string;
    colors: string[];
  };
}

export interface SmallCounter extends BaseWidgetItem {
  type: "small-counter";
  data: {
    left: { count: number; label: string; id: string; colors: string[] };
    right: { count: number; label: string; id: string; colors: string[] };
  };
}

export interface Timer extends BaseWidgetItem {
  type: "timer";
  data: { total: number };
}

export interface Heading extends BaseWidgetItem {
  type: "heading";
  data: { label: string };
}

export interface Notes extends BaseWidgetItem {
  type: "notes";
  data: { notes: string; title: string | undefined };
}

interface BaseWidgetItem {
  id: string;
}

export type WidgetItem = LargeCounter | SmallCounter | Timer | Heading | Notes;

export interface Board {
  id: string;
  data: WidgetItem[];
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  board: Board;
  completed?: boolean;
  image?: string | null;
  colors?: string[];
}

export interface ProjectContext {
  [projectId: string]: Project;
}

export const initialProjectData: ProjectContext = {};

export interface ProjectContextMethods {
  projectData: ProjectContext;
  getProject: (projectId: string) => Project;
  getAllProjects: () => Project[];
  getWidgetList: (projectId: string) => WidgetItem[];
  getWidgetData: (projectId: string, widgetId: string) => WidgetItem;
  saveWidgetData: (
    projectId: string,
    widgetId: string,
    data: WidgetItem["data"]
  ) => void;
  createProject: (data: Project) => void;
  addWidget: (projectId: string, data: WidgetItem) => void;
  setBoardWidgetList: (projectId: string, data: WidgetItem[]) => void;
  removeWidget: (projectId: string, widgetId: string) => void;
  saveProject: (projectId: string, data: Project) => void;
  deleteAllProjects: () => void;
  uploadProjectData: (project: ProjectContext) => void;
}

export const ProjectContext = createContext<ProjectContextMethods>(
  {} as ProjectContextMethods
);
