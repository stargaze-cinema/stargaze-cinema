import { useLocation, Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Logo } from '@/assets/icons/Brand'
import { AdminListBtn } from '../Buttons/AdminListBtn'
import style from '@/assets/styles/admin.module.scss'

export const AdminLayout: React.FC = () => {
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
