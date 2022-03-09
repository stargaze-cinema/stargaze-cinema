import { useParams } from 'react-router-dom'

export const MoviePage: React.FC = () => {
    const params = useParams()
    return <div>Movie: {params.movie}</div>
}
