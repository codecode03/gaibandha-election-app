import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Contact type - only designation and mobile
interface Contact {
  designation: string;
  mobile: string;
}

// Important contacts data per upazila
const CONTACTS_DATA: Record<string, {
  upazilaName: string;
  color: string;
  contacts: Contact[];
}> = {
  // Palashbari Upazila
  '31-palashbari': {
    upazilaName: 'পলাশবাড়ী উপজেলা',
    color: '#6d28d9',
    contacts: [
      { designation: 'উপজেলা নির্বাহী অফিসার', mobile: '০১৭৬২-৬৯৫০৭৩' },
      { designation: 'সহকারী কমিশনার (ভূমি)', mobile: '০১৭৬২-৬৯৫০৮০' },
      { designation: 'অফিসার ইনচার্জ (ওসি)', mobile: '০১৩২০-১৩২৪৫৪' },
      { designation: 'অফিসার ইনচার্জ-তদন্ত (ওসি তদন্ত)', mobile: '০১৩২০-১৩২৪৫৫' },
      { designation: 'সেনাবাহিনী', mobile: '' },
      { designation: 'বিজিবি', mobile: '' },
      { designation: 'উপজেলা নির্বাচন অফিসার', mobile: '০১৭৮৭-১৮৮৯৮২' },
      { designation: 'উপজেলা আনসার ও ভিডিপি অফিসার', mobile: '' },
      { designation: 'উপজেলা শিক্ষা অফিসার', mobile: '' },
      { designation: 'উপজেলা মাধ্যমিক শিক্ষা অফিসার', mobile: '' },
    ],
  },
  // Sadullapur Upazila
  '31-sadullapur': {
    upazilaName: 'সাদুল্লাপুর উপজেলা',
    color: '#6d28d9',
    contacts: [
      { designation: 'উপজেলা নির্বাহী অফিসার', mobile: '০১৭৬২-৬৯৫০৭৪' },
      { designation: 'সহকারী কমিশনার (ভূমি)', mobile: '০১৭৬২-৬৯৫০৮১' },
      { designation: 'অফিসার ইনচার্জ (ওসি)', mobile: '০১৩২০-১৩২৪০২' },
      { designation: 'অফিসার ইনচার্জ-তদন্ত (ওসি তদন্ত)', mobile: '০১৩২০-১৩২৪০৩' },
      { designation: 'সেনাবাহিনী', mobile: '' },
      { designation: 'বিজিবি', mobile: '' },
      { designation: 'উপজেলা নির্বাচন অফিসার', mobile: '০১৭০৬-৬১০১৪০' },
      { designation: 'উপজেলা আনসার ও ভিডিপি অফিসার', mobile: '' },
      { designation: 'উপজেলা শিক্ষা অফিসার', mobile: '' },
      { designation: 'উপজেলা মাধ্যমিক শিক্ষা অফিসার', mobile: '' },
    ],
  },
  // Sundarganj Upazila
  '29': {
    upazilaName: 'সুন্দরগঞ্জ উপজেলা',
    color: '#047857',
    contacts: [
      { designation: 'উপজেলা নির্বাহী অফিসার', mobile: '০১৭৬২-৬৯৫০৭৫' },
      { designation: 'সহকারী কমিশনার (ভূমি)', mobile: '০১৭৬২-৬৯৫০৮২' },
      { designation: 'অফিসার ইনচার্জ (ওসি)', mobile: '০১৩২০-১৩২৪২৮' },
      { designation: 'অফিসার ইনচার্জ-তদন্ত (ওসি তদন্ত)', mobile: '০১৩২০-১৩২৪২৯' },
      { designation: 'সেনাবাহিনী', mobile: '' },
      { designation: 'বিজিবি', mobile: '' },
      { designation: 'উপজেলা নির্বাচন অফিসার', mobile: '০১৭১৯-১০৪৬৩২' },
      { designation: 'উপজেলা আনসার ও ভিডিপি অফিসার', mobile: '' },
      { designation: 'উপজেলা শিক্ষা অফিসার', mobile: '' },
      { designation: 'উপজেলা মাধ্যমিক শিক্ষা অফিসার', mobile: '' },
    ],
  },
  // Gaibandha Sadar Upazila
  '30': {
    upazilaName: 'গাইবান্ধা সদর উপজেলা',
    color: '#b91c1c',
    contacts: [
      { designation: 'উপজেলা নির্বাহী অফিসার', mobile: '০১৭৬২-৬৯৫০৭১' },
      { designation: 'সহকারী কমিশনার (ভূমি)', mobile: '০১৭৬২-৬৯৫০৭৮' },
      { designation: 'অফিসার ইনচার্জ (ওসি)', mobile: '০১৩২০-১৩২৩৭৬' },
      { designation: 'অফিসার ইনচার্জ-তদন্ত (ওসি তদন্ত)', mobile: '০১৩২০-১৩২৩৭৭' },
      { designation: 'সেনাবাহিনী', mobile: '' },
      { designation: 'বিজিবি', mobile: '' },
      { designation: 'উপজেলা নির্বাচন অফিসার', mobile: '০১৭১৭-৪৭২৭৯৩' },
      { designation: 'উপজেলা আনসার ও ভিডিপি অফিসার', mobile: '' },
      { designation: 'উপজেলা শিক্ষা অফিসার', mobile: '' },
      { designation: 'উপজেলা মাধ্যমিক শিক্ষা অফিসার', mobile: '' },
    ],
  },
  // Gobindaganj Upazila - placeholder
  '32': {
    upazilaName: 'গোবিন্দগঞ্জ উপজেলা',
    color: '#0e7490',
    contacts: [
      { designation: 'উপজেলা নির্বাহী অফিসার', mobile: '' },
      { designation: 'সহকারী কমিশনার (ভূমি)', mobile: '' },
      { designation: 'অফিসার ইনচার্জ (ওসি)', mobile: '' },
      { designation: 'অফিসার ইনচার্জ-তদন্ত (ওসি তদন্ত)', mobile: '' },
      { designation: 'সেনাবাহিনী', mobile: '' },
      { designation: 'বিজিবি', mobile: '' },
      { designation: 'উপজেলা নির্বাচন অফিসার', mobile: '' },
      { designation: 'উপজেলা আনসার ও ভিডিপি অফিসার', mobile: '' },
      { designation: 'উপজেলা শিক্ষা অফিসার', mobile: '' },
      { designation: 'উপজেলা মাধ্যমিক শিক্ষা অফিসার', mobile: '' },
    ],
  },
  // Saghata Upazila
  '33-saghata': {
    upazilaName: 'সাঘাটা উপজেলা',
    color: '#c2410c',
    contacts: [
      { designation: 'উপজেলা নির্বাহী অফিসার', mobile: '০১৭৬২-৬৯৫০৭৬' },
      { designation: 'সহকারী কমিশনার (ভূমি)', mobile: '০১৭৬২-৬৯৫০৮৩' },
      { designation: 'অফিসার ইনচার্জ (ওসি)', mobile: '০১৩২০-১৩২৫০৬' },
      { designation: 'অফিসার ইনচার্জ-তদন্ত (ওসি তদন্ত)', mobile: '০১৩২০-১৩২৫০৭' },
      { designation: 'সেনাবাহিনী', mobile: '' },
      { designation: 'বিজিবি', mobile: '' },
      { designation: 'উপজেলা নির্বাচন অফিসার', mobile: '০১৭৩২-৫৩৫২৭৭' },
      { designation: 'উপজেলা আনসার ও ভিডিপি অফিসার', mobile: '' },
      { designation: 'উপজেলা শিক্ষা অফিসার', mobile: '' },
      { designation: 'উপজেলা মাধ্যমিক শিক্ষা অফিসার', mobile: '' },
    ],
  },
  // Fulchari Upazila
  '33-fulchari': {
    upazilaName: 'ফুলছড়ি উপজেলা',
    color: '#c2410c',
    contacts: [
      { designation: 'উপজেলা নির্বাহী অফিসার', mobile: '০১৭৬২-৬৯৫০৭৭' },
      { designation: 'সহকারী কমিশনার (ভূমি)', mobile: '' },
      { designation: 'অফিসার ইনচার্জ (ওসি)', mobile: '০১৩২০-১৩২৫৩২' },
      { designation: 'অফিসার ইনচার্জ-তদন্ত (ওসি তদন্ত)', mobile: '০১৩২০-১৩২৫৩৩' },
      { designation: 'সেনাবাহিনী', mobile: '' },
      { designation: 'বিজিবি', mobile: '' },
      { designation: 'উপজেলা নির্বাচন অফিসার', mobile: '০১৭৩২-৫৭০৭৮৪' },
      { designation: 'উপজেলা আনসার ও ভিডিপি অফিসার', mobile: '' },
      { designation: 'উপজেলা শিক্ষা অফিসার', mobile: '' },
      { designation: 'উপজেলা মাধ্যমিক শিক্ষা অফিসার', mobile: '' },
    ],
  },
};

