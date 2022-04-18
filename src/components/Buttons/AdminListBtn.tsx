import { Link } from '@tanstack/react-location'
import style from '@/assets/styles/admin.module.scss'

interface Props {
    title: string
    path: string
}

export const AdminListBtn: React.FC<Props> = ({ title, path }) => {
    return (
        <>
            {path.substring(7) === title.toLowerCase() ? (
                <button className={style.btnActive} disabled>
                    {title}
                </button>
            ) : (
                <Link to={`${title.toLowerCase()}`}>
                    <button>{title}</button>
                </Link>
            )}
        </>
    )
}
