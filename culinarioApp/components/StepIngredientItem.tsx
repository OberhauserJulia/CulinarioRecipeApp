import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { IngredientType } from '../context/RecipeContext';

interface StepIngredientItemProps {
  ingredient: IngredientType;
  servings?: number;
}

export default function StepIngredientItem({ ingredient, servings = 1 }: StepIngredientItemProps) {
    // Berechne die angepasste Menge basierend auf der Portionsanzahl
    const adjustedAmount = ingredient.amount * servings;

    // Funktion zum Rendern des Bildes
    const getIngredientImage = () => {
        if (ingredient.image) {
            return <Image style={styles.image} source={{ uri: ingredient.image }} />;
        }
        // Fallback-Bild verwenden
        return <Image style={styles.image} source={require('../assets/ingredientImages/milkproducts/butter.png')} />;
    };

    return (
        <View style={styles.ingredientItem}>
            {getIngredientImage()}
            <Text style={styles.textBody}> {adjustedAmount}{ingredient.unit} {ingredient.name} </Text>
        </View>
    );
}

const styles = StyleSheet.create({

    ingredientItem: {
        backgroundColor: '#161616',
        borderRadius: 5,
        flexDirection: 'row',
        gap: 12,
        alignSelf: 'flex-start',
        padding: 6,
    },

    image: {
        height: 20,
        width: 20,
    },

    textBody: {
        color: '#FFFFFF',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'medium',
        lineHeight: 25,
    },
});