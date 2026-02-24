import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, onBack, rightElement }) => {
  return (
    <View className="px-6 py-4 flex-row items-center justify-between bg-white border-b border-gray-100">
      {onBack ? (
        <Pressable 
          onPress={onBack} 
          style={({ pressed }) => ({ 
            opacity: pressed ? 0.7 : 1, 
            backgroundColor: pressed ? '#F3F4F6' : '#F9FAFB' 
          })}
          className="p-3 rounded-2xl border border-gray-100"
        >
          <ArrowLeft size={22} color="#1F2937" />
        </Pressable>
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
