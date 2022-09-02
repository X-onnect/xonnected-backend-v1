import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { env } from './env';

const iv = randomBytes(16);
const password = env.HASH_PASSWORD || 'Encryption password';
const salt = env.SALT || 'salt';

export const encryptText = async (text: string) => {
    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const key = (await promisify(scrypt)(password, salt, 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const textToEncrypt = 'Nest';
    const encryptedText = Buffer.concat([
        cipher.update(textToEncrypt),
        cipher.final(),
    ]);

    return encryptedText
}