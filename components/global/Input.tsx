import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';  

interface InputProps {
    type?: "text" | "password" | "email";
    placeholder?: string;
    disabled?: boolean;
    icon?: string;
    styleclass?: "error" | "none";
    value: string; 
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean; 
}

const Input: React.FC<InputProps> = ({ type = "text", placeholder = "Enter text", disabled = false, icon, styleclass, value, onChangeText, secureTextEntry }) => {
    return (
        <View style={[styles.inputContainer, styleclass === 'error' && styles.error]}>
            {icon && (
                <View style={styles.iconContainer}>
                    <MaterialIcons name={icon} size={20} color="#fff" style={styles.icon} />
                </View>
            )}
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                secureTextEntry={secureTextEntry} 
                editable={!disabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        maxWidth:700,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
        width: '100%',
        //paddingHorizontal: 10,
        //paddingVertical: 12,
    },
    input: {
        flex: 1,
        backgroundColor: '#2c2c2c',
        color: '#d1d1d1',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
    },
    iconContainer: {
        position: 'absolute',
        left: 12,
    },
    icon: {
        zIndex: 1,
    },
    error: {
        borderColor: '#f44336', 
    },
});

export default Input;
