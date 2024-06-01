import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { FlatList, ImageBackground, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const paymentHistory = [
  { id: '1', description: 'Grocery Shopping', amount: '-RM150.00', date: '2024-05-20' },
  { id: '2', description: 'Salary', amount: '+RM3000.00', date: '2024-05-18' },
  { id: '3', description: 'Electricity Bill', amount: '-RM200.00', date: '2024-05-15' },
  { id: '4', description: 'Dining Out', amount: '-RM75.00', date: '2024-05-14' },
];

interface PaymentHistoryItem {
  id: string;
  description: string;
  amount: string;
  date: string;
}

const renderHistoryItem = ({ item }: { item: PaymentHistoryItem }) => (
  <View style={styles.historyItem}>
    <Text style={styles.historyText}>{item.description}</Text>
    <Text style={styles.historyText}>{item.amount}</Text>
    <Text style={styles.historyDate}>{item.date}</Text>
  </View>
);

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => console.log('QR Code button pressed')} style={styles.qrButton}>
        <Icon name="qr-code-outline" size={30} color="black" />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Card
            title='7773240'
            image={require('../../assets/images/accountCard.jpg')}
          />
        </View>

        <View style={styles.cardButton}>
          <TouchableOpacity style={styles.button}>
            <Icon name="add-circle-outline" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="send-outline" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="wallet-outline" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.accountHistory}>
        <Text style={[styles.historyTitle, , { color: isDarkMode ? 'white' : 'black' }]}>History</Text>
        <FlatList
          data={paymentHistory}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          style={styles.historyList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  qrButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    height: 100,
    marginBottom: 20
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
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
