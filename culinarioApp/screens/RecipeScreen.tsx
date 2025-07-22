import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground, ScrollView } from 'react-native';

// Imports Compponents
import SmallButton from '../components/SmallButton';
import BigButton from '../components/BigButton';
import IngredientItem from '../components/IngredientItem';
import StepItem from '../components/StepItem';

export default function RecipeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar style="light" />

        <ImageBackground source={require('../assets/recipeImages/marry-me-gnocchi.jpg')} style={styles.imageContainer}>

          {/* Top Bar */}
          <View style={styles.topBar}>
            <SmallButton back={true} />
            <SmallButton shoppingCart={true} />
          </View>
        </ImageBackground>

        <View style={styles.recipeContainer}>
          <Image style={{ alignSelf: 'center' }} source={require('../assets/icons/homeIndicator.png')} />
          <Text style={styles.textH1}> Marry Me Gnocchi </Text>

          <View style={styles.infoCointainer}>
            <Text style={styles.textH2}> YouTube </Text>
            <View style={styles.verticalDivider} />
            <Text style={styles.textH2}> 160°C O/U </Text>
          </View>

          {/* Ingredients */}
          <View style={[styles.topBar, { padding: 0, paddingTop: 0 }]}>
            <Text style={[styles.textH2, { color: '#66A182' }]}> Zutaten </Text>

            {/* Amount Counter */}
            <View style={styles.amountCounter}>
              <View style={styles.amountCounterButton}>
              </View>
              <Text style={styles.textH2}> 2 </Text>
              <View style={styles.amountCounterButton}>
              </View>
            </View>
          </View>

          {/* Ingredient List */}
          <View style={styles.ingredientList}>
            <IngredientItem />
            <IngredientItem />
            <IngredientItem />
          </View>

          {/* Divider */}
          <View style={styles.horizontalDivider} />

          {/* Steps */}
          <Text style={[styles.textH2, { color: '#66A182' }]}> Zubereitung </Text>

          <StepItem />
          <StepItem />
          <StepItem />
        </View>
      </ScrollView>

      {/* Fixed Big Button */}
      <View style={styles.fixedButtonContainer}>
        <BigButton cookingMode={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },

  scrollContainer: {
    paddingBottom: 60,
    backgroundColor: '#161616',
  },

  imageContainer: {
    width: '100%',
    height: 360,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 68,
  },

  recipeContainer: {
    flex: 1,
    gap: 24,
    padding: 24,
    backgroundColor: '#161616',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -15,
  },

  infoCointainer: {
    backgroundColor: '#222222',
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
    padding: 12,
    borderRadius: 15,
  },

  amountCounter: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },

  amountCounterButton: {
    backgroundColor: '#222222',
    borderRadius: 5,
    height: 27.5,
    width: 27.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ingredientList: {
    flexDirection: 'column',
    gap: 12,
  },

  horizontalDivider: {
    backgroundColor: '#66A182',
    height: 1,
  },

  verticalDivider: {
    backgroundColor: '#66A182',
    width: 1,
    height: 30,
  },

  textH1: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: 'bold',
  },

  textH2: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: 'bold',
  },

  fixedButtonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
  },
});