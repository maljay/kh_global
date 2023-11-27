import { Route, Routes } from "react-router-dom";
import { Login, Signup, Home } from "./pages";

import { useState } from "react";
import UserContext from './UserContext';

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;