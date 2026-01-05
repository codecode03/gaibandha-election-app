import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Upazila data for constituencies with multiple upazilas
const UPAZILA_DATA: Record<string, {
  code: string;
  name: string;
  color: string;
  upazilas: Array<{
    id: string;
    name: string;
    icon: keyof typeof Ionicons.glyphMap;
  }>;
}> = {
  '31': {
    code: '৩১-গাইবান্ধা-০৩',
    name: 'পলাশবাড়ী ও সাদুল্লাপুর',
    color: '#6d28d9',
    upazilas: [
      { id: '31-palashbari', name: 'পলাশবাড়ী', icon: 'location' },
      { id: '31-sadullapur', name: 'সাদুল্লাপুর', icon: 'location' },
    ],
  },
  '33': {
    code: '৩৩-গাইবান্ধা-০৫',
    name: 'সাঘাটা ও ফুলছড়ি',
    color: '#c2410c',
    upazilas: [
      { id: '33-saghata', name: 'সাঘাটা', icon: 'location' },
      { id: '33-fulchari', name: 'ফুলছড়ি', icon: 'location' },
    ],
  },
};

interface UpazilaButtonProps {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
  delay: number;
}

function UpazilaButton({ name, icon, color, onPress, delay }: UpazilaButtonProps) {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, delay]);

  return (
    <Animated.View
      style={[
        styles.upazilaButtonContainer,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          styles.upazilaButton,
          { borderColor: color },
          pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
        ]}
        onPress={onPress}
      >
        <View style={[styles.upazilaIconContainer, { backgroundColor: `${color}15` }]}>
          <Ionicons name={icon} size={32} color={color} />
        </View>
        <Text style={styles.upazilaName}>{name}</Text>
        <View style={[styles.arrowContainer, { backgroundColor: color }]}>
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function UpazilaSelectScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data = UPAZILA_DATA[id || '31'];

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/constituencies');
    }
  };

  const handleUpazilaPress = (upazilaId: string) => {
    router.push(`/constituency/${upazilaId}`);
  };

  if (!data) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#065f46' }]} edges={['top']}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 50 }}>
          Data not found
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: data.color }]} edges={['top']}>
      <StatusBar style="light" backgroundColor={data.color} />

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerCode}>{data.code}</Text>
          <Text style={styles.headerArea}>{data.name}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Selection Card */}
        <View style={styles.selectionCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIconContainer, { backgroundColor: `${data.color}15` }]}>
              <Ionicons name="git-branch" size={28} color={data.color} />
            </View>
            <Text style={styles.cardTitle}>উপজেলা নির্বাচন করুন</Text>
            <Text style={styles.cardSubtitle}>
              এই আসনে ২টি উপজেলা রয়েছে। বিস্তারিত দেখতে একটি উপজেলা নির্বাচন করুন।
            </Text>
          </View>

          {/* Upazila Options */}
          <View style={styles.upazilaList}>
            {data.upazilas.map((upazila, index) => (
              <UpazilaButton
                key={upazila.id}
                name={upazila.name}
                icon={upazila.icon}
                color={data.color}
                onPress={() => handleUpazilaPress(upazila.id)}
                delay={index * 150}
              />
            ))}
          </View>

          {/* Help Text */}
          <View style={[styles.helpContainer, { backgroundColor: `${data.color}10` }]}>
            <Ionicons name="information-circle" size={20} color={data.color} />
            <Text style={[styles.helpText, { color: data.color }]}>
              উপজেলা নির্বাচন করে বিস্তারিত কেন্দ্র তথ্য, কর্মকর্তা তালিকা এবং ভোটার পরিসংখ্যান দেখুন
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} জেলা প্রশাসন, গাইবান্ধা
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  headerCode: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  headerArea: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  headerRight: {
    width: 40,
  },
  // Content
  contentContainer: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
  },
  selectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  cardIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  // Upazila List
  upazilaList: {
    gap: 16,
    marginBottom: 24,
  },
  upazilaButtonContainer: {
    width: '100%',
  },
  upazilaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  upazilaIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  upazilaName: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Help Container
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  helpText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
  // Footer
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
});






