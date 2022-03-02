import { lazy, Suspense, useState } from 'react'
import useAxios from '@/hooks/useAxios'
import type { Movie } from '@/types/Movie'
import { MoviesTableHead, MoviesTableRow } from '@/components/Table/MoviesTable'
import MoviePlaceholder from '@/components/Table/MoviePlaceholder'
import CreateRecord from '@/components/Buttons/CreateRecord'
import style from '@/styles/admin.module.scss'

interface IUseAxios {
    data: Movie[]
    loading: boolean
    error?: string
}

const AdminMoviesPage = () => {
    const [Modal, setModal] = useState<any>()
    const { data, loading }: IUseAxios = useAxios('/movies')

    const handleModalChange = () =>
        setModal(lazy(() => import('../../components/Modals/CreateMovieModal')))

    return (
        <div className={style.tablePage}>
            <div className={style.tableBtns}>
                <CreateRecord onClick={handleModalChange} />
            </div>
            <div className={style.table}>
                <MoviesTableHead />
                {loading ? (
                    <MoviePlaceholder />
                ) : (
                    data?.map(movie => <MoviesTableRow key={movie.id} movie={movie} />)
                )}
            </div>
            <Suspense fallback={null}>{Modal && <Modal onClose={() => setModal(null)} />}</Suspense>
        </div>
    )
}

export default AdminMoviesPage
