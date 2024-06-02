import { useColorScheme } from '@/hooks/useColorScheme';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useState } from 'react';
import { ImageBackground, ImageSourcePropType, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface CardProps {
  title: string;
  image: ImageSourcePropType;
}

const Card = ({ title, image }: CardProps) => {
  return (
    <ImageBackground source={image} style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
    </ImageBackground>
  );
};

export default function HomeScreen({ navigation }: { navigation: NavigationProp<ParamListBase> }) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');

  const handleSendPress = () => {
    setModalVisible(true);
  };

  const handleAddPress = () => {
    // Handle the add amount logic here
    setModalVisible(false);
  };

  const handleCancelPress = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Card title="7773240" image={require('../../assets/images/accountCard.jpg')} />
        </View>

        <View style={styles.cardButton}>
          <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('(tabs)/add') }}>
            <Icon name="add-circle-outline" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSendPress}>
            <Icon name="send-outline" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Amount to Send</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              placeholder="Amount"
              value={amount}
              onChangeText={setAmount}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleCancelPress}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

             <TouchableOpacity style={styles.modalButton} onPress={handleAddPress}>
                <Text style={styles.modalButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  cardContainer: {
    width: '90%',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  cardButton: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    height: 100,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  accountHistory: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  historyTitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  historyList: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  historyText: {
    fontSize: 14,
    color: 'black',
  },
  historyDate: {
    fontSize: 14,
    color: 'gray',
  },
});
