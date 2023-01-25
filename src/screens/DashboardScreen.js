import React, { useState, useEffect } from "react";
import { View, Button, Text, FlatList, Image, Dimensions, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next"

const DashboardScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState(null);
    const { t } = useTranslation()

    const API_KEY = "01aa6d1399fa05b5c51ba12b412fb5e5"
    const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

    const handleLogout = () => {
        AsyncStorage.setItem("isLoggedIn", "false");
        navigation.navigate("LoginScreen", {}, { reset: true })
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(API_URL);
                const json = await response.json();
                console.log("json", json.results)
                setData(json.results);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemStyle}>
                <Image
                    source={{ uri: IMAGE_BASE_URL + item.poster_path }}
                    style={{ width: "100%", height: 120 }}
                />
                <Text numberOfLines={3} style={{ fontWeight: "bold" }}>{item.title}</Text>
            </View>
        )
    }

    return (
        <>
            <Button title={"Logout"} onPress={handleLogout} />
            <View style={styles.containerStyle}>

                {data && data.length > 0 ? (
                    <FlatList
                        data={data}
                        numColumns={2}
                        renderItem={renderItem}
                        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 15 }}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                ) : (
                    <Text>Loading movies...</Text>
                )}
            </View>
        </>
    );
}

export default DashboardScreen;

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
    containerStyle: {
        paddingHorizontal: 20,
        marginVertical: 20
    },
    itemStyle: {
        backgroundColor: 'gray',
        width: width / 2 - 10,
        padding: 8,
        borderRadius: 10
    },
});
