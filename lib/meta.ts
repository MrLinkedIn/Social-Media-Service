export const META_APP_ID = process.env.META_APP_ID!;
export const META_APP_SECRET = process.env.META_APP_SECRET!;
export const META_REDIRECT_URI = `${process.env.NEXTAUTH_URL}/api/meta/callback`;

export function getMetaAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: META_APP_ID,
    redirect_uri: META_REDIRECT_URI,
    scope:
      "pages_manage_posts,pages_read_engagement,instagram_basic,instagram_content_publish",
    response_type: "code",
    state,
  });
  return `https://www.facebook.com/v19.0/dialog/oauth?${params}`;
}

export async function exchangeCodeForToken(code: string) {
  const params = new URLSearchParams({
    client_id: META_APP_ID,
    client_secret: META_APP_SECRET,
    redirect_uri: META_REDIRECT_URI,
    code,
  });
  const res = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?${params}`
  );
  if (!res.ok) throw new Error("Failed to exchange code for token");
  return res.json() as Promise<{ access_token: string; expires_in: number }>;
}

export async function getLongLivedToken(shortToken: string): Promise<string> {
  const params = new URLSearchParams({
    grant_type: "fb_exchange_token",
    client_id: META_APP_ID,
    client_secret: META_APP_SECRET,
    fb_exchange_token: shortToken,
  });
  const res = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?${params}`
  );
  if (!res.ok) throw new Error("Failed to get long-lived token");
  const data = await res.json();
  return data.access_token as string;
}

export async function getUserPages(accessToken: string) {
  const res = await fetch(
    `https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}&fields=id,name,access_token`
  );
  if (!res.ok) throw new Error("Failed to get pages");
  return res.json();
}

export async function publishToFacebook(
  pageId: string,
  pageToken: string,
  message: string
): Promise<string> {
  const res = await fetch(`https://graph.facebook.com/v19.0/${pageId}/feed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, access_token: pageToken }),
  });
  if (!res.ok) throw new Error("Failed to publish to Facebook");
  const data = await res.json();
  return data.id as string;
}

export async function publishToInstagram(
  igAccountId: string,
  accessToken: string,
  caption: string,
  imageUrl?: string
): Promise<string> {
  const createRes = await fetch(
    `https://graph.facebook.com/v19.0/${igAccountId}/media`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caption, image_url: imageUrl, access_token: accessToken }),
    }
  );
  if (!createRes.ok) throw new Error("Failed to create Instagram media");
  const { id: creationId } = await createRes.json();

  const publishRes = await fetch(
    `https://graph.facebook.com/v19.0/${igAccountId}/media_publish`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creation_id: creationId, access_token: accessToken }),
    }
  );
  if (!publishRes.ok) throw new Error("Failed to publish to Instagram");
  const data = await publishRes.json();
  return data.id as string;
}
