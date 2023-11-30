import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';

export default function ListaMotosAsyncStorage() {

    const [motos, setMotos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editando, setEditando] = useState(false);
    const [motoSendoEditado, setMotoSendoEditado] = useState(null);

    useEffect(() => {
        loadMotos();
    },[]);

    async function loadMotos() {
        const response =  await AsyncStorage.getItem('motos');
        const motosStorage = response ? JSON.parse(response) : [];
        setMotos(motosStorage);
    }

    async function adicionarMoto() {
        if (inputValue.trim() === '') {
            // Se o campo estiver vazio, não faz nada
            return;
        }

        let novaListaMotos = [...motos, inputValue];
        await AsyncStorage.setItem('motos', JSON.stringify(novaListaMotos));
        setMotos(novaListaMotos);
        setMotoSendoEditado(null);
        setInputValue('');
    }

    async function editarMoto() {
        if (inputValue.trim() === '') {
            // Se o campo estiver vazio, não faz nada
            return;
        }

        let index = motos.indexOf(motoSendoEditado);
        let novaListaMotos = [...motos];
        novaListaMotos.splice(index, 1, inputValue);

        await AsyncStorage.setItem('motos', JSON.stringify(novaListaMotos));
        setMotos(novaListaMotos);
        setEditando(false);
        setInputValue('');
    }

    async function excluirMoto(moto) {
        let novaListaMotos = motos.filter(item => item !== moto);
        await AsyncStorage.setItem('motos', JSON.stringify(novaListaMotos));
        setMotos(novaListaMotos);
    }

    function handleEditarMoto(moto) {
        setMotoSendoEditado(moto);
        setInputValue(moto);
        setEditando(true);
    }

    function handleButton() {
        if (editando) {
            editarMoto();
        } else {
            adicionarMoto();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={{ flex: 4 }}
                    mode='outlined'
                    label='Moto'
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
                data={motos}
                renderItem={({ item }) => (
                    <Card
                        style={styles.card}
                        mode='outlined'
                    >
                        <Card.Content style={styles.cardContent}>
                            <Text variant='titleMedium' style={{ flex: 1 }}>{item}</Text>
                            <IconButton icon='pen' onPress={() => handleEditarMoto(item)} />
                            <IconButton icon='trash-can-outline' onPress={() => excluirMoto(item)} />
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
