export function createInvalidPassword() {
  const suffix = Math.random().toString(36).slice(2, 10);
  return `invalid_${suffix}`;
}

export function createRandomExpiresInMins(min = 5, max = 60) {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export function createRandomToken() {
  const chunk = () => Math.random().toString(36).slice(2, 14);
  return `${chunk()}.${chunk()}.${chunk()}`;
}
