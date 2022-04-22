import { useState } from 'react'
import { useQuery } from 'react-query'
import { Modal } from './Modal'
import { Session } from '@/types/Session'
import { MovieInfo } from '../Movie/MovieInfo'
import { getSession } from '@/services/sessionService'
import style from './orderModal.module.scss'

interface Props {
    session: Session
    onClose: () => void
}

export const OrderModal: React.FC<Props> = ({ session, onClose }) => {
    const { data, status } = useQuery(['session', session.id], () => getSession(session.id))
    const [places] = useState(new Array(100).fill(undefined).map((val, idx) => idx))
    const [selectedPlace, setSelectedPlace] = useState<string | number>('Select a place')

    return (
        <Modal title="Book a ticket" isOpen={true} onClose={onClose}>
            <div className={style.orderModal}>
                <div className={style.placeSelector}>
                    {places.map((place, index) => {
                        return (
                            <div
                                key={index}
                                className={style.place}
                                onClick={() => setSelectedPlace(index)}
                            >
                                {index}
                            </div>
                        )
                    })}
                </div>
                <div className={style.orderInfo}>
                    <h2>Order details</h2>
                    <MovieInfo title="Selected place" content={selectedPlace} />
                    <MovieInfo title="Movie" content={data?.movie.title} />
                    <MovieInfo title="Begins at" content={session.begin_at.toLocaleString()} />
                    <MovieInfo title="Runtime" content={data?.movie.runtime} />
                    <MovieInfo title="Hall" content={`${data?.hall.name} ${data?.hall.type}`} />
                    <MovieInfo title="Ticket price" content={'$' + data?.movie.price} />
                </div>
            </div>
        </Modal>
    )
}
