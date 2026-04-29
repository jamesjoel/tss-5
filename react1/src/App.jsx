import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Help from "./pages/Help";
import NumContext from './NumContext'
import { useState } from "react";
let App = () => {
    let [x, setX] = useState(0);

    let obj = { x : x, setX : setX};

    return (
        <>
            <NumContext.Provider value={obj}>
                <Header />

                <div style={{ minHeight: "700px" }} className="">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/help" element={<Help />} />

                    </Routes>
                </div>
                <Footer />
            </NumContext.Provider>
        </>

    )
}
export default App;