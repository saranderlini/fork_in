// Arrow.jsx
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function Arrow({ url }) {
    const [data, setData] = useState([]);
    const [load, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    const handleClick = async () => {
        if (url) {
            setLoading(true);
            try {
                const response = await axios.get(url);
                const resp = response.data.results;
                setData(resp);
                navigate('/result', { state: { data: resp } });
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <>
            <button className={clicked ? "arrowBtnClicked arrowBtn" : hovered ? "arrowBtnHovered arrowBtn" : "arrowBtn"} onMouseEnter={() => setHovered(true)} onMouseOut={() => setHovered(false)} onClick={() => { handleClick(); setClicked(true) }}>
                <FaArrowRight />
            </button>

            {load ? <p className="yanone-kaffeesatz-bold loadingTitle">Loading...</p> : error ? <> <br /> <p className="yanone-kaffeesatz-bold loadingTitle">{error}</p></> : data.length > 0 ? data.map(item => (
                <div key={item.id} className="resultCard">
                    <p className="yanone-kaffeesatz">{item.title}</p>
                    <img src={item.img} alt={item.title} />
                </div>
            )) : null}
        </>
    );
}
