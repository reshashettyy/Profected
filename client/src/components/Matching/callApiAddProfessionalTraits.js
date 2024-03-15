async function callApiAddProfessionalTraits(userData) {
  try {
    const response = await fetch('/api/addProfessionalTraits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error(
        'Failed to add professional traits: ' + response.statusText,
      );
    }
    return response.json();
  } catch (error) {
    console.error('Error adding professional traits:', error);
    throw error;
  }
}

export default callApiAddProfessionalTraits;
