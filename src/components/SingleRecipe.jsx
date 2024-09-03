import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LuVegan, LuWheatOff } from "react-icons/lu";
import { TbMeatOff, TbPigMoney, TbTimeDuration15, TbTimeDuration30, TbTimeDuration45, TbTimeDuration60 } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function SingleRecipe() {
    const navigate = useNavigate();
    const [click, setClicked] = useState(false);
    const [hover, setHover] = useState(false);
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            console.log(`Fetching recipe with ID: ${id}`);
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information${import.meta.env.VITE_API_KEY_INFO}`);
                setRecipe(response.data);
                console.log(recipe)
            } catch (error) {
                console.error(`${error}`);
                setError('Failed to fetch recipe');
            }
        };

        if (id) {
            fetchRecipe();
        } else {
            setError('Invalid recipe ID');
        }
    }, [id, recipe]);

    if (error) return <p className='yanone-kaffeesatz-bold loadingTitle'>{error}</p>;
    if (!recipe) return <p className='yanone-kaffeesatz-bold loadingTitle'>Loading...</p>;

    return (
        <div className='singleRecipeWrap'>
            <h2 className='singleRecipeTitle yanone-kaffeesatz-bold'>{recipe.title}</h2>
            <div className='singleRecipeMedia'>
                <img className='singleRecipeImg' src={recipe.image} alt={recipe.title} />
                <div className='singleRecipeSymbols'>
                    {recipe.vegan && <LuVegan />}
                    {recipe.vegetarian && <TbMeatOff />}
                    {recipe.glutenFree && <LuWheatOff />}
                    {recipe.cheap && <TbPigMoney />}
                    {recipe.readyInMinutes <= 15 ? <TbTimeDuration15 /> :
                        recipe.readyInMinutes <= 30 ? <TbTimeDuration30 /> :
                            recipe.readyInMinutes <= 45 ? <TbTimeDuration45 /> :
                                recipe.readyInMinutes <= 60 ? <TbTimeDuration60 /> : null}
                </div>
            </div>
            <p className='singleRecipeText'>{recipe.instructions}</p>
            <button className={hover ? "singleRecipeArrow singleRecipeArrowHovered" : click ? "singleRecipeArrow singleRecipeClicked" : 'singleRecipeArrow'} onClick={() => { navigate(-1); setClicked(true) }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}><FaArrowLeft /></button>
        </div>
    );
}
