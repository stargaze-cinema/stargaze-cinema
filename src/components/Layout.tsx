import { Link, Outlet } from 'react-router-dom'
import style from '@/styles/layout.module.scss'
import { Logo } from '@/assets/icons/Brand'

const Layout = () => {
	return (
		<>
			<div className={style.layout}>
				<Link to="/movies">Movies</Link>
				<Link to="/" style={{ margin: '0 20px' }}>
					<Logo width={36} />
				</Link>
				<Link to="/signin">Sign in</Link>
			</div>
			<Outlet />
		</>
	)
}

export default Layout
