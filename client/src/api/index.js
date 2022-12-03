export const BASE_URL = "http://localhost:4000/api";

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async (name, email, username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        username,
        password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUser = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGames = async () => {
  try {
    const response = await fetch(`${BASE_URL}/games`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchGameById = async (gameId) => {
  try {
    const response = await fetch(`${BASE_URL}/games/${gameId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchCart = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (gameId, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameId,
        userId,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const purchaseCart = async (token, cartId) => {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cartId,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteFromCart = async (token, cartId) => {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cartId,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteGameFunc = async (gameId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/games/${gameId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const editGameFunc = async (
  gameId,
  name,
  price,
  publisher,
  description,
  rating,
  category,
  image,
  user,
  token
) => {
  try {
    const response = await fetch(`${BASE_URL}/games/${gameId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        price,
        publisher,
        description,
        rating,
        category,
        image,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};
