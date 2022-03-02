import style from '@/styles/admin.module.scss'

const TablePlaceholder = () => {
    const items = []
    let count = 0
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            items.push(
                <span className={`${style.tableCell} ${style.pulseAnimation}`} key={count} />
            )
            count++
        }
    }

    return <>{items}</>
}

export default TablePlaceholder
