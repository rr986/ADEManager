import { db } from '../firebase'; // Your Firebase setup
import { addDoc, collection } from 'firebase/firestore';

const saveScannedMedication = async (medicationInfo, barcode) => {
  try {
    await addDoc(collection(db, 'scannedMedications'), {
      barcode,
      ...medicationInfo,
      scannedAt: new Date(),
    });
  } catch (error) {
    console.error('Error saving scanned medication:', error);
  }
};

useEffect(() => {
  const fetchInfo = async () => {
    const data = await getMedicationInfo(barcode);
    setMedicationInfo(data);
    await saveScannedMedication(data, barcode); // Save scan to Firebase
  };

  fetchInfo();
}, [barcode]);
