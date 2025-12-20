import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Important contacts data per constituency
const CONTACTS_DATA: Record<string, {
  code: string;
  areaName: string;
  color: string;
  contacts: { title: string; name: string; mobile: string }[];
}> = {
  '29': {
    code: '২৯-গাইবান্ধা-০১',
    areaName: 'সুন্দরগঞ্জ',
    color: '#059669',
    contacts: [
      { title: 'পুলিশ সুপার', name: 'মোঃ আলমগীর হোসেন', mobile: '01713-000001' },
      { title: 'সার্কেল এএসপি', name: 'মোঃ রাশেদুল ইসলাম', mobile: '01713-000002' },
      { title: 'থানা অফিসার ইনচার্জ (ওসি)', name: 'মোঃ শফিকুল ইসলাম', mobile: '01713-000003' },
      { title: 'সেনাবাহিনী জোন কমান্ডার', name: 'মেজর আরিফ হোসেন', mobile: '01713-000004' },
      { title: 'বিজিবি জোন কমান্ডার', name: 'ক্যাপ্টেন নাজমুল হক', mobile: '01713-000005' },
      { title: 'জেলা নির্বাচন অফিসার', name: 'মোঃ সাইফুল ইসলাম', mobile: '01713-000006' },
      { title: 'উপজেলা নির্বাচন অফিসার', name: 'মোঃ জাহিদুল ইসলাম', mobile: '01713-000007' },
      { title: 'নির্বাহী ম্যাজিস্ট্রেট', name: 'মোঃ তারিকুল ইসলাম', mobile: '01713-000008' },
      { title: 'ফায়ার সার্ভিস', name: 'স্টেশন অফিসার', mobile: '01713-000009' },
      { title: 'হাসপাতাল (জরুরি)', name: 'উপজেলা স্বাস্থ্য কমপ্লেক্স', mobile: '01713-000010' },
    ],
  },
  '30': {
    code: '৩০-গাইবান্ধা-০২',
    areaName: 'গাইবান্ধা সদর',
    color: '#dc2626',
    contacts: [
      { title: 'পুলিশ সুপার', name: 'মোঃ কামরুল হাসান', mobile: '01714-000001' },
      { title: 'সার্কেল এএসপি', name: 'মোঃ আনিসুর রহমান', mobile: '01714-000002' },
      { title: 'থানা অফিসার ইনচার্জ (ওসি)', name: 'মোঃ মাহবুবুর রহমান', mobile: '01714-000003' },
      { title: 'সেনাবাহিনী জোন কমান্ডার', name: 'মেজর সাইফুল ইসলাম', mobile: '01714-000004' },
      { title: 'বিজিবি জোন কমান্ডার', name: 'ক্যাপ্টেন রফিকুল ইসলাম', mobile: '01714-000005' },
      { title: 'জেলা নির্বাচন অফিসার', name: 'মোঃ নজরুল ইসলাম', mobile: '01714-000006' },
      { title: 'উপজেলা নির্বাচন অফিসার', name: 'মোঃ শাহাদাত হোসেন', mobile: '01714-000007' },
      { title: 'নির্বাহী ম্যাজিস্ট্রেট', name: 'মোঃ আব্দুল করিম', mobile: '01714-000008' },
      { title: 'ফায়ার সার্ভিস', name: 'স্টেশন অফিসার', mobile: '01714-000009' },
      { title: 'হাসপাতাল (জরুরি)', name: 'জেলা সদর হাসপাতাল', mobile: '01714-000010' },
    ],
  },
  '31': {
    code: '৩১-গাইবান্ধা-০৩',
    areaName: 'পলাশবাড়ী ও সাদুল্লাপুর',
    color: '#7c3aed',
    contacts: [
      { title: 'পুলিশ সুপার', name: 'মোঃ রবিউল ইসলাম', mobile: '01715-000001' },
      { title: 'সার্কেল এএসপি', name: 'মোঃ জসিম উদ্দিন', mobile: '01715-000002' },
      { title: 'থানা অফিসার ইনচার্জ (ওসি)', name: 'মোঃ আলী হোসেন', mobile: '01715-000003' },
      { title: 'সেনাবাহিনী জোন কমান্ডার', name: 'মেজর কামাল উদ্দিন', mobile: '01715-000004' },
      { title: 'বিজিবি জোন কমান্ডার', name: 'ক্যাপ্টেন হাসান মাহমুদ', mobile: '01715-000005' },
      { title: 'জেলা নির্বাচন অফিসার', name: 'মোঃ মনিরুল ইসলাম', mobile: '01715-000006' },
      { title: 'উপজেলা নির্বাচন অফিসার', name: 'মোঃ ফারুক হোসেন', mobile: '01715-000007' },
      { title: 'নির্বাহী ম্যাজিস্ট্রেট', name: 'মোঃ সোহেল রানা', mobile: '01715-000008' },
      { title: 'ফায়ার সার্ভিস', name: 'স্টেশন অফিসার', mobile: '01715-000009' },
      { title: 'হাসপাতাল (জরুরি)', name: 'উপজেলা স্বাস্থ্য কমপ্লেক্স', mobile: '01715-000010' },
    ],
  },
  '32': {
    code: '৩২-গাইবান্ধা-০৪',
    areaName: 'গোবিন্দগঞ্জ',
    color: '#0891b2',
    contacts: [
      { title: 'পুলিশ সুপার', name: 'মোঃ শামসুল আলম', mobile: '01716-000001' },
      { title: 'সার্কেল এএসপি', name: 'মোঃ হাবিবুর রহমান', mobile: '01716-000002' },
      { title: 'থানা অফিসার ইনচার্জ (ওসি)', name: 'মোঃ আকবর আলী', mobile: '01716-000003' },
      { title: 'সেনাবাহিনী জোন কমান্ডার', name: 'মেজর রাজিব আহমেদ', mobile: '01716-000004' },
      { title: 'বিজিবি জোন কমান্ডার', name: 'ক্যাপ্টেন জামিল হোসেন', mobile: '01716-000005' },
      { title: 'জেলা নির্বাচন অফিসার', name: 'মোঃ আমিনুল ইসলাম', mobile: '01716-000006' },
      { title: 'উপজেলা নির্বাচন অফিসার', name: 'মোঃ মোস্তাফিজুর রহমান', mobile: '01716-000007' },
      { title: 'নির্বাহী ম্যাজিস্ট্রেট', name: 'মোঃ জাকির হোসেন', mobile: '01716-000008' },
      { title: 'ফায়ার সার্ভিস', name: 'স্টেশন অফিসার', mobile: '01716-000009' },
      { title: 'হাসপাতাল (জরুরি)', name: 'উপজেলা স্বাস্থ্য কমপ্লেক্স', mobile: '01716-000010' },
    ],
  },
  '33': {
    code: '৩৩-গাইবান্ধা-০৫',
    areaName: 'সাঘাটা ও ফুলছড়ি',
    color: '#ea580c',
    contacts: [
      { title: 'পুলিশ সুপার', name: 'মোঃ ইকবাল হোসেন', mobile: '01717-000001' },
      { title: 'সার্কেল এএসপি', name: 'মোঃ সালাউদ্দিন', mobile: '01717-000002' },
      { title: 'থানা অফিসার ইনচার্জ (ওসি)', name: 'মোঃ বেলাল হোসেন', mobile: '01717-000003' },
      { title: 'সেনাবাহিনী জোন কমান্ডার', name: 'মেজর তানভীর আহমেদ', mobile: '01717-000004' },
      { title: 'বিজিবি জোন কমান্ডার', name: 'ক্যাপ্টেন ফয়সাল আহমেদ', mobile: '01717-000005' },
      { title: 'জেলা নির্বাচন অফিসার', name: 'মোঃ রেজাউল করিম', mobile: '01717-000006' },
      { title: 'উপজেলা নির্বাচন অফিসার', name: 'মোঃ আতিকুর রহমান', mobile: '01717-000007' },
      { title: 'নির্বাহী ম্যাজিস্ট্রেট', name: 'মোঃ মাসুদ রানা', mobile: '01717-000008' },
      { title: 'ফায়ার সার্ভিস', name: 'স্টেশন অফিসার', mobile: '01717-000009' },
      { title: 'হাসপাতাল (জরুরি)', name: 'উপজেলা স্বাস্থ্য কমপ্লেক্স', mobile: '01717-000010' },
    ],
  },
};

