import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity, ActivityIndicator  } from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import { useTheme } from "../components/Themes";


const featuredGames = [
  { id: '1', title: 'Dead by Daylight', image: require('../assets/deadbydaylight.jpg'), discount: '-70%', oldPrice: '$18', price: '$5', platform: ['windows', 'playstation'] },{ id: '1', title: 'Dead by Daylight', image: require('../assets/deadbydaylight.jpg'), discount: '-70%', oldPrice: '$18', price: '$5', platform: ['windows', 'playstation'] },{ id: '1', title: 'Dead by Daylight', image: require('../assets/deadbydaylight.jpg'), discount: '-70%', oldPrice: '$18', price: '$5', platform: ['windows', 'playstation'] },
];

const games = [
  { id: '2', title: 'Grand Theft Auto V', image: require('../assets/gta5.jpg'), platform: ['windows'], discount: '-50%', oldPrice: '$20', price: '$10' },
  { id: '3', title: 'Battlefield 4™', image: require('../assets/bf4.jpeg'), platform: ['windows'], price: '$35' },
  { id: '4', title: 'Factorio', image: require('../assets/factorio.jpg'), platform: ['windows', 'mac'], price: '$7' },
  { id: '5', title: 'Horizon Zero Dawn', image: require('../assets/horizon.jpg'), platform: ['windows'], price: '$38' },
  { id: '5', title: 'Horizon Zero Dawn', image: require('../assets/horizon.jpg'), platform: ['windows'], price: '$38' },
  { id: '5', title: 'Horizon Zero Dawn', image: require('../assets/horizon.jpg'), platform: ['windows'], price: '$38' },
  { id: '5', title: 'Horizon Zero Dawn', image: require('../assets/horizon.jpg'), platform: ['windows'], price: '$38' },
  { id: '5', title: 'Horizon Zero Dawn', image: require('../assets/horizon.jpg'), platform: ['windows'], price: '$38' },
  { id: '5', title: 'Horizon Zero Dawn', image: require('../assets/horizon.jpg'), platform: ['windows'], price: '$38' },
  { id: '5', title: 'Horizon Zero Dawn', image: require('../assets/horizon.jpg'), platform: ['windows'], price: '$38' },
  { id: '5', title: 'Horizon Zero Dawn', image: require('../assets/horizon.jpg'), platform: ['windows'], price: '$38' },
  { id: '5', title: 'Horizon Zero Dawn', image: require('../assets/horizon.jpg'), platform: ['windows'], price: '$38' },
  { id: '5', title: 'Horizon Zero Dawn', image: require('../assets/horizon.jpg'), platform: ['windows'], price: '$38' },
];


const StoreScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('Top Sellers');
  const [gamesData, setGamesData] = useState(games);
  const [loading, setLoading] = useState(false);

