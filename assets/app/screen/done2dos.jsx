import React, { useEffect, useState } from 'react'
import { Platform, Text, Vibration , StyleSheet, View, TextInput, FlatList, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TodoItem from "../components/todoItem";
import TodoTextInput from "../components/todoTextInput";
import Screen from './screen';
import { useFocusEffect } from '@react-navigation/native';

let allToDos = [];

export default function Done2dos() {
  // const [allToDos, setAllToDos] = useState([]);

  const [doneToDos, setDoneToDos] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("alltodos");
      // setAllToDos(jsonValue != null ? JSON.parse(jsonValue) : nul);
      console.log("what is here" , jsonValue)
      allToDos = jsonValue != null ? JSON.parse(jsonValue) : nul;
      console.log("what is here2" , allToDos)

      let done22s = [];
      if(allToDos !== null){
        done22s = allToDos.filter(todo => todo.status === "done");
        setDoneToDos(done22s);
      }

      // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const handleDeleteTodo = (itemId) => {
    // allToDos = [...doneToDos]
    let lArr = allToDos.filter((item) => item.id !== itemId);
    console.log("filtred arry", lArr);
    storeData(lArr);
    getData();
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("alltodos", jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const handleRefresh = () => {
    getData();

  }
  useEffect(()=>{
    getData();
  },[])

  useFocusEffect(
    React.useCallback(() => {
getData()
    }, [])

  );
  return (
    <Screen style={styles.mainContainer}>
    <View style={styles.todoContainer}>
      <FlatList
      refreshControl={<RefreshControl
        colors={["#9Bd35A", "#689F38"]}
        refreshing={isRefreshing}
        onRefresh={handleRefresh} 
      />}
        data={doneToDos}
        keyExtractor={(td) => td.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            status={item.status}
            num={item.id}
            txt={item.text}
            onDelete={() => handleDeleteTodo(item.id)}

          />
        )}
      />
    </View>
  </Screen> 
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    marginLeft: 10,
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
  },
  mainListRow: {
    flexDirection: "row",
    flex: 1,
    marginVertical: 25,
  },
  todoCounter: {
    flex: 2,
    backgroundColor: "#3E3364",
    height: 75,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  todoText: {
    flex: 8,
    backgroundColor: "#3E3364",
    height: 75,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  todoContainer: {
    flex: 1,
  },
  mainContainer: {
    flexDirection: "column",
    flex: 1,
  },
});
