import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getMedicationInfo } from '../services/MedicationService';

const MedicationInfo = ({ route }) => {
    const { barcode } = route.params;
    const [medicationInfo, setMedicationInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchInfo = async () => {
        try {
          const data = await getMedicationInfo(barcode);
          setMedicationInfo(data);
        } catch (error) {
          setError("Failed to fetch medication info. Please try again.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchInfo();
    }, [barcode]);
  
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;
  
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Medication Information</Text>
        <Text style={styles.label}>Drug Interactions:</Text>
        <Text>{medicationInfo.interactions}</Text>
  
        <Text style={styles.label}>Common Side Effects:</Text>
        <Text>{medicationInfo.sideEffects}</Text>
  
        <Text style={styles.label}>Allergies:</Text>
        <Text>{medicationInfo.allergies}</Text>
      </ScrollView>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default MedicationInfo;