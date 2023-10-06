import styles from './Home.module.css'

const Home = () => {
    return (
        <div className={styles['image']}>
            <div className={styles['title']}>Welcome to <span>Deli</span></div>
        </div>
    )
}

export default Home;