import React, { useState } from 'react';
import { View, FlatList, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Header from '../components/Header';
import { useTheme } from "../components/Themes";

const postsData = [
    {
        id: 1,
        title: "Post #1",
        description: "Її брови заслуговують власної виставки в музеї",
        image: require('../assets/susie1.jpg'),
        category: "Screenshots",
        likes: 120,
        comments: 15
    },
    {
        id: 2,
        title: "Post #2",
        description: "Так, це там жабка",
        image: require('../assets/susie1.jpg'),
        category: "Artwork",
        likes: 230,
        comments: 20
    },
    {
        id: 3,
        title: "Post #3",
        description: "Вона чарівна😉",
        image: require('../assets/susie1.jpg'),
        category: "Workflow",
        likes: 310,
        comments: 45,
    },
    {
        id: 4,
        title: "Post #4",
        description: "Що я тут взагалі роблю?",
        image: require('../assets/susie1.jpg'),
        category: "New",
        likes: 90,
        comments: 10
    }
];

const CommunityScreen = () => {
    const { theme, toggleTheme } = useTheme();
    const navigation = useNavigation();
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [posts, setPosts] = useState([...postsData]);

    const categories = ['All', 'Screenshots', 'Artwork', 'Workflow', 'New', 'Fashion'];

    const handleFilter = (category) => {
        setSelectedFilter(category);
    };

    const loadMorePosts = () => {
        setPosts((prevPosts) => [...prevPosts, ...postsData]);
    };

    const filteredPosts = selectedFilter === 'All' 
        ? posts 
        : posts.filter(post => post.category === selectedFilter);

    const renderItem = ({ item }) => (
        <PostContainer>
            <ImageContainer source={item.image} />
            <PostTitle>{item.title}</PostTitle>
            <PostDescription>{item.description}</PostDescription>
            <InteractionContainer>
                <Interaction>
                    <FontAwesome name="thumbs-up" size={16} color="#4CAF50" />
                    <InteractionText>{item.likes}</InteractionText>
                </Interaction>
                <Interaction>
                    <FontAwesome5 name="comment" size={16} color="#aaa" />
                    <InteractionText>{item.comments}</InteractionText>
                </Interaction>
                <Interaction>
                    <FontAwesome5 name="share" size={16} color="#aaa" />
                </Interaction>
            </InteractionContainer>
        </PostContainer>
    );

    return (
        <Container>
            <Header title="Community" />
            <SearchInput 
                placeholder="Search..." 
                placeholderTextColor="#aaa" 
                editable={true}
            />
            <FilterContainer>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categories.map((category) => (
                        <FilterButton 
                            key={category} 
                            selected={selectedFilter === category} 
                            onPress={() => handleFilter(category)}
                        >
                            <FilterText>{category}</FilterText>
                        </FilterButton>
                    ))}
                </ScrollView>
            </FilterContainer>
            <FlatList
                data={filteredPosts}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                onEndReached={loadMorePosts}
                onEndReachedThreshold={0.5}
            />
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.background};
    padding: 10px;
`;

const SearchInput = styled.TextInput`
    background-color: #1E1E1E;
    color: #fff;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
`;

const FilterContainer = styled.View`
    height: 50px;
    margin-bottom: 10px;
    justify-content: center;
`;

const FilterButton = styled.TouchableOpacity`
    padding: 12px 15px;
    border-radius: 8px;
    margin-right: 5px;
    background-color: ${({ selected }) => (selected ? '#007BFF' : '#333')};
`;

const FilterText = styled.Text`
    color: #fff;
`;

const PostContainer = styled.View`
    background-color: ${(props) => props.theme.post};
    padding: 10px;
    margin-vertical: 5px;
    border-radius: 10px;
`;

const ImageContainer = styled.Image`
    width: 100%;
    height: 150px;
    border-radius: 10px;
`;

const PostTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    margin-vertical: 5px;
`;

const PostDescription = styled.Text`
    color: ${(props) => props.theme.text};
`;

const InteractionContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 5px;
`;

const Interaction = styled.View`
    flex-direction: row;
    align-items: center;
`;

const InteractionText = styled.Text`
    color: #fff;
    margin-left: 5px;
`;

export default CommunityScreen;
