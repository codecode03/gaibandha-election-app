import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

// Vehicle type
export interface Vehicle {
  vehicleNumber: string;
  driverName: string;
  phone: string;
}

// Observer type
export interface Observer {
  name: string;
  phone: string;
  organization: string;
}

// Media Personnel type
export interface MediaPerson {
  mediaName: string;
  name: string;
  phone: string;
}

interface VehicleTableProps {
  title?: string;
  color?: string;
  data: Vehicle[];
}

interface ObserverTableProps {
  title?: string;
  color?: string;
  data: Observer[];
}

interface MediaTableProps {
  title?: string;
  color?: string;
  data: MediaPerson[];
}

// Helper function to make phone calls
const handleCall = (phone: string) => {
  if (phone) {
    const cleanNumber = phone.replace(/[^0-9+]/g, '');
    Linking.openURL(`tel:${cleanNumber}`);
  }
};

// ১. অনুমোদিত বাহন (Authorized Vehicles) Table
export function VehicleTable({
  title = 'অনুমোদিত বাহন',
  color = '#059669',
  data,
}: VehicleTableProps) {
  if (!data || data.length === 0) return null;

  return (
    <View style={[styles.container, { borderColor: color }]}>
      <View style={[styles.header, { backgroundColor: color }]}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <View style={[styles.tableHeaderCell, styles.flexColumn]}>
            <Text style={styles.tableHeaderText}>বাহন নাম্বার</Text>
          </View>
          <View style={[styles.tableHeaderCell, styles.flexColumn]}>
            <Text style={styles.tableHeaderText}>চালকের নাম</Text>
          </View>
          <View style={[styles.tableHeaderCell, styles.phoneColumn]}>
            <Text style={styles.tableHeaderText}>ফোন</Text>
          </View>
        </View>

        {/* Table Rows */}
        {data.map((item, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              index % 2 === 1 && styles.tableRowAlt,
              index === data.length - 1 && styles.lastRow,
            ]}
          >
            <View style={[styles.tableCell, styles.flexColumn]}>
              <Text style={styles.nameText}>{item.vehicleNumber}</Text>
            </View>
            <View style={[styles.tableCell, styles.flexColumn]}>
              <Text style={styles.nameText}>{item.driverName}</Text>
            </View>
            <Pressable style={[styles.tableCell, styles.phoneColumn]} onPress={() => handleCall(item.phone)}>
              <View style={[styles.phoneButton, { backgroundColor: color }]}>
                <Ionicons name="call" size={16} color="#ffffff" />
                <Text style={styles.phoneText}>{item.phone}</Text>
              </View>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

// ২. পর্যবেক্ষক (Observers) Table
export function ObserverTable({
  title = 'পর্যবেক্ষক',
  color = '#059669',
  data,
}: ObserverTableProps) {
  if (!data || data.length === 0) return null;

  return (
    <View style={[styles.container, { borderColor: color }]}>
      <View style={[styles.header, { backgroundColor: color }]}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <View style={[styles.tableHeaderCell, styles.flexColumn]}>
            <Text style={styles.tableHeaderText}>নাম</Text>
          </View>
          <View style={[styles.tableHeaderCell, styles.flexColumn]}>
            <Text style={styles.tableHeaderText}>প্রতিষ্ঠানের নাম</Text>
          </View>
          <View style={[styles.tableHeaderCell, styles.phoneColumn]}>
            <Text style={styles.tableHeaderText}>ফোন</Text>
          </View>
        </View>

        {/* Table Rows */}
        {data.map((item, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              index % 2 === 1 && styles.tableRowAlt,
              index === data.length - 1 && styles.lastRow,
            ]}
          >
            <View style={[styles.tableCell, styles.flexColumn]}>
              <Text style={styles.nameText}>{item.name}</Text>
            </View>
            <View style={[styles.tableCell, styles.flexColumn]}>
              <Text style={styles.nameText}>{item.organization}</Text>
            </View>
            <Pressable style={[styles.tableCell, styles.phoneColumn]} onPress={() => handleCall(item.phone)}>
              <View style={[styles.phoneButton, { backgroundColor: color }]}>
                <Ionicons name="call" size={16} color="#ffffff" />
                <Text style={styles.phoneText}>{item.phone}</Text>
              </View>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

// ৩. গণমাধ্যম কর্মী (Media Personnel) Table
export function MediaTable({
  title = 'গণমাধ্যম কর্মী',
  color = '#059669',
  data,
}: MediaTableProps) {
  if (!data || data.length === 0) return null;

  return (
    <View style={[styles.container, { borderColor: color }]}>
      <View style={[styles.header, { backgroundColor: color }]}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <View style={[styles.tableHeaderCell, styles.flexColumn]}>
            <Text style={styles.tableHeaderText}>গণমাধ্যমের নাম</Text>
          </View>
          <View style={[styles.tableHeaderCell, styles.flexColumn]}>
            <Text style={styles.tableHeaderText}>নাম</Text>
          </View>
          <View style={[styles.tableHeaderCell, styles.phoneColumn]}>
            <Text style={styles.tableHeaderText}>ফোন</Text>
          </View>
        </View>

        {/* Table Rows */}
        {data.map((item, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              index % 2 === 1 && styles.tableRowAlt,
              index === data.length - 1 && styles.lastRow,
            ]}
          >
            <View style={[styles.tableCell, styles.flexColumn]}>
              <Text style={styles.nameText}>{item.mediaName}</Text>
            </View>
            <View style={[styles.tableCell, styles.flexColumn]}>
              <Text style={styles.nameText}>{item.name}</Text>
            </View>
            <Pressable style={[styles.tableCell, styles.phoneColumn]} onPress={() => handleCall(item.phone)}>
              <View style={[styles.phoneButton, { backgroundColor: color }]}>
                <Ionicons name="call" size={16} color="#ffffff" />
                <Text style={styles.phoneText}>{item.phone}</Text>
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
  flexColumn: {
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
  lastRow: {
    borderBottomWidth: 0,
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
