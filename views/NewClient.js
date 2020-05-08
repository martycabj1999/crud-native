import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper'
import globalStyles from '../styles/global'
import Axios from 'axios'

const NewClient = ({navigation, route}) => {

    const { setGetApi } = route.params;

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState(false)

    //Detecta si estamos editando o no
    useEffect( () => {
        if(route.params.client){
            const { name, phone, email, company } = route.params.client;
            setName(name);
            setPhone(phone);
            setEmail(email);
            setCompany(company);
        }
    }, [])

    const saveClient = async () => {
        //validacion
        if( name.trim() === '' || phone.trim() === '' || email.trim() === '' || company.trim() === '' ){
            return setError(true);
        }

        //generar el cliente
        const client = { name, phone, email, company };

        if(route.params.client){
            const { id } = route.params.client;
            client.id = id
            try {
                if( Platform.OS === 'ios' ){
                    //Para IOS
                    await Axios.put(`http://localhost:3000/clients/${id}`, client);
                } else {
                    //Para Android
                    await Axios.put(`http://10.0.2.2:3000/clients/${id}`, client);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            //guardar el cliente en la API
            try {
                if( Platform.OS === 'ios' ){
                    //Para IOS
                    await Axios.post('http://localhost:3000/clients', client);
                } else {
                    //Para Android
                    await Axios.post('http://10.0.2.2:3000/clients', client);
                }
            } catch (error) {
                console.log(error);
            }
        }


        
        //redireccionar
        navigation.navigate('Inicio');

        //limpiar el form
        setName('');
        setPhone('');
        setEmail('');
        setCompany('');
        setGetApi(true);
    }

    return ( 
        <View style={globalStyles.container} >

            <Headline style={globalStyles.title}>{ route.params.client ? "Editar Cliente" : "Añadir Nuevo Cliente" }</Headline>

            <TextInput 
                label="Nombre"
                style={style.input}
                value={name}
                onChangeText={ (text) => setName(text) }
            />
            
            <TextInput 
                label="Telefono"
                style={style.input}
                value={phone}
                onChangeText={ (text) => setPhone(text) }
            />

            <TextInput 
                label="Correo"
                style={style.input}
                value={email}
                onChangeText={ (text) => setEmail(text) }
            />

            <TextInput 
                label="Empresa"
                style={style.input}
                value={company}
                onChangeText={ (text) => setCompany(text) }
            />

            <Button icon="pencil-circle" mode="contained" onPress={ () => saveClient() }>
                { route.params.client ? "Guardar Cambios" : "Guardar Cliente" }
            </Button>

            <Portal>
                <Dialog
                    visible={error}   
                    onDismiss={ () => setError(false) }
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={ () => setError(false) }>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </View>
    );
}

const style = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})
 
export default NewClient;