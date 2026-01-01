import React from 'react';
import { View, Text, StyleSheet, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

interface Candidate {
  name: string;
  party?: string;
  symbol: string; // Symbol name as text (e.g., "নৌকা", "ধানের শীষ")
  symbolImage?: ImageSourcePropType; // Symbol image
}

interface CandidatesSectionProps {
  title?: string;
  color?: string;
  candidates: Candidate[];
}

export function CandidatesSection({
  title = 'প্রতিদ্বন্দ্বী প্রার্থী',
  color = '#059669',
  candidates,
}: CandidatesSectionProps) {
  return (
    <View style={[styles.container, { borderColor: color }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: color }]}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {/* Table Content */}
      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <View style={[styles.tableHeaderCell, styles.photoColumn]}>
            <Text style={styles.tableHeaderText}>ছবি</Text>
          </View>
          <View style={[styles.tableHeaderCell, styles.nameColumn]}>
            <Text style={styles.tableHeaderText}>নাম ও দল</Text>
          </View>
          <View style={[styles.tableHeaderCell, styles.symbolNameColumn]}>
            <Text style={styles.tableHeaderText}>প্রতীক নাম</Text>
          </View>
          <View style={[styles.tableHeaderCell, styles.symbolImageColumn]}>
            <Text style={styles.tableHeaderText}>প্রতীক</Text>
          </View>
        </View>

        {/* Candidate Rows */}
        {candidates.map((candidate, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              index % 2 === 1 && styles.tableRowAlt,
              index === candidates.length - 1 && styles.lastRow,
            ]}
          >
            {/* Photo Column */}
            <View style={[styles.tableCell, styles.photoColumn]}>
              <View style={[styles.photoContainer, { borderColor: color }]}>
                <Ionicons name="person" size={32} color={color} />
              </View>
            </View>

            {/* Name & Party Column */}
            <View style={[styles.tableCell, styles.nameColumn]}>
              <Text style={styles.nameText}>{candidate.name}</Text>
              {candidate.party && (
                <Text style={[styles.partyText, { color }]}>{candidate.party}</Text>
              )}
            </View>

            {/* Symbol Name Column */}
            <View style={[styles.tableCell, styles.symbolNameColumn]}>
              <Text style={[styles.symbolNameText, { color }]}>{candidate.symbol}</Text>
            </View>

            {/* Symbol Image Column */}
            <View style={[styles.tableCell, styles.symbolImageColumn]}>
              {candidate.symbolImage ? (
                <Image
                  source={candidate.symbolImage}
                  style={styles.symbolImage}
                  contentFit="contain"
                  transition={200}
                />
              ) : (
                <View style={[styles.symbolPlaceholder, { borderColor: color }]}>
                  <Ionicons name="image-outline" size={24} color={color} />
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
  },
  tableContainer: {
    borderTopWidth: 2,
    borderTopColor: 'inherit',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableHeaderCell: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
  },
  photoColumn: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  nameColumn: {
    flex: 1,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  symbolNameColumn: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  symbolImageColumn: {
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    minHeight: 80,
  },
  tableRowAlt: {
    backgroundColor: '#f9fafb',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  tableCell: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  photoContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolImage: {
    width: 55,
    height: 55,
    borderRadius: 8,
  },
  symbolPlaceholder: {
    width: 55,
    height: 55,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolNameText: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  nameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  partyText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
