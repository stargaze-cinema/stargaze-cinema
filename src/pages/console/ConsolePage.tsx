import { Logo } from '@/assets/icons/Brand'
import style from '@/components/Layouts/adminLayout.module.scss'

export const ConsolePage: React.FC = () => {
    return (
        <div className={style.rootPage}>
            <div className={style.rootBtn}>
                <Logo width={100} />
                <h1 style={{ textAlign: 'center' }}>
                    Stargaze Cinema Console <br />
                    v1.0
                </h1>
            </div>
        </div>
    )
}
