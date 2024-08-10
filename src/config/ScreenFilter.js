export let SCREENS = {};

export const updateScreens = (permissions) => {
  localStorage.setItem("screens", JSON.stringify(permissions));
};
