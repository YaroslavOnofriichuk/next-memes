import Image from 'next/image'
import styles from './logo.module.css'

export default function Logo() {
  return (
    <div className={styles.logo}>
        <Image
          src="/Logo.png"
          alt="Logo"
          width={78}
          height={30}
          priority
        />
        <p className={styles.logo_text}>Memes</p>
    </div>
  )
}
