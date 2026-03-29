const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export async function createTriage(symptoms: any, identityNumber?: string, requiresCertificate?: boolean) {
  if (IS_DEMO) {
    console.log('DEMO MODE: Simulando creación de triaje');
    return { id: 'mock-triage-id', status: 'PENDING' };
  }

  const url = `${API_URL}/triage`;
  const body = JSON.stringify({ symptoms, identityNumber, requiresCertificate });
  
  console.log(`Attempting fetch to: ${url}`, { body });
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Error al crear el triaje: ${response.statusText}`);
    }
    return response.json();
  } catch (err) {
    console.error(`Fetch failed for ${url}:`, err);
    throw err;
  }
}

export async function requestMagicLink(email: string) {
  const url = `${API_URL}/auth/magic-link`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Error al solicitar el enlace: ${response.statusText}`);
    }
    return response.json();
  } catch (err) {
    console.error(`Fetch failed for ${url}:`, err);
    throw err;
  }
}
