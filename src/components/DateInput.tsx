import { View, Text, TextInput, StyleSheet, Keyboard } from "react-native";
import React, { forwardRef, useRef } from "react";
import { Bloop, IDateProps } from "../types/Date.types";

const DateInput = forwardRef(({ bloop, setDate }: IDateProps, ref) => {
  const dayRef = ref ? ref : useRef<TextInput>(null);
  const monthRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);

  const validateDate = () => {
    const year = Number(bloop.year);
    const month = Number(bloop.month) - 1;
    const day = Number(bloop.day);
    const date: Date = new Date(Date.UTC(year, month, day));
    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month ||
      date.getUTCDate() !== day
    ) {
      showToast({
        type: "error",
        headline: "This date doesn't seem right",
        message: "Please verify your birthdate.",
      });
    }
  };

  const handleBackspace = (e: any, value: keyof Bloop) => {
    if (!bloop[value] && e.nativeEvent.key === "Backspace") {
      if (value === "month") dayRef.current.focus();
      else if (value === "year") monthRef.current.focus();
    }
  };

  const handleDateChange = (e: any, value: string) => {
    if ((value === "day" || value === "month") && e.length === 2) {
      if (value === "day") monthRef.current.focus();
      else if (value === "month") yearRef.current.focus();
    } else if (value === "year" && e.length === 4) Keyboard.dismiss();
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          ref={dayRef}
          style={[styles.input, { width: 65 }]}
          value={bloop.day}
          placeholder={"dd"}
          keyboardType="number-pad"
          maxLength={2}
          returnKeyType="next"
          onChangeText={(e) => [
            handleDateChange(e, "day"),
            setDate({ ...bloop, day: e }),
          ]}
        />
        <Text style={styles.slash}>/</Text>
        <TextInput
          ref={monthRef}
          style={[styles.input, { width: 65 }]}
          value={bloop.month}
          placeholder={"mm"}
          keyboardType="number-pad"
          maxLength={2}
          returnKeyType="next"
          onKeyPress={(e) => handleBackspace(e, "month")}
          onChangeText={(e) => [
            handleDateChange(e, "month"),
            setDate({ ...bloop, month: e }),
          ]}
        />
        <Text style={styles.slash}>/</Text>
        <TextInput
          ref={yearRef}
          style={[styles.input, { width: 85 }]}
          value={bloop.year}
          placeholder={"aaaa"}
          keyboardType="number-pad"
          maxLength={4}
          onBlur={validateDate}
          onKeyPress={(e) => handleBackspace(e, "year")}
          onChangeText={(e) => [
            handleDateChange(e, "year"),
            setDate({ ...bloop, year: e }),
          ]}
        />
      </View>
    </View>
  );
});

export default DateInput;

const styles = StyleSheet.create({
  slash: {
    fontSize: 20,
    margin: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 20,
    fontFamily: "Nunito-Medium",
    textAlign: "center",
  },
});
