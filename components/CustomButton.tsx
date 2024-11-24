import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (varient: ButtonProps["bgVariant"]) => {
  switch (varient) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariantStyle = (varient: ButtonProps["textVariant"]) => {
  switch (varient) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};
const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVarient = "default",
  IconLeft,
  IcontRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      className={`p-3 w-full rounded-full border border-blue-400 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-bold ${getTextVariantStyle(textVarient)}`}>
        {title}
      </Text>
      {IcontRight && <IcontRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
