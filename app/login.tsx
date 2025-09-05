import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Login() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pantalla de Login</Text>
      <Button title="Ir al Home" onPress={() => router.push("/home")} />
    </View>
  );
}
