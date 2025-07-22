import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../components/navigation/CombinedNavigator";

import { Searchbar } from 'react-native-paper';

// Imports Components
import SmallButton from '../components/SmallButton';
import CategoryItem from '../components/CategoryItem';
import RecipeItem from '../components/RecipeItem';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, "Home">;
type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View className="flex-1 h-full flex-col gap-6 bg-darkbackground p-6 pt-[68px]">
      <StatusBar style="light" />

      {/* Filter Bar */}
      <View className="flex-row gap-6">
        <Searchbar
          placeholder="Rezept suchen..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          iconColor="white"
          placeholderTextColor="white"
          inputStyle={{ color: 'white' }}
          style={{ flex: 1, height: 49, padding: 0, borderWidth: 1, borderRadius: 15, borderColor: '#66A182', backgroundColor: '#222222' }}
        />
        <SmallButton settings={true} />
      </View>

            {/* Category Item */}
            <View style={{ flex: 0, flexShrink: 1 }}>
        <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: 'row', gap: 12 }} showsHorizontalScrollIndicator={false}>
          <CategoryItem
            category="Alle"
            isSelected={selectedCategory === "Alle"}
            onPress={() => setSelectedCategory("Alle")}
          />
          <CategoryItem
            category="Vorspeise"
            isSelected={selectedCategory === "Vorspeise"}
            onPress={() => setSelectedCategory("Vorspeise")}
          />
          <CategoryItem
            category="Hauptgericht"
            isSelected={selectedCategory === "Hauptgericht"}
            onPress={() => setSelectedCategory("Hauptgericht")}
          />
          <CategoryItem
            category="Dessert"
            isSelected={selectedCategory === "Dessert"}
            onPress={() => setSelectedCategory("Dessert")}
          />
        </ScrollView>
      </View>

      {/* Recipe List */}
      <ScrollView style={{ flex: 1, flexGrow: 1 }} contentContainerStyle={{ flexDirection: 'column', gap: 24, paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
      </ScrollView>
    </View>
  );
}