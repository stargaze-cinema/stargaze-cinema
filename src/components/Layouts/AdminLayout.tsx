import { Outlet, Link, Navigate } from '@tanstack/react-location'
import { Logo } from '@/assets/icons/Brand'
import { AdminListBtn } from '../Buttons/AdminListBtn'
import style from './adminLayout.module.scss'
import { useAuth } from '@/providers/AuthProvider'
import { hasAdminRole } from '@/services/authService'

export const AdminLayout: React.FC = () => {
    const { user, signOut } = useAuth()

    return (
        <>
            {hasAdminRole(user) ? (
                <div className={style.layout}>
                    <div className={style.head}>
                        <Link to="/">
                            <Logo width={36} />
                        </Link>
                        <span>Administration console</span>
                        <button onClick={signOut}>Log out</button>
                    </div>
                    <div className={style.body}>
                        <div className={style.sidebar}>
                            <AdminListBtn title="Movies" />
                            <AdminListBtn title="Sessions" />
                            <AdminListBtn title="Tickets" />
                            <AdminListBtn title="Halls" />
                            <AdminListBtn title="Genres" />
                            <AdminListBtn title="Directors" />
                        </div>
                        <Outlet />
                    </div>
                </div>
            ) : (
                <>
                    <Navigate to="/signin" />
                    <Outlet />
                </>
            )}
        </>
    )
}
