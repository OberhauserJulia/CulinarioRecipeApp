import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function IngredientItem() {
  return (
    <View style={styles.container}>

        <View style={styles.ingedientContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/ingredientImages/milkproducts/butter.png')} />
            </View>
            <Text style={styles.textBody}> Butter </Text>
        </View>
        <Text style={styles.textBody}> 2 EL </Text>
    </View>
  );
}
 
const styles = StyleSheet.create({ 

    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    ingedientContainer: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },

    imageContainer: {
        height: 27.5,
        width: 27.5,
        padding: 6,
        backgroundColor: '#222222',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
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