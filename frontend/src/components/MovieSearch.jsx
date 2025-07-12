import { useState } from "react";
import  axios  from "axios";

const MovieSearch = () => {

        let [query, setQuery] = useState('');
        const [movies, setMovies] = useState([]);
        const [message, setMessage] = useState(null);
        const urlApi = import.meta.env.VITE_API_LINK;

        const searchHandler = async () => {
            if (!query.trim()) {
            setMessage("search cannot be empty");
            setMovies([]);
            return;
            }
            setMessage(null);
            try {
                const response = await axios.get(`${urlApi}/api/search?query=${encodeURIComponent(query)}`);
                // Adjust this line if your backend returns { results: [...] }
                setMovies(response.data.results || response.data);
                if ((response.data.results && response.data.results.length === 0) || (Array.isArray(response.data) && response.data.length === 0)) {
                    setMessage("No movies found.");
                }
            } catch (error) {
                setMessage("Error fetching data " + error.message);
                setMovies([]);
                console.error(error);
            };

        };


    return ( 
        <>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='search for movie...' />
            <button onClick={searchHandler}>search</button>
            <h1>{message}</h1>
            <ol>
                {movies && movies.map(
                movie => (
                    <li key={movie.id}>
                    {movie.title}
                    </li>
                )
                )}
            </ol>
        </>
      );
}
 
export default MovieSearch;