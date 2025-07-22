import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ImagePlus } from 'lucide-react-native';
import { ingredients } from '../data/ingredients';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Imports Compponents
import SmallButton from '../components/SmallButton';

import InputFieldSteps from '../components/InputFieldSteps';


export default function CookingModeScreen() {

    const [image, setImage] = useState<string | null>(null);
    const [steps, setSteps] = useState<{ text: string, stepNumber: number }[]>([{ text: "", stepNumber: 1 }]);
    const [ingredientsList, setIngredientsList] = useState<{
        input: string,
        amount: string,
        ingredient: string,
        foundIngredient?: { id: number, name: string, image: any } | null,
        isEditing?: boolean
    }[]>([{ input: "", amount: "", ingredient: "", foundIngredient: null, isEditing: true }]);
    // NEU: Zutaten pro Schritt (Array mit Arrays von Ingredient-Objekten)
    const [stepIngredients, setStepIngredients] = useState<{ id: string, name: string, amount: string }[][]>([[]]);

    // Neue States für alle Inputs
    const [recipeName, setRecipeName] = useState("");
    const [category, setCategory] = useState("");
    const [miscAmount, setMiscAmount] = useState("");
    const [ovenSetting, setOvenSetting] = useState("");
    const [source, setSource] = useState("");

    // Alle Eingaben zurücksetzen, wenn der Screen neu geladen/geöffnet wird
    useFocusEffect(
        React.useCallback(() => {
            setImage(null);
            setSteps([{ text: "", stepNumber: 1 }]);
            setIngredientsList([{ input: "", amount: "", ingredient: "", foundIngredient: null, isEditing: true }]);
            setStepIngredients([[]]);
            setRecipeName("");
            setCategory("");
            setMiscAmount("");
            setOvenSetting("");
            setSource("");
        }, [])
    );

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            aspect: [16, 9],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };



    // Funktion zum Verarbeiten der Zutaten-Eingabe
    // Nur ein Eingabefeld für Menge und Zutat
    const handleIngredientInputChange = (index: number, value: string) => {
        const updatedIngredients = [...ingredientsList];
        updatedIngredients[index].input = value;
        setIngredientsList(updatedIngredients);
    };

    // Beim Speichern: Trennen und prüfen
    const handleSaveIngredient = (index: number) => {
        const updatedIngredients = [...ingredientsList];
        const input = updatedIngredients[index].input.trim();
        // Versuche, die letzte Zutat im String zu finden
        let found = null;
        let foundName = "";
        for (const ing of ingredients) {
            // Suche nach Zutat am Ende des Strings (z.B. "2 EL Butter")
            if (input.toLowerCase().endsWith(ing.name.toLowerCase())) {
                found = ing;
                foundName = ing.name;
                break;
            }
        }
        if (found) {
            // Menge = alles vor dem Zutatennamen
            const amount = input.slice(0, input.toLowerCase().lastIndexOf(foundName.toLowerCase())).trim();
            updatedIngredients[index].amount = amount;
            updatedIngredients[index].ingredient = foundName;
            updatedIngredients[index].foundIngredient = found;
            updatedIngredients[index].isEditing = false;
        } else {
            // Falls keine Zutat erkannt, alles als input lassen
            updatedIngredients[index].amount = "";
            updatedIngredients[index].ingredient = "";
            updatedIngredients[index].foundIngredient = null;
            updatedIngredients[index].isEditing = true;
        }
        setIngredientsList(updatedIngredients);
    };

    // Umschalten zwischen Ansicht und Editiermodus
    const handleToggleEdit = (index: number, edit: boolean) => {
        const updatedIngredients = [...ingredientsList];
        updatedIngredients[index].isEditing = edit;
        setIngredientsList(updatedIngredients);
    };


    // Schritt hinzufügen und stepIngredients mit leerem Array erweitern
    const addStep = () => {
        setSteps(prev => [...prev, { text: "", stepNumber: prev.length + 1 }]);
        setStepIngredients(prev => [...prev, []]);
    };

    const addIngredient = () => {
        setIngredientsList([...ingredientsList, { input: "", amount: "", ingredient: "", foundIngredient: null, isEditing: true }]);
    };

    // Hilfsfunktion: Zutatenmengen für einen Schritt berechnen (verbleibend)
    function getAvailableIngredientsForStep(stepIdx: number) {
        // Alle Zutaten aus Zutatenliste (gesamt)
        const allIngredients = ingredientsList.filter(ing => ing.amount && ing.ingredient).map(ing => ({
            id: ing.ingredient,
            name: ing.ingredient,
            amount: ing.amount
        }));

        // Map: Zutat -> Gesamtmenge (als Zahl + Einheit)
        const totalMap = new Map();
        allIngredients.forEach(ing => {
            // Versuche Menge zu parsen (z.B. "2 EL")
            const match = ing.amount.match(/([\d,.]+)/);
            const value = match ? parseFloat(match[1].replace(',', '.')) : 0;
            const unit = ing.amount.replace(/^[\d,.]+\s*/, '');
            totalMap.set(ing.name, { value, unit });
        });

        // Map: Zutat -> bereits verwendete Menge in vorherigen Schritten
        const usedMap = new Map();
        for (let i = 0; i < stepIdx; i++) {
            (stepIngredients[i] || []).forEach(ing => {
                const match = ing.amount.match(/([\d,.]+)/);
                const value = match ? parseFloat(match[1].replace(',', '.')) : 0;
                const prev = usedMap.get(ing.name) || 0;
                usedMap.set(ing.name, prev + value);
            });
        }

        // Verfügbare Zutaten berechnen
        return allIngredients.map(ing => {
            const total = totalMap.get(ing.name);
            const used = usedMap.get(ing.name) || 0;
            const available = Math.max(0, total.value - used);
            return {
                id: ing.name,
                name: ing.name,
                amount: available > 0 ? `${available % 1 === 0 ? available : available.toFixed(1)}${total.unit ? ' ' + total.unit : ''}`.trim() : `0${total.unit ? ' ' + total.unit : ''}`
            };
        }).filter(ing => parseFloat(ing.amount) > 0);
    }

    // Callback für InputFieldSteps, um gewählte Zutaten pro Schritt zu speichern
    function handleStepIngredientsChange(stepIdx: number, selected: { id: string, name: string, amount: string }[]) {
        setStepIngredients(prev => {
            const copy = [...prev];
            copy[stepIdx] = selected;
            return copy;
        });
    }

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <StatusBar style="light" />
                {/* Top Bar */}
                <View className="flex-row justify-between items-center pb-6">
                    <Text style={styles.textH1}> Rezept hinzufügen </Text>
                    <SmallButton save={true} />
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.inputContainer}>
                        {/* Image */}
                        <TouchableOpacity
                            onPress={pickImage}
                            className="flex flex-col gap-3 h-[149px] w-full bg-lightbackground border border-primary border-dashed rounded-[15px] items-center justify-center">
                            {image ? (
                                <Image source={{ uri: image }} style={{ resizeMode: 'contain' }} className="w-full h-full" />
                            ) : (<>
                                <ImagePlus size={50} color="#66A182" />
                                <Text className="text-primary font-robotoMedium">Foto hinzufügen</Text>
                            </>)}
                        </TouchableOpacity>
                        {/* Rezeptname */}
                        <View className="flex-col gap-3">
                            <Text style={styles.textH2}> Rezeptname </Text>
                            <TextInput
                                placeholder='Rezeptname eingeben'
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                textColor="#FFFFFF"
                                placeholderTextColor="#FFFFFF80"
                                value={recipeName}
                                onChangeText={setRecipeName}
                                style={{
                                    backgroundColor: '#222222',
                                    color: '#FFFFFF',
                                    borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15,
                                    borderBottomRightRadius: 15,
                                    borderBottomLeftRadius: 15,
                                    fontFamily: 'Roboto-Medium',
                                    fontSize: 16,
                                    lineHeight: 25
                                }}
                            />
                        </View>
                        {/* Zusätzlich */}
                        <View className="flex-col gap-3">
                            <Text style={styles.textH2}> Sonstiges </Text>
                            <TextInput
                                placeholder='Kategorie'
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                textColor="#FFFFFF"
                                placeholderTextColor="#FFFFFF80"
                                value={category}
                                onChangeText={setCategory}
                                style={{
                                    backgroundColor: '#222222',
                                    color: '#FFFFFF',
                                    borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15,
                                    borderBottomRightRadius: 15,
                                    borderBottomLeftRadius: 15,
                                    fontFamily: 'Roboto-Medium',
                                    fontSize: 16,
                                    lineHeight: 25,
                                    flex: 1,
                                }}
                            />
                            <TextInput
                                placeholder='Menge'
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                textColor="#FFFFFF"
                                placeholderTextColor="#FFFFFF80"
                                value={miscAmount}
                                onChangeText={setMiscAmount}
                                style={{
                                    backgroundColor: '#222222',
                                    color: '#FFFFFF',
                                    borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15,
                                    borderBottomRightRadius: 15,
                                    borderBottomLeftRadius: 15,
                                    fontFamily: 'Roboto-Medium',
                                    fontSize: 16,
                                    lineHeight: 25,
                                    flex: 1,
                                }}
                            />
                            <TextInput
                                placeholder='Ofeneinstellung'
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                textColor="#FFFFFF"
                                placeholderTextColor="#FFFFFF80"
                                value={ovenSetting}
                                onChangeText={setOvenSetting}
                                style={{
                                    backgroundColor: '#222222',
                                    color: '#FFFFFF',
                                    borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15,
                                    borderBottomRightRadius: 15,
                                    borderBottomLeftRadius: 15,
                                    fontFamily: 'Roboto-Medium',
                                    fontSize: 16,
                                    lineHeight: 25,
                                }}
                            />
                            <TextInput
                                placeholder='Quelle'
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                textColor="#FFFFFF"
                                placeholderTextColor="#FFFFFF80"
                                value={source}
                                onChangeText={setSource}
                                style={{
                                    backgroundColor: '#222222',
                                    color: '#FFFFFF',
                                    borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15,
                                    borderBottomRightRadius: 15,
                                    borderBottomLeftRadius: 15,
                                    fontFamily: 'Roboto-Medium',
                                    fontSize: 16,
                                    lineHeight: 25,
                                }}
                            />
                        </View>
                        {/* Zutaten */}
                        <View style={styles.topBarInput}>
                            <Text style={styles.textH2}> Zutaten </Text>
                            <SmallButton plus={true} onPress={addIngredient} />
                        </View>
                        {/* Zutatenliste */}
                        {ingredientsList.map((ingredient, index) => (
                            <View key={index}>
                                {ingredient.foundIngredient && ingredient.amount && !ingredient.isEditing ? (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => handleToggleEdit(index, true)}
                                        className="flex flex-row items-center gap-[12px] bg-lightbackground w-full h-[55px] p-[12px] rounded-[15px]"
                                    >
                                        <View className="bg-darkbackground h-[33.5px] w-[33.5px] rounded-[5px] flex items-center justify-center">
                                            <Image
                                                source={ingredient.foundIngredient.image}
                                                className="h-[27.5px] w-[27.5px]"
                                            />
                                        </View>
                                        <Text style={styles.text}>
                                            {ingredient.amount} {ingredient.foundIngredient.name}
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <View className="flex-row gap-3 w-full">
                                        <TextInput
                                            placeholder='Menge und Zutat, z.B. "2 EL Butter"'
                                            underlineColor="transparent"
                                            activeUnderlineColor="transparent"
                                            textColor="#FFFFFF"
                                            placeholderTextColor="#FFFFFF80"
                                            value={ingredient.input}
                                            onChangeText={(value) => handleIngredientInputChange(index, value)}
                                            style={{
                                                backgroundColor: '#222222',
                                                color: '#FFFFFF',
                                                borderTopLeftRadius: 15,
                                                borderTopRightRadius: 15,
                                                borderBottomRightRadius: 15,
                                                borderBottomLeftRadius: 15,
                                                fontFamily: 'Roboto-Medium',
                                                fontSize: 16,
                                                lineHeight: 25,
                                                flex: 1,
                                            }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => handleSaveIngredient(index)}
                                            style={{ marginLeft: 8, justifyContent: 'center' }}
                                        >
                                            <Text style={{ color: '#66A182', fontWeight: 'bold', fontSize: 18 }}>✓</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        ))}
                        {/* Zubereitungsschritte */}
                        <View style={styles.topBarInput}>
                            <Text style={styles.textH2}> Zubereitungsschritte </ Text>
                            <SmallButton plus={true} onPress={addStep} />
                        </View>
                        {steps.map((step, index) => (
                            <InputFieldSteps
                                key={index}
                                stepNumber={step.stepNumber}
                                placeholder="Zubereitungsschritt beschreiben"
                                ingredients={getAvailableIngredientsForStep(index)}
                                onIngredientsChange={selected => handleStepIngredientsChange(index, selected)}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 68,
        backgroundColor: '#161616',
        paddingHorizontal: 24,
    },

    scrollContainer: {
        flexDirection: 'column',
        gap: 24,
        backgroundColor: '#161616',
        paddingTop: 24,
        paddingBottom: 114,
    },

    topBar: {
        flexDirection: 'row',
        gap: 24,
        alignItems: 'center',
    },

    topBarInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    inputContainer: {
        flexDirection: 'column',
        gap: 24,
    },

    fixedButtonContainer: {
        position: 'absolute',
        bottom: 24,
        left: 0,
        right: 0,
        paddingLeft: 24,
        paddingRight: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 24,
        width: '100%',
    },

    text: {
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 'medium',
    textAlign: 'center',
    },

    textH1: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: 24,
        fontWeight: 'bold',
    },

    textH2: {
        color: '#66A182',
        fontFamily: 'Montserrat',
        fontSize: 18,
        fontWeight: 'bold',
    },

    textBody: {
        color: '#FFFFFF',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'medium',
        lineHeight: 25,
    },
});