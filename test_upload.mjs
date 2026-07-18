import fs from "fs";
import crypto from "crypto";


const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const STORE_PUBLIC_ID = "mwalimu-maronga/products-store";

function cloudinarySign(params) {
  const toSign =
    Object.keys(params)
      .sort()
      .map((k) => `${k}=${params[k]}`)
      .join("&") + API_SECRET;
  return crypto.createHash("sha1").update(toSign).digest("hex");
}

async function testUpload() {
  try {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const paramsToSign = {
      invalidate: "true",
      overwrite: "true",
      public_id: STORE_PUBLIC_ID,
      timestamp,
    };
    const signature = cloudinarySign(paramsToSign);

    const store = { dynamic: [], deletedIds: [] };
    const json = JSON.stringify(store);
    const blob = new Blob([json], { type: "application/json" });

    const form = new FormData();
    form.append("file", blob, "products-store.json");
    form.append("public_id", STORE_PUBLIC_ID);
    form.append("overwrite", "true");
    form.append("invalidate", "true");
    form.append("timestamp", timestamp);
    form.append("api_key", API_KEY);
    form.append("signature", signature);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
      { method: "POST", body: form }
    );

    if (!uploadRes.ok) {
      const errBody = await uploadRes.text();
      console.error("[db] Cloudinary write failed:", uploadRes.status, errBody);
    } else {
      console.log("[db] Cloudinary store updated successfully.", await uploadRes.json());
    }
  } catch (err) {
    console.error("[db] Failed to write Cloudinary store:", err);
  }
}

testUpload();
