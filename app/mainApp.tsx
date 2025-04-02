import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('user');
            if (token) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);

                router.push('/login');
            }
        };
        checkAuth();
    }, [router]);

    return (
        <>
            <Stack.Screen name="homeView" options={{ title: 'Home' }} />
            <Stack.Screen name="login" options={{ title: 'LogIn' }} />
            <Stack.Screen name="register" options={{ title: 'Register' }} />
            {isAuthenticated && (
                <Stack.Screen name="bioList" options={{ title: 'Bio list' }} />
            )}
        </>
    );
}
