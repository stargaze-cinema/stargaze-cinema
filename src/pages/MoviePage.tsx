import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useMatch, useSearch, MakeGenerics } from '@tanstack/react-location'
import { MovieSelector } from '@/components/Movie/MovieSelector'
import { MovieFramer } from '@/components/Movie/MovieFramer'
import { MoviePoster } from '@/components/Movie/MoviePoster'
import { getMovie } from '@/services/movieService'
import { Movie } from '@/types/Movie'
import style from '@/assets/styles/movie.module.scss'

type Search = MakeGenerics<{
    Search: {
        prefetch?: string
    }
}>

export const MoviePage: React.FC = () => {
    const { params } = useMatch()
    const { prefetch } = useSearch<Search>()
    const { data, status } = useQuery(`${params.movie}`, () => getMovie(params.movie as string))
    const [movie, setMovie] = useState<Movie>(prefetch as any)

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
                            <ul>
                                <li>
                                    <b>Year:</b> {movie.year}
                                </li>
                                <li>
                                    <b>Duration:</b> {movie.duration}
                                </li>
                                <li>
                                    <b>Average ticket price:</b> ${movie.price}
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
