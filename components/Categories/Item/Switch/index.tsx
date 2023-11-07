import styles from "./switch.module.css";

interface Props {
    value: boolean;
    onClick: () => void;
}

export default function Switch(props: Props) {
    return (
        <button
            className={`${styles.switch} ${
                props.value ? styles["active-switch"] : ""
            }`}
            onClick={props.onClick}
        >
            {props.value ? (
                <p className={styles.text + " " + styles["active-text"]}>On</p>
            ) : (
                <div className={styles.circle}></div>
            )}

            {props.value ? (
                <div
                    className={styles.circle + " " + styles["active-circle"]}
                ></div>
            ) : (
                <p className={styles.text}>Off</p>
            )}
        </button>
    );
}
