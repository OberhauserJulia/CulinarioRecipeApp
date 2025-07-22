import React, { useState } from "react";
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { X, ChevronDown, ChevronUp } from 'lucide-react-native';
import BigButton from "./BigButton";

const ingredients = [
    { id: "1", name: "Oregano", amount: "0.5TL" },
    { id: "2", name: "Knoblauchzehen", amount: "4" },
    { id: "3", name: "Tofu", amount: "175g" },
    { id: "4", name: "Spinat", amount: "200g" },
    { id: "5", name: "Sahne", amount: "120ml" },
    { id: "6", name: "Parmesan", amount: "40g" },
    { id: "7", name: "Gnocchi", amount: "453g" },
    { id: "8", name: "Getrocknete Tomaten", amount: "130g" },
    { id: "9", name: "Gemüsebrühe", amount: "473ml" },
];

interface IngredientModalProps {
    visible: boolean;
    onClose: () => void;
}

const IngredientModal: React.FC<IngredientModalProps> = ({ visible, onClose }) => {
    const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);
    const [isListVisible, setIsListVisible] = useState<boolean>(true);

    interface Ingredient {
        id: string;
        name: string;
        amount: string;
    }

    interface SelectedIngredient extends Ingredient {
        count: number;
    }

    const addIngredient = (ingredient: Ingredient) => {
        setSelectedIngredients((prev: SelectedIngredient[]) => {
            const existing = prev.find((item) => item.id === ingredient.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === ingredient.id ? { ...item, count: item.count + 1 } : item
                );
            }
            return [...prev, { ...ingredient, count: 1 }];
        });
    };

    const updateCount = (id: string, delta: number): void => {
        setSelectedIngredients((prev: SelectedIngredient[]) =>
            prev
                .map((item: SelectedIngredient) =>
                    item.id === id ? { ...item, count: item.count + delta } : item
                )
                .filter((item: SelectedIngredient) => item.count > 0)
        );
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View className="flex-1 bg-black/50 justify-center items-center p-6">
                <View className="flex-col w-full bg-lightbackground rounded-[15px] p-6 gap-6">

                    <View className="flex flex-row justify-between items-center">
                        <Text className="text-lg font-bold text-primary">Zutaten hinzufügen</Text>

                        <TouchableOpacity className="h-6 w-6 bg-darkbackground items-center justify-center rounded-full" onPress={onClose}>
                            <X size={15} color="#FFFFFF" />
                        </TouchableOpacity>

                    </View>

                    {/* Oben: Ausgewählte Zutaten */}
                    <View className="flex-col w-full gap-3">
                        {selectedIngredients.map((item) => (
                            <View key={item.id} className="flex-row gap-6 items-center rounded-lg w-full">

                                <View className="flex-row">
                                    <TouchableOpacity onPress={() => updateCount(item.id, -1)} className="h-[33.5px] w-[33.5px] items-center justify-center bg-darkbackground rounded-lg">
                                        <Text className="text-white">-</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => updateCount(item.id, 1)} className="h-[33.5px] w-[33.5px] items-center justify-center bg-darkbackground rounded-lg">
                                        <Text className="text-white">+</Text>
                                    </TouchableOpacity>
                                </View>

                                <View className="h-[33.5px] flex-1 justify-center bg-darkbackground rounded-lg">
                                    <Text className="text-white mx-3">{`${item.count}x ${item.amount} ${item.name}`}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View className="flex-col w-full gap-3">
                        <TouchableOpacity onPress={() => setIsListVisible(!isListVisible)} className="flex-row justify-between items-center">
                            <Text className="text-sm text-gray-400 mt-3">Wähle die Zutaten aus, die du zum Zubereitungsschritt hinzufügen möchtest.</Text>
                            {isListVisible ? <ChevronUp size={20} color="#FFFFFF" /> : <ChevronDown size={20} color="#FFFFFF" />}
                        </TouchableOpacity>

                        {/* Zutatenliste */}
                        {isListVisible && (
                            <View className="bg-darkbackground p-[6px] rounded-[15px] flex-wrap flex-row gap-3">
                                {ingredients.map((item) => (
                                    <TouchableOpacity key={item.id} className="bg-lightbackground p-3 rounded-lg" style={{ alignSelf: 'flex-start' }} onPress={() => addIngredient(item)}>
                                        <Text className="text-white">{`${item.amount} ${item.name}`}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    <BigButton saveIngredients />
                </View>
            </View>
        </Modal>
    );
};

export default IngredientModal;