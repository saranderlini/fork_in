import { useLocation } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { fetchRecipeInfo } from './Util';
import { useNavigate } from 'react-router-dom';

export default function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state || {};

    return (
        <div className='resultContainer'>
            <h1 className='yanone-kaffeesatz-bold resultTitle'>Results</h1>
            <div className='resultWrapper'>

                {data ? (
                    data.map(item => (
                        <div key={item.id} className="resultCard">
                            <p className="yanone-kaffeesatz">{item.title}</p>
                            <img src={item.img || item.image} alt={item.title} />
                            <button className='resultCardBtn' onClick={() => fetchRecipeInfo(item.id, navigate)}>
                                <FaArrowRight />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className='yanone-kaffeesatz-bold loadingTitle'>No results found.</p>
                )}
            </div>
        </div>
    );
}
