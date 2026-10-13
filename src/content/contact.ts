/**
 * Contact routes.
 */
export const contact = {
  githubUrl: "https://github.com/adulsaa-q",
  linkedinUrl: "https://www.linkedin.com/in/adulsaa",
  /** One address shared by every public contact link. */
  emailUser: "adulsaa.q",
  emailDomain: "gmail.com",
  /** Timezone Q works from, for scheduling expectations. */
  timezone: "Asia/Bangkok (GMT+7)",
} as const;

export const contactEmail = `${contact.emailUser}@${contact.emailDomain}`;
