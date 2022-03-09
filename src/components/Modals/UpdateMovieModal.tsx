import { useState } from 'react'
import axios from 'axios'
import { useToast } from '@/providers/ToastProvider'
import { useAuth } from '@/providers/AuthProvider'
import type { Movie } from '@/types/Movie'
import { LabeledInput } from '../Inputs/LabeledInput'
import { LabeledTextarea } from '../Inputs/LabeledTextarea'
import { Modal } from './Modal'
import style from '@/assets/styles/modal.module.scss'
import { InputSubmit } from '../Inputs/InputSubmit'

interface Props {
    movie: Movie
    onClose: () => void
}

export const UpdateMovieModal: React.FC<Props> = ({ movie, onClose }) => {
    const { toastPromise } = useToast()
    const { user } = useAuth()
    const [state, setState] = useState({
        title: movie.title,
        description: movie.description,
        price: movie.price,
        year: movie.year,
        duration: movie.duration,
        category: movie.category.name,
        producer: movie.producer.name,
    })

    const handleChange = ({
        target,
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        let value
        switch (target.name) {
            case 'price':
            case 'year':
            case 'duration':
                value = +target.value
                break
            default:
                value = target.value
        }
        setState({
            ...state,
            [target.name]: value,
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            promise: axios.patch(`/movies/${movie.id}`, state, {
                headers: { Authorization: user?.token as string },
            }),
            title: 'Updating...',
            onSuccess: () => {
                onClose()
                location.reload()
            },
        })
    }

    return (
        <Modal title="Edit movie" isOpen={true} onClose={onClose}>
            <div className={style.createModal}>
                <form onSubmit={handleSubmit}>
                    <LabeledInput
                        label="Title"
                        name="title"
                        value={state.title}
                        onChange={handleChange}
                        required
                    />
                    <LabeledTextarea
                        label="Description"
                        name="description"
                        value={state.description}
                        onChange={handleChange}
                    />
                    <LabeledInput
                        label="Duration (in minutes)"
                        type="number"
                        name="duration"
                        value={state.duration}
                        onChange={handleChange}
                        required
                    />
                    <LabeledInput
                        label="Price"
                        type="number"
                        name="price"
                        value={state.price}
                        onChange={handleChange}
                        min={0}
                        max={99.99}
                        step={0.01}
                        required
                    />
                    <LabeledInput
                        label="Year"
                        type="number"
                        name="year"
                        value={state.year}
                        onChange={handleChange}
                        min={1888}
                        required
                    />
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
                    <InputSubmit label="Apply changes" />
                </form>
            </div>
        </Modal>
    )
}
