import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';

export default function ListaAviaoAsyncStorage() {

    const [aviao, setAviao] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editando, setEditando] = useState(false);
    const [aviaosSendoEditado, setAviaosSendoEditado] = useState(null);

    useEffect(() => {
        loadAviao();
    },[]);

    async function loadAviao() {
        const response =  await AsyncStorage.getItem('aviao');
        const aviaoStorage = response ? JSON.parse(response) : [];
        setAviao(aviaoStorage);
    }

    async function adicionarAviao() {
        if (inputValue.trim() === '') {
            // Se o campo estiver vazio, não faz nada
            return;
        }

        let novaListaAviao = [...aviao, inputValue];
        await AsyncStorage.setItem('aviao', JSON.stringify(novaListaAviao));
        setAviao(novaListaAviao);
        setAviaosSendoEditado(null);
        setInputValue('');
    }

    async function editarAviao() {
        if (inputValue.trim() === '') {
            // Se o campo estiver vazio, não faz nada
            return;
        }

        let index = aviao.indexOf(aviaosSendoEditado);
        let novaListaAviao = [...aviao];
        novaListaAviao.splice(index, 1, inputValue);

        await AsyncStorage.setItem('aviao', JSON.stringify(novaListaAviao));
        setAviao(novaListaAviao);
        setEditando(false);
        setInputValue('');
    }

    async function excluirAviao(aviaos) {
        let novaListaAviao = aviao.filter(item => item !== aviaos);
        await AsyncStorage.setItem('aviao', JSON.stringify(novaListaAviao));
        setAviao(novaListaAviao);
    }

    function handleEditarAviao(aviaos) {
        setAviaosSendoEditado(aviaos);
        setInputValue(aviaos);
        setEditando(true);
    }

    function handleButton() {
        if (editando) {
            editarAviao();
        } else {
            adicionarAviao();
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>

                <TextInput
                    style={{ flex: 4 }}
                    mode='outlined'
                    label='Aviao'
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
                data={aviao}
                renderItem={({ item }) => (
                    <Card
                        style={styles.card}
                        mode='outlined'
                    >
                        <Card.Content style={styles.cardContent}>
                            <Text variant='titleMedium' style={{ flex: 1 }}>{item}</Text>
                            <IconButton icon='pen' onPress={() => handleEditarAviao(item)} />
                            <IconButton icon='trash-can-outline' onPress={() => excluirAviao(item)} />
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
