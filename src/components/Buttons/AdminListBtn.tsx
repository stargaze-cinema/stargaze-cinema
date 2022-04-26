import { Link } from '@tanstack/react-location'
import style from '../Layouts/adminLayout.module.scss'

interface Props {
    title: string
    path: string
}

export const AdminListBtn: React.FC<Props> = ({ title, path }) => {
    return (
        <>
            {path.substring(7) === title.toLowerCase() ? (
                <button type="button" className={style.btnActive} disabled>
                    {title}
                </button>
            ) : (
                <Link to={`${title.toLowerCase()}`}>
                    <button type="button">{title}</button>
                </Link>
            )}
        </>
    )
}
