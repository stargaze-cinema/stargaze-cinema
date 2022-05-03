import { Link, Outlet } from '@tanstack/react-location'
import { Logo } from '@/assets/icons/Brand'
import { useAuth } from '@/providers/AuthProvider'
import style from './layout.module.scss'

export const Layout: React.FC = () => {
    const { user } = useAuth()

    return (
        <>
            <div className={style.layout}>
                <Link to="/sessions">Sessions</Link>
                <Link to="/movies">Movies</Link>
                <Link to="/" style={{ margin: '0 20px' }}>
                    <Logo width={36} />
                </Link>
                {user ? <Link to="/account">{user.name}</Link> : <Link to="/signin">Sign in</Link>}
            </div>
            <Outlet />
        </>
    )
}
