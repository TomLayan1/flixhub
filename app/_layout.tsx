import "./global.css"
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
    screenOptions={{
      animation: "none",
      headerShown: false
    }}
  >
    <Stack.Screen 
      name="(tabs)"
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="movies/[id]"
      options={{
        headerShown: false
      }}
    />
  </Stack>
}
