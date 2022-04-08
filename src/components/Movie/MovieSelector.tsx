import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useModal } from '@/providers/ModalProvider'
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
    const { showModal } = useModal()
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
        <>
            {sessions.length === 0 ? (
                <div className={`${style.selectorWrapper} ${style.pulseAnimation}`} />
            ) : (
                <div className={style.selectorWrapper}>
                    <h2 className={style.selectorTitle}>Available sessions</h2>
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
                            {selector.sessions.map(session => {
                                return (
                                    dayjs(selectedDate).isSame(session.begin_at, 'day') && (
                                        <button
                                            key={session.id}
                                            className={style.sessionBtn}
                                            onClick={() => showModal('OrderModal', { session })}
                                        >
                                            {dayjs(session.begin_at).format('HH:mm')}
                                        </button>
                                    )
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
