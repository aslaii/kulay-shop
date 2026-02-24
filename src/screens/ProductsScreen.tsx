import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

const ProductsScreen: React.FC = () => {
  const { cartCount, addToCart } = useCart();
  const router = useRouter();

  const handleGoToCart = () => {
    Haptics.selectionAsync();
    router.push('/cart');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-4">
        <View className="flex-row justify-between items-center pt-8 pb-4">
          <View>
            <Text className="text-4xl font-black text-gray-900 tracking-tighter">Shop</Text>
            <Text className="text-gray-500 font-medium">Curated for you</Text>
          </View>
          <Pressable
            onPress={handleGoToCart}
            testID="cart-button"
            style={({ pressed }) => ({ 
              opacity: pressed ? 0.7 : 1, 
              transform: [{ scale: pressed ? 0.95 : 1 }] 
            })}
            className="bg-white p-4 rounded-3xl flex-row items-center shadow-xl shadow-gray-200 border border-gray-100"
          >
            <View className="relative">
              <ShoppingCart size={24} color="#1F2937" />
              {cartCount > 0 && (
                <View className="absolute -top-2.5 -right-2.5 bg-blue-600 min-w-[20px] h-[20px] rounded-full justify-center items-center px-1 border-2 border-white">
                  <Text className="text-white text-[10px] font-black">{cartCount}</Text>
                </View>
              )}
            </View>
          </Pressable>
        </View>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard product={item} onAddToCart={addToCart} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-10 pt-2"
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductsScreen;
