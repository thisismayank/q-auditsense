import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";

import Login from "./components/login.component";
import IndexPage from "./pages/index.page";
import theme from "./utils/theme";
import { selectLoggedIn } from "./selectors/login.selector";
import { loginSuccess } from "./reducers/login.reducer";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectLoggedIn);

  useEffect(() => {
    const storedState = localStorage.getItem("loginState");
    if (storedState) {
      const state = JSON.parse(storedState);
      if (state && state._id && state.token) {
        dispatch(loginSuccess(state));
      }
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <Routes>
            <Route path="*" element={<IndexPage />} />
          </Routes>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
