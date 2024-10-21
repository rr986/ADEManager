const checkDrugInteraction = async (userMedications, newMedication) => {
    for (const med of userMedications) {
      const interactionData = await getMedicationInfo(med);
      if (interactionData.interactions.includes(newMedication)) {
        return true; // Interaction found
      }
    }
    return false;
  };
  
  useEffect(() => {
    const fetchInfo = async () => {
      const data = await getMedicationInfo(barcode);
      const userMedications = await getUserMedications(); 
  
      const interactionAlert = await checkDrugInteraction(userMedications, data.interactions);
      if (interactionAlert) {
        alert("Warning: Drug interaction detected with your current medications.");
      }
  
      setMedicationInfo(data);
    };
  
    fetchInfo();
  }, [barcode]);
  