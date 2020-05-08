import React from 'react';
import { Button } from 'react-native-paper';

const NavBar = ({navigation, route}) => {

    const handlePress = () => {
        navigation.navigate("NuevoCliente")
    }

    return ( 
        <Button color="#fff" icon="plus-circle" onPress={ () => handlePress() } >
            Cliente
        </Button>
     );
}
 
export default NavBar;