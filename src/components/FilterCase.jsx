import { useState } from 'react';
import { FilterList } from "./toolSearch/FilterList";

export default function FilterCase() {
    const [hovered, setHover] = useState(-1);
    const [clicked, setClicked] = useState(-1);
    const [relatedFilter, setRelatedFilter] = useState(null);

    const handleFilterClick = (item) => {
        if (clicked === item.index) {
            setClicked(-1);
            setRelatedFilter(null);
        } else {
            setClicked(item.index);
            setRelatedFilter(null);
        }
    };

    const handleRelatedFilterClick = (util) => {
        if (relatedFilter === util.index) {
            setRelatedFilter(null);
        } else {
            setRelatedFilter(util.index);
        }
    };

    const filterButtons = FilterList.map((item) => (
        <button
            key={item.index}
            className="btnGeneral"
            onMouseOver={() => setHover(item.index)}
            onMouseOut={() => setHover(-1)}
            onClick={() => handleFilterClick(item)}
            style={{
                backgroundColor: hovered === item.index ? "#97B1A6" : clicked === item.index ? "#36827F" : "#93AAB4",
                color: hovered === item.index ? "#F3F5F7" : clicked === item.index ? "#E6E6E6" : "#181F25",
                borderColor: clicked === item.index ? "#E6E6E6" : null
            }}
        >
            {item.img}
        </button>
    ));

    const showRelatedFilter = (utility) => {
        if (utility.length > 0) {
            return (
                utility.map(util =>
                    <div key={util.index} className='wrapButtons'>
                        <button
                            type='button'
                            className='btnGeneral'
                            style={{
                                backgroundColor: relatedFilter === util.index ? "#4EA69E" : "#8abab6",
                                color: relatedFilter === util.index ? "#EDF6F9" : "#181F25"
                            }}
                            onClick={() => handleRelatedFilterClick(util)}
                        >
                            {util.img}<span className='btnSpace'></span>{util.title}
                        </button>
                        {relatedFilter === util.index && util.list && (
                            <div className='wrapMoreOpt'>
                                {util.list.map(option => (
                                    <label key={option.intValue} className='checkBoxStyle'>
                                        <input type="checkbox" className="inputStyleMoreOpt" name={util.id} value={option.intValue}
                                        />
                                        {option.intTitle}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                )
            )
        }
    };

    return (
        <>
            <div className='d-flex justify-content-center'>
                {filterButtons}
            </div>
            <div className='d-flex flex-wrap justify-content-center align-items-center'>
                {clicked !== -1 && FilterList[clicked].utilityType === "list" ? showRelatedFilter(FilterList[clicked].utility) : null}
                {clicked !== -1 && FilterList[clicked].utilityType === "string" ? (
                    <>
                        <label htmlFor='stringSearch'>What are you looking for?</label>
                        <input name='stringSearch' type='text' className='btnGeneral' />
                    </>
                ) : null}
            </div>
        </>
    );
}
