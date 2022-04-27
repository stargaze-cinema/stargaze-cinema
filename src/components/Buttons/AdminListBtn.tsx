import { Link, useLocation } from '@tanstack/react-location'
import style from '../Layouts/adminLayout.module.scss'

export const AdminListBtn: React.FC<{ title: string }> = ({ title }) => {
    const path = useLocation().current.pathname

    return (
        <>
            {path.substring(1) === title.toLowerCase() ? (
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
