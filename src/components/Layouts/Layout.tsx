import { Link, Outlet } from 'react-router-dom'
import style from '@/styles/layout.module.scss'
import { Logo } from '@/assets/icons/Brand'
import { useAuth } from '@/providers/AuthProvider'

const Layout = () => {
    const { user } = useAuth()
    return (
        <>
            <div className={style.layout}>
                <Link to="/movies">Movies</Link>
                <Link to="/" style={{ margin: '0 20px' }}>
                    <Logo width={36} />
                </Link>
                {user ? <Link to="/admin">{user.name}</Link> : <Link to="/signin">Sign in</Link>}
            </div>
            <Outlet />
        </>
    )
}

export default Layout
