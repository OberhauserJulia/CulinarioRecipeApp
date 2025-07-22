import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import IngredientModal from "./IngredientModal";

interface InputFieldProps {
  stepNumber: number;
  placeholder: string;
  inputValue?: string;
  onChangeText?: (text: string) => void;
}

export default function InputFieldSteps({ stepNumber, placeholder, inputValue, onChangeText }: InputFieldProps) {
  const [height, setHeight] = useState(49);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-row gap-6">

      <View className="bg-primary w-[40px] h-[40px] p-[6px] text-center font-robotoMedium items-center justify-center rounded-[5px]">
        <Text className="text-[16px] font-robotoMedium leading-[25px] text-white text-center">{stepNumber}</Text>
      </View>

      <View className="flex-1 flex-col w-full items-center">

        <TextInput
          className="bg-lightbackground rounded-[15px] p-[10px] flex-1 w-full"
          placeholder={placeholder}
          placeholderTextColor="#FFFFFF80"
          value={inputValue}
          onChangeText={onChangeText}
          multiline={true}
          onContentSizeChange={(event) => setHeight(event.nativeEvent.contentSize.height)}
          style={{
            minHeight: 112,
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
            color: '#FFFFFF',
            lineHeight: 25,
          }}
        />

        <View className="h-[1px] w-[90%] bg-primary"/>

        <View className="bg-lightbackground p-3 rounded-[15px] w-full">
          <TouchableOpacity style={styles.ingredientItem} onPress={() => setModalVisible(true)}>
            <Plus style={styles.image} />
            <Text style={styles.textBody}> Zutat hinzufügen </Text>
          </TouchableOpacity>
        </View>
      </View>

      <IngredientModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({

  ingredientItem: {
    backgroundColor: '#161616',
    borderRadius: 5,
    flexDirection: 'row',
    gap: 6,
    alignSelf: 'flex-start',
    padding: 6,
  },

  image: {
    height: 20,
    width: 20,
    color: 'white',
  },

  textBody: {
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 'medium',
    lineHeight: 25,
  },
});