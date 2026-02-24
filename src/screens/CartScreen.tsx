import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
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
import { useTranslation } from 'react-i18next';
import Animated, { LinearTransition } from 'react-native-reanimated';

const CartScreen: React.FC = () => {
  const { 
    cartItems, 
    cartCount, 
    subtotal, 
    total, 
    voucherCode, 
    setVoucherCode, 
    appliedVoucher,
  } = useCart();
  const router = useRouter();
  const { t } = useTranslation();

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
      <SafeAreaView className="flex-1 bg-surface">
        <ScreenHeader title={t('cart.checkout_title')} onBack={handleBack} />
        <EmptyCart onStartShopping={handleStartShopping} />
      </SafeAreaView>
    );
  }

  const headerRight = (
    <View className="bg-primary px-3 py-1.5 rounded-section flex-row items-center gap-x-1.5 shadow-sm shadow-primary-light">
      <ShoppingCart size={14} color="white" strokeWidth={2.5} />
      <Text className="text-white font-black text-xs">{cartCount}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScreenHeader title={t('cart.title')} onBack={handleBack} rightElement={headerRight} />

        <Animated.FlatList
          itemLayoutAnimation={LinearTransition.duration(400)}
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CartItem item={item} />}
          contentContainerStyle={{ padding: 24, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <Animated.View layout={LinearTransition.duration(400)} className="mt-6">
              <PromoCodeSection 
                voucherCode={voucherCode}
                setVoucherCode={setVoucherCode}
                appliedVoucher={appliedVoucher}
              />
              <CartSummary 
                subtotal={subtotal}
                total={total}
                appliedVoucher={appliedVoucher}
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
