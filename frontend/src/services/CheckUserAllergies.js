const checkUserAllergies = (userAllergies, medicationAllergy) => {
    return userAllergies.includes(medicationAllergy);
  };
  
  useEffect(() => {
    const fetchInfo = async () => {
      const data = await getMedicationInfo(barcode);
      const userAllergies = await getUserAllergies(); 
  
      const isAllergyConflict = checkUserAllergies(userAllergies, data.allergies);
      if (isAllergyConflict) {
        alert("Warning: This medication contains an ingredient you're allergic to.");
      }
  
      setMedicationInfo(data);
    };
  
    fetchInfo();
  }, [barcode]);
  