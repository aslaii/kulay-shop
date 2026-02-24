import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { CartItem as CartItemType } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { Trash2, Plus, Minus } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useCart } from '../context/CartContext';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  SlideOutRight,
  LinearTransition,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handleRemove = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    removeFromCart(item.id);
  };

  const handleIncrement = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    updateQuantity(item.id, item.quantity - 1);
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.8);
    opacity.value = withSpring(0.6);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withSpring(1);
  };

  return (
    <Animated.View 
      layout={LinearTransition.duration(400)}
      exiting={SlideOutRight.duration(400)}
      className="flex-row items-center bg-white p-3 rounded-2xl border border-gray-100 mb-3 shadow-sm shadow-gray-100"
    >
      <Image 
        source={{ uri: item.image }} 
        className="w-20 h-20 rounded-xl bg-gray-50"
        resizeMode="cover"
      />
      <View className="flex-1 ml-4">
        <Text className="text-base font-bold text-gray-800" numberOfLines={1}>{item.productName}</Text>
        <View className="flex-row items-center mt-1">
          <View className="flex-row items-center bg-gray-50 rounded-xl px-1 py-1 border border-gray-100">
            <Pressable 
              onPress={handleDecrement}
              className="p-1.5"
              style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            >
              <Minus size={14} color={item.quantity > 1 ? "#3B82F6" : "#9CA3AF"} />
            </Pressable>
            <Animated.Text 
              key={item.quantity}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
              className="text-sm font-bold text-gray-900 px-2 min-w-[28px] text-center"
            >
              {item.quantity}
            </Animated.Text>
            <Pressable 
              onPress={handleIncrement}
              className="p-1.5"
              style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            >
              <Plus size={14} color="#3B82F6" />
            </Pressable>
          </View>
          <Text className="text-sm text-gray-400 ml-3">{formatCurrency(item.price)}</Text>
        </View>
      </View>
      <View className="items-end ml-2">
        <Text className="text-base font-bold text-gray-900">
          {formatCurrency(item.price * item.quantity)}
        </Text>
        <AnimatedPressable
          onPress={handleRemove}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={animatedStyle}
          className="mt-2 p-1"
        >
          <Trash2 size={18} color="#EF4444" />
        </AnimatedPressable>
      </View>
    </Animated.View>
  );
};

export default CartItem;