const getPlatformIcon = (platform) => {
  switch (platform) {
    case 'windows':
      return <Icon name="windows" size={18} color={theme.text} />;
    case 'mac':
      return <Icon name="apple" size={18} color={theme.text} />;
    case 'linux':
      return <Icon name="linux" size={18} color={theme.text} />;
    case 'playstation':
      return <Icon name="gamepad" size={18} color={theme.text} />;
    default:
      return null;
  }
};



  const loadMoreGames = useCallback(() => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      setGamesData((prevGames) => [
        ...prevGames,
        { id: String(prevGames.length + 1), title: 'Factorio', image: require('../assets/factorio.jpg'), platform: ['windows'], price: '$38' },
        { id: String(prevGames.length + 2), title: 'Grand Theft Auto V', image: require('../assets/gta5.jpg'), platform: ['mac'], discount: '-50%', oldPrice: '$20', price: '$10' },
      ]);
      setLoading(false);
    }, 1500);
  }, [loading]);


    return (
    <Container>
      <Header title="Store" />
<ScrollView>
      <FeaturedContainer>
      <FlatList
        data={featuredGames}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeaturedItem key={item.id}>
            <FeaturedImage source={item.image} />
            <FeaturedOverlay>
              <FeaturedTitle>{item.title}</FeaturedTitle>
              <PriceTag>
                <DiscountBadge>
                  <DiscountText>{item.discount}</DiscountText>
                </DiscountBadge>
                <OldPrice>{item.oldPrice}</OldPrice>
                <PriceBlock>
                  <NewPrice>{item.price}</NewPrice>
                </PriceBlock>
                <FeaturedPlatformIcons>
                  {item.platform.map((p) => (
                    <PlatformIcon key={p}>{getPlatformIcon(p)}</PlatformIcon>
                  ))}
                </FeaturedPlatformIcons>
              </PriceTag>
            </FeaturedOverlay>
          </FeaturedItem>
        )}
        showsHorizontalScrollIndicator={false}
      />
      </FeaturedContainer>

      <FilterContainer>
        <FlatList
          data={["Top Sellers", "Free to play", "Early Access", "New games", "Games for two", "Arcades", "Indie"]}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <FilterButton key={item} onPress={() => setSelectedFilter(item)} isActive={selectedFilter === item}>
              <FilterText>{item}</FilterText>
            </FilterButton>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </FilterContainer>

      <FlatList
        data={gamesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameItem>
            <GameImage source={item.image} />
            <GameInfo>
              <GameTitle>{item.title}</GameTitle>
              <PlatformRow>
                <PlatformIcons>
                  {item.platform.map((p) => (
                    <PlatformIcon key={p}>{getPlatformIcon(p)}</PlatformIcon>
                  ))}
                </PlatformIcons>
                <PlatformText>{item.platform.join(', ')}</PlatformText>
              </PlatformRow>
            </GameInfo>
            <PriceContainer>
              {item.discount && (
                <DiscountBadge>
                  <DiscountText>{item.discount}</DiscountText>
                </DiscountBadge>
              )}
              {item.oldPrice && <OldPrice>{item.oldPrice}</OldPrice>}
              <NewPrice>{item.price}</NewPrice>
            </PriceContainer>
          </GameItem>
        )}
        onEndReached={loadMoreGames}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      />
</ScrollView>
    </Container>
  );
};
export default StoreScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const FeaturedContainer = styled.View`
  margin-vertical: 10px;
  padding-horizontal: 15px;
`;
const FeaturedItem = styled.View`
  width: 300px;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 15px;
`;

const FeaturedImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const FeaturedOverlay = styled.View`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

const FeaturedTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const PriceTag = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const DiscountBadge = styled.View`
  background-color: green;
  padding: 2px 6px;
  border-radius: 5px;
  margin-right: 5px;
`;

const DiscountText = styled.Text`
  color: white;
  font-weight: bold;
`;

const OldPrice = styled.Text`
  color: gray;
  text-decoration-line: line-through;
`;

const PriceBlock = styled.View`
  background-color: rgb(28, 17, 11);
  padding: 5px;
  border-radius: 5px;
`;

const NewPrice = styled.Text`
  color: ${(props) => props.theme.text};
  font-weight: bold;
`;
const FeaturedPlatformIcons = styled.View`
  position: absolute;
  right: -120px;
  flex-direction: row;
`;
const PlatformIcons = styled.View`
  flex-direction: row;
  margin-left: 10px;
`;

const PlatformIcon = styled.View`
  margin-left: 5px;
`;
const FilterContainer = styled.View`
  flex-direction: row;
  margin-vertical: 10px;
  padding-horizontal: 10px;
`;
const FilterButton = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 10px;
  background-color: ${({ isActive }) => (isActive ? '#66c0f4' : '#2a475e')};
  margin-right: 10px;
`;

const FilterText = styled.Text`
  color: white;
`;

const GameItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  background-color: ${(props) => props.theme.card};
  border-bottom-width: 1px;
  border-bottom-color: #3a506b;
`;

const GameImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 15px;
`;

const GameInfo = styled.View`
  flex: 1;
`;

const GameTitle = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 16px;
  font-weight: bold;
`;

const PlatformRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PlatformText = styled.Text`
  color: lightgray;
  margin-left: 10px;
`;

const PriceContainer = styled.View`
  align-items: flex-end;
`;