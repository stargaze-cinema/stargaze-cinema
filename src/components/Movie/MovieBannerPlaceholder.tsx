import style from './movieBanner.module.scss'

interface Props {
    items: number
}

export const MovieBannerPlaceholder: React.FC<Props> = ({ items }) => {
    const props = []
    let count = 0
    for (let i = 0; i < items; i++) {
        props.push(<div className={`${style.banner} ${style.pulseAnimation}`} key={count} />)
        count++
    }

    return <>{props}</>
}
