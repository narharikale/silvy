export function encodePassphrase(passphrase) {
    return encodeURIComponent(passphrase);
  }
  
  export function decodePassphrase(base64String) {
    return decodeURIComponent(base64String);
  }
  
  export function generateRoomId() {
    return `${randomString(4)}-${randomString(4)}`;
  }
  
  export function randomString(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  