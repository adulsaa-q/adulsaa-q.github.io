/**
 * Contact routes. Keep the Fastwork URL empty until an approved profile URL
 * exists — the page renders it as a visibly inactive placeholder while empty.
 */
export const contact = {
  githubUrl: "https://github.com/adulsaa-q",
  /** Split so the address is not a plain-text `mailto:` string in the HTML source. */
  emailUser: "adulsaa.q",
  emailDomain: "gmail.com",
  /** Set to an approved Fastwork profile URL to activate the link. */
  fastworkUrl: "https://fastwork.co/user/adulsaa.q",
  /** Timezone Q works from, for scheduling expectations. */
  timezone: "Asia/Bangkok (GMT+7)",
} as const;

export const contactEmail = `${contact.emailUser}@${contact.emailDomain}`;
