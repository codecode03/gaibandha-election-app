import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface CommitteeMember {
  designation: string;
  role: string;
  mobile: string;
}

interface CommitteeData {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  members: CommitteeMember[];
}

const COMMITTEE_DATA: Record<string, CommitteeData> = {
  'vigilance-committee': {
    title: 'জেলা পর্যায়ে ভিজিল্যান্স ও অবজারভেশন কমিটি',
    subtitle: 'পর্যবেক্ষণ ও তদারকি কমিটি',
    icon: 'eye',
    color: '#059669',
    members: [
      { designation: 'জেলা প্রশাসক, গাইবান্ধা ও রিটার্নিং অফিসার', role: 'সভাপতি', mobile: '০১৭৬২-৬৯৫০৫০' },
      { designation: 'পুলিশ সুপার, গাইবান্ধা', role: 'সদস্য', mobile: '০১৩২০১৩২৩০০' },
      { designation: 'সিভিল সার্জন, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭২০৩০২৫৭৯' },
      { designation: 'জেলা প্রাণি সম্পদ কর্মকর্তা, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭১২-১৯৪৭৮৩' },
      { designation: 'নির্বাহী প্রকৌশলী, এলজিইডি, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭০৮-১২৩১৯৬' },
      { designation: 'জেলা তথ্য অফিসার, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭৭৫-৮৮৯৩৬২' },
      { designation: 'উপপরিচালক, সমাজসেবা অধিদপ্তর, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭৬৬-০৭১১৬৪' },
      { designation: 'জেলা শিক্ষা অফিসার, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭১২৬৫৭৩৭' },
      { designation: 'জেলা প্রাথমিক শিক্ষা অফিসার, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭২১০৩০৬০৭' },
      { designation: 'জনাব মাহারুল মান্নান, সাবেক অধ্যক্ষ, আহম্মেদ উদ্দিন শাহু শিশু নিকেতন স্কুল এন্ড কলেজ, গাইবান্ধা', role: 'সদস্য', mobile: '০১৯৪৪২০০৬৪১' },
      { designation: 'জনাব এ.কে. এম শফিকুর রহমান, সাবেক অধ্যক্ষ, গাইবান্ধা সরকারি মহিলা কলেজ, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭১৮১০৫২৭৪' },
      { designation: 'জেলা নির্বাচন অফিসার, গাইবান্ধা', role: 'সদস্য সচিব', mobile: '০১৭১২-৩৬২৯৪৮' },
      { designation: 'অতিরিক্ত জেলা প্রশাসক (সার্বিক)', role: 'সদস্য সচিব', mobile: '' },
    ],
  },
  'monitoring-committee': {
    title: 'নির্বাচন মনিটরিং কমিটি',
    subtitle: 'নির্বাচন পর্যবেক্ষণ কমিটি',
    icon: 'analytics',
    color: '#7c3aed',
    members: [],
  },
  'law-order-cell': {
    title: 'আইন-শৃঙ্খলা রক্ষাকারী সেল',
    subtitle: 'নিরাপত্তা ও শৃঙ্খলা বিভাগ',
    icon: 'shield',
    color: '#dc2626',
    members: [
      { designation: 'জেলা প্রশাসক, গাইবান্ধা ও রিটার্নিং অফিসার', role: 'সভাপতি', mobile: '০১৭৬২৬৯৫০৫০' },
      { designation: 'পুলিশ সুপার, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭১০৩০৭৩৮৮৬' },
      { designation: 'উপজেলা নির্বাহী অফিসার ও সহকারী রিটার্নিং অফিসার, গাইবান্ধা সদর, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭৬২৬৯৫০৭১' },
      { designation: 'উপজেলা নির্বাহী অফিসার ও সহকারী রিটার্নিং অফিসার, সুন্দরগঞ্জ, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭৬২৬৯৫০৭৫' },
      { designation: 'উপজেলা নির্বাহী অফিসার ও সহকারী রিটার্নিং অফিসার, সাদুল্লাপুর, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭৬২৬৯৫০৭৪' },
      { designation: 'উপজেলা নির্বাহী অফিসার ও সহকারী রিটার্নিং অফিসার, পলাশবাড়ী, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭৬২৬৯৫০৭৩' },
      { designation: 'উপজেলা নির্বাহী অফিসার ও সহকারী রিটার্নিং অফিসার, গোবিন্দগঞ্জ, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭৬২৬৯৫০৭২' },
      { designation: 'উপজেলা নির্বাহী অফিসার ও সহকারী রিটার্নিং অফিসার, ফুলছড়ি, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭৬২৬৯৫০৭৭' },
      { designation: 'উপজেলা নির্বাহী অফিসার ও সহকারী রিটার্নিং অফিসার, সাঘাটা, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭৬২৬৯৫০৭৬' },
      { designation: 'জেলা কমান্ড্যান্ট, আনসার ও ভিডিপি, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭৩০০০৭৮০৮৮' },
      { designation: 'ক্যাম্প কমান্ডার, র‍্যাব-১৩ গাইবান্ধা', role: 'সদস্য', mobile: '০১৭৭৭৯১১৩০৩' },
      { designation: 'মো: সোহাগ মিলন, সহকারী পরিচালক, তিস্তা ব্যাটালিয়ন-২, ৬১-বিজিবি, গাইবান্ধা', role: 'সদস্য', mobile: '০১৭৬৯৬০২০৪৫' },
      { designation: 'বিজ্ঞ অতিরিক্ত জেলা ম্যাজিস্ট্রেট, গাইবান্ধা', role: 'সদস্য সচিব', mobile: '০১৭৬২৬৯৫০৫২' },
    ],
  },
};

