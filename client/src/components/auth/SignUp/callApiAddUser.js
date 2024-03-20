async function callApiAddUser(serverURL, userData, idToken) {
  try {
    const response = await fetch('/api/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: idToken,
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    if (response.status !== 200) throw Error(result.message);
    const request = JSON.parse(result);
    return request;
  } catch (error) {
    console.error('Error adding review:', error);
  }
}

export default callApiAddUser;
