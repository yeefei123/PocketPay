// ContactList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ContactList: undefined;
  ContactDetails: { contactName: string };
};

type ContactListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ContactList'>;

type Props = {
  navigation: ContactListScreenNavigationProp;
};

const contactList: Contact[] = [
    {
        recordID: '6b2237ee0df85980',
        backTitle: '',
        company: '',
        emailAddresses: [{
          label: 'work',
          email: 'carl-jung@example.com',
        }],
        displayName: "Carl",
        familyName: 'Jung',
        givenName: 'Carl',
        middleName: '',
        jobTitle: '',
        phoneNumbers: [{
          label: 'mobile',
          number: '(555) 555-5555',
        }],
        hasThumbnail: true,
        thumbnailPath: 'content://com.android.contacts/display_photo/3',
        postalAddresses: [{
          label: 'home',
          formattedAddress: '',
          street: '123 Fake Street',
          pobox: '',
          neighborhood: '',
          city: 'Sample City',
          region: 'CA',
          state: 'CA',
          postCode: '90210',
          country: 'USA',
        }],
        prefix: 'MR',
        suffix: '',
        department: '',
        birthday: {'year': 1988, 'month': 1, 'day': 1 },
        imAddresses: [
          { username: '0123456789', service: 'ICQ'},
          { username: 'johndoe123', service: 'Facebook'}
        ],
        urlAddresses:[],
        isStarred: false,
        note:''
      },
      {
        recordID: '6b2237ee0df85980',
        backTitle: '',
        company: '',
        emailAddresses: [{
          label: 'work',
          email: 'carl-jung@example.com',
        }],
        displayName: "Ali",
        familyName: 'Mohammad',
        givenName: 'Ali',
        middleName: '',
        jobTitle: '',
        phoneNumbers: [{
          label: 'mobile',
          number: '(555) 555-5555',
        }],
        hasThumbnail: true,
        thumbnailPath: 'content://com.android.contacts/display_photo/3',
        postalAddresses: [{
          label: 'home',
          formattedAddress: '',
          street: '123 Fake Street',
          pobox: '',
          neighborhood: '',
          city: 'Sample City',
          region: 'CA',
          state: 'CA',
          postCode: '90210',
          country: 'USA',
        }],
        prefix: 'MR',
        suffix: '',
        department: '',
        birthday: {'year': 1988, 'month': 1, 'day': 1 },
        imAddresses: [
          { username: '0123456789', service: 'ICQ'},
          { username: 'johndoe123', service: 'Facebook'}
        ],
        urlAddresses:[],
        isStarred: false,
        note:''
      }
]; 

const  ContactList : React.FC<Props> = ({ navigation }: { navigation: NavigationProp<ParamListBase>}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [chosenContactName, setChosenContactName] = useState<string | null>(null);

  useEffect(() => {
    loadContacts();
//     try {
//       const permission = await Contacts.requestPermission();

//       if (permission === 'authorized') {
//         loadContacts();
//       } else {
//         Alert.alert('Permission Denied', 'Cannot access contacts without permission');
//       }
//     } catch (error) {
//       console.error('Permission request error:', error);
//     }
  
  }, []);

  const loadContacts = () => {
        setContacts(contactList);
        setLoading(false);
  };

  const renderContact = ({ item }: { item: Contact }) => {
    const isSelected = item.givenName === chosenContactName;
    return (
        <TouchableOpacity style={[styles.contactItem, isSelected && styles.chosenContactItem]} onPress={() => handleContactPress(item)}>
            <Text style={styles.contactName}>{item.givenName} {item.familyName}</Text>
        </TouchableOpacity>
    );
  };

  const handleContactPress = (contact: Contact) => {
    setChosenContactName(contact.givenName);
    Alert.alert('Contact Selected', `${contact.givenName} ${contact.familyName}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading Contacts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Please choose a payment method.</Text>
        <FlatList
            data={contacts}
            keyExtractor={item => item.recordID}
            renderItem={renderContact}
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: '#007BFF' }]} onPress={() => { navigation.navigate('(tabs)/sendMoney', {contactName : chosenContactName}) }}>
                    <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor : 'white'
  },
  chosenContactItem: {
    backgroundColor: '#a5d2d3'
  },
  contactName: {
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    width: '90%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ContactList;