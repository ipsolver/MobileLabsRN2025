import React, { useState } from 'react';
import { Animated, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useTheme } from "../components/Themes";


const Header = ({ title }) => {
  const { theme, toggleTheme } = useTheme();
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
    <HeaderContainer>
      <Logo source={require("../assets/steam.png")} />
      <Title>{title}</Title>
      
      <TouchableOpacity onPress={handleSearchIconPress}>
        <Animated.View style={{ transform: [{ translateX: moveSearchIcon }] }}>
          <SearchLogo name="search" size={20} />
        </Animated.View>
      </TouchableOpacity>
      
      {searchVisible && (
        <Animated.View style={{ transform: [{ translateX: moveSearchInput }] }}>
          <SearchInput
            placeholder="Search..."
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </Animated.View>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.background};
  padding: 20px;
  margin-top: 30px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 20px;
  font-weight: bold;
  margin-left: 15px;
`;

const Logo = styled.Image`
  width: 40px;
  height: 40px;
`;

const SearchInput = styled.TextInput`
  background-color: white;
  color: black;
  padding: 5px;
  margin-left: 10px;
  border-radius: 5px;
  width: 150px;
`;

const SearchLogo = styled(Ionicons)`
  margin-left: 220px;
  color: ${(props) => props.theme.headerSearch};
`;

export default Header;
