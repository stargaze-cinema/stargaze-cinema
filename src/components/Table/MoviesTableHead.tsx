import style from '@/components/Layouts/adminLayout.module.scss'

export const MoviesTableHead: React.FC = () => {
    return (
        <>
            <span className={style.tableHead}>ID</span>
            <span className={style.tableHead}>Title</span>
            <span className={style.tableHead}>Synopsis</span>
            <span className={style.tableHead}>Poster</span>
            <span className={style.tableHead}>Price</span>
            <span className={style.tableHead}>Year</span>
            <span className={style.tableHead}>Runtime</span>
            <span className={style.tableHead}>Rating</span>
            <span className={style.tableHead}>Language</span>
            <span className={style.tableHead}>Countries</span>
            <span className={style.tableHead}>Genres</span>
            <span className={style.tableHead}>Directors</span>
            <span className={style.tableHead}>Actions</span>
        </>
    )
}
