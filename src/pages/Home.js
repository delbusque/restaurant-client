import styles from './Home.module.css'

const Home = () => {
    return (
        <div className={styles['image']}>
            <div className={styles['title']}>Welcome to <span>Вкусно</span></div>
        </div>
    )
}

export default Home;