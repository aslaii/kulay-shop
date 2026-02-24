import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Ticket, CheckCircle2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface PromoCodeSectionProps {
  voucherCode: string;
  setVoucherCode: (code: string) => void;
  isVoucherValid: boolean;
}

const PromoCodeSection: React.FC<PromoCodeSectionProps> = ({ 
  voucherCode, 
  setVoucherCode, 
  isVoucherValid 
}) => {
  const handleChangeText = (text: string) => {
    if (text === 'discount10' && !isVoucherValid) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setVoucherCode(text);
  };

  return (
    <View className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <View className="flex-row items-center mb-4 gap-x-2">
        <Ticket size={20} color="#3B82F6" />
        <Text className="text-lg font-bold text-gray-900 tracking-tight">Promo Code</Text>
      </View>
      
      <View className="relative">
        <TextInput
          className={`bg-gray-50 border ${isVoucherValid ? 'border-green-500' : 'border-gray-200'} rounded-2xl px-5 py-4 text-gray-900 font-medium`}
          placeholder="Enter voucher code"
          placeholderTextColor="#9CA3AF"
          value={voucherCode}
          onChangeText={handleChangeText}
          autoCapitalize="none"
        />
        {isVoucherValid && (
          <View className="absolute right-4 top-4">
            <CheckCircle2 size={20} color="#10B981" />
          </View>
        )}
      </View>
      
      {isVoucherValid && (
        <Text className="text-green-600 text-sm font-bold mt-2 ml-1">
          {'Amazing! 10% discount applied ✨'}
        </Text>
      )}
      {!isVoucherValid && voucherCode.length > 0 && (
        <Text className="text-gray-400 text-xs mt-2 ml-1 italic">
          {'Try using "discount10"'}
        </Text>
      )}
    </View>
  );
};

export default PromoCodeSection;
