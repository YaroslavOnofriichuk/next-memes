import { RefObject } from "react";
import Image from "next/image";
import styles from "./confirm.module.css";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

interface Props {
    onClick: (value: boolean) => void;
}

export default function Confirm(props: Props) {
    const ref = useOutsideClick(() => props.onClick(false));
    
    return (
        //@ts-ignore
        <div className={styles.confirm} ref={ref}>
            <p className={styles.title}>Delete the Category?</p>
            <p className={styles.text}>
                {
                    'All templates in the category will be moved to the category "Other"'
                }
            </p>

            <button
                type="button"
                className={styles.button + " " + styles.delete}
                onClick={() => props.onClick(true)}
            >
                <Image
                    src="/delete-white.svg"
                    alt="delete"
                    width={16}
                    height={16}
                    style={{ marginRight: "10px" }}
                />
                Delete
            </button>

            <button
                type="button"
                className={styles.button + " " + styles.cancel}
                onClick={() => props.onClick(false)}
            >
                Cancel
            </button>

            <button
                type="button"
                className={styles.close}
                onClick={() => props.onClick(false)}
            >
                <Image src="/close.svg" alt="close" width={10} height={10} />
            </button>
        </div>
    );
}
