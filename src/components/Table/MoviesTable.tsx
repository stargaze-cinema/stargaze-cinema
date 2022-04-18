import { useModal } from '@/providers/ModalProvider'
import { useToast } from '@/providers/ToastProvider'
import { useQueryClient, useMutation } from 'react-query'
import { deleteMovie } from '@/services/movieService'
import type { Movie } from '@/types/Movie'
import { Edit, Cross } from '@/assets/icons/Misc'
import style from '@/assets/styles/admin.module.scss'

export const MoviesTableRow: React.FC<{ movie: Movie }> = ({ movie }) => {
    const { showModal } = useModal()
    const { invalidateQueries } = useQueryClient()
    const toast = useToast()
    const { mutate } = useMutation(deleteMovie, {
        onMutate: () => toast.loading('Deleting...'),
        onSuccess: () => toast.success('Movie deleted'),
        onError: (err: any) => toast.error(err.response?.data.message),
        onSettled: () => invalidateQueries(['movies']),
    })

    const remove = () => mutate(movie.id)

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