export default function ImportantNumbersScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data = CONTACTS_DATA[id || '31-palashbari'];

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(`/constituency/${id}`);
    }
  };

  const handleCall = (mobile: string) => {
    if (mobile) {
      // Convert Bengali digits to English for dialing
      const englishDigits = mobile
        .replace(/০/g, '0')
        .replace(/১/g, '1')
        .replace(/২/g, '2')
        .replace(/৩/g, '3')
        .replace(/৪/g, '4')
        .replace(/৫/g, '5')
        .replace(/৬/g, '6')
        .replace(/৭/g, '7')
        .replace(/৮/g, '8')
        .replace(/৯/g, '9')
        .replace(/-/g, '');
      Linking.openURL(`tel:${englishDigits}`);
    }
  };

  if (!data) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#065f46' }]} edges={['top']}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 50 }}>Data not found</Text>
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
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{data.upazilaName}</Text>
          <Text style={styles.headerSubtitle}>গুরুত্বপূর্ণ মোবাইল নম্বর</Text>
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
            <Ionicons name="call" size={32} color={data.color} />
          </View>
          <Text style={styles.infoTitle}>জরুরি যোগাযোগ</Text>
          <Text style={styles.infoSubtitle}>
            নম্বরে ট্যাপ করে সরাসরি কল করুন
          </Text>
        </View>

        {/* Table Header */}
        <View style={[styles.tableHeader, { backgroundColor: data.color }]}>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>পদবি</Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>মোবাইল নম্বর</Text>
        </View>

        {/* Table Rows */}
        {data.contacts.map((contact, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.tableRow,
              index % 2 === 0 && styles.tableRowEven,
              pressed && contact.mobile ? { backgroundColor: `${data.color}15` } : {},
            ]}
            onPress={() => handleCall(contact.mobile)}
            disabled={!contact.mobile}
          >
            <View style={styles.contactInfo}>
              <Text style={styles.contactDesignation}>{contact.designation}</Text>
            </View>
            {contact.mobile ? (
              <Pressable
                style={[styles.callButton, { backgroundColor: data.color }]}
                onPress={() => handleCall(contact.mobile)}
              >
                <Ionicons name="call" size={14} color="#ffffff" />
                <Text style={styles.callButtonText}>{contact.mobile}</Text>
              </Pressable>
            ) : (
              <Text style={styles.noNumberText}>—</Text>
            )}
          </Pressable>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} জেলা প্রশাসন, গাইবান্ধা
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#065f46',
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
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
    fontSize: 20,
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
    paddingVertical: 14,
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
  contactDesignation: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 4,
  },
  callButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  noNumberText: {
    fontSize: 14,
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
