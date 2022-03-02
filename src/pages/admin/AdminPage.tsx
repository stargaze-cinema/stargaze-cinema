import { Logo } from '@/assets/icons/Brand'
import style from '@/styles/admin.module.scss'

const AdminPage = () => {
    return (
        <div className={style.rootPage}>
            <div className={style.rootBtn}>
                <Logo width={100} />
                <h1>Stargaze Cinema Admin v1.0</h1>
            </div>
        </div>
    )
}

export default AdminPage
