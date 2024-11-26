import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Home from "./pages/Homepage";
import Update from "./pages/Update";
import Login from "./pages/LoginPage";
import CleanerView from "./pages/CleanerView";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/cleanerview/:id"element={<CleanerView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
