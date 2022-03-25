import { Movie } from '@/types/Movie'
import style from './movieBanner.module.scss'

interface Props {
    movie: Movie
}

export const MovieBanner: React.FC<Props> = ({ movie }) => {
    return (
        <a href={`/movies/${movie.title}`} className={style.banner}>
            <img className={style.bannerPoster} src={movie.poster} alt="poster" />
            <div className={style.bannerContainer}>
                <div className={style.bannerTags}>
                    <div className={style.bannerTag}>{movie.year}</div>
                    <div className={style.bannerTag}>{movie.category.name}</div>
                </div>
                <div className={style.bannerTags}>
                    <div className={style.bannerTag}>{movie.title}</div>
                </div>
            </div>
        </a>
    )
}
