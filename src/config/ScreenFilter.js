export let SCREENS = {};

export const updateScreens = (permissions) => {
  sessionStorage.setItem("screens", JSON.stringify(permissions));
};
