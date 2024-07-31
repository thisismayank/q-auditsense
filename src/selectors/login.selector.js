import { createSelector } from "@reduxjs/toolkit";

const selectLogin = (state) => state.login;

export const selectEmail = createSelector(
  [selectLogin],
  (login) => login.email
);

export const selectLoggedIn = createSelector(
  [selectLogin],
  (login) => login.loggedIn
);

export const selectUserInfo = createSelector([selectLogin], (login) => {
  const firstName = login.userInfo.firstName;
  const lastName = login.userInfo.lastName;
  let fullName = `${firstName} ${lastName}`.trim();
  if (fullName.length > 12) {
    let initials = firstName
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join(" ");

    // Combine initials with the last name
    fullName = `${initials} ${lastName}`;

    // Check if the full name is still longer than 12 characters
    if (fullName.length > 12) {
      // If still too long, use only the first initial of the first name, capitalized, and the last name
      fullName = `${firstName[0].toUpperCase()}. ${lastName[0].toUpperCase()}${lastName.slice(
        1
      )}`;
    }
  }

  return {
    name: fullName,
    email: login.email,
  };
});

export const selectAuthToken = createSelector([selectLogin], (login) => {
  return `Bearer ${login.userInfo.userId},${login.userInfo.token}`;
});

export const selectOrganisationId = createSelector(
  [selectLogin],
  (login) => login.userInfo.organisationId
);
