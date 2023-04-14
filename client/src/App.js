
import { 
  BrowserRouter, 
  Navigate, 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements
} from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
    )
  );
  
  const mode = use
  return (
    <div className="app">
      
    </div>
  );
}

export default App;
