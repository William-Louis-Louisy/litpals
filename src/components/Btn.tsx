import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { IBtnProps } from "../types/Btn.types";

const Btn = ({
  label,
  onClick,
  bgColor = "#006bb6",
  color = "white",
  size = 16,
}: IBtnProps) => {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: bgColor,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 6,
      }}
      onPress={onClick}
    >
      <Text style={{ color: color, fontSize: size }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Btn;
