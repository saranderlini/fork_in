// src/components/FilterCase.jsx
import { useState, useEffect } from "react";
import { FilterList } from "./toolSearch/FilterList";
import { IoArrowForwardSharp } from "react-icons/io5";
import axios from "axios";
import Result from "./Result";

export default function FilterCase() {
    const env = import.meta.env;
    const [hovered, setHover] = useState(-1);
    const [clicked, setClicked] = useState(-1);
    const [relatedFilter, setRelatedFilter] = useState(null);
    const [relFilHovered, setRelFilHovered] = useState(-1);
    const [url, setUrl] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [optionQuery, setOptionQuery] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(false);
    const [arrowClicked, setArrowClicked] = useState(-1);

    //to set the Url when the random filter is selected
    useEffect(() => {
        if (clicked === 2) {
            setUrl(`${env.VITE_RANDOM_URL}${env.VITE_API_KEY}`);
        }
    }, [clicked, env.VITE_RANDOM_URL, env.VITE_API_KEY]);

    //Function to handle the click on the main filter
    const handleFilterClick = (item) => {
        if (clicked === item.index) {
            setClicked(-1);
            setRelatedFilter(null);
            setOptionQuery("");
        } else {
            setClicked(item.index);
            setRelatedFilter(null);
            setOptionQuery("");
        }
    };

    //Function to handle the click on the filters inside the funnel option
    const handleRelatedFilterClick = (util) => {
        if (relatedFilter === util.index) {
            setRelatedFilter(null);
            setOptionQuery("");
            setArrowClicked(-1);
        } else {
            setRelatedFilter(util.index);
            setOptionQuery("");
            setArrowClicked(100);
            setUrl(`${env.VITE_BASIC_URL}&${util.query}${env.VITE_API_KEY}`);
        }
    };

    //Adding to the query the multiple values if it is course or intolerances
    const queryOption = (opt) => {
        const value = opt.target.value;
        const isChecked = opt.target.checked;

        setOptionQuery((prev) => {
            let newQuery = prev;

            if (isChecked) {
                newQuery = prev ? `${prev},${value}` : value;
            } else {
                const optionsArray = prev.split(',').filter((option) => option !== value);
                newQuery = optionsArray.join(',');
            }

            const baseQuery = relatedFilter === 7 ? "type=" : "intolerances=";
            setUrl(`${env.VITE_BASIC_URL}&${baseQuery}${newQuery}${env.VITE_API_KEY}`);
            return newQuery;
        });
    };

    //Processing the query after the url is defined
    const processResponse = async (url) => {
        try {
            setLoad(true);
            const response = await axios.get(url);
            if (response.data.results) {
                setData(response.data.results);
            } else {
                setData(response.data.recipes);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoad(false);
        }
    };

    //Rendering the funnel/search/shuffle buttons
    const filterButtons = FilterList.map((item) => (
        <button
            key={item.index}
            className="btnGeneral"
            onMouseOver={() => setHover(item.index)}
            onMouseOut={() => setHover(-1)}
            onClick={() => handleFilterClick(item)}
            style={{
                backgroundColor: hovered === item.index ? "#FFE45C" : clicked === item.index ? "#1A8FE3" : "#93AAB4",
                color: hovered === item.index ? "#3D3300" : clicked === item.index ? "#FFFFFF" : "#181F25",
                borderColor: clicked === item.index ? "#E6E6E6" : null,
            }}
        >
            {item.img}
        </button>
    ));

    //Rendering the filters inside the funnel button
    const showRelatedFilter = (utility) => {
        if (utility && utility.length > 0) {
            return utility.map((util) => (
                <div key={util.index} className="wrapButtons">
                    <button
                        type="button"
                        className="btnGeneral"
                        style={{
                            backgroundColor:
                                relatedFilter === util.index
                                    ? "#75BC62"
                                    : relFilHovered === util.index
                                        ? "#F9A38B"
                                        : "#8abab6",
                            color: relatedFilter === util.index ? "#EDF6F9" : relFilHovered === util.index ? "#084A21" : "#181F25",
                        }}
                        onClick={() => handleRelatedFilterClick(util)}
                        onMouseEnter={() => setRelFilHovered(util.index)}
                        onMouseOut={() => setRelFilHovered(-1)}
                    >
                        {util.img}
                        <span className="btnSpace"></span>
                        {util.title}
                    </button>
                    {relatedFilter === util.index && util.list && (
                        <div className="wrapMoreOpt">
                            {util.list.map((option) => (
                                <label key={option.intValue} className="checkBoxStyle">
                                    <input
                                        type="checkbox"
                                        className="inputStyleMoreOpt"
                                        name={util.id}
                                        value={option.intValue}
                                        onChange={queryOption}
                                    />
                                    {option.intTitle}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            ));
        }
        return null;
    };

    return (
        <>
            <div className="d-flex justify-content-center">{filterButtons}</div>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
                {clicked !== -1 && FilterList[clicked].utilityType === "list"
                    ? showRelatedFilter(FilterList[clicked].utility)
                    : null}
                {clicked !== -1 && FilterList[clicked].utilityType === "string" ? (
                    <>
                        <label htmlFor="stringSearch">What are you looking for?</label>
                        <input name="stringSearch" type="text" className="btnGeneral"
                            onChange={(target) => {
                                setUrl(`${env.VITE_BASIC_URL}&titleMatch=${target.target.value}${env.VITE_API_KEY}`);
                            }} />
                    </>
                ) : null}
            </div>
            <span className="arrowBtn" onMouseOver={() => { setArrowClicked(900) }} onMouseLeave={() => { setArrowClicked(-1) }} onClick={() => { setArrowClicked(1000) }}
                style={arrowClicked === 1000 ? { backgroundColor: "#CC3363", color: "#100408" } : arrowClicked === 900 ? { backgroundColor: "#E59500", color: "#02040F" } : { backgroundColor: "#F4A4A6", color: "#20063B" }} >

                <IoArrowForwardSharp onClick={() => {
                    { arrowClicked === -1 && alert("Choose one of the options to start your search.") }
                    { arrowClicked !== -1 && processResponse(url) }
                    console.log(url);
                    setArrowClicked(1000)
                }} />
            </span>

            {load ? <p>{load}</p> : error ? <p>{error}</p> : data.length > 0 ?
                <div className="resultWrapper"> {data.map(item => <Result key={item.id} title={item.title} img={item.image} />)}
                </div>
                : <p>{data.title}</p>}
        </>
    );
}
