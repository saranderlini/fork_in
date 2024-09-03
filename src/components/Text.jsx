import Arrow from "./Arrow";
import { useState } from "react";

export default function Text() {
    const [search, setSearch] = useState("");
    const [url, setUrl] = useState("");

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSearchClick = () => {
        if (!search.trim()) {
            alert("The field cannot be empty.");
        } else {
            // Construct the URL with the search term
            const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?excludeIngredients=meat&titleMatch=${search.trim()}${import.meta.env.VITE_API_KEY}`;
            setUrl(searchUrl);
        }
    };

    return (
        <>
            <div className="yanone-kaffeesatz textSearch d-flex">
                <label htmlFor="textSearch">What are you looking for?</label>
                <input
                    name="textSearch"
                    id="textSearch"
                    type="text"
                    placeholder="Look for whatever ingredient!"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
            <button style={{ display: "flex", border: "none", background: "none", margin: "auto" }} onClick={handleSearchClick}>
                <Arrow url={url} />
            </button>
        </>
    );
}
