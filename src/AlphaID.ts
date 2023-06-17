/**
 * AlphaID class
 */
class AlphaID {
  private static baseChars: string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private static globalKey: string = '';

  /**
   * Set the global key
   *
   * @param  {string} key
   */
  public static config(key: string): void {
    if (typeof key !== 'string') {
      throw new Error('Invalid input. The key must be a string.');
    }

    AlphaID.globalKey = key;
  }

  /**
   * Encode a number
   *
   * @param  {number, bigint} number
   * @param  {string} key
   * @returns {string}
   */
  public static convertNumber(number: number | bigint, key: string = ''): string {
    if (typeof number !== 'number' && typeof number !== 'bigint') {
      throw new Error('Invalid input. The number must be numeric.');
    }
  
    if (key === '') {
      key = AlphaID.globalKey;
    }
  
    let encryptedNumber: bigint;
    if (typeof number === 'number') {
      encryptedNumber = BigInt(number) ^ BigInt(AlphaID.crc32(key));
    } else {
      encryptedNumber = number ^ BigInt(AlphaID.crc32(key));
    }
  
    const baseLength: bigint = BigInt(AlphaID.baseChars.length);
    let convertedString: string = '';
    const lookup: string[] = AlphaID.baseChars.split('');
  
    while (encryptedNumber > 0) {
      convertedString = lookup[Number(encryptedNumber % baseLength)] + convertedString;
      encryptedNumber = encryptedNumber / baseLength;
    }
  
    return convertedString;
  }

  /**
   * Decode a string
   *
   * @param  {string} convertedString
   * @param  {string} key
   * @returns {number, bigint}
   */
  public static recoverNumber(convertedString: string, key: string = ''): number | bigint {
    if (typeof convertedString !== 'string') {
      throw new Error('Invalid input. The encoded string must be a string.');
    }
  
    if (key === '') {
      key = AlphaID.globalKey;
    }
  
    const baseLength: bigint = BigInt(AlphaID.baseChars.length);
    let recoveredNumber: bigint = BigInt(0);
  
    for (let i = 0; i < convertedString.length; i++) {
      const char: string = convertedString[i];
      const charValue: bigint = BigInt(AlphaID.baseChars.indexOf(char));
      recoveredNumber = recoveredNumber * baseLength + charValue;
    }
  
    const originalNumber: bigint = BigInt(recoveredNumber) ^ BigInt(AlphaID.crc32(key));
  
    if (originalNumber > Number.MAX_SAFE_INTEGER) {
      return originalNumber;
    } else {
      return Number(originalNumber);
    }
  }

  /**
   * Short name function redirects to convertNumber
   */
  public static convert(numberToBeConverted: number, key: string = ''): string {
    return AlphaID.convertNumber(numberToBeConverted, key);
  }

  /**
   * Short name function redirects to recoverNumber
   */
  public static recover(stringToBeRecovered: string, key: string = ''): number | bigint {
    return AlphaID.recoverNumber(stringToBeRecovered, key);
  }

  public static crc32(data: string): number {
    const crcTable: number[] = [];
    let crc: number = 0xFFFFFFFF;
  
    // Generate CRC32 lookup table
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) {
        if (c & 1) {
          c = 0xEDB88320 ^ (c >>> 1);
        } else {
          c = c >>> 1;
        }
      }
      crcTable[i] = c;
    }
  
    // Calculate CRC32 checksum
    for (let i = 0; i < data.length; i++) {
      const byte = data.charCodeAt(i) & 0xFF;
      crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xFF];
    }
  
    crc = crc ^ 0xFFFFFFFF;
    return (crc >>> 0);
  }

}
  
  export default AlphaID 