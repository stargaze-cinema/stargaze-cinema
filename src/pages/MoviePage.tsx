import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useMatch, useSearch, MakeGenerics } from '@tanstack/react-location'
import { MovieDescription } from '@/components/Movie/MovieDescription'
import { MovieSelector } from '@/components/Movie/MovieSelector'
import { MovieFramer } from '@/components/Movie/MovieFramer'
import { MoviePoster } from '@/components/Movie/MoviePoster'
import { getMovie } from '@/services/movieService'
import type { Movie } from '@/types/Movie'
import style from '@/assets/styles/movie.module.scss'

type Search = MakeGenerics<{
    Search: {
        prefetch?: string
    }
}>

export const MoviePage: React.FC = () => {
    const { params } = useMatch()
    const { prefetch } = useSearch<Search>()
    const { data, status } = useQuery([params.movie], () => getMovie(params.movie as string))
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
                        <MovieSelector movie={movie} isLoading={status === 'loading'} />
                        <MovieFramer frames={movie.frames} />
                        <MovieDescription movie={movie} />
                    </div>
                </>
            )}
        </div>
    )
}
