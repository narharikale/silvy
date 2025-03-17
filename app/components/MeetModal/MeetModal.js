'use client'

import { Meet } from '../Meet/Meet';
import styles from './MeetModal.module.css'

export default function MeetModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.modal}>
                <Meet onClose={onClose}/>
            </div>
        </>
    )
}   