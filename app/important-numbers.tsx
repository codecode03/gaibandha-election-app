import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Dummy contact data
const CONTACTS = [
  { 
    title: 'পুলিশ সুপার (SP)', 
    name: 'জনাব মোঃ আলমগীর হোসেন', 
    mobile: '01713-456789' 
  },
  { 
    title: 'আর্মি ক্যাম্প কমান্ডার', 
    name: 'লে. কর্নেল মোঃ রাশেদুল ইসলাম', 
    mobile: '01714-567890' 
  },
  { 
    title: 'বিজিবি কমান্ডার', 
    name: 'মেজর মোঃ শফিকুল ইসলাম', 
    mobile: '01715-678901' 
  },
  { 
    title: 'র‍্যাব ক্যাম্প কমান্ডার', 
    name: 'মেজর মোঃ তারিকুল ইসলাম', 
    mobile: '01716-789012' 
  },
  { 
    title: 'জেলা নির্বাচন অফিসার', 
    name: 'জনাব মোঃ সাইফুল ইসলাম', 
    mobile: '01717-890123' 
  },
  { 
    title: 'ডিডিএলজি (DDLG)', 
    name: 'জনাব মোঃ নজরুল ইসলাম', 
    mobile: '01718-901234' 
  },
  { 
    title: 'এডিসি (সার্বিক)', 
    name: 'জনাব মোঃ আব্দুল করিম', 
    mobile: '01719-012345' 
  },
  { 
    title: 'এডিসি (রাজস্ব)', 
    name: 'জনাব মোঃ জাহিদুল ইসলাম', 
    mobile: '01711-123456' 
  },
  { 
    title: 'এডিসি (শিক্ষা ও আইসিটি)', 
    name: 'জনাব মোঃ মনিরুল ইসলাম', 
    mobile: '01712-234567' 
  },
  { 
    title: 'এডিসি (এলএ)', 
    name: 'জনাব মোঃ ফারুক হোসেন', 
    mobile: '01713-345678' 
  },
  { 
    title: 'এডিসি (নির্বাচন)', 
    name: 'জনাব মোঃ রবিউল ইসলাম', 
    mobile: '01714-456789' 
  },
  { 
    title: 'এডিসি (উন্নয়ন)', 
    name: 'জনাব মোঃ শাহাদাত হোসেন', 
    mobile: '01715-567890' 
  },
  { 
    title: 'এডিসি (আইন শৃঙ্খলা)', 
    name: 'জনাব মোঃ কামরুল হাসান', 
    mobile: '01716-678901' 
  },
  { 
    title: 'এডিসি (সমন্বয়)', 
    name: 'জনাব মোঃ আনিসুর রহমান', 
    mobile: '01717-789012' 
  },
  { 
    title: 'এডিএম (ADM)', 
    name: 'জনাব মোঃ মাসুদ রানা', 
    mobile: '01718-890123' 
  },
];

export default function ImportantNumbersScreen() {
  const handleCall = (mobile: string) => {
    Linking.openURL(`tel:${mobile.replace(/-/g, '')}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" backgroundColor="#dc2626" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>গুরুত্বপূর্ণ নম্বর</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <LinearGradient
              colors={['#dc2626', '#ef4444']}
              style={styles.infoIconGradient}
            >
              <Ionicons name="call" size={32} color="#ffffff" />
            </LinearGradient>
          </View>
          <Text style={styles.infoTitle}>জরুরি যোগাযোগ</Text>
          <Text style={styles.infoSubtitle}>নম্বরে ট্যাপ করে সরাসরি কল করুন</Text>
        </View>

        {/* Contacts List */}
        <View style={styles.contactsContainer}>
          {CONTACTS.map((contact, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.contactCard,
                index % 2 === 0 && styles.contactCardEven
              ]}
              onPress={() => handleCall(contact.mobile)}
              activeOpacity={0.7}
            >
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{contact.title}</Text>
                <Text style={styles.contactName}>{contact.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => handleCall(contact.mobile)}
                activeOpacity={0.8}
              >
                <Ionicons name="call" size={16} color="#ffffff" />
                <Text style={styles.callButtonText}>{contact.mobile}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

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
    backgroundColor: '#dc2626',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#dc2626',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: '#fef2f2',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 32,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  infoIconContainer: {
    marginBottom: 16,
  },
  infoIconGradient: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 6,
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  contactsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  contactCardEven: {
    backgroundColor: '#fafafa',
  },
  contactInfo: {
    flex: 1,
    marginRight: 12,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
  },
  contactName: {
    fontSize: 13,
    color: '#6b7280',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc2626',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
  },
  callButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#9ca3af',
  },
});

