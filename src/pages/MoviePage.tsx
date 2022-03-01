import { useParams } from 'react-router-dom'

const MoviePage = () => {
	const params = useParams()
	return <div>Movie: {params.movie}</div>
}

export default MoviePage
