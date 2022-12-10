import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function TodoItem({ txt, num, onDelete , onMarkAsdone, status, onMarkAsOnProgress}) {
  const longPressGesture = Gesture.LongPress().onEnd((e, success) => {
    if (success && onMarkAsdone) {
     onMarkAsdone();
    }
  });

const calculateColor = (st) => {
  if(st === "create"){
    return "#00d4ff"
  }else if (st === "onProgress"){
    return  "#fff600";
  }
  else if ("done"){ 
  return  "#37dd00";
  }else{
    return "red"
  }
}

const doubleTap = Gesture.Tap()
  .maxDuration(250).numberOfTaps(2)
  .onStart(() => {
    if(onMarkAsOnProgress){
    onMarkAsOnProgress();
    }
  });
  return (
 
    <View style={styles.mainListRow}>
       <GestureDetector 
gesture={Gesture.Exclusive(doubleTap, longPressGesture )}
    >
          <View style={[styles.todoCounter,{borderLeftColor : calculateColor(status), borderBottomColor : calculateColor(status)}]}>
{status==="create" && <MaterialIcons
            name="fiber-new"
            size={25}
            color="#fff"
          />} 
            {status==="done" &&    
            <MaterialIcons
            name="done"
            size={25}
            color="#fff"
          />}
            {status==="onProgress" &&    
            <MaterialCommunityIcons
            name="dots-horizontal"
            size={25}
            color="#fff"
          />}
          </View>
        </GestureDetector>
      <View style={styles.todoText}>
        <Text style={styles.maintodotxt}> {txt}</Text>
        <TouchableWithoutFeedback onPress={onDelete}>
          <MaterialCommunityIcons
            style={styles.deleteIcon}
            name="trash-can-outline"
            size={25}
            color="#fff"
          />
        </TouchableWithoutFeedback>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  mainListRow: {
    flexDirection: "row",
    flex: 1,
    marginVertical: 15,
  },
  todoCounter: {
    borderTopColor : "#1E1A3B",
    borderRightColor : "#1E1A3B",
    borderWidth : 2,
    flex: 2,
    backgroundColor: "#3E3364",
    height: 75,
    borderRadius: 15,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  todoText: {
    flex: 8,
    backgroundColor: "#3E3364",
    height: 75,
    marginHorizontal: 10,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txtnumber: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "700",
  },
  maintodotxt: {
    color: "#fff",
    marginHorizontal: 15,
    fontSize: 15,
  },
  deleteIcon: {
    marginEnd: 20,
  },
});
