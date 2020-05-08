import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native'
import { List, Headline, Button, FAB } from 'react-native-paper'
import globalStyles from '../styles/global'
import Axios from 'axios';

const Inicio = ({navigation}) => {

    const [clients, setClients] = useState([])
    const [getApi, setGetApi] = useState(true)

    useEffect(() => {
        const getClients = async () => {
            try {
                const result = await Axios.get('http://10.0.2.2:3000/clients');
                setClients(result.data);
                setGetApi(false);
            } catch (error) {
                console.log(error);
            }
        }
        if( getApi ){
            getClients();
        }
    }, [getApi])

    return ( 
        <View style={globalStyles.container}>

            <Button icon="plus-circle" onPress={ () => navigation.navigate('NuevoCliente', { setGetApi }) } >
                Nuevo Cliente
            </Button>

            <Headline style={globalStyles.title}>{ clients.length > 0 ? "Clientes" : "No hay clientes" }</Headline>

            <FlatList 
                data={clients}
                keyExtractor={ client => (client.id) }
                renderItem={ ({item}) => (
                    <List.Item 
                        title={item.name}
                        onPress={ () => navigation.navigate('DetallesCliente', { item, setGetApi }) }
                        description={item.company}
                    />
                ) }
            />

            <FAB 
                icon="plus" 
                onPress={ () => navigation.navigate('NuevoCliente', { setGetApi }) } 
                style={styles.fab} 
            />

        </View>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20
    }
})

export default Inicio;