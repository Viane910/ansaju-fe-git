import { getAccessToken } from '../utils/auth.js';
import { BASE_URL } from '../config.js';

const ENDPOINTS = {
  // Auth
  REGISTER: `${BASE_URL}register`,
  LOGIN: `${BASE_URL}login`,

  // trapkan ML
  RECOMMENDATIONS: `${BASE_URL}recommendations`,
  HISTORY_RECOMMENDATIONS: `${BASE_URL}recommendations/history`,
};

//Post Register
export async function postRegister({ name, email, username, password }) {
  const data = JSON.stringify({ name, email, username, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

// Post Login
export async function postLogin({ username, password }) {
  const data = JSON.stringify({ username, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

// Post Recommendations
export async function postRecommendations({ answer }) {
  const accessToken = getAccessToken();
  console.log(accessToken);
  const data = JSON.stringify({ answer });

  const fetchResponse = await fetch(ENDPOINTS.RECOMMENDATIONS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
    body: data,
  });

  const json = await fetchResponse.json();
  console.log('fetchResponse:', json);

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

// Get History Jurusan
export async function getRecommendationHistory({ page = 1, limit = 1000 } = {}) {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('Token tidak ditemukan');
  }

  const queryParams = new URLSearchParams({ page, limit });

  try {
    const fetchResponse = await fetch(`${ENDPOINTS.HISTORY_RECOMMENDATIONS}?${queryParams}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const json = await fetchResponse.json();
    localStorage.setItem('jurusan', JSON.stringify(json.data));

    console.log('fetchResponse:', json);

    return {
      ...json,
      ok: fetchResponse.ok,
    };
  } catch (error) {
    console.error('Gagal mengambil history rekomendasi:', error);
    return {
      error: true,
      message: 'Terjadi kesalahan saat mengambil history rekomendasi',
      data: [],
      ok: false,
    };
  }
}
