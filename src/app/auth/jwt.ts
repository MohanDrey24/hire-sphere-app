import { JWTPayload, jwtVerify } from "jose";

export async function verifyJwt(
  session: string | undefined = ""
): Promise<JWTPayload | null> {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET not found");
    return null;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(session, secret, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}
