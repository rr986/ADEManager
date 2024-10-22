import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { getUserPatientsFn, getPatientDataFn } from '../services/PatientDataStorage';
import globalStyles from '../styles';

const PatientsScreen = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getPatientDataFn();
      setPatients(data || []);
      setFilteredPatients(data || []);
    };
    fetchPatients();
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filtered = patients.filter(patient =>
      patient.firstName.toLowerCase().includes(text.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Patients</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Search by name..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredPatients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Patient Detail', { patient: item })}>
            <View style={globalStyles.card}>
              <Text>{item.firstName} {item.lastName}</Text>
              <Text>Admit Reason: {item.admitReason}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PatientsScreen;
