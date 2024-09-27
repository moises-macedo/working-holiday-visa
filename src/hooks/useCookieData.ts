import Cookies from 'js-cookie';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

type CookieData = {
  saveData: (key: string, data: unknown) => void;
  retrieveData: <T>(key: string) => T | null;
  clearData: (key: string) => void;
  clearAllCookies: () => void;
};

export function useCookieData(): CookieData {


  const encryptionKey = '26pesxqclnstjmrqziuyoww4coghy4eg';

  const saveData = (key: string, data: unknown) => {    
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-gcm', Buffer.from(encryptionKey), iv);

    let encryptedData = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    const tag = cipher.getAuthTag();

    const encryptedDataWithIVAndTag = iv.toString('hex') + encryptedData + tag.toString('hex');

    Cookies.set(key, encryptedDataWithIVAndTag, {
      secure: true,
      httpOnly: false,
    });
  };

  const retrieveData = <T>(key: string): T | null => {
    const encryptedDataWithIVAndTag = Cookies.get(key);
    if (encryptedDataWithIVAndTag) {
      const iv = Buffer.from(encryptedDataWithIVAndTag.slice(0, 32), 'hex');
      const encryptedData = encryptedDataWithIVAndTag.slice(32, -32);
      const tag = Buffer.from(encryptedDataWithIVAndTag.slice(-32), 'hex');
      const decipher = createDecipheriv('aes-256-gcm', Buffer.from(encryptionKey), iv);
      decipher.setAuthTag(tag);

      let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
      decryptedData += decipher.final('utf8');
      return JSON.parse(decryptedData);
    }
    return null;
  };

  const clearData = (key: string) => {
    Cookies.remove(key);
  };

  const clearAllCookies = () => {
    const cookies = Cookies.get();
    Object.keys(cookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  };

  return {
    saveData,
    retrieveData,
    clearData,
    clearAllCookies,
  };
}
