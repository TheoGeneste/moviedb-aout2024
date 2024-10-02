import { useNavigate, useParams } from "react-router-dom";
import MoviesServices from "../Services/MoviesServices";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

const MovieDetailsPage = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState({});
    const navigate = useNavigate();

    const navigateTo = (genre) => {
        navigate("/genre/"+genre.id, {state : {"genre" : genre}});
    }

    const fetchMovieByID = async () => {
        try {
            const response = await MoviesServices.getMovieByID(id);
            console.log(response.data);
            setMovie(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMovieByID();
    }, [])
    console.log(movie)
    return <Container className="d-flex flex-column align-items-center">
        <h1>{movie.title}</h1>
        <img  src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt={"image-"+movie.title} />
        <p>Budget : {movie.budget}$</p>
        <div className="d-flex justify-content-center gap-3">
            {movie.genres && movie.genres.map((genre) => {
                return <Button variant="primary" key={genre.id} size="lg" onClick={() => {navigateTo(genre)}}>{genre.name}</Button>
            })}
        </div>
        
    </Container>;
}
 
export default MovieDetailsPage;