import { useLocation, Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Logo } from '@/assets/icons/Brand'
import style from '@/styles/admin.module.scss'

interface Props {
    title: string
    path: string
}

const AdminListBtn = ({ title, path }: Props) => {
    return (
        <>
            {path.substring(7) === title.toLowerCase() ? (
                <button className={style.btnActive} disabled>
                    {title}
                </button>
            ) : (
                <Link to={`/admin/${title.toLowerCase()}`}>
                    <button>{title}</button>
                </Link>
            )}
        </>
    )
}

const AdminLayout = () => {
    const location = useLocation()
    return (
        <div className={style.layout}>
            <div className={style.head}>
                <Link to="/">
                    <Logo width={36} />
                </Link>
                <span>PAXANDDOS</span>
                <button>Log out</button>
            </div>
            <div className={style.body}>
                <div className={style.sidebar}>
                    <AdminListBtn title="Users" path={location.pathname} />
                    <AdminListBtn title="Movies" path={location.pathname} />
                    <AdminListBtn title="Halls" path={location.pathname} />
                    <AdminListBtn title="Sessions" path={location.pathname} />
                    <AdminListBtn title="Tickets" path={location.pathname} />
                    <AdminListBtn title="Categories" path={location.pathname} />
                    <AdminListBtn title="Producers" path={location.pathname} />
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout
