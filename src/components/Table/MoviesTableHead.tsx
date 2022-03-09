import style from '@/assets/styles/admin.module.scss'

export const MoviesTableHead: React.FC = () => {
    return (
        <>
            <span className={style.tableHead}>ID</span>
            <span className={style.tableHead}>Title</span>
            <span className={style.tableHead}>Description</span>
            <span className={style.tableHead}>Poster</span>
            <span className={style.tableHead}>Price</span>
            <span className={style.tableHead}>Year</span>
            <span className={style.tableHead}>Duration</span>
            <span className={style.tableHead}>Category</span>
            <span className={style.tableHead}>Producer</span>
            <span className={style.tableHead}>Actions</span>
        </>
    )
}
