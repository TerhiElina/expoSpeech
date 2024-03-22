import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, TextInput, Button, Alert } from 'react-native';
import * as Speech from 'expo-speech';
import { useState, useEffect } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);

  useEffect(() =>{
    async function fetchVoices(){
      const availableVoices = await Speech.getAvailableVoicesAsync();
      setVoices(availableVoices);
    }
    fetchVoices();
  }, []);


  const speak = async () => {
    if(text.length <= Speech.maxSpeechInputLength)
    {
    await Speech.speak(text, {
      language:'fi',
      voice: voices[0]?.identifier,
    });
    } else {
      console.log('Text exceeds maximum')
    }
  };


  return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      placeholder='kirjoita mitä mieleen tulee...'
      onChangeText={setText}
      value={text}
      />
      <View style={styles.buttonContainer}>
        <Button
        title='Kuuntele teksti'
        onPress={speak}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
  input:{
    borderColor: 'lightgreen',
    borderWidth: 2,
    width: 300,
    height: 300,
    marginTop: 50,
    marginLeft: 30,
    textAlignVertical: 'top',

  },
  buttonContainer: {
    marginTop: 30,
    width: 200,
    marginLeft: 30,
  }
});
