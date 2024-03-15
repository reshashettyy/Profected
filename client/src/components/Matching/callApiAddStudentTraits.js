async function callApiAddStudentTraits(userData) {
  try {
    const response = await fetch('/api/addStudentTraits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export default callApiAddStudentTraits;
