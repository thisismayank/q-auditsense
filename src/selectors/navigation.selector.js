import { createSelector } from "@reduxjs/toolkit";

const selectNavigation = (state) => state.navigation;

export const selectLeftSideNavigationSelected = createSelector(
  [selectNavigation],
  (navigation) => navigation.leftSideNavigationBarSelected
);
