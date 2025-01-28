import { JWTPayload, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function decryptJWT(
  session: string | undefined = "",
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(session, secret, {
      algorithms: ["HS256"],
    });

    console.log("payload", payload);

    return payload;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
