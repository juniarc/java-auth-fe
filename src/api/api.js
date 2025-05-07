const BASE_URL = "http://localhost:8081";

export const login = async (body) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Login Failed");
    }

    const { accessToken } = await response.json();

    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (body) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Register Failed");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const forgotPasswod = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(email),
    });

    if (!response.ok) {
      throw new Error("Failed");
    }
    console.log(await response.json());
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (body) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed");
    }

    console.log(await response.json());
  } catch (error) {
    console.log(error);
  }
};
