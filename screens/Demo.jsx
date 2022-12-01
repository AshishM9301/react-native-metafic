import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const Demo = (data) => {
  const [PokemonData, setPokemonData] = useState({});
  const getPokemonData = async () => {
    await fetch(data.route.params.url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setPokemonData(data);
        // console.log(data);
      });
  };

  useEffect(() => {
    getPokemonData();
  }, []);

  return (
    <View>
      <Text style={styles.container}>Abilities</Text>
      <View>
        <FlatList
          data={PokemonData.abilities}
          renderItem={({ item, index, separator }) => (
            <View key={index} style={styles.itemContainer}>
              <Text>{item.ability.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 24,
  },
  abilityContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemContainer: {
    marginBottom: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Demo;
