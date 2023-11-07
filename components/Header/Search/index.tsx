"use client";
import { ChangeEvent } from "react";
import { useAppContext } from '../../../lib/AppContext';
import Image from 'next/image'
import styles from './search.module.css'

export default function Search() {
  const { state, setState } = useAppContext()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value)
  };

  return (
    <div className={styles.wrapper}>
        <input 
            placeholder='Search'
            className={styles.input}
            value={state}
            onChange={onChange}
        />
        
        <Image
          src="/search.svg"
          alt="search"
          width={20}
          height={20}
        />
    </div>
  )
}
