"use client";

import { useEffect, useState, useRef } from "react";
import { motion, easeOut } from "framer-motion";

const FONT_DIGITAL = "'Digital-7 Mono', monospace";
const FONT_LABEL = "'Montserrat', sans-serif";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomTimeInSeconds() {
  const h = randomInt(5, 100);
  const m = randomInt(0, 59);
  const s = randomInt(0, 59);
  return h * 3600 + m * 60 + s;
}

function secondsToHMS(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return { h, m, s };
}

export default function Countdown() {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const hoursElapsedRef = useRef(0);
  const secondCounterRef = useRef(0);
  const [floatingNumbers, setFloatingNumbers] = useState<
    { id: number; value: number; x: number; y: number; size: number }[]
  >([]);

  useEffect(() => {
    setSecondsLeft(randomTimeInSeconds());

    const interval = setInterval(() => {
      setSecondsLeft((secs) => (secs > 0 ? secs - 1 : 0));
      secondCounterRef.current++;

      if (secondCounterRef.current >= 3600) {
        hoursElapsedRef.current++;
        secondCounterRef.current = 0;

        setSecondsLeft((secs) => {
          let newSecs = secs - hoursElapsedRef.current * 3600;
          if (newSecs <= 3 * 3600) {
            newSecs = randomTimeInSeconds();
            hoursElapsedRef.current = 0;
          }
          return newSecs > 0 ? newSecs : 0;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { h, m, s } = secondsToHMS(secondsLeft);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: easeOut },
  };

  const handleButtonClick = () => {
    // Animación de botón
    const randomNum = randomInt(0, 99);
    const randomX = randomInt(0, window.innerWidth - 100);
    const randomY = randomInt(0, window.innerHeight - 100);
    const randomSize = randomInt(20, 80);

    const newItem = {
      id: Date.now(),
      value: randomNum,
      x: randomX,
      y: randomY,
      size: randomSize,
    };

    setFloatingNumbers((prev) => [...prev, newItem]);

    setTimeout(() => {
      setFloatingNumbers((prev) => prev.filter((item) => item.id !== newItem.id));
    }, 2000);
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        width: "100vw",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
        userSelect: "none",
        padding: 16,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.img
        src="/tabi.png"
        alt="Tabi Logo"
        style={{
          userSelect: "none",
          maxWidth: 120,
          height: "auto",
          marginBottom: 20,
        }}
        {...fadeInUp}
      />

      <motion.div
        {...fadeInUp}
        style={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: FONT_DIGITAL,
          userSelect: "none",
          fontSize: "clamp(3rem, 5vw, 6rem)",
          lineHeight: 1,
          color: "#d1102b",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
          <span
            style={{
              fontFamily: FONT_DIGITAL,
              fontWeight: "normal",
              fontSize: "inherit",
              minWidth: "2.5ch",
              textAlign: "right",
            }}
          >
            {h}
          </span>
          <span
            style={{
              fontWeight: 700,
              fontFamily: FONT_LABEL,
              fontSize: "0.35em",
              textTransform: "uppercase",
              color: "white",
              userSelect: "none",
              lineHeight: 1,
              marginBottom: "0.15em",
            }}
          >
            H
          </span>
        </div>

        <span
          style={{
            fontFamily: FONT_LABEL,
            fontWeight: 500,
            fontSize: "0.7em",
            color: "white",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          :
        </span>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
          <span
            style={{
              fontFamily: FONT_DIGITAL,
              fontWeight: "normal",
              fontSize: "inherit",
              minWidth: "2.5ch",
              textAlign: "right",
            }}
          >
            {m.toString().padStart(2, "0")}
          </span>
          <span
            style={{
              fontWeight: 700,
              fontFamily: FONT_LABEL,
              fontSize: "0.35em",
              textTransform: "uppercase",
              color: "white",
              userSelect: "none",
              lineHeight: 1,
              marginBottom: "0.15em",
            }}
          >
            M
          </span>
        </div>

        <span
          style={{
            fontFamily: FONT_LABEL,
            fontWeight: 500,
            fontSize: "0.7em",
            color: "white",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          :
        </span>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
          <span
            style={{
              fontFamily: FONT_DIGITAL,
              fontWeight: "normal",
              fontSize: "inherit",
              minWidth: "2.5ch",
              textAlign: "right",
            }}
          >
            {s.toString().padStart(2, "0")}
          </span>
          <span
            style={{
              fontWeight: 700,
              fontFamily: FONT_LABEL,
              fontSize: "0.35em",
              textTransform: "uppercase",
              color: "white",
              userSelect: "none",
              lineHeight: 1,
              marginBottom: "0.15em",
            }}
          >
            S
          </span>
        </div>
      </motion.div>

      {/* Botón */}
      <motion.img
        src="/button.webp"
        alt="Botón rojo"
        className="cursor-pointer"
        whileTap={{ scale: 0.9, rotate: -5 }}
        onClick={handleButtonClick}
        style={{
          width: 150,
          height: "auto",
          userSelect: "none",
        }}
      />

      {/* Números flotantes */}
      {floatingNumbers.map((item) => (
        <motion.span
          key={item.id}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -100, scale: 1.5 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: item.x,
            top: item.y,
            fontFamily: FONT_DIGITAL,
            fontSize: item.size,
            color: "#d1102b",
            pointerEvents: "none",
          }}
        >
          {item.value}
        </motion.span>
      ))}
    </div>
  );
}
