import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import { MovieSelector } from '@/components/Movie/MovieSelector'
import { MovieFramer } from '@/components/Movie/MovieFramer'
import { MoviePoster } from '@/components/Movie/MoviePoster'
import { getMovie } from '@/services/movieService'
import { Movie } from '@/types/Movie'
import style from '@/assets/styles/movie.module.scss'

export const MoviePage: React.FC = () => {
    const params = useParams()
    const [searchParams] = useSearchParams()
    const { data, status } = useQuery(`${params.movie}`, () => getMovie(params.movie as string))
    const [movie, setMovie] = useState<Movie>(
        searchParams.get('prefetch') ? JSON.parse(searchParams.get('prefetch') as string) : null
    )

    useEffect(() => {
        status === 'success' && setMovie(data)
    }, [data, status])

    return (
        <div className={style.moviePage}>
            {!movie ? (
                'Loading'
            ) : (
                <>
                    <MoviePoster title={movie.title} poster={movie.poster} year={movie.year} />
                    <div className={style.movieBody}>
                        <MovieSelector sessions={movie.sessions} />
                        <MovieFramer frames={movie.frames} />
                        <div className={style.movieDesc}>
                            <h2>{movie.title}</h2>
                            <p>{movie.description}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
