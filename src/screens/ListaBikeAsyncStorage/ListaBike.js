import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';

export default function ListaBikesAsyncStorage() {

    const [bikes, setBikes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editando, setEditando] = useState(false);
    const [bikeSendoEditado, setBikeSendoEditado] = useState(null);

    useEffect(() => {
        loadBikes();
    },[]);

    async function loadBikes() {
        const response =  await AsyncStorage.getItem('bikes');
        const bikesStorage = response ? JSON.parse(response) : [];
        setBikes(bikesStorage);
    }

    async function adicionarBike() {
        if (inputValue.trim() === '') {
            // Se o campo estiver vazio, não faz nada
            return;
        }

        let novaListaBikes = [...bikes, inputValue];
        await AsyncStorage.setItem('bikes', JSON.stringify(novaListaBikes));
        setBikes(novaListaBikes);
        setBikeSendoEditado(null);
        setInputValue('');
    }

    async function editarBike() {
        if (inputValue.trim() === '') {
            // Se o campo estiver vazio, não faz nada
            return;
        }

        let index = bikes.indexOf(bikeSendoEditado);
        let novaListaBikes = [...bikes];
        novaListaBikes.splice(index, 1, inputValue);

        await AsyncStorage.setItem('bikes', JSON.stringify(novaListaBikes));
        setBikes(novaListaBikes);
        setEditando(false);
        setInputValue('');
    }

    async function excluirBike(bike) {
        let novaListaBikes = bikes.filter(item => item !== bike);
        await AsyncStorage.setItem('bikes', JSON.stringify(novaListaBikes));
        setBikes(novaListaBikes);
    }

    function handleEditarBike(bike) {
        setBikeSendoEditado(bike);
        setInputValue(bike);
        setEditando(true);
    }

    function handleButton() {
        if (editando) {
            editarBike();
        } else {
            adicionarBike();
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>

                <TextInput
                    style={{ flex: 4 }}
                    mode='outlined'
                    label='Bike'
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />

                <Button
                    style={styles.button}
                    mode='contained'
                    onPress={handleButton}
                >
                    {editando ? 'Edit' : 'Add'}
                </Button>

            </View>

            <FlatList
                style={styles.list}
                data={bikes}
                renderItem={({ item }) => (
                    <Card
                        style={styles.card}
                        mode='outlined'
                    >
                        <Card.Content style={styles.cardContent}>
                            <Text variant='titleMedium' style={{ flex: 1 }}>{item}</Text>
                            <IconButton icon='pen' onPress={() => handleEditarBike(item)} />
                            <IconButton icon='trash-can-outline' onPress={() => excluirBike(item)} />
                        </Card.Content>
                    </Card>
                )}

            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        width: '95%',
        paddingTop: 10,
        gap: 5
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        width: '95%',
        marginTop: 10
    },
    card: {
        margin: 5
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
