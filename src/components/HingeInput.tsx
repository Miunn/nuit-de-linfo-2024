import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface HingeInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  hingePosition: "left" | "right";
  startRotation?: number;
  zIndex: number;
  paddingHorizontal: number;
  onFocus: () => void;
  inputStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  type?: string;
}

const HingeInput: React.FC<HingeInputProps> = ({
  placeholder,
  value,
  onChangeText,
  hingePosition,
  startRotation = 0,
  zIndex,
  paddingHorizontal,
  onFocus,
  inputStyle,
  style,
  type = "text",
}) => {
  const [inputWidth, setInputWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const direction = hingePosition === "right" ? -1 : 1;

  const rotation = useAnimation();
  const slide = useAnimation();

  useEffect(() => {
    // Calculate rotation based on the length of the input
    let newRotation = startRotation;
    if (value.length < 10) {
      newRotation = -value.length * direction + startRotation;
    } else if (value.length < 20) {
      newRotation = -20 * direction;
    } else {
      newRotation = -90 * direction;
    }

    rotation.start({
      rotate: `${newRotation}deg`,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    });

    // Slide animation for right hinge
    if (hingePosition === "right" && value.length) {
      slide.start({
        x: containerWidth - inputWidth - paddingHorizontal * 2,
        transition: { duration: 3 },
      });
    } else {
      slide.start({ x: 0, transition: { duration: 0.5 } });
    }
  }, [value, direction, hingePosition, startRotation, containerWidth, inputWidth, paddingHorizontal, rotation, slide]);

  return (
    <motion.div
      className="inputContainer"
      style={{
        zIndex,
        padding: `0 ${paddingHorizontal}px`,
        ...style,
      }}
      animate={rotation}
      ref={(ref) => {
        if (ref) {
          setContainerWidth(ref.offsetWidth);
        }
      }}
    >
      <motion.input
        type={type}
        className="input"
        style={inputStyle}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        onFocus={onFocus}
        animate={slide}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => e.stopPropagation()}
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          const width = (e.target as HTMLInputElement).offsetWidth;
          setInputWidth(width);
        }}
      />
    </motion.div>
  );
};

export default HingeInput;
