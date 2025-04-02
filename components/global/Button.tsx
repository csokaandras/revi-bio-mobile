import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';  
import globalStyles from '@/assets/globalStyles';
import React from 'react';

interface ButtonProps {
    rank: string;
    text: string;
    onPress?: () => void; 
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ rank, text, onPress, disabled }) => {
    const buttonStyle = rank === 'primary' ? buttonStyles.primary : buttonStyles.secondary;

    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={[buttonStyle, { opacity: disabled ? 0.5 : 1 }]}>
            <Text style={[globalStyles.text_zinc_100, {fontWeight: "600"}]}>{text}</Text> 
        </TouchableOpacity>
    );
};

const buttonStyles = StyleSheet.create({
    primary: {
        backgroundColor: "#f43f5e", 
        padding: 10,
        borderRadius: 5
    },
    secondary: {
        backgroundColor: "#374151", 
        padding: 10,    
        borderRadius: 5
    }
});

export default Button;
