import { useState } from "react";
import { FilterList } from "./toolSearch/FilterList";
import Arrow from "./Arrow";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Result from "./Result";

export default function Filters() {
    const [clicked, setClicked] = useState(-1);
    const [show, setShow] = useState(false);
    const [hovered, setHover] = useState(-1);
    const [query, setQuery] = useState(null);
    const [url, setUrl] = useState(null);
    const env = import.meta.env;
    let link = env.VITE_BASIC_URL;
    const navigate = useNavigate();

    const defineQuery = (event) => {
        const value = event.target.value;
        let newQuery;
        if (query) {
            if (query.includes(value)) {
                newQuery = query
                    .split(",")
                    .filter((item) => item !== value)
                    .join(",");
            } else {
                newQuery = query + "," + value;
            }
        } else {
            newQuery = value;
        }
        setQuery(newQuery);
        resetUrl(newQuery);
    };

    const resetUrl = (newQuery) => {
        if (newQuery) {
            const newUrl = url
                ? url.replace(/(type=|intolerances=)[^&]*/, `$1${newQuery}`)
                : `${link}&${clicked === 7 ? "type=" : "intolerances="}${newQuery}${env.VITE_API_KEY}`;
            setUrl(newUrl);
        }
    };

    const handleClick = (item) => {
        if (clicked === item.index) {
            setClicked(-1);
            setShow(false);
            setQuery(null);
            setUrl(null);
        } else {
            setQuery(null);
            setClicked(item.index);
            checkListValid(item);
            setUrl(`${link}&${item.query}${env.VITE_API_KEY}`);
        }
    };

    const checkListValid = (item) => {
        if (item.index === 7 || item.index === 8) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    const showList = (utility) => {
        if (!utility || !utility.list) {
            console.error("Utility is undefined or does not have a list!");
            return null;
        }
        return (
            <div className="wrapMoreOpt">
                {utility.list.map((child) => (
                    <label key={child.intValue} className="checkBoxStyle">
                        <input
                            type="checkbox"
                            className="inputStyleMoreOpt"
                            value={child.intValue}
                            onClick={defineQuery}
                        />
                        {child.intTitle}
                    </label>
                ))}
            </div>
        );
    };

    const handleClickArrow = () => {
        navigate('/result', { state: { url } });
    }

    return (
        <>
            <div className="wrapButtons">
                {FilterList[0].utility.map((item) => (
                    <button
                        key={item.index}
                        onClick={() => handleClick(item)}
                        onMouseEnter={() => setHover(item.index)}
                        onMouseOut={() => setHover(-1)}
                        className={clicked === item.index ? "btnGeneral btnFilters btnFilterClicked" : hovered === item.index ? "btnGeneral btnFilters btnFilterHover" : "btnGeneral btnFilters"}
                    >
                        {item.img} <span className="btnSpace"></span>
                        {item.title}
                    </button>
                ))}
            </div>
            {show && showList(FilterList[0].utility.find((elem) => elem.index === clicked))}
            <Arrow url={url} onClick={handleClickArrow} />

            <Routes>
                <Route path="/result" element={<Result />} />
            </Routes>
        </>
    );
}
