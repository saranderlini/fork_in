import { Routes, Route } from 'react-router-dom';
import Filters from './Filters';
import Homepage from './Homepage';
import Text from './Text';
import Random from './Random';
import Result from './Result';
import SingleRecipe from './SingleRecipe';
import { IoHomeOutline } from "react-icons/io5";
import { IoFunnelOutline } from "react-icons/io5";
import { PiShuffleFill } from "react-icons/pi";
import { GoSearch } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Header() {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState("");
    const [clicked, setClicked] = useState("");

    return (
        <div>
            <header className='headerBg'>
                <nav className='navBar'>
                    <button className={hovered == "home" ? "btnGeneral btnGeneralHovered" : clicked == "home" ? "btnGeneral btnGeneralClicked" : "btnGeneral"}
                        onClick={() => { navigate("/", { replace: true }); setClicked("home") }} onMouseOver={() => setHovered("home")} onMouseOut={() => setHovered("")}><IoHomeOutline /> {hovered == "home" && <><span className='btnSpace'></span><span>Home</span></>} </button>
                    <button className={hovered == "filters" ? "btnGeneral btnGeneralHovered" : clicked == "filters" ? "btnGeneral btnGeneralClicked" : "btnGeneral"}
                        onClick={() => { navigate("/filters/*", { replace: true }); setClicked("filters") }} onMouseOver={() => setHovered("filters")} onMouseOut={() => setHovered("")}><IoFunnelOutline /> {hovered == "filters" && <><span className='btnSpace'></span><span>Filters</span></>} </button>
                    <button className={hovered == "random" ? "btnGeneral btnGeneralHovered" : clicked == "random" ? "btnGeneral btnGeneralClicked" : "btnGeneral"}
                        onClick={() => { navigate("/random", { replace: true }); setClicked("random") }} onMouseOver={() => setHovered("random")} onMouseOut={() => setHovered("")}><PiShuffleFill /> {hovered == "random" && <><span className='btnSpace'></span><span>Random</span></>} </button>
                    <button className={hovered == "search" ? "btnGeneral btnGeneralHovered" : clicked == "search" ? "btnGeneral btnGeneralClicked" : "btnGeneral"}
                        onClick={() => { navigate("/text", { replace: true }); setClicked("search") }} onMouseOver={() => setHovered("search")} onMouseOut={() => setHovered("")}><GoSearch /> {hovered == "search" && <><span className='btnSpace'></span><span>Search</span></>} </button>
                    {/* Navigation buttons */}
                </nav>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path="/filters/*" element={<Filters />} />
                    <Route path="/text" element={<Text />} />
                    <Route path="/random" element={<Random />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/recipe/:id" element={<SingleRecipe />} />
                </Routes>
            </header>
        </div>
    );
}
