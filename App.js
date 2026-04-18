import { View, Text, Button } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Home() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    cargarContador();
  }, []);

  useEffect(() => {
    guardarContador(contador);
  }, [contador]);

  const incrementar = () => {
    setContador(contador + 1);
  };

  const decrementar = () => {
    setContador(contador - 1);
  };

  const guardarContador = async (valor) => {
    try {
      await AsyncStorage.setItem("contador", JSON.stringify(valor));
    } catch (e) {
      console.log("Error guardando");
    }
  };

  const cargarContador = async () => {
    try {
      const data = await AsyncStorage.getItem("contador");
      if (data !== null) {
        setContador(JSON.parse(data));
      }
    } catch (e) {
      console.log("Error cargando");
    }
  };

  const pedirPermiso = async () => {
    await Notifications.requestPermissionsAsync();
  };

  const enviarNotificacion = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Contador 📊",
        body: `El valor actual es: ${contador}`,
      },
      trigger: null,
    });
  };

  return (
    <View style={{ marginTop: 50, padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Contador: {contador}</Text>

      <Button title="Incrementar" onPress={incrementar} />
      <Button title="Decrementar" onPress={decrementar} />
      <Button title="Pedir permiso" onPress={pedirPermiso} />
      <Button title="Enviar notificación" onPress={enviarNotificacion} />
    </View>
  );
}