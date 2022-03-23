import { useState } from 'react'
import { useToast } from '@/providers/ToastProvider'
import { useQueryClient, useMutation } from 'react-query'
import { createMovie } from '@/services/movieService'
import { LabeledInput } from '../Inputs/LabeledInput'
import { LabeledTextarea } from '../Inputs/LabeledTextarea'
import { InputSubmit } from '../Inputs/InputSubmit'
import { Modal } from './Modal'
import style from '@/assets/styles/modal.module.scss'

export const CreateMovieModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const queryClient = useQueryClient()
    const toast = useToast()
    const { mutate } = useMutation(createMovie, {
        onMutate: () => toast.loading('Creating...'),
        onSuccess: () => {
            toast.success('Movie created')
            onClose()
        },
        onError: (err: any) => toast.error(err.response?.data.message),
        onSettled: () => queryClient.invalidateQueries('movies'),
    })

    const [state, setState] = useState({
        title: '',
        description: '',
        poster: null,
        price: 0,
        year: 0,
        duration: 0,
        category: '',
        producer: '',
    })
    const [posterPreview, setPosterPreview] = useState<any>()

    const handleChange = ({
        target,
        currentTarget,
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        let value
        switch (target.name) {
            case 'price':
            case 'year':
            case 'duration':
                value = +target.value
                break
            case 'poster':
                const trg = currentTarget as HTMLInputElement
                if (trg.files) {
                    value = trg.files[0]
                    setPosterPreview(URL.createObjectURL(trg.files[0]))
                }
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
        const data = new FormData()
        for (const key in state) {
            // @ts-ignore
            data.append(key, state[key])
        }
        mutate(data)
    }

    return (
        <Modal title="Create movie" isOpen={true} onClose={onClose}>
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
                            {posterPreview && <img src={posterPreview} />}
                        </div>
                    </div>
                    <InputSubmit label="Create movie" />
                </form>
            </div>
        </Modal>
    )
}
