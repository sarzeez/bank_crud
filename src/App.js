import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from "./components/Container/Home";

import Login from './components/Login/Login';

function App() {

  const [user, setUser] = useState(true)

  return (
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route
                path="*"
                element={<Navigate to="/" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