// Convert Bengali numerals to English for phone calls
const convertBengaliToEnglish = (str: string) => {
  const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  let result = str;
  bengaliNumerals.forEach((bn, index) => {
    result = result.replace(new RegExp(bn, 'g'), index.toString());
  });
  return result;
};

export default function CommitteeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data = COMMITTEE_DATA[id || 'vigilance-committee'];

  const handleCall = (mobile: string) => {
    if (mobile) {
      const englishNumber = convertBengaliToEnglish(mobile).replace(/-/g, '');
      Linking.openURL(`tel:${englishNumber}`);
    }
  };

  if (!data) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#059669' }]} edges={['top']}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 50 }}>তথ্য পাওয়া যায়নি</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: data.color }]} edges={['top']}>
      <StatusBar style="light" backgroundColor={data.color} />

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} numberOfLines={2}>{data.title}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={[styles.infoIconContainer, { backgroundColor: `${data.color}15` }]}>
            <Ionicons name={data.icon as any} size={32} color={data.color} />
          </View>
          <Text style={styles.infoTitle}>{data.subtitle}</Text>
          <Text style={styles.infoSubtitle}>
            মোট সদস্য: {data.members.length} জন
          </Text>
        </View>

        {data.members.length > 0 ? (
          <View style={styles.membersContainer}>
            {data.members.map((member, index) => (
              <View key={index} style={styles.memberCard}>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberDesignation}>{member.designation}</Text>
                  <Text style={[styles.memberRole, { color: data.color }]}>{member.role}</Text>
                </View>
                {member.mobile ? (
                  <Pressable
                    style={[styles.callButton, { backgroundColor: data.color }]}
                    onPress={() => handleCall(member.mobile)}
                  >
                    <Ionicons name="call" size={16} color="#ffffff" />
                    <Text style={styles.callButtonText}>{member.mobile}</Text>
                  </Pressable>
                ) : (
                  <Text style={styles.noMobile}>—</Text>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.noDataContainer}>
            <Ionicons name="information-circle-outline" size={48} color="#9ca3af" />
            <Text style={styles.noDataText}>তথ্য শীঘ্রই আপডেট করা হবে</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © ২০২৫ জেলা প্রশাসন, গাইবান্ধা
          </Text>
        </View>
      </ScrollView>
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
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  // ScrollView
  scrollView: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  // Info Card
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  infoIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  // Members Container
  membersContainer: {
    gap: 12,
  },
  memberCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  memberInfo: {
    flex: 1,
    marginRight: 12,
  },
  memberDesignation: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
    lineHeight: 22,
  },
  memberRole: {
    fontSize: 14,
    fontWeight: '600',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    gap: 6,
  },
  callButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  noMobile: {
    fontSize: 14,
    color: '#9ca3af',
  },
  // No Data
  noDataContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    gap: 12,
  },
  noDataText: {
    fontSize: 15,
    color: '#9ca3af',
    fontWeight: '500',
  },
  // Footer
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
});

