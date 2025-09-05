import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { View, Text } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Bienvenido a la app</Text>
      </View>
    </Provider>
  );
}
