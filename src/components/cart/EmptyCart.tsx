import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface EmptyCartProps {
  onStartShopping: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onStartShopping }) => {
  const scale = useSharedValue(1);
  const { t } = useTranslation();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onStartShopping();
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <View className="flex-1 justify-center items-center p-8 bg-surface">
      <View className="bg-primary-light p-10 rounded-full mb-8">
        <ShoppingCart size={64} color="#2563EB" strokeWidth={1.5} />
      </View>
      <Text className="text-3xl font-black text-gray-900 mb-3 tracking-tighter">{t('cart.empty_title')}</Text>
      <Text className="text-gray-500 text-center text-base font-medium mb-10 leading-6 px-4">
        {t('cart.empty_description')}
      </Text>
      <AnimatedPressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={animatedStyle}
        className="bg-primary px-10 py-4 rounded-section shadow-xl shadow-primary-light"
      >
        <Text className="text-white font-black text-lg">{t('cart.start_shopping')}</Text>
      </AnimatedPressable>
    </View>
  );
};

export default EmptyCart;
