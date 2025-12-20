import React from 'react';
import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Person {
  name: string;
  designation: string;
  mobile: string;
}

interface ExpandableSectionProps {
  title: string;
  subtitle?: string;
  color?: string;
  data: Person[];
}

export function ExpandableSection({
  title,
  color = '#059669',
  data,
}: ExpandableSectionProps) {
  const handleCall = (mobile: string) => {
    Linking.openURL(`tel:${mobile.replace(/-/g, '')}`);
  };

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
          <View style={[styles.tableHeaderCell, styles.nameColumn]}>
            <Text style={styles.tableHeaderText}>নাম ও পদবি</Text>
          </View>
          <View style={[styles.tableHeaderCell, styles.phoneColumn]}>
            <Text style={styles.tableHeaderText}>ফোন</Text>
          </View>
        </View>

        {/* Table Rows */}
        {data.map((person, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              index % 2 === 1 && styles.tableRowAlt,
            ]}
          >
            {/* Name & Designation Column */}
            <View style={[styles.tableCell, styles.nameColumn]}>
              <Text style={styles.nameText}>{person.name}</Text>
              <Text style={styles.designationText}>{person.designation}</Text>
            </View>
            
            {/* Phone Column */}
            <Pressable
              style={[styles.tableCell, styles.phoneColumn]}
              onPress={() => handleCall(person.mobile)}
            >
              <View style={[styles.phoneButton, { backgroundColor: color }]}>
                <Ionicons name="call" size={16} color="#ffffff" />
                <Text style={styles.phoneText}>{person.mobile}</Text>
              </View>
            </Pressable>
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
  },
  nameColumn: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  phoneColumn: {
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  tableRowAlt: {
    backgroundColor: '#f9fafb',
  },
  tableCell: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  designationText: {
    fontSize: 13,
    color: '#666',
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  phoneText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});

