import { useQuery } from 'react-query'
import { useModal } from '@/providers/ModalProvider'
import { MoviesTableRow } from '@/components/Table/MoviesTable'
import { MoviesTableHead } from '@/components/Table/MoviesTableHead'
import { TablePlaceholder } from '@/components/Table/TablePlaceholder'
import { CreateRecordBtn } from '@/components/Buttons/CreateRecordBtn'
import { getMovies } from '@/services/movieService'
import style from '@/assets/styles/admin.module.scss'

export const ConsoleMoviesPage: React.FC = () => {
    const { showModal } = useModal()
    const { data, status } = useQuery('movies', () => getMovies())

    return (
        <div className={style.tablePage}>
            <div className={style.tableBtns}>
                <CreateRecordBtn onClick={() => showModal('CreateMovieModal')} />
            </div>
            <div className={style.table}>
                <MoviesTableHead />
                {status === 'loading' ? (
                    <TablePlaceholder cols={10} rows={10} />
                ) : (
                    data?.data.map(movie => <MoviesTableRow key={movie.id} movie={movie} />)
                )}
            </div>
        </div>
    )
}
