import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from "./components/Container/Home";

import Login from './components/Login/Login';

function App() {

  return (
      <Router>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="*"
                element={<Navigate to="/" />}
            />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
