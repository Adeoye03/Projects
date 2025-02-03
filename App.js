import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

const App = () => {
    const [studentId, setStudentId] = useState('');
    const [status, setStatus] = useState('');

    const markAttendance = async () => {
        const response = await fetch('http://localhost:3000/mark-attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentId,
                date: new Date(),
                status,
            }),
        });
        const result = await response.text();
        console.log(result);
    };

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder='Student ID'
                value={studentId}
                onChangeText={setStudentId}
            />
            <TextInput 
                style={styles.input}
                placeholder='Status'
                value={status}
                onChangeText={setStatus}
            />
            <Button title="Mark Attendance" onPress={markAttendance} />
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
});

export default App;