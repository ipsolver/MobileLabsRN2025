import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { useTheme } from "../components/Themes";
import styled from "styled-components/native";

const AccountScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <Container theme={theme}>
      <ProfileSection>
        <AvatarContainer>
          <Avatar source={require("../assets/susie1.jpg")} />
          <StatusIndicator />
        </AvatarContainer>
        <Name theme={theme}>Vadym Lishchynskyi</Name>
        <Group theme={theme}>IPZk-24-1</Group>
      </ProfileSection>

      <StyledButton onPress={toggleTheme}>
        <ButtonText>Change Theme</ButtonText>
      </StyledButton>

      <StyledButton onPress={handleLogout}>
        <ButtonText>Logout</ButtonText>
      </StyledButton>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <ModalContainer>
          <ModalContent>
            <ModalText>До зустрічі!</ModalText>
            <TouchableOpacity onPress={handleCloseModal}>
              <ModalButton>OK</ModalButton>
            </TouchableOpacity>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  align-items: center;
  justify-content: center;
`;

const ProfileSection = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

const AvatarContainer = styled.View`
  position: relative;
  width: 80px;
  height: 80px;
`;

const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 40px;
`;

const StatusIndicator = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  background-color: #00ff00;
  border: 2px solid #1b2838;
`;

const Name = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 18px;
  margin-top: 10px;
`;

const Group = styled.Text`
  color: ${(props) => props.theme.secondaryText};
  font-size: 14px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: #2a475e;
  width: 80%;
  padding: 12px;
  border-radius: 5px;
  margin-top: 10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
`;

const ModalText = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ModalButton = styled.Text`
  font-size: 16px;
  color: blue;
`;

export default AccountScreen;
