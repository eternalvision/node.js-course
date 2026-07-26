export async function getJson(url, { signal = AbortSignal.timeout(3000), fetchImpl = fetch } = {}) {
  const response = await fetchImpl(url, { signal, headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error(`Upstream returned ${response.status}`);
  return response.json();
}
