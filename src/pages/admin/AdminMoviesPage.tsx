import useAxios from '@/hooks/useAxios'
import { useAuth } from '@/providers/AuthProvider'
import { useModal } from '@/providers/ModalProvider'
import { MoviesTableRow } from '@/components/Table/MoviesTable'
import { MoviesTableHead } from '@/components/Table/MoviesTableHead'
import { TablePlaceholder } from '@/components/Table/TablePlaceholder'
import { CreateRecordBtn } from '@/components/Buttons/CreateRecordBtn'
import type { Movie } from '@/types/Movie'
import style from '@/assets/styles/admin.module.scss'

interface AxiosResponse {
    data: Movie[]
    loading: boolean
}

export const AdminMoviesPage: React.FC = () => {
    const { user } = useAuth()
    const { showModal } = useModal()
    const { data, loading }: AxiosResponse = useAxios({
        url: '/movies',
        headers: { Authorization: user?.token as string },
    })

    return (
        <div className={style.tablePage}>
            <div className={style.tableBtns}>
                <CreateRecordBtn onClick={() => showModal('CreateMovieModal')} />
            </div>
            <div className={style.table}>
                <MoviesTableHead />
                {loading ? (
                    <TablePlaceholder cols={10} rows={10} />
                ) : (
                    data?.map(movie => <MoviesTableRow key={movie.id} movie={movie} />)
                )}
            </div>
        </div>
    )
}
