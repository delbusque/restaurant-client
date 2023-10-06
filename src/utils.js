import * as CryptoJS from 'crypto-js'

const secretKey = process.env.REACT_APP_SECRET_KEY ? process.env.REACT_APP_SECRET_KEY : '123456'

export function encrypt(word) {
    let encJson = CryptoJS.AES.encrypt(JSON.stringify(word), secretKey).toString()
    let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
    return encData
}