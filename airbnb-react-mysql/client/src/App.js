import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Home from "./pages/Homepage";
import Update from "./pages/Update";
import Login from "./pages/LoginPage";
import CleanerView from "./cleaner/CleanerView";
import OwnerView from "./owner/OwnerView";
import UpdateOwner from "./owner/UpdateOwner";
import AddProperty from "./owner/AddProperty";
import UpdateProperty from "./owner/UpdateProperty";
import AddRequest from "./owner/AddRequest"
import ViewBids from "./owner/ViewBids"
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/cleanerView/:id"element={<CleanerView />} />
          <Route path="/ownerView/:id"element={<OwnerView />} />
          <Route path="/updateOwner/:id" element={<UpdateOwner />} />
          <Route path="/addProperty/:id" element={<AddProperty />} />
          <Route path ="/updateProperty/:id" element={<UpdateProperty/>}/> 
          <Route path ="/addRequest/:id" element={<AddRequest/>}/> 
          <Route path ="/viewBids/:requestId" element={<ViewBids/>}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
