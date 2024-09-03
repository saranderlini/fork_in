import LandingPage from "./LandingPage";
import FilterCase from "./FilterCase";


export default function Background() {

    return (
        <header className="headerBg">
            <div className="headerWrapper">
                <h4 className="d-block abril-fatface-regular headerTitle">What do you feel like tasting today?</h4>
                <LandingPage />
                <FilterCase />
            </div>
        </header>
    );
}
