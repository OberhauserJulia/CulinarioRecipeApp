import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import StepIngredientItem from './StepIngredientItem';

export default function StepItem() {
  return (
    <View style={styles.container}>
        <View style={styles.stepNumber}>
            <Text style={styles.textBody}> 1. Schritt </Text>
        </View>

        <Text style={styles.textBody}>Erhitze die Butter, Knoblauchzehen, Oregano, Pfeffer, Salz, geräuchertes Paprikapulver sowie in einer großen Pfanne oder einem Topf bei mittlerer Hitze. Koche alles etwa 2 Minuten, bis der Knoblauch duftet. Zerbrösele den Tofu in die Pfanne und brate ihn 5 bis 10 Minuten, bis er gebräunt ist. </Text>

        <View style={styles.ingredientContainer}>
            <StepIngredientItem/>
            <StepIngredientItem/>
            <StepIngredientItem/>
            <StepIngredientItem/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 12,
    },

    stepNumber: {
        backgroundColor: '#66A182',
        padding: 6,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        alignSelf: 'flex-start',
    },

    ingredientContainer: {
        backgroundColor: '#222222',
        padding: 6,
        borderRadius: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },

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