import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Foundation } from "@expo/vector-icons";

import {
  Platform,
  Text,
  Vibration,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import uuid from 'react-native-uuid';

import TodoItem from "../components/todoItem";
import TodoTextInput from "../components/todoTextInput";
import Screen from "./screen";
import { useFocusEffect } from "@react-navigation/native";

export default function TodoList() {
 
  const ONE_SECOND_IN_MS = 1000;
  const fifteen = 50;

  const [toDoText, setTodoText] = useState("");
  const [allToDos, setAllToDos] = useState([]);
  const [todosJari, setTodosJari] = useState([]);

  const handleDeleteTodo = (itemId) => {
    let lArr = allToDos.filter((item) => item.id !== itemId);
    console.log("filtred arry", itemId);
    storeData(lArr);
    getData();
    // setAllToDos(lArr);
  };
  const handleAddTodo = () => {
    if (toDoText !== "") {
      let count = allToDos.length + 1;
      let lArr = [...allToDos];
      lArr.push({ id: uuid.v4(), text: toDoText, status: "create" });
      // setAllToDos(lArr);
      // allToDos.push({id : count , text : toDoText})
      storeData(lArr);
      getData();
      setTodoText("");
    }
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("alltodos", jsonValue);
    } catch (e) {
      // saving error
    }
  };
  
  useEffect(() => {
    getData();
    // setAllToDos(data);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
getData()
    }, [])  );


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("alltodos");
      const Alltodo = jsonValue != null ? JSON.parse(jsonValue) : nul;
      console.log("getting data" , Alltodo);
      setAllToDos(Alltodo);
      setTodosJari(Alltodo.filter((todo) => todo.status !== "done"));

      // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const handleMarkAsDone = (itemId) => {
    let lArr = [...allToDos];
    const found = lArr.find((element) => element.id === itemId);
    if (found["status"] !== "done") {
      found["status"] = "done";
      storeData(lArr);
      getData();
      Vibration.vibrate(ONE_SECOND_IN_MS);
    }
    console.log("here is items ", allToDos);
  };

  const handleMarkAsOnProgress = (itemId) => {
    let lArr = [...allToDos];
    const found = lArr.find((element) => element.id === itemId);

    if (found["status"] === "create") {
      found["status"] = "onProgress";
    } else if (found["status"] === "onProgress") {
      found["status"] = "create";
    }
    Vibration.vibrate(fifteen);

    storeData(lArr);
    getData();
  };

  return (
    <Screen style={styles.mainContainer}>
      <View style={styles.todoContainer}>
        <FlatList
          data={todosJari}
          keyExtractor={(td) => td.id.toString()}
          renderItem={({ item }) => (
            <TodoItem
              status={item.status}
              num={item.id}
              txt={item.text}
              onMarkAsdone={() => handleMarkAsDone(item.id)}
              onMarkAsOnProgress={() => handleMarkAsOnProgress(item.id)}
              onDelete={() => handleDeleteTodo(item.id)}
            />
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <KeyboardAvoidingView
          style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
          behavior="position"
        >
          <TodoTextInput
            icon="send"
            onAdd={handleAddTodo}
            onChangeText={(newText) => setTodoText(newText)}
            value={toDoText}
          />
        </KeyboardAvoidingView>
      </View>
    </Screen>
  );
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
    flex: 8,
  },
  inputContainer: {
    flex: 1,
  },
  mainContainer: {
    flexDirection: "column",
    flex: 1,
  },
});
