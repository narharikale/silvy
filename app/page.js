
'use client'

import { useState } from 'react'
import MeetModal from './components/MeetModal/MeetModal'
import styles from '../styles/home.module.css'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlerModalOpen = () => {
    setIsModalOpen(true)
  }

  const handlerModalClose = () => {
    setIsModalOpen(false)
  }
  
  return (
    <div className={styles.container}>
      <button className={styles.joinButton} onClick={handlerModalOpen}>
        Join Meeting
      </button>
      <MeetModal isOpen={isModalOpen} onClose={handlerModalClose} />
    </div>
  );
}
