import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

const Home = ({ navigation }) => {
  const [List, setList] = useState({});
  const [baseUrl, setBaseUrl] = useState("https://pokeapi.co/api/v2/pokemon");

  const handlePress = (item) => {
    navigation.navigate("Demo", item);
  };

  const getPokemon = async () => {
    await fetch(baseUrl, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        // console.log(data);
      });
  };

  useEffect(() => {
    getPokemon();
  }, [baseUrl]);

  if (!List) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.baseContainer}>
        <FlatList
          data={List.results}
          renderItem={({ item, index, separator }) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.textStyle}>{item?.name}</Text>
            </TouchableOpacity>
          )}
        />
        <View>
          <Button
            disabled={!List.previous}
            title="Prev"
            onPress={() => {
              setBaseUrl(List.previous);
            }}
          />
          <Button
            title="Next"
            onPress={() => {
              setBaseUrl(List.next);
            }}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  baseContainer: {
    flex: 1,
    marginTop: 0,
    // backgroundColor: "red",
  },
  textStyle: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default Home;
