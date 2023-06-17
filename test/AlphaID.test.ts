const AlphaID = require('../src/AlphaID').default;

test('Encode and decode with global key', () => {
  AlphaID.config('globalkey');
  const number = 1234567890;

  const encoded = AlphaID.convert(number);
  const decoded = AlphaID.recover(encoded);

  expect(decoded).toBe(number);
});

test('Encode and decode with specific key', () => {
  AlphaID.config('globalkey');
  const number = 987654321;
  const key = 'specifickey';

  const encoded = AlphaID.convert(number, key);
  const decoded = AlphaID.recover(encoded, key);

  expect(decoded).toBe(number);
});

test('Encode and decode with empty key', () => {
  AlphaID.config('globalkey');
  const number = 54321;

  const encoded = AlphaID.convert(number, '');
  const decoded = AlphaID.recover(encoded, '');

  expect(decoded).toBe(number);
});

test('Encode number to encoded string', () => {
  AlphaID.config('globalkey');

  const testData = [
    [123456, '3ygxRZ'],
    [987654, '3ycMuJ'],
    [54321, '3ygih0'],
    [89815, '3ygH9C'],
  ];

  testData.forEach(([number, expectedEncodedString]) => {
    const encoded = AlphaID.convert(number);
    expect(encoded).toBe(expectedEncodedString);
  });
});

test('Decode encoded string to number', () => {
  AlphaID.config('globalkey');

  const testData = [
    ['3ygxRZ', 123456],
    ['3ycMuJ', 987654],
    ['3ygih0', 54321],
    ['3ygH9C', 89815],
  ];

  testData.forEach(([encodedString, expectedNumber]) => {
    const decoded = AlphaID.recover(encodedString);
    expect(decoded).toBe(expectedNumber);
  });
});
