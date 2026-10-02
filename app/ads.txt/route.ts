import { ADSENSE_PUBLISHER_ID, adsenseConfigured } from '@/lib/site';

/**
 * ads.txt
 *
 * Authorised digital sellers declaration, served from the site root at
 * https://www.gamerspulse.site/ads.txt
 *
 * The publisher ID is read from NEXT_PUBLIC_ADSENSE_PUBLISHER_ID. It is never
 * hard-coded and never invented:
 *  - Unset, or still set to the documented placeholder, serves a valid file
 *    with no directive line plus setup instructions. AdSense accepts an
 *    ads.txt with no entries; it fails to authorise inventory, which is the
 *    correct outcome for an unapproved site.
 *  - Set to a real ID, serves the single authorised seller line.
 *
 * Only the Google AdSense line is ever emitted. No third-party networks, no
 * resellers and no self-authored entries, because none are authorised for this
 * property.
 */

const GOOGLE_ADSENSE_SCRIPT = 'f08c47fec0942fa0';

const SETUP_INSTRUCTIONS = `# ads.txt — GamersPulse
#
# STATUS: no authorised sellers are declared yet.
#
# This file is valid but currently contains no directive lines, which means
# no advertising inventory on this site is authorised to be displayed.
#
# TO ENABLE GOOGLE ADSENSE:
#   1. Apply for and get approval for an AdSense account for
#      https://www.gamerspulse.site/
#   2. In the AdSense dashboard, open Account > Information > Reseller
#      settings, and copy the exact "ads.txt" line Google gives you. It looks
#      like:
#
#        google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
#
#   3. Paste it below as a single line, replacing the placeholder. Do not
#      change the script value; Google's is the only correct one.
#
# ALTERNATIVELY, set it as an environment variable so no code change is needed:
#
#      NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
#
#   and redeploy. The response is then generated automatically.
#
# Do not add any seller line that Google AdSense did not give you. An
# unauthorised or self-added line can prevent approval.
#
# Only Google AdSense is used on this site. There are no other advertising
# networks, resellers or exchanges.
`;

/** Only a numeric `pub-` suffix is accepted, matching Google's own format. */
function adsenseLine(publisherId: string): string | null {
  const match = publisherId.match(/^ca-pub-(\d+)$/);
  if (!match) return null;
  return `google.com, pub-${match[1]}, DIRECT, ${GOOGLE_ADSENSE_SCRIPT}`;
}

export const dynamic = 'force-static';

export function GET(): Response {
  const line =
    adsenseConfigured() && ADSENSE_PUBLISHER_ID ? adsenseLine(ADSENSE_PUBLISHER_ID) : null;

  const body = line ? `${line}\n` : SETUP_INSTRUCTIONS;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}