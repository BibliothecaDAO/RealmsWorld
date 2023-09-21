import { SafeAreaView, Text, View } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";

import { api } from "~/utils/api";

export default function Post() {
  const { id } = useGlobalSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.beasts.all.useQuery({ limit: 5 });

  if (!data) return null;

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: data.items[0]?.name ?? "" }} />
      <View className="h-full w-full p-4">
        <Text className="py-2 text-3xl font-bold text-white">
          {data.items[0]?.name}
        </Text>
        <Text className="py-4 text-white">{data.items[0]?.image}</Text>
      </View>
    </SafeAreaView>
  );
}
