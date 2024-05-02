import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Tv from "./pages/Tv";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="min-h-screen w-full max-w-[1920px] flex bg-main-dark text-white flex-col md:flex-row md:mx-auto">
      <header className="md:h-[100svh] md:fixed">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
