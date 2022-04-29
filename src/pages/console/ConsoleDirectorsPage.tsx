import { useQuery } from 'react-query'
import { useModal } from '@/providers/ModalProvider'
import { DirectorsTable } from '@/components/Console/DirectorsTable'
import { CreateRecordBtn } from '@/components/Buttons/CreateRecordBtn'
import { getDirectors } from '@/services/directorService'
import style from '@/assets/styles/console.module.scss'

export const ConsoleDirectorsPage: React.FC = () => {
    const { showModal } = useModal()
    const query = useQuery(['directors'], getDirectors)

    return (
        <div className={style.tablePage}>
            <div className={style.tableBtns}>
                <CreateRecordBtn onClick={() => showModal('DirectorFormModal')} />
            </div>
            <DirectorsTable query={query} />
        </div>
    )
}
