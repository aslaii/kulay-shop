import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Ticket, CheckCircle2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import { Voucher } from '../../types';
import { vouchers } from '../../data/vouchers';

interface PromoCodeSectionProps {
  voucherCode: string;
  setVoucherCode: (code: string) => void;
  appliedVoucher: Voucher | null;
}

const PromoCodeSection: React.FC<PromoCodeSectionProps> = ({
  voucherCode,
  setVoucherCode,
  appliedVoucher
}) => {
  const { t } = useTranslation();
  const handleChangeText = (text: string) => {
    const matchingVoucher = vouchers.find(v => v.code.toLowerCase() === text.toLowerCase());
    if (matchingVoucher && !appliedVoucher) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setVoucherCode(text);
  };

  return (
    <Animated.View
      layout={LinearTransition.duration(400)}
      className="bg-surface p-6 rounded-card shadow-sm border border-gray-100"
    >
      <View className="flex-row items-center mb-4 gap-x-2">
        <Ticket size={20} color="#2563EB" />
        <Text className="text-lg font-bold text-gray-900 tracking-tight">{t('cart.promo_code')}</Text>
      </View>

      <View className="relative">
        <TextInput
          className={`bg-gray-50 border ${appliedVoucher ? 'border-accent' : 'border-gray-200'} rounded-section px-5 py-4 text-gray-900 font-medium`}
          placeholder={t('cart.promo_placeholder')}
          placeholderTextColor="#9CA3AF"
          value={voucherCode}
          onChangeText={handleChangeText}
          autoCapitalize="none"
        />
        {appliedVoucher && (
          <Animated.View entering={FadeIn} exiting={FadeOut} className="absolute right-4 top-4">
            <CheckCircle2 size={20} color="#16A34A" />
          </Animated.View>
        )}
      </View>

      {appliedVoucher && (
        <Animated.Text
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
          className="text-accent text-sm font-bold mt-2 ml-1"
        >
          {t('cart.promo_applied', { description: appliedVoucher.description })}
        </Animated.Text>
      )}
      {!appliedVoucher && voucherCode.length > 0 && (
        <Animated.Text
          entering={FadeIn}
          exiting={FadeOut}
          className="text-gray-400 text-xs mt-2 ml-1 italic"
        >
          {t('cart.promo_hint')}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

export default PromoCodeSection;
