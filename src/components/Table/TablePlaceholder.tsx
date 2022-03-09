import style from '@/assets/styles/admin.module.scss'

interface Props {
    cols: number
    rows: number
}

export const TablePlaceholder: React.FC<Props> = ({ cols, rows }) => {
    const items = []
    let count = 0
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            items.push(
                <span className={`${style.tableCell} ${style.pulseAnimation}`} key={count} />
            )
            count++
        }
    }

    return <>{items}</>
}
