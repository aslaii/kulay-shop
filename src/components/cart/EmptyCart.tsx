import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface EmptyCartProps {
  onStartShopping: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onStartShopping }) => {
  const handlePress = () => {
    Haptics.selectionAsync();
    onStartShopping();
  };

  return (
    <View className="flex-1 justify-center items-center p-8 bg-white">
      <View className="bg-blue-50 p-10 rounded-full mb-8">
        <ShoppingCart size={64} color="#3B82F6" strokeWidth={1.5} />
      </View>
      <Text className="text-3xl font-black text-gray-900 mb-3 tracking-tighter">Empty Cart</Text>
      <Text className="text-gray-500 text-center text-base font-medium mb-10 leading-6 px-4">
        {`Your cart is currently empty. \nLet's find some amazing products for you!`}
      </Text>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => ({ 
          opacity: pressed ? 0.8 : 1, 
          transform: [{ scale: pressed ? 0.95 : 1 }] 
        })}
        className="bg-blue-600 px-10 py-4 rounded-2xl shadow-xl shadow-blue-200"
      >
        <Text className="text-white font-black text-lg">Start Shopping</Text>
      </Pressable>
    </View>
  );
};

export default EmptyCart;
