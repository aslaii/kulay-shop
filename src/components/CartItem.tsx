import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { CartItem as CartItemType } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { Trash2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const handleRemove = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onRemove(item.id);
  };

  return (
    <View className="flex-row items-center bg-white p-3 rounded-2xl border border-gray-100 mb-3 shadow-sm shadow-gray-100">
      <Image 
        source={{ uri: item.image }} 
        className="w-20 h-20 rounded-xl bg-gray-50"
        resizeMode="cover"
      />
      <View className="flex-1 ml-4">
        <Text className="text-base font-bold text-gray-800" numberOfLines={1}>{item.productName}</Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
            ×{item.quantity}
          </Text>
          <Text className="text-sm text-gray-400 ml-2">{formatCurrency(item.price)}</Text>
        </View>
      </View>
      <View className="items-end ml-2">
        <Text className="text-base font-bold text-gray-900">
          {formatCurrency(item.price * item.quantity)}
        </Text>
        <Pressable
          onPress={handleRemove}
          testID={`remove-item-${item.id}`}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, transform: [{ scale: pressed ? 0.9 : 1 }] })}
          className="mt-2 p-1"
        >
          <Trash2 size={18} color="#EF4444" />
        </Pressable>
      </View>
    </View>
  );
};

export default CartItem;
