const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function createTriage(symptoms: any, identityNumber?: string, requiresCertificate?: boolean) {
  const response = await fetch(`${API_URL}/triage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symptoms, identityNumber, requiresCertificate }),
  });
  if (!response.ok) throw new Error('Error al crear el triaje');
  return response.json();
}

export async function requestMagicLink(email: string) {
  const response = await fetch(`${API_URL}/auth/magic-link`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error('Error al solicitar el enlace de acceso');
  return response.json();
}
