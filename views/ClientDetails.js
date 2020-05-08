import React from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native'
import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import Axios from 'axios'

const ClientDetails = ({navigation, route}) => {

    const { name, email, phone, company, id } = route.params.item;
    const { setGetApi } = route.params;

    const viewConfirm = () => {
        Alert.alert(
            '¿Deseas eliminar este cliente?',
            'Un contacto eliminado no se puede recuperar',
            [
                { text: 'Si, Eliminar', onPress: () => deleteClient() },
                { text: 'Cancelar', style: 'cancel'},
            ]
        )
    }

    const deleteClient = async () => {
        try {
            if( Platform.OS === 'ios' ){
                //Para IOS
                await Axios.delete(`http://localhost:3000/clients/${id}`);
            } else {
                //Para Android
                await Axios.delete(`http://10.0.2.2:3000/clients/${id}`);
            }
        } catch (error) {
            console.log(error)
        }

        //Redireccionar
        navigation.navigate('Inicio')

        //Volver a consultar la API
        setGetApi(true)
    }

    return ( 
        <View style={globalStyles.container}>
            <Headline style={globalStyles.title}>{name}</Headline>
            <Text style={styles.text}><Subheading>Empresa: {company}</Subheading></Text>
            <Text style={styles.text}><Subheading>Correo: {email}</Subheading></Text>
            <Text style={styles.text}><Subheading>Telefono: {phone}</Subheading></Text>

            <Button 
                style={styles.button} 
                mode="contained"
                icon="cancel"
                onPress={ () => viewConfirm() }
            >
                Eliminar Cliente
            </Button>
            <FAB 
                icon="pencil" 
                onPress={ () => navigation.navigate('NuevoCliente', { client: route.params.item, setGetApi }) } 
                style={styles.fab} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        marginBottom: 20,
        fontSize: 18
    },
    button: {
        marginTop: 100,
        backgroundColor: 'red'
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20
    }
})
 
export default ClientDetails;