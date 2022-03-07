import { useState } from 'react'
import axios from 'axios'
import { useToast } from '@/components/Providers/ToastProvider'
import type { ChangeEvent, FormEvent } from 'react'
import type { Movie } from '@/types/Movie'
import Modal from './Modal'
import style from '@/styles/modal.module.scss'

interface Props {
    movie: Movie
    onClose: () => void
}

const UpdateMovieModal = ({ movie, onClose }: Props) => {
    const { toastPromise } = useToast()
    const [state, setState] = useState({
        title: movie.title,
        description: movie.description,
        price: movie.price,
        year: movie.year,
        duration: movie.duration,
        category: movie.category.name,
        producer: movie.producer.name,
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const data = JSON.parse(JSON.stringify(state))
        for (const key in data) {
            // @ts-ignore
            if (state[key] === movie[key]) {
                delete data[key]
                continue
            }
            if ((key === 'category' || key === 'producer') && state[key] === movie[key].name)
                delete data[key]
        }
        toastPromise({
            promise: axios.patch(`/movies/${movie.id}`, {
                ...data,
                price: parseFloat(data.price.toFixed(2)),
            }),
            title: 'Updating...',
            onSuccess: () => {
                onClose()
                location.reload()
            },
        })
    }

    const handleChange = (e: ChangeEvent) => {
        const el = e.target as HTMLInputElement
        let value
        switch (el.name) {
            case 'price':
                value = parseFloat(el.value)
                break
            case 'year':
            case 'duration':
                value = +el.value
                break
            default:
                value = el.value
        }
        setState({
            ...state,
            [el.name]: value,
        })
    }

    return (
        <Modal title="Edit movie" isOpen={true} onClose={onClose}>
            <div className={style.createModal}>
                <form onSubmit={handleSubmit}>
                    <label className={style.createLabel}>
                        Title
                        <input
                            type="text"
                            className={style.createInput}
                            name="title"
                            value={state.title}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className={style.createLabel}>
                        Description
                        <textarea
                            className={style.createTextarea}
                            name="description"
                            value={state.description}
                            onChange={handleChange}
                        ></textarea>
                    </label>
                    <label className={style.createLabel}>
                        Duration (in minutes)
                        <input
                            type="number"
                            className={style.createInput}
                            name="duration"
                            value={state.duration}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className={style.createLabel}>
                        Price
                        <input
                            type="number"
                            className={style.createInput}
                            name="price"
                            value={state.price}
                            onChange={handleChange}
                            placeholder="20.00"
                            min="0"
                            max="99.99"
                            step="0.01"
                            required
                        />
                    </label>
                    <label className={style.createLabel}>
                        Year
                        <input
                            type="number"
                            className={style.createInput}
                            name="year"
                            value={state.year}
                            onChange={handleChange}
                            placeholder="2022"
                            min="1888"
                            required
                        />
                    </label>
                    <label className={style.createLabel}>
                        Category
                        <select
                            value={state.category}
                            name="category"
                            className={style.createSelect}
                            onChange={handleChange}
                            required
                        >
                            <option disabled value="">
                                -- select category --
                            </option>
                            <option>Action</option>
                            <option>Cartoon</option>
                        </select>
                    </label>
                    <label className={style.createLabel}>
                        Producer
                        <select
                            value={state.producer}
                            name="producer"
                            className={style.createSelect}
                            onChange={handleChange}
                            required
                        >
                            <option disabled value="">
                                -- select producer --
                            </option>
                            <option>John Fox</option>
                            <option>Evan You</option>
                        </select>
                    </label>
                    <div className={style.createLabel}>
                        Poster
                        <div className={style.createPoster}>
                            <label htmlFor="poster">Upload a poster</label>
                            <input
                                id="poster"
                                name="poster"
                                onChange={handleChange}
                                type="file"
                                accept="image/png, image/jpg, image/jpeg"
                            />
                        </div>
                    </div>
                    <input className={style.createSubmit} type="submit" value="Apply changes" />
                </form>
            </div>
        </Modal>
    )
}

export default UpdateMovieModal
