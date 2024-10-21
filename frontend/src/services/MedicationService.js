
const OPENROUTER_API_KEY = '3ea14c585fb65e99ddbadcb644a37d3a561015238c16df42f95e10f480d13fc2'; 

export const getMedicationInfo = async (medicationName) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "openai/gpt-3.5-turbo",
        "messages": [
          {
            "role": "user",
            "content": `Give a one-word drug interaction, one-word common side effect, and one-word allergy for the medication ${medicationName}.`
          }
        ]
      }),
    });

    const data = await response.json();
    const result = data.choices[0].message.content.trim().split("\n");

    const interaction = result[0] || 'No interaction';
    const sideEffect = result[1] || 'No side effect';
    const allergy = result[2] || 'No allergy';

    return {
      interactions: interaction,
      sideEffects: sideEffect,
      allergies: allergy
    };

  } catch (error) {
    console.error("Error fetching medication info from GPT-3:", error);
    return {
      interactions: "Error fetching interactions",
      sideEffects: "Error fetching side effects",
      allergies: "Error fetching allergies"
    };
  }
};
