import { useParams } from "react-router-dom";
import PeopleService from "../Services/PeopleService";
import { useEffect, useState } from "react";
import { Container, Pagination } from "react-bootstrap";
import MovieCard from "../Components/MovieCard";

const PeopleDetailsPage = () => {
    const {id} = useParams();
    const [people, setPeople] = useState({});
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(20);

    const fetchPeopleByID = async () => {
        try {
            const response = await PeopleService.getPeopleById(id);
            setPeople(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchMovieByPeople = async () => {
        try {
            const response = await PeopleService.getMovieByPeople(id, currentPage);
            setMovies(response.data.results);
            setMaxPage(response.data.total_pages);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchPeopleByID();
    }, [])

    useEffect(() => {
        fetchMovieByPeople();
    }, [currentPage])

    return <Container className="d-flex flex-column align-items-center">
        <h1>{people.name}</h1>
        <img src={"https://image.tmdb.org/t/p/w300"+people.profile_path} 
        alt={'photo_'+people.name} />
        <p>{people.biography}</p>
        <h2>Films :</h2>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
            {movies.map((movie) => {
                return <MovieCard movieCard={movie} key={movie.id}></MovieCard>
            })}
        </div>
        
        <Pagination className="mt-5">
            {currentPage > 1 && <>
                <Pagination.First onClick={() => { setCurrentPage(1) }} />
                <Pagination.Prev onClick={() => { setCurrentPage(currentPage - 1) }} />
                <Pagination.Item onClick={() => { setCurrentPage(1) }}>{1}</Pagination.Item>
            </>}

            {currentPage - 5 > 0 && <>  
                <Pagination.Ellipsis onClick={() => { setCurrentPage(currentPage - 5) }} />
            </>}


            {(currentPage != 2 && currentPage > 1) && <>
                <Pagination.Item onClick={() => { setCurrentPage(currentPage - 1) }}>{currentPage - 1}</Pagination.Item>
            </>}

            <Pagination.Item active>{currentPage}</Pagination.Item>

            {currentPage + 1 < maxPage && <>
                <Pagination.Item onClick={() => { setCurrentPage(currentPage + 1) }}>{currentPage + 1}</Pagination.Item>
            </>}

            {currentPage + 5 <= maxPage && <>
                <Pagination.Ellipsis onClick={() => { setCurrentPage(currentPage + 5) }} />
            </>}

            {currentPage < maxPage && <>
                <Pagination.Item onClick={() => { setCurrentPage(maxPage) }}>{maxPage}</Pagination.Item>
                <Pagination.Next onClick={() => { setCurrentPage(currentPage + 1) }} />
                <Pagination.Last onClick={() => { setCurrentPage(maxPage) }} />
            </>}

        </Pagination>
    </Container>;   
}
    
export default PeopleDetailsPage;