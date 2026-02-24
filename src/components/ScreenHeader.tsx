import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, onBack, rightElement }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <View className="px-6 py-4 flex-row items-center justify-between bg-white border-b border-gray-100">
      {onBack ? (
        <AnimatedPressable 
          onPress={onBack} 
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={animatedStyle}
          className="p-3 rounded-2xl border border-gray-100 bg-gray-50"
        >
          <ArrowLeft size={22} color="#1F2937" />
        </AnimatedPressable>
      ) : (
        <View className="w-12" />
      )}
      <Text className="text-xl font-black text-gray-900 tracking-tight">{title}</Text>
      {rightElement ? (
        <View>{rightElement}</View>
      ) : (
        <View className="w-12" />
      )}
    </View>
  );
};

export default ScreenHeader;
