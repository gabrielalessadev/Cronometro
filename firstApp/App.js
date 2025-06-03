import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useRef } from 'react';

export default function Cronometro() {
  const [time, setTime] = useState(0); 
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10); 
      }, 10);
    }
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTime(0);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milli = Math.floor((ms % 1000) / 10);

    return (
      `${String(minutes).padStart(2, '0')}:` +
      `${String(seconds).padStart(2, '0')}:` +
      `${String(milli).padStart(2, '0')}`
    );
  };

  return (
    <View style={styles.container}>
       <Text style={styles.title}>Cronômetro</Text>
      <Text style={styles.timer}>{formatTime(time)}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={start}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pause}>
          <Text style={styles.buttonText}>Pausar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  timer: { 
    fontSize: 60, 
    fontWeight: 'bold',
    marginBottom: 40 
  },
  buttonContainer: { 
    flexDirection: 'row', 
    gap: 10 
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  buttonText: { 
    color: '#000000',
     fontSize: 16, 
     fontWeight: 'bold' 
  },
});
