import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { formatCurrency } from '../../utils/formatCurrency';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';
import { Voucher } from '../../types';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  LinearTransition,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CartSummaryProps {
  subtotal: number;
  total: number;
  appliedVoucher: Voucher | null;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ 
  subtotal, 
  total, 
  appliedVoucher, 
  onCheckout 
}) => {
  const { t } = useTranslation();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleCheckout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onCheckout();
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View 
      layout={LinearTransition.duration(400)}
      className="mt-8 pt-6 border-t border-gray-100 space-y-4"
    >
      <View className="flex-row justify-between">
        <Text className="text-gray-500 font-medium">{t('common.subtotal')}</Text>
        <Text className="text-gray-900 font-bold">{formatCurrency(subtotal)}</Text>
      </View>
      
      {appliedVoucher && (
        <Animated.View 
          entering={FadeIn} 
          exiting={FadeOut}
          className="flex-row justify-between mt-3"
        >
          <Text className="text-accent font-medium">{t('common.promo_discount')}</Text>
          <Text className="text-accent font-bold">-{formatCurrency(subtotal - total)}</Text>
        </Animated.View>
      )}
      
      <View className="flex-row justify-between items-center mt-6 pt-6 border-t border-gray-100">
        <View>
          <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{t('common.total_amount')}</Text>
          <Text className="text-gray-900 text-3xl font-black tracking-tighter">{formatCurrency(total)}</Text>
        </View>
        <AnimatedPressable
          onPress={handleCheckout}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={animatedStyle}
          className="bg-primary p-5 rounded-section shadow-lg shadow-primary-light flex-row items-center gap-x-2"
        >
          <Text className="text-white font-bold text-lg">{t('common.pay')}</Text>
          <ChevronRight size={20} color="white" />
        </AnimatedPressable>
      </View>
    </Animated.View>
  );
};

export default CartSummary;
