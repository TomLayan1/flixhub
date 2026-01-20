import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="bg-black flex-1 flex items-center justify-center">
      <Text className="text-textDark text-5xl text-center font-bold">Welcome</Text>
      <Link href="/(tabs)" className="text-textDark text-5xl text-center font-bold">Tabs</Link>
    </View>
  );
}
