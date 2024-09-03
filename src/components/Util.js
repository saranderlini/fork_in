import axios from 'axios';

export const fetchRecipeInfo = async (id, navigate) => {
    const link = `https://api.spoonacular.com/recipes/${id}/information${import.meta.env.VITE_API_KEY_INFO}`;
    try {
        const response = await axios.get(link);
        const resp = response.data;
        navigate(`/recipe/${id}`, { state: { recipe: resp } });
    } catch (e) {
        console.log(e.message);
    }
};
