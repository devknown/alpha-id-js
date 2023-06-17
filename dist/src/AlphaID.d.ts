/**
 * AlphaID class
 */
declare class AlphaID {
    private static baseChars;
    private static globalKey;
    /**
     * Set the global key
     *
     * @param  {string} key
     */
    static config(key: string): void;
    /**
     * Encode a number
     *
     * @param  {number, bigint} number
     * @param  {string} key
     * @returns {string}
     */
    static convertNumber(number: number | bigint, key?: string): string;
    /**
     * Decode a string
     *
     * @param  {string} convertedString
     * @param  {string} key
     * @returns {number, bigint}
     */
    static recoverNumber(convertedString: string, key?: string): number | bigint;
    /**
     * Short name function redirects to convertNumber
     */
    static convert(numberToBeConverted: number, key?: string): string;
    /**
     * Short name function redirects to recoverNumber
     */
    static recover(stringToBeRecovered: string, key?: string): number | bigint;
    static crc32(data: string): number;
}
export default AlphaID;
