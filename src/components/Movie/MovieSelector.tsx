import { Session } from '@/types/Session'
import style from './movieFramer.module.scss'

interface Props {
    sessions: Session[]
}

export const MovieSelector: React.FC<Props> = ({ sessions }) => {
    return <div className={style.movieFramer}></div>
}
