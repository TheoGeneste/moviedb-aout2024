import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './Pages/HomePage';
import GenresPage from './Pages/GenresPage';
import NavBar from './Components/NavBar';
import MovieDetailsPage from './Pages/MovieDetailsPage';
import GenreDetailsPage from './Pages/GenreDetailsPage';
import PeoplePage from './Pages/PeoplePage';


function App() {

  return <>
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>} ></Route>
        <Route path='/genres' element={<GenresPage></GenresPage>} ></Route>
        <Route path='/movie/:id' element={<MovieDetailsPage></MovieDetailsPage>} ></Route>
        <Route path='/genre/:id' element={<GenreDetailsPage></GenreDetailsPage>} ></Route>
        <Route path='/people' element={<PeoplePage></PeoplePage>} ></Route>
      </Routes>
    </BrowserRouter>
  </>
}

export default App
