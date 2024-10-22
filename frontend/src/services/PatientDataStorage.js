import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';  // Import Firebase Cloud Functions

// Get a single patient's data using Firebase Cloud Functions
export const getPatientDataFn = async (patientId) => {
  try {
    const getPatient = httpsCallable(functions, 'getPatientDataFn');
    const result = await getPatient({ patientId });
    return result.data;
  } catch (error) {
    console.error('Error retrieving patient data', error);
  }
};

// Get all patients for a specific user using Firebase Cloud Functions
export const getUserPatientsFn = async (userId) => {
  try {
    const getUserPatients = httpsCallable(functions, 'getUserPatientsFn');
    const result = await getUserPatients({ userID: userId });
    return result.data;
  } catch (error) {
    console.error('Error retrieving user patients', error);
  }
};

/*
Not used
// Get all patients' data using Firebase Cloud Functions
export const getAllPatientsData = async () => {
  try {
    const getAllPatients = httpsCallable(functions, 'getAllPatientsData');
    const result = await getAllPatients();
    return result.data;
  } catch (error) {
    console.error('Error retrieving all patients', error);
  }
};

// Add a new patient to a user's list using Firebase Cloud Functions
export const addPatientToUser = async (userId, newPatientId) => {
  try {
    const addPatient = httpsCallable(functions, 'addPatientToUser');
    const result = await addPatient({ userID: userId, newPatientID: newPatientId });
    return result.data;
  } catch (error) {
    console.error('Error adding patient to user', error);
  }
};

// Save or update patient data through Firebase Cloud Functions
export const savePatientData = async (patientId, patientData) => {
  try {
    const savePatient = httpsCallable(functions, 'savePatientData');
    const result = await savePatient({ patientId, patientData });
    return result.data;  // Return success status
  } catch (error) {
    console.error('Error saving patient data', error);
  }
};
*/