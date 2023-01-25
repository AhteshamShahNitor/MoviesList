import React, { useState } from "react";
import { TextInput, View, Button, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import { useTranslation } from "react-i18next"


const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const { t } = useTranslation()


    function handleEmailChange(text) {
        setEmail(text);
        setEmailError("");
    }

    function handlePasswordChange(text) {
        setPassword(text);
        setPasswordError("");
    }

    const handleSubmit = () => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{8,15})/;

        if (!emailRegex.test(email)) {
            setEmailError("Invalid email address");
            return;
        }

        if (!passwordRegex.test(password)) {
            setPasswordError("Password must be 8-15 characters long and include at least one capital letter and one special character");
            return;
        }

        dispatch({ type: "SET_EMAIL", payload: email });
        dispatch({ type: "SET_PASSWORD", payload: password });
        dispatch({ type: "SET_LOGGED_IN", payload: true });
        AsyncStorage.setItem("isLoggedIn", "true");
        setEmail(""); setPassword("");
        navigation.navigate("DashboardScreen");
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} onChangeText={handleEmailChange} placeholder={t("common:email")} value={email} />
            {emailError && <Text style={styles.error}>{emailError}</Text>}
            <TextInput
                onChangeText={handlePasswordChange}
                placeholder={t("common:password")}
                secureTextEntry={true}
                value={password}
                style={styles.input}
            />
            {passwordError && <Text style={styles.error}>{passwordError}</Text>}
            <Button title={t("common:login")} onPress={handleSubmit} />
            <Button title={t("common:change")} onPress={() => i18next.changeLanguage(i18next.language === 'en' ? 'ar' : 'en')} />
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "10%",
        paddingHorizontal: 10
    },
    error: {
        color: "red",
        fontSize: 12,
    },
    input: {
        padding: 10,
        marginVertical: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
});
