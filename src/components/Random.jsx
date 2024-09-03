// Random.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Random() {
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();
    const link = `https://api.spoonacular.com/recipes/random${import.meta.env.VITE_API_KEY_INFO}`;

    const fetchRandom = async (url) => {
        try {
            const response = await axios.get(url);
            const recipe = response.data.recipes[0]; // Assuming you want the first recipe
            if (recipe && recipe.id) {
                navigate(`/recipe/${recipe.id}`); // Navigate to SingleRecipe component with the recipe ID
            } else {
                console.error("No recipe ID found.");
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    return (
        <button
            className="shuffleBtn yanone-kaffeesatz"
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            onClick={() => fetchRandom(link)}
            style={hover ?
                {
                    color: "W60D394",
                    fontSize: "2.5rem",
                    transition: "color, font-size 0.2s ease-out",
                    textShadow: "1px 1px 2px #AED5CB, 0 0 5px #5AAA95",
                } : { color: "rgba(13, 72, 66, 0.71)", fontSize: "2rem" }}>
            Take me by surprise
        </button>
    );
}
