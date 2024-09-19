import { JWTPayload, jwtVerify } from "jose";

const secret = new TextEncoder().encode('YAWAKAAYO123');

export async function decryptJWT(session: string | undefined = ''): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(session, secret, {
      algorithms: ['HS256']
    })

    return payload;
  } catch (error) {
    return null;
  }
}