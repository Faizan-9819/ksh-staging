// Ported from the legacy .htaccess rule `RewriteRule ^test$ - [G,L]`, which
// served a 410 Gone for this path. next.config.ts's redirects() can't return
// a 410 (only 3xx), so this is a dedicated Route Handler instead.
export async function GET() {
  return new Response(null, { status: 410 });
}

export const HEAD = GET;
