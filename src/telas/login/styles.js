import { StyleSheet } from 'react-native'; 


const styles = StyleSheet.create(
    {
        container: { 
            flex: 1,
            backgroundColor: '#fafafa', 
            alignItems: 'center',    
            justifyContent: 'center',        
        },
        containerLogin: {
            
            backgroundColor: '#a19e9e98',
            width: '60%',
            height: '40%',                
            borderRadius: 15,     
            justifyContent:'center',
            gap: 6,    
     
        },
        text: {
            fontSize: 20,
            fontWeight:'bold',            
            marginLeft: 30,
        },
        input:{
            width: '75%',
            backgroundColor: '#fafafa',
            borderRadius: 5,
            height: 40,
            marginLeft: 30,
        },
        botao:{
            marginLeft: '22%', 
            backgroundColor: '#fafafa',
            width: '55%',
            alignItems:'center',          
            borderRadius: 15,
            marginTop: 5,
            padding: 7, 
        },
        txtBotao:{
            fontSize: 15,
            fontWeight:'bold',
        },
       
    }
);

export default styles;