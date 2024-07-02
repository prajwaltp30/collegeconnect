import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { client, databases } from '../lib/appwrite'; // Correct import path

const Signup = () => {
    const [name, setName] = useState('');
    const [usn, setUsn] = useState('');
    const [email, setEmail] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigation = useNavigation();

    const checkUnique = async (field, value) => {
        const query = databases.listDocuments(
            '6683ffe200263fc0e5d2', // Database ID
            '6683fffc0029b4a67b78', // Collection ID
            [`equal("${field}", "${value}")`]
        );
        const result = await query;
        return result.total === 0;
    };

    const handleSubmit = async () => {
        setError('');
        setSuccess('');

        try {
            const usnUnique = await checkUnique('usn', usn);
            const emailUnique = await checkUnique('email', email);
            const phonenoUnique = await checkUnique('phoneno', phoneno);

            if (!usnUnique) {
                setError('USN already exists');
                return;
            }
            if (!emailUnique) {
                setError('Email already exists');
                return;
            }
            if (!phonenoUnique) {
                setError('Phone number already exists');
                return;
            }

            const response = await databases.createDocument(
                '6683ffe200263fc0e5d2', // Database ID
                '6683fffc0029b4a67b78', // Collection ID
                'unique()', // Document ID, you can use 'unique()' to auto-generate an ID
                {
                    name,
                    usn,
                    email,
                    phoneno,
                    password,
                }
            );
            setSuccess('User created successfully');
            console.log('User created successfully', response);

            // Navigate to the Login screen
            navigation.navigate('Login');
        } catch (error) {
            setError('Error creating user: ' + error.message);
            console.error('Error creating user', error);
        }
    };
    const handleLogin = () => {
      navigation.navigate('Login'); // Replace 'Signup' with the actual name of your SignupScreen route
    };
    return (
        <View style={styles.container}>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {success ? <Text style={styles.success}>{success}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="USN"
                value={usn}
                onChangeText={setUsn}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneno}
                onChangeText={setPhoneno}
                keyboardType="phone-pad"
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                required
            />
            <Button title="Sign Up" onPress={handleSubmit} />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    error: {
        color: 'red',
        marginBottom: 12,
    },
    success: {
        color: 'green',
        marginBottom: 12,
    },
});

export default Signup;
