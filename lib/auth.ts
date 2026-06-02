import crypto from "crypto";

const SESSION_COOKIE = "mm_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "mwalimu-maronga-default-session-secret-key-987654";
}

/** Create a signed session token (base64(payload):hmac) */
export function createSessionToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + SESSION_MAX_AGE * 1000 })
  ).toString("base64url");

  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");

  return `${payload}.${sig}`;
}

/** Verify a session token. Returns true if valid & not expired. */
export function verifySessionToken(token: string): boolean {
  try {
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return false;

    const expectedSig = crypto
      .createHmac("sha256", getSecret())
      .update(payload)
      .digest("hex");

    // Constant-time comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expectedSig, "hex")))
      return false;

    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return Date.now() < exp;
  } catch {
    return false;
  }
}

/** Validate submitted credentials against environment variables */
export function validateCredentials(email: string, password: string): boolean {
  const cleanValue = (v: string | undefined): string => {
    if (!v) return "";
    return v.trim().replace(/^['"]|['"]$/g, "").trim();
  };

  // Resolve admin credentials with clean strings and fallbacks
  let adminEmail = cleanValue(process.env.ADMIN_EMAIL);
  if (!adminEmail) adminEmail = "Marongabooks@gmail.com";

  let adminPassword = cleanValue(process.env.ADMIN_PASSWORD);
  if (!adminPassword) adminPassword = "7200Vic@7";

  // Normalize by removing all whitespaces and converting to lowercase
  const normalizeEmail = (e: string) => e.replace(/\s+/g, "").toLowerCase();

  const inputEmail = cleanValue(email);
  const inputPassword = cleanValue(password);

  return (
    normalizeEmail(inputEmail) === normalizeEmail(adminEmail) &&
    inputPassword === adminPassword
  );
}

export { SESSION_COOKIE, SESSION_MAX_AGE };
