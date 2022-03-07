import { useState } from 'react'
import axios from 'axios'
import type { ChangeEvent, FormEvent } from 'react'
import { useToast } from '@/components/Providers/ToastProvider'
import Modal from './Modal'
import style from '@/styles/modal.module.scss'

interface Props {
    onClose: () => void
}

const CreateMovieModal = ({ onClose }: Props) => {
    const { toastPromise } = useToast()
    const [state, setState] = useState({
        title: '',
        description: '',
        price: 0,
        year: 0,
        duration: 0,
        category: '',
        producer: '',
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        toastPromise({
            promise: axios.post('/movies', {
                ...state,
                price: parseFloat(state.price.toFixed(2)),
            }),
            title: 'Creating movie...',
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
        <Modal title="Create movie" isOpen={true} onClose={onClose}>
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
                    <input className={style.createSubmit} type="submit" value="Create movie" />
                </form>
            </div>
        </Modal>
    )
}

export default CreateMovieModal
