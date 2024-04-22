import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Comment from "./pages/Comment";
import Home from "./pages/Home";
import ProtectedRoutes from "./pages/ProtectedRoutes";

export function App() {


  return (

    <div className=" font-syne overflow-hidden">
      <Routes>
        <Route path="/" element={<ProtectedRoutes><Home></Home></ProtectedRoutes>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/comment/:id" element={<Comment></Comment>}></Route>
      </Routes>
    </div>


  );
}

export default App;
