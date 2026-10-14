const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8080').replace(/\/$/, '');

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      credentials: 'include',
      ...options,
      headers: { Accept: 'application/json', ...options.headers },
    });
  } catch {
    throw new Error('Cannot reach the Cricauction API. Check that the Spring Boot server is running.');
  }

  if (!response.ok) {
    let message = 'Request failed. Please try again.';
    try {
      const problem = await response.json();
      message = problem.detail || problem.message || problem.title || message;
      if (response.status === 400 && !problem.detail && !problem.message) {
        message = 'Please check the form values and try again.';
      }
    } catch {
      // Keep the friendly fallback when the server does not return JSON.
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) return null;
  return response.json();
}

const postJson = (path, body) => request(path, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const login = ({ email, password }) => postJson('/api/auth/login', { username: email, password });

export const signup = (details) => postJson('/api/auth/signup', details);

export async function getCurrentUser() {
  try {
    return await request('/api/auth/me');
  } catch (error) {
    if (error.status === 401 || error.status === 403) return null;
    throw error;
  }
}

export const logout = () => postJson('/api/auth/logout', {});
