import { useState } from 'react'
import { useQuery } from 'react-query'
import { MovieBanner } from '@/components/Movie/MovieBanner'
import { useDebounce } from '@/hooks/useDebouce'
import { getMovies } from '@/services/movieService'
import style from '@/assets/styles/movies.module.scss'
import { MovieBannerPlaceholder } from '@/components/Movie/MovieBannerPlaceholder'
import { Loading } from '@/assets/icons/Misc'
import { Paginator } from '@/components/Paginator/Paginator'

type M = 'ASC' | 'DESC'
type O = 'title' | 'year' | 'price' | 'duration' | 'created_at'

export const MoviesPage: React.FC = () => {
    const [search, setSearch] = useState('')
    const [method, setMethod] = useState<M>('DESC')
    const [order, setOrder] = useState<O>('created_at')
    const [page, setPage] = useState<number>(1)
    const debouncedSearch = useDebounce(search, 800)
    const { data, status, isLoading } = useQuery(
        ['movies', debouncedSearch, order, method, page],
        () => {
            const params = new URLSearchParams()
            params.append('title', debouncedSearch)
            params.append('order', order)
            params.append('orderMethod', method)
            params.append('page', page.toString())

            return getMovies(params)
        }
    )
    const changeOrder = ({ target }: React.ChangeEvent<HTMLSelectElement>) =>
        setOrder(target.value as O)
    const changeOrderMethod = () => setMethod(method === 'DESC' ? 'ASC' : 'DESC')

    return (
        <div className={style.moviesPage}>
            <h1>Now in Stargaze Cinema</h1>
            <div className={style.filterBlock}>
                <div className={style.filterSearch}>
                    <input
                        type="text"
                        value={search}
                        placeholder="Search for a title..."
                        onChange={({ target }) => setSearch(target.value)}
                    />
                </div>
                <div className={style.filterFilters}>
                    {status === 'success' && (
                        <Paginator paginator={data?.paginator} setPage={setPage} />
                    )}
                    {isLoading && (
                        <button className={style.filterBtn}>
                            <Loading />
                        </button>
                    )}
                    <button className={style.filterBtn} onClick={changeOrderMethod}>
                        &#8645;
                    </button>
                    <select
                        name="order"
                        className={style.filterSelect}
                        value={order}
                        onChange={changeOrder}
                    >
                        <option disabled>Order by</option>
                        <option value="created_at">Date</option>
                        <option value="price">Price</option>
                        <option value="year">Year</option>
                        <option value="duration">Duration</option>
                        <option value="title">Alphabetical</option>
                    </select>
                    <select name="category" className={style.filterSelect}>
                        <option disabled selected value="">
                            Category
                        </option>
                        <option>Action</option>
                        <option>Cartoon</option>
                    </select>
                    <select name="producer" className={style.filterSelect}>
                        <option disabled selected value="">
                            Producer
                        </option>
                        <option>John Fox</option>
                        <option>Evan You</option>
                    </select>
                </div>
            </div>
            <div className={style.moviesList}>
                {status === 'loading' ? (
                    <MovieBannerPlaceholder items={6} />
                ) : (
                    data?.data.map(movie => <MovieBanner key={movie.id} movie={movie} />)
                )}
            </div>
            {status === 'success' && <Paginator paginator={data?.paginator} setPage={setPage} />}
        </div>
    )
}
