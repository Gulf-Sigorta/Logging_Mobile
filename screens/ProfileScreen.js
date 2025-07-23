import react from "react";  
import { View,Text,StyleSheet} from 'react-native';

export default function ProfileScreen() {
    return(
        <View style= {styles.contanier}>
            <Text>Profil Sayfası</Text>


        </View>


    );
}

const styles= StyleSheet.create({
    contanier: {flex:1,justifContent:'center',alignItems:'center'},
});