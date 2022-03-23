import { Logo } from '@/assets/icons/Brand'
import style from '@/assets/styles/admin.module.scss'

export const ConsolePage: React.FC = () => {
    return (
        <div className={style.rootPage}>
            <div className={style.rootBtn}>
                <Logo width={100} />
                <h1>Stargaze Cinema Admin v1.0</h1>
            </div>
        </div>
    )
}
