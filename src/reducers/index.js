import loginReducer from "./login.reducer";
import supplierReducer from "./supplier.reducer";
import factoryReducer from "./factory.reducer";
import navigationReducer from "./navigation.reducer";
import auditReducer from "./audit.reducer";
import miscReducer from "./misc.reducer";
import riskReducer from "./risk.reducer";

const rootReducer = {
  login: loginReducer,
  supplier: supplierReducer,
  factory: factoryReducer,
  navigation: navigationReducer,
  audit: auditReducer,
  misc: miscReducer,
  risk: riskReducer,
};

export default rootReducer;
