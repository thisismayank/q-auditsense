// const BASE_URL =
//   process.env.BASE_URL || "https://s-auditsense-et6rmlvh6q-uc.a.run.app";
// const LOCAL = `${BASE_URL}/v1`;
const LOCAL = `http://localhost:3000/v1`;

export const USER = {
  LOGIN: `${LOCAL}/users/login`,
};

export const SUPPLIERS = {
  LIST: `${LOCAL}/suppliers/organisations/<ORGANISATION_ID>`,
  SEARCH: `${LOCAL}/suppliers/organisations/<ORGANISATION_ID>/search`,
  GET_BY_ID: `${LOCAL}/suppliers/organisations/<ORGANISATION_ID>/suppliers/<SUPPLIER_ID>`,
  UPDATE_BY_ID: `${LOCAL}/suppliers/organisations/<ORGANISATION_ID>/suppliers/<SUPPLIER_ID>`,
};

export const FACTORIES = {
  LIST: `${LOCAL}/factories/organisations/<ORGANISATION_ID>/suppliers/<SUPPLIER_ID>`,
  SEARCH: `${LOCAL}/factories/organisations/<ORGANISATION_ID>/search`,
  GET_LIST_BY_ORGANISATION_ID: `${LOCAL}/factories/organisations/<ORGANISATION_ID>`,
  GET_BY_ID: `${LOCAL}/factories/organisations/<ORGANISATION_ID>/suppliers/<SUPPLIER_ID>/factories/<FACTORY_ID>`,
  UPDATE_BY_ID: `${LOCAL}/factories/organisations/<ORGANISATION_ID>/suppliers/<SUPPLIER_ID>/factories/<FACTORY_ID>`,
};
export const AUDITS = {
  LIST: `${LOCAL}/audits/organisations/<ORGANISATION_ID>/suppliers/<SUPPLIER_ID>`,
  GET_BY_ID: `${LOCAL}/audits/organisations/<ORGANISATION_ID>/suppliers/<SUPPLIER_ID>/factories/<FACTORY_ID>/audits/<AUDIT_ID>`,
  UPDATE_BY_ID: `${LOCAL}/audits/organisations/<ORGANISATION_ID>/suppliers/<SUPPLIER_ID>/factories/<FACTORY_ID>/audits/<AUDIT_ID>`,
  UPLOAD_REPORT: `${LOCAL}/audits/organisations/<ORGANISATION_ID>/suppliers/<SUPPLIER_ID>/factories/<FACTORY_ID>/audits/<AUDIT_ID>/report`,
};

export const ORGANISATIONS = {
  GET_RISK_CHART_DATA: `${LOCAL}/organisations/<ORGANISATION_ID>/chart`,
};
