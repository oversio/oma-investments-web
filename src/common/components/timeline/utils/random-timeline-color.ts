const timelineColors = ["default", "warning", "success", "primary", "secondary", "danger"];
export function randomTimelineColor() {
  return timelineColors[Math.floor(Math.random() * timelineColors.length)];
}
