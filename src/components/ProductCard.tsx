import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Product } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { ShoppingBag } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onAddToCart(product);
  };

  return (
    <View className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-6 mx-1 overflow-hidden">
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
          <View className="bg-blue-50 px-3 py-1.5 rounded-full">
            <Text className="text-base font-bold text-blue-600">{formatCurrency(product.price)}</Text>
          </View>
        </View>
        <Pressable
          onPress={handleAddToCart}
          style={({ pressed }) => ({ 
            opacity: pressed ? 0.8 : 1, 
            transform: [{ scale: pressed ? 0.98 : 1 }] 
          })}
          className="bg-blue-600 py-4 rounded-2xl mt-2 flex-row justify-center items-center gap-x-2 shadow-sm shadow-blue-200"
        >
          <ShoppingBag size={20} color="white" />
          <Text className="text-white font-bold text-base">Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProductCard;
