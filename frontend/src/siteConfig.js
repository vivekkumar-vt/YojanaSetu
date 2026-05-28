/**
 * Centralized site configuration for Yojana Setu.
 * All hardcoded values (stats, contact info, labels) live here
 * so Landing, About, and Footer stay in sync.
 */

export const SITE = {
  name: 'Yojana Setu',
  tagline: 'Bridging Citizens to Government Schemes',
  demoBanner: 'This is a demo project — not affiliated with any government body.',
};

export const CONTACT = {
  email: 'demo@yojanasetu.example.com',
  emailLabel: 'Email Support',
};

/**
 * Stat values derived from actual data:
 * - schemes.json has 8 entries
 * - India has 28 states + 8 UTs = 36 entities
 * - Visitor count is a live localStorage counter
 */
export const STATS = {
  schemesCount: '8',
  schemesLabel: 'Active Schemes',
  statesCovered: '36',
  statesLabel: 'States & UTs',
  visitorsLabel: 'Visitors',
};
