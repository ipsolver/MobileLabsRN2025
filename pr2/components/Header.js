import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ title }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [moveSearchIcon] = useState(new Animated.Value(0));
  const [moveSearchInput] = useState(new Animated.Value(0));

  const handleSearchIconPress = () => {
    setSearchVisible(!searchVisible);

    Animated.parallel([
      Animated.timing(moveSearchIcon, {
        toValue: searchVisible ? 0 : -150,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(moveSearchInput, {
        toValue: searchVisible ? 0 : -150,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  return (
    <View style={styles.header}>
      <Image source={require("../assets/steam.png")} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
      
      <TouchableOpacity onPress={handleSearchIconPress}>
        <Animated.View style={{ transform: [{ translateX: moveSearchIcon }] }}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchLogo} />
        </Animated.View>
 
      </TouchableOpacity>
      
      {searchVisible && (
        <Animated.View style={{ transform: [{ translateX: moveSearchInput }] }}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b2838',
    padding: 20,
    marginTop: 30,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  logo: {
    width: 40,
    height: 40,
  },
  searchInput: {
    backgroundColor: 'white',
    color: 'black',
    padding: 5,
    marginLeft: 10,
    borderRadius: 5,
    width: 150,
  },
  searchLogo: {
    marginLeft: 220,
  },
});

export default Header;
