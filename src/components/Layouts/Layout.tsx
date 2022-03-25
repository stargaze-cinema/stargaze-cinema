import { Link, Outlet } from 'react-router-dom'
import style from '@/assets/styles/layout.module.scss'
import { Logo } from '@/assets/icons/Brand'
import { useAuth } from '@/providers/AuthProvider'

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
