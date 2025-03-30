"use client";

import { useState, useRef } from "react";
import styles from "./MeetButton.module.css";
import { Meet } from "../Meet/Meet";

export default function MeetButton({ className }) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  let isDragging = false;
  let offsetX, offsetY;

  const startDrag = (e) => {
    isDragging = true;
    offsetX = e.clientX - popupRef.current.getBoundingClientRect().left;
    offsetY = e.clientY - popupRef.current.getBoundingClientRect().top;
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    popupRef.current.style.left = `${e.clientX - offsetX}px`;
    popupRef.current.style.top = `${e.clientY - offsetY}px`;
  };

  const stopDrag = () => {
    isDragging = false;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
  };

  const startResize = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", onResize);
    document.addEventListener("mouseup", stopResize);
  };

  const onResize = (e) => {
    popupRef.current.style.width = `${
      e.clientX - popupRef.current.getBoundingClientRect().left
    }px`;
    popupRef.current.style.height = `${
      e.clientY - popupRef.current.getBoundingClientRect().top
    }px`;
  };

  const stopResize = () => {
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", stopResize);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className={className}>
        Join Meet
      </button>
      {isOpen && (
        <div ref={popupRef} className={styles.popup}>
          <div className={styles.popupHeader} onMouseDown={startDrag}></div>
          <div className={styles.popupContent}>
            <Meet onClose={() => setIsOpen(false)} />
          </div>
          <div className={styles.resizeHandle} onMouseDown={startResize}></div>
        </div>
      )}
    </div>
  );
}
