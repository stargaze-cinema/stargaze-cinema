import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Session } from '@/types/Session'
import style from './movieSelector.module.scss'

interface Props {
    sessions: Session[]
}

export const MovieSelector: React.FC<Props> = ({ sessions }) => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const dates: Date[] = useMemo(() => {
        const dates = sessions.map(session => session.begin_at.split('T')[0])
        dates.push('2022-06-04')
        return [...new Set(dates)].map(d => new Date(d)).sort((a: any, b: any) => a - b)
    }, [sessions])

    return (
        <div className={style.selector}>
            <div className={style.dates}>
                {dates.map(date => {
                    return (
                        <button
                            key={date.getTime()}
                            className={style.dateBtn}
                            data-same={dayjs(selectedDate).isSame(date, 'year')}
                            onClick={() => setSelectedDate(date)}
                        >
                            {dayjs(date).format('dddd DD.MM')}
                        </button>
                    )
                })}
            </div>
            <div className={style.sessions}></div>
        </div>
    )
}
