import * as CryptoJS from 'crypto-js'

const secretKey = process.env.REACT_APP_SECRET_KEY ? process.env.REACT_APP_SECRET_KEY : '123456'

export const encrypt = (plainText) => {
    const encryptedText = CryptoJS.AES.encrypt(plainText, secretKey).toString()
    return encryptedText
}