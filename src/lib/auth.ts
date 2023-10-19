import { JWTPayload, SignJWT, jwtVerify } from "jose";

export const getJwtSecretKey = (): Uint8Array => {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  if (!secret) throw new Error("JWT Secret key is not provided");
  return new TextEncoder().encode(secret);
};

export const verifyJwtToken = async (
  token: string | Uint8Array
): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
};

export const generateToken = async (
  jwtPayload: JWTPayload,
  expirationTime: string | number = "120s"
): Promise<string> => {
  const token = await new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expirationTime)
    .sign(getJwtSecretKey());
  return token;
};
