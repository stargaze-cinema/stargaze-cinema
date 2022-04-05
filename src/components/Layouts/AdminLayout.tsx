import { useLocation, Outlet, Link } from '@tanstack/react-location'
import { Logo } from '@/assets/icons/Brand'
import { AdminListBtn } from '../Buttons/AdminListBtn'
import style from '@/assets/styles/admin.module.scss'

export const AdminLayout: React.FC = () => {
    const path = useLocation().current.pathname

    return (
        <div className={style.layout}>
            <div className={style.head}>
                <Link to="/">
                    <Logo width={36} />
                </Link>
                <span>Administration console</span>
                <button>Log out</button>
            </div>
            <div className={style.body}>
                <div className={style.sidebar}>
                    <AdminListBtn title="Users" path={path} />
                    <AdminListBtn title="Movies" path={path} />
                    <AdminListBtn title="Halls" path={path} />
                    <AdminListBtn title="Sessions" path={path} />
                    <AdminListBtn title="Tickets" path={path} />
                    <AdminListBtn title="Categories" path={path} />
                    <AdminListBtn title="Producers" path={path} />
                </div>
                <Outlet />
            </div>
        </div>
    )
}
