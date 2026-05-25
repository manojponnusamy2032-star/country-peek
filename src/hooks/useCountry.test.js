import { renderHook, act } from '@testing-library/react';
import useCountry from './useCountry';

// Mock fetch
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([{ name: { common: 'Testland' } }]),
    })
  );
});

afterAll(() => {
  global.fetch.mockRestore();
});

test('fetches country data by code', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCountry('TST'));
  expect(result.current.loading).toBe(true);
  await waitForNextUpdate();
  expect(result.current.country.name.common).toBe('Testland');
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBe(null);
});
