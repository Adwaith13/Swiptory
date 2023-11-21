import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Bookmark from "./pages/Bookmark";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="bookmark" element={<Bookmark />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
