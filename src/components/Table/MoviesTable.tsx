import axios from 'axios'
import { useToast } from '@/components/Providers/ToastProvider'
import { Edit, Cross } from '@/assets/icons/Misc'
import type { Movie } from '@/types/Movie'
import style from '@/styles/admin.module.scss'

interface MovieProps {
    movie: Movie
}

export const MoviesTableHead = () => {
    return (
        <>
            <span className={style.tableHead}>ID</span>
            <span className={style.tableHead}>Title</span>
            <span className={style.tableHead}>Description</span>
            <span className={style.tableHead}>Poster</span>
            <span className={style.tableHead}>Price</span>
            <span className={style.tableHead}>Year</span>
            <span className={style.tableHead}>Duration</span>
            <span className={style.tableHead}>Category</span>
            <span className={style.tableHead}>Producer</span>
            <span className={style.tableHead}>Actions</span>
        </>
    )
}

export const MoviesTableRow = ({ movie }: MovieProps) => {
    const { toastPromise } = useToast()

    const remove = () => {
        toastPromise({
            promise: axios.delete(`/movies/${movie.id}`),
            title: 'Deleting movie...',
            onSuccess: () => location.reload(),
        })
    }

    return (
        <>
            <div className={style.tableCell}>
                <span>{movie.id}</span>
            </div>
            <div className={style.tableCell} x-name="long">
                <span>{movie.title}</span>
            </div>
            <div className={style.tableCell} x-name="long">
                <span>{movie.description}</span>
            </div>
            <div className={style.tableCell} x-name="long">
                {movie.poster}
            </div>
            <div className={style.tableCell}>
                <span>{movie.price}</span>
            </div>
            <div className={style.tableCell}>
                <span>{movie.year}</span>
            </div>
            <div className={style.tableCell}>
                <span>{movie.duration}</span>
            </div>
            <div className={style.tableCell}>
                <span>{movie.category.name}</span>
            </div>
            <div className={style.tableCell}>
                <span>{movie.producer.name}</span>
            </div>
            <div className={style.tableCell}>
                <button>
                    <Edit height={14} />
                </button>
                <button onClick={remove}>
                    <Cross height={14} />
                </button>
            </div>
        </>
    )
}
