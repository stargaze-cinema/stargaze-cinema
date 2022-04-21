import { useQuery } from 'react-query'
import { Modal } from './Modal'
import { Session } from '@/types/Session'
import style from '@/assets/styles/modal.module.scss'
import { getSession } from '@/services/sessionService'

interface Props {
    session: Session
    onClose: () => void
}

export const OrderModal: React.FC<Props> = ({ session, onClose }) => {
    const { data, status } = useQuery(['session', session.id], () => getSession(session.id))

    return (
        <Modal title="Book a ticket" isOpen={true} onClose={onClose}>
            <div className={style.orderModal}>
                {status === 'loading' ? <span>Loading...</span> : <span>{data?.id}</span>}
            </div>
        </Modal>
    )
}
