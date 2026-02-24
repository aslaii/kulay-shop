import React from 'react';
import { View, Text, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import EmptyCart from '../components/cart/EmptyCart';
import PromoCodeSection from '../components/cart/PromoCodeSection';
import CartSummary from '../components/cart/CartSummary';
import ScreenHeader from '../components/ScreenHeader';
import { ShoppingCart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { LinearTransition } from 'react-native-reanimated';

const CartScreen: React.FC = () => {
  const { 
    cartItems, 
    cartCount, 
    subtotal, 
    total, 
    voucherCode, 
    setVoucherCode, 
    isVoucherValid,
    removeFromCart 
  } = useCart();
  const router = useRouter();

  const handleBack = () => {
    Haptics.selectionAsync();
    router.back();
  };

  const handleCheckout = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleStartShopping = () => {
    router.replace('/');
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ScreenHeader title="Checkout" onBack={handleBack} />
        <EmptyCart onStartShopping={handleStartShopping} />
      </SafeAreaView>
    );
  }

  const headerRight = (
    <View className="bg-blue-600 px-3 py-1.5 rounded-2xl flex-row items-center gap-x-1.5 shadow-sm shadow-blue-200">
      <ShoppingCart size={14} color="white" strokeWidth={2.5} />
      <Text className="text-white font-black text-xs">{cartCount}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScreenHeader title="My Cart" onBack={handleBack} rightElement={headerRight} />

        <Animated.FlatList
          itemLayoutAnimation={LinearTransition.duration(400)}
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CartItem item={item} onRemove={removeFromCart} />}
          contentContainerStyle={{ padding: 24, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <Animated.View layout={LinearTransition.duration(400)} className="mt-6">
              <PromoCodeSection 
                voucherCode={voucherCode}
                setVoucherCode={setVoucherCode}
                isVoucherValid={isVoucherValid}
              />
              <CartSummary 
                subtotal={subtotal}
                total={total}
                isVoucherValid={isVoucherValid}
                onCheckout={handleCheckout}
              />
            </Animated.View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CartScreen;
