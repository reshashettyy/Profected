async function callApiAddProfessionalAvailaibility(idToken, userData) {
  try {
    const response = await fetch('/api/addProfessionalAvailability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: idToken,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to add student traits: ' + response.statusText);
    }
    return response.json();
  } catch (error) {
    console.error('Error adding student traits:', error);
    throw error;
  }
}

export default callApiAddProfessionalAvailaibility;
