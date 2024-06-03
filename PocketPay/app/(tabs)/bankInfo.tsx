import React, { useRef, useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import { HistoryRef, PaymentHistoryItem } from '../history/history';

interface BankInfoProps {
    balance: number;
    updateBalance: (newBalance: number) => void; // Function to update the balance
}

const data = [
    { label: "CIMB Bank", value: "1" },
    { label: "RHB Bank", value: "2" },
    { label: "UOB Bank", value: "3" },
    { label: "Touch N Go", value: "4" },
    { label: "Hong Leong Bank", value: "5" },
    { label: "BSN", value: "6" },
    { label: "GXBank", value: "7" },
];

const initialPaymentHistory: PaymentHistoryItem[] = [
    { id: '1', description: 'Grocery Shopping', amount: '-RM150.00', date: '2024-05-20' },
    { id: '2', description: 'Salary', amount: '+RM3000.00', date: '2024-05-18' },
    { id: '3', description: 'Electricity Bill', amount: '-RM200.00', date: '2024-05-15' },
    { id: '4', description: 'Dining Out', amount: '-RM75.00', date: '2024-05-14' },
];

export default function BankInfo({ balance, updateBalance }: BankInfoProps) {
    const [bankValue, setBankValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [accountNumber, setAccountNumber] = useState("");
    const [password, setPassword] = useState("");
    const [isAccountValid, setIsAccountValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isBankValid, setIsBankValid] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState('');
    const historyRef = useRef<HistoryRef>(null);

    const handleAddMoney = () => {
        const validAccountNumber = "QWERTY"; // Example of valid account number
        const validPassword = "1234567"; // Example of valid password

        const isAccountNumberValid = accountNumber === validAccountNumber;
        const isPasswordValid = password === validPassword;
        const isBankSelected = bankValue !== '';

        setIsAccountValid(isAccountNumberValid);
        setIsPasswordValid(isPasswordValid);
        setIsBankValid(isBankSelected);

        if (isAccountNumberValid && isPasswordValid && isBankSelected) {
            setModalVisible(true);
        } else {
            console.log("Invalid account number, password, or bank selection.");
        }
    };

    const handleAddPress = () => {
        if (amount !== '') {
            if (historyRef.current) {
                const newTransaction: PaymentHistoryItem = {
                    id: (initialPaymentHistory.length + 1).toString(),
                    description: 'Add Money',
                    amount: `+RM${amount}`,
                    date: new Date().toISOString().split('T')[0],
                };
                historyRef.current.appendToPaymentHistory(newTransaction);
            }
            console.log('bankInfo',balance);
            const updatedBalance = parseFloat(amount) + balance;
            updateBalance(updatedBalance); 
            console.log('updatedBalance',updatedBalance)
            setModalVisible(false);
            alert('Transaction successfully. Your current balance is RM' + balance);
        } else {
            // Handle empty amount
        }
    };

    const handleCancelPress = () => {
        setModalVisible(false);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <View style={styles.inner}>
                        <Text style={styles.title}>
                            Please enter your bank details to proceed.
                        </Text>

                        <Text style={styles.label}>Select bank:</Text>
                        <Dropdown
                            style={[
                                styles.dropdown,
                                isFocus && { borderColor: "blue" },
                                !isBankValid && styles.inputError,
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? "Select bank" : "..."}
                            searchPlaceholder="Search..."
                            value={bankValue}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => {
                                setBankValue(item.value);
                                setIsFocus(false);
                                setIsBankValid(true); // Reset bank validation on change
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color={isFocus ? "blue" : "black"}
                                    name="Safety"
                                    size={20}
                                />
                            )}
                        />
                        {!isBankValid && (
                            <Text style={styles.errorText}>Please select a bank.</Text>
                        )}

                        <Text style={styles.label}>Account Details:</Text>
                        <TextInput
                            style={[
                                styles.input,
                                !isAccountValid && styles.inputError,
                            ]}
                            placeholder="Enter your account number"
                            value={accountNumber}
                            onChangeText={setAccountNumber}
                        />
                        {!isAccountValid && (
                            <Text style={styles.errorText}>Invalid account number.</Text>
                        )}

                        <Text style={styles.label}>Password:</Text>
                        <TextInput
                            style={[styles.input, !isPasswordValid && styles.inputError]}
                            placeholder="Enter your password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                        {!isPasswordValid && (
                            <Text style={styles.errorText}>Invalid password.</Text>
                        )}

                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={handleAddMoney}
                        >
                            <Text style={styles.confirmButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

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
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    label: {
        alignSelf: "flex-start",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#555",
    },
    input: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: "white",
    },
    inputError: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        alignSelf: "flex-start",
        marginBottom: 10,
    },
    confirmButton: {
        backgroundColor: "#1E90FF",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 20,
    },
    confirmButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    dropdown: {
        height: 50,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 20,
        width: "100%",
    },
    icon: {
        marginRight: 5,
    },
    dropdownLabel: {
        position: "absolute",
        backgroundColor: "white",
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
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
});
