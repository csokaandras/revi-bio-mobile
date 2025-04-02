import React, { useEffect, useState } from 'react';
import { View, Image, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import globalStyles from "@/assets/globalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const BACKEND_URL = 'http://65.87.7.245';  

const defaultPfp = require('@/assets/defPfp.png');  
const bgPic01 = require('@/assets/bg/dasauto.jpg'); 
const bgPic02 = require('@/assets/bg/villager.jpeg'); 
const bgPic03 = require('@/assets/bg/squirrel.png'); 
const bgPic04 = require('@/assets/bg/revimerch.png'); 
const bgPic05 = require('@/assets/bg/gandalf.png');
const bgPic06 = require('@/assets/bg/gumball.png');
const bgPic07 = require('@/assets/bg/wizard.png');
const bgPic08 = require('@/assets/bg/cheese.png');
const bgPic09 = require('@/assets/bg/dogrocket.png');
const bgPic10 = require('@/assets/bg/cophorse.png');
const bgPic11 = require('@/assets/bg/iam.jpg');
const bgPic12 = require('@/assets/bg/drhouse.png');
const bgPic13 = require('@/assets/bg/salamicat.png');
const bgPic14 = require('@/assets/bg/steve.png');

const logOut = () => {
    AsyncStorage.removeItem("user");
    router.push('/login');
}

interface Bio {
    handle: string;
    name: string;
    widgets: number;
    user: string;
    createdAt: string;
    updatedAt: string;
    views: number;
}

const BioList = () => {
    const [avatar, setAvatarId] = useState<string | null>(null);
    const [user, setUserName] = useState<string | null>(null);
    const [bios, getBios] = useState<Bio[] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0); // Aktuális oldal indexe

    const [randomImage, setRandomImage] = useState(null);

    const generateBackground = () => {
        const backgrounds = [bgPic01, bgPic02, bgPic03, bgPic04, bgPic05, bgPic06, bgPic07, bgPic08, bgPic09, bgPic10, bgPic11, bgPic12, bgPic13, bgPic14];
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        setRandomImage(backgrounds[randomIndex]);
      };

    useEffect(() => {
        generateBackground();
    }, []);
    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userToken = await AsyncStorage.getItem('user');
                if (userToken) {
                    const decodedToken = jwtDecode(userToken) as { avatar?: string };
                    
                    if (decodedToken && decodedToken.avatar) {
                        setAvatarId(decodedToken.avatar);
                    }
                    
                    const storedUserData = await AsyncStorage.getItem('userdata');
                    if (storedUserData) {
                        const userData = JSON.parse(storedUserData);
                        
                        if (userData.avatar) {
                            setAvatarId(userData.avatar);
                        }
                        if(userData.displayName){
                            setUserName(userData.displayName);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchBios = async () => {
            try {
                const userToken = await AsyncStorage.getItem('user'); // Token lekérése
                if (userToken) {
                    const response = await axios.get(`${BACKEND_URL}/bio`, {
                        headers: {
                            'Authorization': `Bearer ${userToken}` // Token hozzáadása a kéréshez
                        }
                    });
                    if (response && response.data) {
                        getBios(response.data); // Frissítjük a bios állapotot
                    }
                }
            } catch (error) {
                console.log("Error while fetching bios:", error);
            }
        };
        
        fetchUserData();
        fetchBios();
    }, []);

    // Lapozás előző oldalra
    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            generateBackground();
        }
    };

    // Lapozás következő oldalra
    const goToNextPage = () => {
        if (bios && currentPage < bios.length - 1) {
            setCurrentPage(currentPage + 1);
            generateBackground();
        }
    };

    const currentPfp = avatar ? `${BACKEND_URL}/file/${avatar}` : defaultPfp;

    return  (   
        <View style={[globalStyles.flex_col, globalStyles.flex_centered, globalStyles.bg_zinc_900, globalStyles.h_full, globalStyles.w_full, globalStyles.gap_5, globalStyles.relative]}>
            <TouchableOpacity onPress={logOut} style={[globalStyles.absolute, {top:10, left:10}]}>
                <Text style={[globalStyles.text_rose_500, globalStyles.text_lg]}>Log out</Text>
            </TouchableOpacity>
            <Text style={[globalStyles.text_2xl, globalStyles.text_zinc_100]}>Welcome {user}</Text>
            <ImageBackground 
                source={randomImage!}
                style={[globalStyles.flex_col, globalStyles.flex_centered, globalStyles.gap_5, globalStyles.relative, { height: '60%', width: "80%" }]}
                imageStyle={{ borderRadius: 20, width: '100%', height: '100%', zIndex: 1 }} 
            >
                <View style={{ 
                    position: "absolute", 
                    top: 0, left: 0, right: 0, bottom: 0, 
                    backgroundColor: "rgba(0, 0, 0, 0.7)",  
                    borderRadius: 20,
                    zIndex: 1
                }} />

                <View style={[globalStyles.flex_col, globalStyles.flex_centered, globalStyles.w_full, globalStyles.gap_5, { height: "80%", zIndex: 2 }]}>
                    <Image
                        source={currentPfp}  
                        style={{ width: 200, height: 200, borderRadius: 100, objectFit: 'cover' }} 
                        alt="Profile Picture"
                    />
                    {bios && bios.length > 0 && (
                        <Text style={[globalStyles.text_lg, globalStyles.text_rose_500]}>{bios[currentPage]?.handle}</Text>
                    )}
                </View>
            </ImageBackground>

            {bios && bios.length > 0 && (
                <Text style={[globalStyles.text_2xl, globalStyles.text_zinc_100]}>{bios[currentPage]?.name}</Text>
            )}

            {/* Lapozó indikátor */}
            <View style={[globalStyles.flex_row, globalStyles.flex_centered, globalStyles.gap_2]}>
                {bios && bios.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            globalStyles.bg_zinc_400, 
                            { borderRadius: 5, height: 5, width: 20, opacity: index === currentPage ? 1 : 0.5 }
                        ]}
                    />
                ))}
            </View>

            {/* Lapozó gombok */}
            <View style={[globalStyles.flex_row, globalStyles.flex_centered, globalStyles.gap_2, { marginTop: 20 }]}>
                <TouchableOpacity onPress={goToPreviousPage} style={[globalStyles.bg_zinc_400, { borderRadius: 5, padding: 10 }]}>
                    <Text style={[globalStyles.text_zinc_100]}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToNextPage} style={[globalStyles.bg_zinc_400, { borderRadius: 5, padding: 10 }]}>
                    <Text style={[globalStyles.text_zinc_100]}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BioList;
