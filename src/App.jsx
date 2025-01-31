import React from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./pages/Loading";
import Navigation from "./pages/Navigation";
import Cams from "./pages/Cams";
import Science from "./pages/Science";
import Results from "./pages/Results";
import Rocks from "./pages/Rocks";
import Arm from "./pages/Arm";
import Controller from "./pages/Controller";
import Logs from "./pages/Logs";
import Pictures from "./pages/Pictures";
import System from "./pages/System";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Loading />} />
            <Route path="/Navigation" element={<Navigation />} />
            <Route path="/Cams" element={<Cams />} />
            <Route path="/Science" element={<Science />} />
            <Route path="/Results" element={<Results />} />
            <Route path="/Rocks" element={<Rocks />} />
            <Route path="/Arm" element={<Arm />} />
            <Route path="/Controller" element={<Controller />} />
            <Route path="/Logs" element={<Logs />} />
            <Route path="/Pictures" element={<Pictures />} />
            <Route path="/System" element={<System />} />
        </Routes>
    );
};

export default App;
