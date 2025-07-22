import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

interface BigButtonProps {
  cookingMode?: boolean;
  forward?: boolean;
  back?: boolean;
  saveIngredients?: boolean;
  addArticle?: boolean;
}

export default function BigButton({ cookingMode, forward, back, saveIngredients, addArticle }: BigButtonProps) {
  return (
    <>
      {cookingMode && (
        <View style={[styles.button, { width: '100%' }]}>
          <Image source={require('../assets/icons/cook.png')} />
          <Text style={styles.textH2}>Kochmodus </Text>
        </View>
      )}

      {forward && (
        <View style={[styles.button, { flex: 1 }]}>
          <Image source={require('../assets/icons/cook.png')} />
        </View>
      )}

      {saveIngredients && (
        <View style={[styles.button, { width: '100%' }]}>
          <Text style={styles.textH2}> Zutaten speichern </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({

  button: {
    backgroundColor: '#66A182',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  textH2: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: 'bold',
  },
});