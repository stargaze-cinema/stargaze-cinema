import { lazy, Suspense, useState } from 'react'
import useAxios from '@/hooks/useAxios'
import { useAuth } from '@/providers/AuthProvider'
import type { Movie } from '@/types/Movie'
import { MoviesTableHead, MoviesTableRow } from '@/components/Table/MoviesTable'
import TablePlaceholder from '@/components/Table/TablePlaceholder'
import CreateRecord from '@/components/Buttons/CreateRecord'
import style from '@/styles/admin.module.scss'

interface AxiosResponse {
    data: Movie[]
    loading: boolean
}

const AdminMoviesPage = () => {
    const [Modal, setModal] = useState<any>()
    const { user } = useAuth()
    const { data, loading }: AxiosResponse = useAxios({
        url: '/movies',
        headers: { Authorization: user?.token as string },
    })

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
                    <TablePlaceholder cols={10} rows={10} />
                ) : (
                    data?.map(movie => <MoviesTableRow key={movie.id} movie={movie} />)
                )}
            </div>
            <Suspense fallback={null}>{Modal && <Modal onClose={() => setModal(null)} />}</Suspense>
        </div>
    )
}

export default AdminMoviesPage
