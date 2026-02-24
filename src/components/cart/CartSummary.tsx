import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { formatCurrency } from '../../utils/formatCurrency';

interface CartSummaryProps {
  subtotal: number;
  total: number;
  isVoucherValid: boolean;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ 
  subtotal, 
  total, 
  isVoucherValid, 
  onCheckout 
}) => {
  return (
    <View className="mt-8 pt-6 border-t border-gray-100 space-y-4">
      <View className="flex-row justify-between">
        <Text className="text-gray-500 font-medium">Subtotal</Text>
        <Text className="text-gray-900 font-bold">{formatCurrency(subtotal)}</Text>
      </View>
      
      {isVoucherValid && (
        <View className="flex-row justify-between mt-3">
          <Text className="text-green-600 font-medium">Promo Discount</Text>
          <Text className="text-green-600 font-bold">-{formatCurrency(subtotal - total)}</Text>
        </View>
      )}
      
      <View className="flex-row justify-between items-center mt-6 pt-6 border-t border-gray-100">
        <View>
          <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Amount</Text>
          <Text className="text-gray-900 text-3xl font-black tracking-tighter">{formatCurrency(total)}</Text>
        </View>
        <Pressable
          onPress={onCheckout}
          style={({ pressed }) => ({ 
            opacity: pressed ? 0.8 : 1, 
            transform: [{ scale: pressed ? 0.95 : 1 }] 
          })}
          className="bg-blue-600 p-5 rounded-2xl shadow-lg shadow-blue-200 flex-row items-center gap-x-2"
        >
          <Text className="text-white font-bold text-lg">Pay</Text>
          <ChevronRight size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default CartSummary;
