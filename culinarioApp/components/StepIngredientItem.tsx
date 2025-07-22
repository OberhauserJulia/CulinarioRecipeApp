import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function StepIngredientItem() {
    return (
        <View style={styles.ingredientItem}>
            <Image style={styles.image} source={require('../assets/ingredientImages/milkproducts/butter.png')} />
            <Text style={styles.textBody}> 2EL Butter </Text>
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