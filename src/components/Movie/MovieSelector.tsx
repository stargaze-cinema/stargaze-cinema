import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Session } from '@/types/Session'
import style from './movieSelector.module.scss'

interface Props {
    sessions: Session[]
}

interface Selector {
    dates: Session[]
    sessions: Session[]
}

export const MovieSelector: React.FC<Props> = ({ sessions }) => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const selector: Selector = useMemo(() => {
        const sortedSessions = sessions.sort((a: any, b: any) => a.begin_at - b.begin_at)

        return {
            dates: sortedSessions.filter((item, pos, self) =>
                pos === 0 ? true : !dayjs(item.begin_at).isSame(self[pos - 1].begin_at, 'day')
            ),
            sessions: sortedSessions,
        }
    }, [sessions])

    return (
        <div className={style.selector}>
            <div className={style.dates}>
                {selector.dates.map(({ id, begin_at }) => {
                    return (
                        <button
                            key={id}
                            className={style.dateBtn}
                            data-same={dayjs(selectedDate).isSame(begin_at, 'day')}
                            onClick={() => setSelectedDate(begin_at)}
                        >
                            {dayjs(begin_at).format('dddd DD.MM')}
                        </button>
                    )
                })}
            </div>
            <div className={style.sessions}>
                {selector.sessions.map(({ id, begin_at }) => {
                    return (
                        dayjs(selectedDate).isSame(begin_at, 'day') && (
                            <button key={id} className={style.sessionBtn}>
                                {dayjs(begin_at).format('HH:mm')}
                            </button>
                        )
                    )
                })}
            </div>
        </div>
    )
}