export default function ImportantNumbersScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data = CONTACTS_DATA[id || '29'];

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(`/constituency/${id}`);
    }
  };

  const handleCall = (mobile: string) => {
    Linking.openURL(`tel:${mobile.replace(/-/g, '')}`);
  };

  if (!data) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Data not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: data.color }]}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="ফিরে যান"
        >
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
          <Text style={styles.backText}>ফিরে যান</Text>
        </Pressable>

        <View style={styles.headerTitleContainer}>
          <Ionicons name="call" size={28} color="#ffffff" />
          <Text style={styles.headerTitle}>গুরুত্বপূর্ণ মোবাইল নম্বর</Text>
          <Text style={styles.headerSubtitle}>{data.code} • {data.areaName}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Info */}
        <View style={styles.infoContainer}>
          <Ionicons name="information-circle" size={20} color={data.color} />
          <Text style={styles.infoText}>
            নম্বরে ট্যাপ করে সরাসরি কল করুন
          </Text>
        </View>

        {/* Table Header */}
        <View style={[styles.tableHeader, { backgroundColor: data.color }]}>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>কর্মকর্তা</Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>মোবাইল নম্বর</Text>
        </View>

        {/* Table Rows */}
        {data.contacts.map((contact, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.tableRow,
              index % 2 === 0 && styles.tableRowEven,
              pressed && { backgroundColor: `${data.color}15` },
            ]}
            onPress={() => handleCall(contact.mobile)}
          >
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>{contact.title}</Text>
              <Text style={styles.contactName}>{contact.name}</Text>
            </View>
            <Pressable
              style={[styles.callButton, { backgroundColor: data.color }]}
              onPress={() => handleCall(contact.mobile)}
            >
              <Ionicons name="call" size={16} color="#ffffff" />
              <Text style={styles.callButtonText}>{contact.mobile}</Text>
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingRight: 8,
    marginBottom: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  backButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  backText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#065f46',
    marginLeft: 10,
    fontWeight: '500',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableHeaderText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableRowEven: {
    backgroundColor: '#f9fafb',
  },
  contactInfo: {
    flex: 2,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  contactName: {
    fontSize: 13,
    color: '#666',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  callButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
});

