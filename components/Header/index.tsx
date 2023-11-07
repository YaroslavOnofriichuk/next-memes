import styles from './header.module.css'
import Logo from './Logo'
import Search from './Search'

export default function Header() {
  return (
    <header className={styles.header}>
        <div className='container'>
            <div className={styles.content}>
                <Logo />
                <Search />
            </div>
        </div>
    </header>
  )
}
