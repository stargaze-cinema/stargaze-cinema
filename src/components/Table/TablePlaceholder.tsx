import style from '@/styles/admin.module.scss'

type Props = {
    cols: number
    rows: number
}

const TablePlaceholder = ({ cols, rows }: Props) => {
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

export default TablePlaceholder
