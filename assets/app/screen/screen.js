import React from 'react'
import { SafeAreaView, StyleSheet, TextInput } from 'react-native'
import Constant from 'expo-constants'


export default function Screen({children}) {
  return (
    <SafeAreaView style={styles.screen}>{children}
          {/* <TextInput placeholder="hi" style={styles.textInput}/> */}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    screen : {
        paddingTop : Constant.statusBarHeight,
        backgroundColor : "#1E1A3B",
        flex :1
    }
})
