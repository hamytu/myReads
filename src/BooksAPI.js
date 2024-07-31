const api = "https://reactnd-books-api.udacity.com";

// Token management
const getToken = () => {
  let token = localStorage.token;
  if (!token) {
    token = Math.random().toString(36).substr(-8);
    localStorage.token = token;
  }
  return token;
};

// Header configuration
const getHeaders = (contentType = "application/json") => ({
  Accept: "application/json",
  Authorization: getToken(),
  "Content-Type": contentType,
});

// API functions
export const get = async (bookId) => {
  try {
    const response = await fetch(`${api}/books/${bookId}`, { headers: getHeaders() });
    const data = await response.json();
    return data.book;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};

export const getAll = async () => {
  try {
    const response = await fetch(`${api}/books`, { headers: getHeaders() });
    const data = await response.json();
    return data.books;
  } catch (error) {
    console.error("Error fetching all books:", error);
    throw error;
  }
};

export const update = async (bookID, shelf) => {
  try {
    const response = await fetch(`${api}/books/${bookID}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ shelf }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating book shelf:", error);
    throw error;
  }
};

export const search = async (query, maxResults) => {
  try {
    const response = await fetch(`${api}/search`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ query, maxResults }),
    });
    const data = await response.json();
    return data.books;
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }
};