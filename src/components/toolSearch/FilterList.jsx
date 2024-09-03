import { CiFilter } from "react-icons/ci";
import { BsFlower1, BsSearch, BsShuffle } from "react-icons/bs";
import { IoFishOutline } from "react-icons/io5";
import { LuWheatOff } from "react-icons/lu";
import { CgDanger } from "react-icons/cg";
import { RxTimer } from "react-icons/rx";
import { RiRestaurant2Line } from "react-icons/ri";

// Filters visible once the filter utility is clicked
export const FilterList = [
    {
        img: <CiFilter />,
        textHovered: "Filter your results.",
        index: 0,
        utilityType: "list",
        utility: [
            {
                index: 1,
                img: <BsFlower1 />,
                title: "Vegan",
                id: "vegan",
                query: "diet=vegan",
                type: "button"
            },
            {
                index: 4,
                img: <IoFishOutline />,
                title: "Fish",
                id: "fish",
                query: "includeIngredients=fish",
                type: "button"
            },
            {
                index: 5,
                img: <RxTimer />,
                title: "Quick Recipes",
                id: "quick",
                query: "maxReadyTime=30",
                type: "button"
            },
            {
                index: 6,
                img: <LuWheatOff />,
                title: "Gluten Free",
                id: "glutenFree",
                query: "diet=glutenfree",
                type: "button"
            },
            {
                index: 7,
                img: <RiRestaurant2Line />,
                title: "Course",
                id: "course",
                query: "type=",
                type: "list",
                list: [
                    { intValue: "breakfast", intTitle: "Breakfast" },
                    { intValue: "appetizer", intTitle: "Appetizer" },
                    { intValue: "maincourse", intTitle: "Main Course" },
                    { intValue: "salad", intTitle: "Salad" },
                    { intValue: "snack", intTitle: "Snack" },
                    { intValue: "dessert", intTitle: "Dessert" },
                ]
            },
            {
                index: 8,
                img: <CgDanger />,
                title: "Intolerance",
                id: "intolerance",
                query: "intolerances=",
                type: "list",
                list: [
                    { intValue: "dairy", intTitle: "Dairy" },
                    { intValue: "egg", intTitle: "Egg" },
                    { intValue: "grain", intTitle: "Grain" },
                    { intValue: "peanut", intTitle: "Peanut" },
                    { intValue: "seafood", intTitle: "Seafood" },
                    { intValue: "sesame", intTitle: "Sesame" },
                    { intValue: "shellfish", intTitle: "Shellfish" },
                    { intValue: "wheat", intTitle: "Wheat" },
                    { intValue: "treenut", intTitle: "Tree Nut" },
                    { intValue: "sulfite", intTitle: "Sulfite" },
                    { intValue: "soy", intTitle: "Soy" },
                ]
            }
        ]
    },
    {
        img: <BsSearch />,
        textHovered: "Search for words.",
        index: 1,
        utilityType: "string",
    },
    {
        img: <BsShuffle />,
        textHovered: "Take me by surprise!",
        index: 2,
        utilityType: "random",
    }
];
