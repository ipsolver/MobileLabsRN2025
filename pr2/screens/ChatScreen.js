import React, { useState } from 'react';
import { View, FlatList, Image, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { useTheme } from "../components/Themes";

const chatData = [
    { id: 1, name: "Vader", lastMessage: "Hello!", date: "22 Mar", avatar: require('../assets/susie1.jpg'), unread: true },
    { id: 2, name: "Riplovik", lastMessage: "How are you?", date: "22 Mar", avatar: require('../assets/rip.jpg'), unread: false },
    { id: 3, name: "Bresh", lastMessage: "Let's play!", date: "22 Mar", avatar: require('../assets/bresh.jpg'), unread: true },
    { id: 4, name: "Kerosene", lastMessage: "Good game!", date: "22 Mar", avatar: require('../assets/kerosene.jpg'), unread: false }
];

const ChatScreen = () => {
    const { theme, toggleTheme } = useTheme();
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState('newChats');

    const loadMoreChats = () => {
        return chatData;
    };

    const renderItem = ({ item }) => (
        <ChatItem>
            <Avatar source={item.avatar} />
            <ChatInfo>
                <ChatName>{item.name}</ChatName>
                <LastMessage>{item.lastMessage} • {item.date}</LastMessage>
            </ChatInfo>
            {item.unread && <UnreadIndicator />}
        </ChatItem>
    );

    return (
        <Container>
            <Header title="Chat" />
            <SwitchContainer>
                <SwitchButton selected={selectedTab === 'newChats'} onPress={() => setSelectedTab('newChats')}>
                    <SwitchText selected={selectedTab === 'newChats'}>New Chats</SwitchText>
                </SwitchButton>
                <SwitchButton selected={selectedTab === 'myFriends'} onPress={() => setSelectedTab('myFriends')}>
                    <SwitchText selected={selectedTab === 'myFriends'}>My Friends</SwitchText>
                </SwitchButton>
            </SwitchContainer>
            <FlatList
                data={Array(10).fill(chatData).flat()}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={loadMoreChats}
                onEndReachedThreshold={0.5}
                ListFooterComponent={<ActivityIndicator size="large" color="#fff" />}
            />
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.background};
    padding: 10px;
`;

const SwitchContainer = styled.View`
    flex-direction: row;
    background-color: ${(props) => props.theme.post};
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 5px;
`;

const SwitchButton = styled.TouchableOpacity`
    flex: 1;
    padding: 10px;
    border-radius: 5px;
    background-color: ${({ selected }) => (selected ? '#007BFF' : 'transparent')};
    align-items: center;
`;

const SwitchText = styled.Text`
    color: ${({ selected }) => (selected ? '#fff' : '#aaa')};
    font-weight: bold;
`;

const ChatItem = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${(props) => props.theme.post};
    padding: 12px;
    border-radius: 10px;
    margin-bottom: 10px;
`;

const Avatar = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 10px;
`;

const ChatInfo = styled.View`
    flex: 1;
`;

const ChatName = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
`;

const LastMessage = styled.Text`
    color: ${(props) => props.theme.chat};
    font-size: 14px;
`;

const UnreadIndicator = styled.View`
    width: 10px;
    height: 10px;
    background-color: #007BFF;
    border-radius: 5px;
`;

export default ChatScreen;
