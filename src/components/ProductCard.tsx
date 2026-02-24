import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Product } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { ShoppingBag, Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence, 
  withTiming,
  interpolateColor
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [added, setAdded] = useState(false);
  const { t } = useTranslation();
  const scale = useSharedValue(1);
  const successValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        successValue.value,
        [0, 1],
        ['#2563EB', '#16A34A'] // blue-600 to green-600
      ),
    };
  });

  const handleAddToCart = () => {
    if (added) return;

    // Haptics
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Animation
    scale.value = withSequence(
      withSpring(0.9),
      withSpring(1.05),
      withSpring(1)
    );
    
    successValue.value = withTiming(1, { duration: 200 });
    setAdded(true);
    onAddToCart(product);

    // Reset after delay
    setTimeout(() => {
      successValue.value = withTiming(0, { duration: 500 });
      setAdded(false);
    }, 2000);
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <View className="bg-surface rounded-card shadow-sm border border-gray-100 mb-6 mx-1 overflow-hidden">
      <Image 
        source={{ uri: product.image }} 
        className="w-full h-48 bg-gray-50"
        resizeMode="cover"
      />
      <View className="p-5">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1 pr-2">
            <Text className="text-xl font-bold text-gray-800 tracking-tight">{product.productName}</Text>
            <Text className="text-sm text-gray-500 mt-1 leading-5" numberOfLines={2}>{product.description}</Text>
          </View>
          <View className="bg-primary-light px-3 py-1.5 rounded-full">
            <Text className="text-base font-bold text-primary">{formatCurrency(product.price)}</Text>
          </View>
        </View>
        <AnimatedPressable
          onPress={handleAddToCart}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={animatedStyle}
          className="py-4 rounded-section mt-2 flex-row justify-center items-center gap-x-2 shadow-sm shadow-primary-light"
        >
          {added ? (
            <>
              <Check size={20} color="white" />
              <Text className="text-white font-bold text-base">{t('common.added')}</Text>
            </>
          ) : (
            <>
              <ShoppingBag size={20} color="white" />
              <Text className="text-white font-bold text-base">{t('common.add_to_cart')}</Text>
            </>
          )}
        </AnimatedPressable>
      </View>
    </View>
  );
};

export default ProductCard;
