import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PDF_URL = 'https://drive.google.com/file/d/1lRLTtNTTwLNqUQT1bcmFkwqgDko4FdLj/view?usp=sharing';

export default function CodeOfConductScreen() {
  const handleViewPdf = () => {
    Linking.openURL(PDF_URL);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" backgroundColor="#7c3aed" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>আচরণ বিধি</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* PDF Card */}
        <View style={styles.pdfCard}>
          {/* PDF Icon */}
          <View style={styles.pdfIconContainer}>
            <LinearGradient
              colors={['#9333ea', '#7c3aed']}
              style={styles.pdfIconGradient}
            >
              <Ionicons name="document-text" size={48} color="#ffffff" />
            </LinearGradient>
          </View>

          {/* PDF Title */}
          <Text style={styles.pdfTitle}>নির্বাচনী আচরণবিধি ২০২৫</Text>
          <Text style={styles.pdfSubtitle}>ত্রয়দশ জাতীয় সংসদ নির্বাচন</Text>

          {/* PDF Info */}
          <View style={styles.pdfInfo}>
            <View style={styles.pdfInfoItem}>
              <Ionicons name="document" size={16} color="#9333ea" />
              <Text style={styles.pdfInfoText}>PDF ফাইল</Text>
            </View>
            <View style={styles.pdfInfoDivider} />
            <View style={styles.pdfInfoItem}>
              <Ionicons name="calendar" size={16} color="#9333ea" />
              <Text style={styles.pdfInfoText}>২০২৫</Text>
            </View>
          </View>

          {/* View Button */}
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleViewPdf}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#9333ea', '#7c3aed']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.downloadButtonGradient}
            >
              <Ionicons name="eye" size={22} color="#ffffff" />
              <Text style={styles.downloadButtonText}>দেখুন</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionTitle}>বিবরণ</Text>
          <Text style={styles.descriptionText}>
            এই পিডিএফ ফাইলে ত্রয়দশ জাতীয় সংসদ নির্বাচনের জন্য নির্ধারিত আচরণবিধি সম্পর্কে বিস্তারিত তথ্য রয়েছে। 
            নির্বাচনে অংশগ্রহণকারী সকল প্রার্থী, দল এবং সংশ্লিষ্ট ব্যক্তিদের এই বিধিমালা মেনে চলা বাধ্যতামূলক।
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7c3aed',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#7c3aed',
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
    backgroundColor: '#faf5ff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  pdfCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#9333ea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  pdfIconContainer: {
    marginBottom: 20,
  },
  pdfIconGradient: {
    width: 100,
    height: 100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 6,
  },
  pdfSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  pdfInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  pdfInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pdfInfoText: {
    fontSize: 13,
    color: '#6b7280',
  },
  pdfInfoDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  downloadButton: {
    width: '100%',
  },
  downloadButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  descriptionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
  },
});

