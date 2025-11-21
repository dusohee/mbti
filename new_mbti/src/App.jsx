import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Town from "./pages/Town";
import TeamMbti from "./pages/TeamMbti";
import EvsI from "./pages/EvsI";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/about" element={<About />} />
                <Route path="/town" element={<Town />} />
                <Route path="/team" element={<TeamMbti />} />
                <Route path="/evsi" element={<EvsI />} />
            </Routes>
        </Router>
    );
}

export default App;
