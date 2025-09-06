import { createHmac } from 'crypto';

//npm install @types/node --save-dev
//tsconfig.json -> "types": ["node"]
//https://www.unixtimestamp.com/index.php
//https://onlineminitools.com/jwt-decoder
//

const base64UrlEncode = (data:string): string => {
    return Buffer.from(data, "utf-8").toString("base64");
};

const headerObject = {
    typ: "JWT",
    alg: "HS256"
};

const payloadObject = {
    exp: 1757947662,
    weather_public_zip: "96815",
    weather_public_type: "GitHub",
};

const createJWT = () => {

    const SECRET = "1234567889";

    const base64Header = base64UrlEncode(JSON.stringify(headerObject));
    const base64Payload = base64UrlEncode(JSON.stringify(payloadObject));

    const signature : string = createHmac("sha256", SECRET)
        .update(`${base64Header}.${base64Payload}`)
        .digest("hex");
        
    return [base64Header, base64Payload, signature].join(".");
};
//----------------------------
let jwt = createJWT();
console.log(jwt);