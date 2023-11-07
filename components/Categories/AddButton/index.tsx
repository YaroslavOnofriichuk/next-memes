import Image from 'next/image'
import styles from './button.module.css'

interface Props {
  onAddCategory: () => void;
}

export default function AddButton(props: Props) {
  return (
    <button className={styles.button} type='button' onClick={props.onAddCategory}>
        <Image
          src="/plus.svg"
          alt="plus"
          width={14}
          height={14}
        />
        <p className={styles.text}>Create a Category</p>
    </button>
  )
}
