import { ChangeEvent } from "react";
import Image from "next/image";
import styles from "./item.module.css";
import type { Category } from "../../../types";
import Switch from "./Switch";

interface Props {
    category: Category;
    handleDelete: () => void;
    handleChange: (body: Category) => void;
    openConfirm: boolean;
}

export default function Item(props: Props) {
    const handleClick = () => {
        props.handleChange({
            ...props.category,
            show: !props.category.show,
        });
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.handleChange({
            ...props.category,
            name: event.target.value,
        });
    };

    return (
        <li className={styles.item}>
            <input
                type="text"
                className={styles.text}
                placeholder="Enter Category Name"
                defaultValue={props.category.name}
                onChange={onChange}
            />
            {props.openConfirm && props.category.name.trim().length === 0 && (
                <p className={styles.textError}>Name should not be empty</p>
            )}

            <div className={styles.constrols}>
                <Switch value={props.category.show} onClick={handleClick} />

                {!props.category.lock && (
                    <button
                        type="button"
                        onClick={props.handleDelete}
                        className={styles.delete}
                    >
                        <Image
                            src="/delete.svg"
                            alt="delete"
                            width={26}
                            height={26}
                        />
                    </button>
                )}

                {!props.category.lock && (
                    <div className={styles.drag}>
                        <Image
                            src="/drag.svg"
                            alt="drag"
                            width={8}
                            height={13}
                        />
                    </div>
                )}
            </div>
        </li>
    );
}
