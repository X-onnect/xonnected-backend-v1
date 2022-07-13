import { createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { env } from './env';

const iv = randomBytes(16);
const password = env.HASH_PASSWORD || 'Encryption password';
const salt = env.SALT || 'salt';

export const decryptText = async (encryptedText: Buffer) => {
    const key = (await promisify(scrypt)(password, salt, 32)) as Buffer;

    const decipher = createDecipheriv('aes-256-ctr', key, iv);

    const decryptedText = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
    ]);

    return decryptedText;
}
