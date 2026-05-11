const API_URL = "http://localhost:3000/auth";

export const registerUser = async (user) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw new Error(data.error || `Error al registrar un usuario`);
  }
  return data;
};

export const loginUser = async (user) => {

  const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || `Error al registrar un usuario`);
      }
      return data;
    };
