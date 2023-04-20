
import { 
  BrowserRouter, 
  Navigate, 
  Routes,
  Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements
} from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import Navbar from "scenes/navbar";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";


function App() {
  const mode = useSelector((state)=> state.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
          <Route index element={<LoginPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile/:userId" element={<ProfilePage />} />
        </Route>
    )
  );
  
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
