import { useEffect, useState } from "react";
import MoviesServices from "../Services/MoviesServices";
import MovieCard from "../Components/MovieCard";
import { Container } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';

const HomePage = () => {
    const [movies,setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(20);

    const fetchMovies = async () => {
        try {
            const response = await MoviesServices.getAllMovies();
            setMovies(response.data.results);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    return <Container className="d-flex flex-column align-items-center">
        <h1>Page d'accueil</h1>
        <div className="d-flex justify-content-center flex-wrap gap-4">
            {movies.map((movie) => {
                return <MovieCard movieCard={movie} key={movie.id}></MovieCard>
            })}
        </div>
        <Pagination className="mt-5">
            {currentPage > 1 && <>
                <Pagination.First onClick={() => {setCurrentPage(1)}}/>
                <Pagination.Prev onClick={() => {setCurrentPage(currentPage - 1 )}}/>
                <Pagination.Item onClick={() => {setCurrentPage(1)}}>{1}</Pagination.Item>
                <Pagination.Ellipsis onClick={() => {setCurrentPage(currentPage - 5)}}/>

            </>}

            {(currentPage != 2 && currentPage > 1) && <>
                <Pagination.Item onClick={() => {setCurrentPage(currentPage - 1)}}>{currentPage - 1}</Pagination.Item>
            </>}
           
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {currentPage < maxPage && <>
                <Pagination.Item onClick={() => {setCurrentPage(currentPage+1)}}>{currentPage + 1}</Pagination.Item>

                <Pagination.Ellipsis onClick={() => {setCurrentPage(currentPage+5)}}/>
                <Pagination.Item onClick={() => {setCurrentPage(maxPage)}}>{maxPage}</Pagination.Item>
                <Pagination.Next onClick={() => {setCurrentPage(currentPage+1)}}/>
                <Pagination.Last onClick={() => {setCurrentPage(maxPage)}}/>
            </>}
            
        </Pagination>
    </Container>;
}
 
export default HomePage;