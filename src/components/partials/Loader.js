import styles from  "../../assets/css/loader.module.css"

const Loader = () => {
    return (
        <div className={styles.content}>
        <div className={styles.loading}>
        <p>loading</p>
            <span></span>
        </div>
        </div>
    )
}

export default Loader
