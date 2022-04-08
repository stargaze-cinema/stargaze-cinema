import { MovieInfo } from '@/components/Movie/MovieInfo'
import { parseMinutes } from '@/utils/parseMinutes'
import { Movie } from '@/types/Movie'
import style from './movieDescription.module.scss'

interface Props {
    movie: Movie
}

export const MovieDescription: React.FC<Props> = ({ movie }) => {
    return (
        <div className={style.movieDesc}>
            <div className={style.movieDescContent}>
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
            </div>
            <div className={style.movieDescInfo}>
                <MovieInfo title="Year" content={movie.year} />
                <MovieInfo title="Country" content={movie.year} />
                <MovieInfo title="Language" content={movie.year} />
                <MovieInfo title="Genre" content={movie.category.name} />
                <MovieInfo title="Producer" content={movie.producer.name} />
                <MovieInfo title="Average ticket price" content={`$${movie.price}`} />
                <MovieInfo title="Duration" content={parseMinutes(movie.duration)} />
            </div>
        </div>
    )
}
