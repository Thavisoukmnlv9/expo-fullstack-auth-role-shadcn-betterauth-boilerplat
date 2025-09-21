import { View, Text, Pressable, Modal } from 'react-native';
import { X, Check } from 'lucide-react-native';

interface SelectionSheetProps {
  visible: boolean;
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export default function SelectionSheet({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}: SelectionSheetProps) {
  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-6 max-h-96">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-lg font-bold text-gray-900">{title}</Text>
            <Pressable
              onPress={onClose}
              className="p-2 rounded-full bg-gray-100"
            >
              <X size={20} color="#6B7280" />
            </Pressable>
          </View>

          {/* Options */}
          <View className="space-y-2">
            {options.map((option) => (
              <Pressable
                key={option}
                onPress={() => handleSelect(option)}
                className="flex-row items-center justify-between p-4 rounded-2xl bg-gray-50"
                style={({ pressed }) => [
                  { transform: [{ scale: pressed ? 0.98 : 1 }] }
                ]}
              >
                <Text className="text-gray-900 font-medium">{option}</Text>
                {selectedValue === option && (
                  <Check size={20} color="#FF6B00" />
                )}
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}
