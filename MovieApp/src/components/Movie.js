import PropTypes from "prop-types";
import {Link } from "react-router-dom"

function Movie({id, coverImg, title, summary, genres}){
    return <div>
    <img src={coverImg} alt ={title}></img>
    <Link to ={`/movie/${id}`}>{title}</Link>
    <p>{summary}</p>
    <ul>
      {genres.map(g => 
      <li key ={g}>{g}</li>)}
    </ul>
    {title}</div>;
}

Movie.propTypes ={
  id:PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired, 
  generes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Movie;