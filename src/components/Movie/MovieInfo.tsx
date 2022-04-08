import style from './movieInfo.module.scss'

interface Props {
    title: string
    content: string | number
}

export const MovieInfo: React.FC<Props> = ({ title, content }) => {
    return (
        <div className={style.movieInfoBlock}>
            <h3 className={style.movieInfoTitle}>{title}</h3>
            <span className={style.movieInfoContent}>{content}</span>
        </div>
    )
}
