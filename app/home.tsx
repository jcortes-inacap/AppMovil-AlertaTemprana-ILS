import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pantalla de Home</Text>
      <Button title="Cerrar sesión" onPress={() => router.replace("/")} />
    </View>
  );
}
