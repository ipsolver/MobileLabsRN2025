import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { useTheme } from "../components/Themes";

const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
};

const SafetyScreen = () => {
    const navigation = useNavigation();
    const [authCode, setAuthCode] = useState(generateCode());
    const [selectedTab, setSelectedTab] = useState('Guard');
    const progress = useState(new Animated.Value(100))[0];

    useEffect(() => {
        const updateCode = () => {
            setAuthCode(generateCode());
            progress.setValue(100);
            Animated.timing(progress, {
                toValue: 0,
                duration: 10000,
                useNativeDriver: false,
            }).start();
        };

        updateCode();

        const interval = setInterval(updateCode, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Container>
            <Header title="Safety"/>
            <SwitchContainer>
                <SwitchButton selected={selectedTab === 'Guard'} onPress={() => setSelectedTab('Guard')}>
                    <SwitchText selected={selectedTab === 'Guard'}>Guard</SwitchText>
                </SwitchButton>
                <SwitchButton selected={selectedTab === 'Confirmations'} onPress={() => setSelectedTab('Confirmations')}>
                    <SwitchText selected={selectedTab === 'Confirmations'}>Confirmations</SwitchText>
                </SwitchButton>
            </SwitchContainer>

            <LoggedInText>Logged in as player</LoggedInText>
            <AuthCode>{authCode}</AuthCode>

            <StatusBar>
                <StatusProgress style={{ width: progress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }} />
            </StatusBar>

            <InfoText>
                You'll enter your code each time you enter your password to sign in to your Steam account.
            </InfoText>

            <TipText>
                Tip: If you don’t share your PC, you can select "Remember my password" when you sign in to enter your password and authenticator code less often.
            </TipText>

            <Button>
                <ButtonText>Remove Authenticator</ButtonText>
            </Button>
            <Button>
                <ButtonText>My Recovery Code</ButtonText>
            </Button>
            <Button>
                <ButtonText>Help</ButtonText>
            </Button>
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

const LoggedInText = styled.Text`
    color: ${(props) => props.theme.loger};
    text-align: center;
    margin-top: 20px;
`;

const AuthCode = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
`;

const StatusBar = styled.View`
    height: 5px;
    background-color: #333;
    margin-top: 10px;
    border-radius: 2px;
    overflow: hidden;
`;

const StatusProgress = styled(Animated.View)`
    height: 100%;
    background-color: #007BFF;
`;

const InfoText = styled.Text`
    color: #ccc;
    font-size: 14px;
    text-align: center;
    margin-top: 15px;
`;

const TipText = styled.Text`
    color: #888;
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
`;

const Button = styled.TouchableOpacity`
    background-color: #2a475e;
    padding: 12px;
    border-radius: 5px;
    margin-top: 10px;
    align-items: center;
`;

const ButtonText = styled.Text`
    color: #fff;
    font-size: 16px;
`;

export default SafetyScreen;
