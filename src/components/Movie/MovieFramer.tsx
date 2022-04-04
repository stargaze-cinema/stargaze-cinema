import { Frame } from '@/types/Frame'
import style from './movieSelector.module.scss'

interface Props {
    frames: Frame[]
}

export const MovieFramer: React.FC<Props> = ({ frames }) => {
    return (
        <div className={style.movieSelector}>
            {frames.map(frame => (
                <img key={frame.id} src={frame.image} />
            ))}
        </div>
    )
}
