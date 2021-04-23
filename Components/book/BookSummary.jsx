import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function BookSummary({item, navigation}) {
  const book=item;

  function GoToInfo() {
    navigation.navigate('BookInfo',{book});
  }

  return (
    <TouchableOpacity 
      onPress={GoToInfo}
      style={styles.item}>
        <Text>{book.title}</Text>
        <Text>{book.genre}</Text>
    </TouchableOpacity>
  );
}

const styles=StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});
