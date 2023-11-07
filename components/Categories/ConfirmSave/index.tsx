import Image from 'next/image'
import styles from './confirm.module.css'

interface Props {
  onClick: (value: boolean) => void;
}

export default function Confirm(props: Props) {
  return (
    <div className={styles.confirm}>
        <div className={styles.container}>
            <button
                type='button'
                className={styles.button + " " + styles.save}
                onClick={() => props.onClick(true)}
            >
                <Image
                    src="/check-circle.svg"
                    alt="save"
                    width={20}
                    height={20}
                    style={{ marginRight: "10px" }}
                />
                Save
            </button>

            <button
                type='button'
                className={styles.button}
                onClick={() => props.onClick(false)}
            >
                Cancel
            </button>
        </div>
    </div>
  )
}
