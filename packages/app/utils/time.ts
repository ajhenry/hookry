import { Project } from "../store";

export function secondsToTime(secs: number) {
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  var obj = {
    h: hours,
    m: minutes,
    s: seconds,
  };
  return obj;
}

export const calculateTotalTime = (project: Project): string => {
  let total = 0;
  project.board.data.forEach((widget) => {
    if (widget.type === "timer") {
      total += widget.data.total;
    }
  });

  const { h, m, s } = secondsToTime(total);

  if (total === 0) {
    return "Not started";
  }

  if (h > 1) {
    return `${h}+ hours`;
  }

  if (m > 1) {
    return `${m + h * 60}+ minutes`;
  }

  return `${s + m * 60}+ seconds`;
};
