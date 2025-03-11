import React, { useEffect, useState } from "react";
import { Text } from "@react-three/drei";

export default function TypeWriterText({ texts, delay = 150, ...props }) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    if (texts.length === 0) return; // اگر متنی وجود ندارد، کاری نکن

    const timeout = setTimeout(() => {
      // اگر متن فعلی تمام شده باشد، به متن بعدی برو
      if (currentIndex === texts[currentTextIndex].length) {
        setTimeout(() => {
          setCurrentText("");
          setCurrentIndex(0);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length); // به متن بعدی برو
        }, 2000); // تاخیر قبل از شروع متن بعدی
      } else {
        // حرف بعدی را اضافه کن
        setCurrentText((prev) => prev + texts[currentTextIndex][currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentIndex, currentTextIndex, delay, texts]);

  return (
    <Text
      font="/fonts/Sigmar-Regular.ttf"
      fontSize={0.5}
      position={[0, 2.5, 0]}
      rotation-y={0}
      maxWidth={9}
      textAlign="center"
      color="#A03C3C"
      outlineWidth={0.05}
      outlineColor="white"
      {...props}
    >
      {currentText}
    </Text>
  );
}