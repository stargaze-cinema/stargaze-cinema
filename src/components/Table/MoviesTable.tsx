import axios from 'axios'
import type { Movie } from '@/types/Movie'
import { useModal } from '@/providers/ModalProvider'
import { useToast } from '@/providers/ToastProvider'
import { useAuth } from '@/providers/AuthProvider'
import { Edit, Cross } from '@/assets/icons/Misc'
import style from '@/assets/styles/admin.module.scss'

export const MoviesTableRow: React.FC<{ movie: Movie }> = ({ movie }) => {
    const { user } = useAuth()
    const { showModal } = useModal()
    const { toastPromise } = useToast()

    const remove = () => {
        toastPromise({
            promise: axios.delete(`/movies/${movie.id}`, {
                headers: { Authorization: user?.token as string },
            }),
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
                <button onClick={() => showModal('UpdateMovieModal', { movie })}>
                    <Edit height={14} />
                </button>
                <button onClick={remove}>
                    <Cross height={14} />
                </button>
            </div>
        </>
    )
}
