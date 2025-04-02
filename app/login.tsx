import { Link, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/global/Button';
import Input from '@/components/global/Input';
import globalStyles from '@/assets/globalStyles';
import axios from 'axios';

const Login = () => {
    const BACKEND_URL = 'http://65.87.7.245'; 
    const router = useRouter(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // State to hold user data after successful login
    const [userData, setUserData] = useState(null);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Hiba', 'Kérlek töltsd ki az összes mezőt.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${BACKEND_URL}/auth/login`, {
                email,
                password,
            });

            const jwt = response.data.jwt;
            if (jwt) {
                
                await AsyncStorage.setItem('user', jwt);
                await localStorage.setItem('user', jwt)
                
                const userResponse = await axios.get(`${BACKEND_URL}/user/@me`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                
                setUserData(userResponse.data);
                await AsyncStorage.setItem("userdata", JSON.stringify(userResponse.data));
                
                router.push('/bioList');
            } else {
                Alert.alert('Hiba', 'Hibás bejelentkezési adatok.');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                Alert.alert('Bejelentkezés sikertelen', error.response?.data?.message || 'Hiba történt.');
            } else if (error instanceof Error) {
                Alert.alert('Bejelentkezés sikertelen', error.message);
            } else {
                Alert.alert('Bejelentkezés sikertelen', 'Ismeretlen hiba történt.');
            }
        } finally {
            setLoading(false); 
        }
    };

    return  (
        <View style={[
            globalStyles.flex_col, globalStyles.flex_centered,
            globalStyles.bg_zinc_900, globalStyles.h_full,
            globalStyles.w_full, { paddingHorizontal: 20 }
        ]}>
            <Link href="/homeView" style={[globalStyles.absolute, {top:20, left:20}]}>
                <svg width="100" height="37" viewBox="0 0 150 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_626_1123)">
            <path d="M119.921 1.79492C118.961 1.79492 118.193 2.0981 117.617 2.70619C117.073 3.28227 116.801 4.03425 116.801 4.96239C116.801 5.85852 117.073 6.61196 117.617 7.22005C118.193 7.79614 118.961 8.08297 119.921 8.08297C120.849 8.08297 121.601 7.79614 122.177 7.22005C122.754 6.61196 123.042 5.85852 123.042 4.96239C123.042 4.03425 122.754 3.28227 122.177 2.70619C121.601 2.0981 120.849 1.79492 119.921 1.79492ZM91.1874 2.89811V35.591H94.8353L95.5195 32.7957C96.1133 33.4637 96.7779 34.0476 97.5237 34.5347C99.0919 35.5588 100.932 36.0715 103.044 36.0715C105.22 36.0715 107.109 35.5588 108.709 34.5347C110.342 33.5105 111.606 32.0868 112.502 30.2626C113.398 28.4063 113.846 26.2618 113.846 23.8295C113.846 21.3971 113.398 19.269 112.502 17.4447C111.606 15.6205 110.342 14.2131 108.709 13.221C107.109 12.1968 105.22 11.6841 103.044 11.6841C100.932 11.6841 99.0919 12.1968 97.5237 13.221C96.9635 13.5753 96.4613 14.0013 95.9869 14.4619V2.89811H91.1874ZM137.998 11.6841C135.63 11.6841 133.535 12.1968 131.71 13.221C129.918 14.2451 128.526 15.6688 127.534 17.4931C126.542 19.3173 126.045 21.4618 126.045 23.9262C126.045 26.3585 126.542 28.4866 127.534 30.3109C128.526 32.1352 129.918 33.5589 131.71 34.583C133.535 35.5752 135.63 36.0715 137.998 36.0715C140.399 36.0715 142.496 35.5752 144.288 34.583C146.08 33.5589 147.473 32.1352 148.465 30.3109C149.489 28.4866 150 26.3585 150 23.9262C150 21.4618 149.489 19.3173 148.465 17.4931C147.473 15.6688 146.08 14.2451 144.288 13.221C142.496 12.1968 140.399 11.6841 137.998 11.6841ZM117.522 12.1646V35.591H122.322V12.1646H117.522ZM102.325 15.8126C104.309 15.8126 105.909 16.5483 107.126 18.0205C108.342 19.4927 108.95 21.4291 108.95 23.8295C108.95 26.2618 108.342 28.2309 107.126 29.7351C105.909 31.2074 104.309 31.943 102.325 31.943C100.372 31.943 98.7882 31.2074 97.572 29.7351C96.3559 28.2629 95.7481 26.3102 95.7481 23.8778C95.7481 21.4455 96.3559 19.4927 97.572 18.0205C98.7882 16.5483 100.372 15.8126 102.325 15.8126ZM137.998 16.2932C140.143 16.2932 141.856 16.9961 143.136 18.4043C144.449 19.8126 145.104 21.6538 145.104 23.9262C145.104 26.1665 144.449 27.99 143.136 29.3982C141.856 30.7744 140.143 31.4625 137.998 31.4625C135.886 31.4625 134.174 30.7744 132.862 29.3982C131.582 27.99 130.943 26.1502 130.943 23.8778C130.943 21.6055 131.582 19.7805 132.862 18.4043C134.174 16.9961 135.886 16.2932 137.998 16.2932ZM81.6338 28.2466C80.9617 28.2466 80.3376 28.422 79.7615 28.7741C79.1854 29.1261 78.7218 29.5913 78.3697 30.1673C78.0176 30.7114 77.8408 31.3356 77.8408 32.0397C77.8408 32.7118 78.0176 33.336 78.3697 33.912C78.7218 34.4881 79.1854 34.9518 79.7615 35.3039C80.3376 35.6559 80.9617 35.8313 81.6338 35.8313C82.3379 35.8313 82.9784 35.6559 83.5545 35.3039C84.1306 34.9518 84.5942 34.4881 84.9463 33.912C85.2983 33.336 85.4737 32.7118 85.4737 32.0397C85.4737 31.3356 85.2983 30.7114 84.9463 30.1673C84.5942 29.5913 84.1306 29.1261 83.5545 28.7741C82.9784 28.422 82.3379 28.2466 81.6338 28.2466Z" fill="#52525B"/>
            <path d="M69.2482 0.929688C68.0961 0.929688 67.1673 1.29823 66.4632 2.03434C65.7911 2.73845 65.4552 3.6658 65.4552 4.81797C65.4552 5.90613 65.7911 6.80225 66.4632 7.50636C67.1673 8.21046 68.0961 8.56267 69.2482 8.56267C70.4004 8.56267 71.3114 8.21046 71.9835 7.50636C72.6876 6.80225 73.0398 5.90613 73.0398 4.81797C73.0398 3.6658 72.6876 2.73845 71.9835 2.03434C71.3114 1.29823 70.4004 0.929688 69.2482 0.929688ZM11.3292 11.5866C10.3051 11.5866 9.31235 11.8436 8.35222 12.3557C7.42409 12.8358 6.59188 13.4109 5.85578 14.083C5.65271 14.2769 5.49629 14.4583 5.32251 14.6441L4.70426 12.1154H0V35.5902H6.28797V19.5917C6.60242 19.2649 6.944 18.9692 7.34427 18.7405C8.46442 18.0684 10.0649 17.7325 12.1452 17.7325H13.6806V12.0188C13.4566 11.8587 13.137 11.7473 12.721 11.6833C12.3049 11.6192 11.8413 11.5866 11.3292 11.5866ZM26.3342 11.5866C23.9979 11.5866 21.95 12.1156 20.1898 13.1718C18.4295 14.1959 17.0683 15.636 16.1082 17.4922C15.148 19.3165 14.668 21.4446 14.668 23.877C14.668 26.3413 15.148 28.4858 16.1082 30.3101C17.0683 32.1343 18.4295 33.5581 20.1898 34.5822C21.95 35.5743 23.9979 36.0707 26.3342 36.0707C28.8945 36.0707 31.0702 35.558 32.8624 34.5338C34.6866 33.4777 36.1281 31.9737 37.1843 30.0215L32.8155 27.525C32.1434 28.5171 31.3424 29.3494 30.4143 30.0215C29.4862 30.6936 28.2067 31.0294 26.5744 31.0294C24.7182 31.0294 23.2455 30.5018 22.1573 29.4457C21.2429 28.5035 20.749 27.243 20.6264 25.701H37.8553C37.9193 25.477 37.952 25.205 37.952 24.8849C37.9839 24.5329 38.0003 24.1807 38.0003 23.8286C38.0003 21.4603 37.5203 19.3648 36.5602 17.5406C35.6001 15.6843 34.2388 14.2279 32.4786 13.1718C30.7503 12.1156 28.7025 11.5866 26.3342 11.5866ZM39.0991 12.1154L48.1252 35.5902H54.1744L62.7669 12.1154H56.2855L51.111 27.8517L45.724 12.1154H39.0991ZM66.1277 12.1154V35.5902H72.4157V12.1154H66.1277ZM26.3342 16.5326C28.3184 16.5326 29.7748 17.1553 30.7029 18.4035C31.2662 19.1358 31.6436 20.011 31.8764 20.9967H20.7157C20.9316 19.8681 21.4037 18.9184 22.1573 18.1647C23.2135 17.0765 24.6059 16.5326 26.3342 16.5326Z" fill="#F43F5E"/>
            <path d="M69.2477 0.929688C68.0956 0.929688 67.1668 1.29824 66.4627 2.03435C65.7906 2.73845 65.4548 3.6658 65.4548 4.81797C65.4548 5.90613 65.7906 6.80225 66.4627 7.50636C67.1668 8.21046 68.0956 8.56267 69.2477 8.56267C70.3999 8.56267 71.3109 8.21046 71.983 7.50636C72.6871 6.80225 73.0393 5.90613 73.0393 4.81797C73.0393 3.6658 72.6871 2.73845 71.983 2.03435C71.3109 1.29824 70.3999 0.929688 69.2477 0.929688ZM39.2539 12.1154L48.2859 19.599L45.7235 12.1154H39.2539ZM56.285 12.1154L52.6385 23.206L52.8231 23.3583L59.5667 20.856L62.7664 12.1154L56.285 12.1154ZM66.1272 12.1154V18.4211L72.4152 16.0872V12.1154H66.1272Z" fill="#BE123C"/>
            <path d="M22.9675 21.875L14.7208 24.9355C14.8418 26.9544 15.2902 28.7552 16.1082 30.3094C17.0683 32.1336 18.4295 33.5574 20.1898 34.5815C21.95 35.5736 23.9979 36.07 26.3342 36.07C28.8945 36.07 31.0702 35.5573 32.8624 34.5331C33.888 33.9394 34.7793 33.1876 35.5625 32.3106L31.5776 29.0084C31.2125 29.3744 30.8307 29.7192 30.4143 30.0208C29.4862 30.6929 28.2067 31.0287 26.5744 31.0287C24.7182 31.0287 23.2455 30.5011 22.1573 29.445C21.2429 28.5028 20.749 27.2423 20.6264 25.7003H27.5838L22.9675 21.875ZM6.28797 28.0649L0 30.3973V35.5895H6.28797V28.0649Z" fill="#BE123C"/>
            </g>
            <defs>
            <clipPath id="clip0_626_1123">
            <rect width="150" height="35.141" fill="white" transform="translate(0 0.929688)"/>
            </clipPath>
            </defs>
                </svg>
            </Link>
            <View style={{ marginBottom: 50 }}>
                <Text style={[globalStyles.text_4xl, globalStyles.text_zinc_100]}>Welcome back!</Text>
                <Text style={[globalStyles.text_base, globalStyles.text_zinc_400]}>
                Let’s continue where you left off. Forgot your password? Click here to start the password reset process.
                </Text>
            </View>

            <View style={[globalStyles.w_full, globalStyles.flex_col, globalStyles.gap_5, globalStyles.flex_col, globalStyles.flex_centered, { marginBottom: 50 }]}>                   
                <Input type="email" placeholder="E-mail" value={email} onChangeText={setEmail} />
                <Input type="password" placeholder="Jelszó" value={password} onChangeText={setPassword} secureTextEntry />
            </View>

            <View style={[globalStyles.w_full, globalStyles.flex_row, globalStyles.flex_centered, globalStyles.gap_5, globalStyles.wrap]}>
                <Button rank="primary" text={loading ? "Login..." : "Login"} onPress={handleLogin} disabled={loading} />
                <TouchableOpacity>
                    <Link href="/register">
                        <Text style={[globalStyles.text_zinc_400, globalStyles.text_base]}>Or create an account</Text>
                    </Link>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;
