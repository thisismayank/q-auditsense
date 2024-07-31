import { createSelector } from "@reduxjs/toolkit";

const selectMisc = (state) => state.misc;

export const selectEditModeState = createSelector(
  [selectMisc],
  (misc) => misc.editMode
);
export const selectSaveStatus = createSelector(
  [selectMisc],
  (misc) => misc.saveStatus
);

export const selectEditModeForAuditState = createSelector(
  [selectMisc],
  (misc) => misc.editModeForAudit
);
export const selectFilesUploadedIds = createSelector(
  [selectMisc],
  (misc) => misc.filesUploadedIds
);
