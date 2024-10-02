import { useEffect, useState } from "react";
import GenresServices from "../Services/GenresServices";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GenresPage = () => {
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    const navigateTo = (genre) => {
        navigate("/genre/"+genre.id, {state : {"genre" : genre}});
    }

    const fetchGenres = async () => {
        try {
            const response = await GenresServices.getAllGenres();
            setGenres(response.data.genres);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchGenres()
    }, [])

    return <Container className="d-flex flex-column align-items-center">
        <h1>Genres</h1>
        <div className="d-flex justify-content-center flex-wrap gap-3">
            {genres.map((genre) => {
                return <Button variant="primary" size="lg" key={genre.id} 
                onClick={() => {navigateTo(genre)}}>{genre.name}</Button>
            })}
        </div>
    </Container>;
}
 
export default GenresPage;