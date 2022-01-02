import { newLargeCounterDefaults } from "../components/Widgets/LargeCounter";
import { newNotesDefaults } from "../components/Widgets/Notes";
import { newSmallCounterDefaults } from "../components/Widgets/SmallCounter";
import { newTimerDefaults } from "../components/Widgets/Timer";
import { WidgetItem } from "../store";

export const generateNewWidgetData = (
  type: WidgetItem["type"]
): WidgetItem["data"] | undefined => {
  switch (type) {
    case "large-counter":
      return newLargeCounterDefaults;
    case "small-counter":
      return newSmallCounterDefaults;
    case "notes":
      return newNotesDefaults;
    case "timer":
      return newTimerDefaults;
  }

  return undefined;
};

export const generateAvatarInitials = (name: string) => {
  if (!name.includes(" ")) {
    return name.charAt(0).toUpperCase();
  }

  return (
    name.charAt(0).toUpperCase() +
    name.charAt(name.indexOf(" ") + 1).toUpperCase()
  );
};
