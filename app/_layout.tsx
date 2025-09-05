import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
}
