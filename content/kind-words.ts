/**
 * Endorsements, as screenshots of the original.
 *
 * Screenshots rather than retyped quotes, deliberately: a pull-quote in the
 * site's own typeface is indistinguishable from one somebody made up, whereas
 * a LinkedIn card shows the face, the name and the platform chrome. It is the
 * difference between a claim and evidence.
 *
 * `alt` is a verbatim transcription of the screenshot. That is what a screen
 * reader gets and what search indexes, so it has to be the actual words —
 * never a summary, and never anything the author did not write.
 *
 * Images live in public/kind-words/. An entry whose file is missing is dropped
 * at build time by lib/kind-words.ts rather than rendering as a broken image,
 * so an entry can be written before its screenshot has been saved.
 */

export type KindWordSource = 'LinkedIn' | 'Slack' | 'PR review' | 'Performance review'

export type KindWord = {
  id: string
  /** Path under /public. Dimensions are read from the file at build time. */
  image: string
  /** Who wrote it. An unattributed endorsement is worth nothing. */
  name: string
  /** Their role, as it appears in the screenshot. */
  title: string
  /** How they know the work. */
  relationship: string
  date: string
  source: KindWordSource
  /** Verbatim transcription of the screenshot. */
  alt: string
}

export const kindWords: KindWord[] = [
  {
    id: 'bikash-das',
    image: '/kind-words/linkedin-bikash-das.png',
    name: 'Bikash Das',
    title: 'Senior Software Engineer @Procore',
    relationship: 'His frontend team lead at Virtual Internships',
    date: 'June 2026',
    source: 'LinkedIn',
    alt: 'LinkedIn recommendation from Bikash Das, Senior Software Engineer at Procore: “I had the opportunity to work closely with Prajwal at Virtual Internships as his frontend team lead. He consistently demonstrated strong technical skills, ownership, and a commitment to building high quality user experiences. Prajwal has a great ability to turn complex requirements into clean, intuitive, and maintainable frontend solutions. He is detail oriented, dependable, and always willing to take on challenges while delivering quality work on time. Beyond his technical expertise, he is collaborative, receptive to feedback, and a supportive teammate who contributes positively to the team environment. I highly recommend Prajwal to any organization looking for a skilled frontend engineer with a strong work ethic, growth mindset, and user first approach.”',
  },
  {
    id: 'hardik-singh',
    image: '/kind-words/linkedin-hardik-singh.png',
    name: 'Hardik Singh',
    title: 'Associate Software Engineer @Virtual Internships',
    relationship: 'Mentored by Prajwal',
    date: 'March 2026',
    source: 'LinkedIn',
    alt: 'LinkedIn recommendation from Hardik Singh, Associate Software Engineer at Virtual Internships: “I had the pleasure of working with Prajwal during my time at Virtual Internships, where he was my mentor. His guidance played a significant role in my learning journey, and I truly appreciated his ability to break down complex concepts into simple, actionable insights. What stood out the most was his approachable and supportive nature — he was always willing to help, provide constructive feedback, and encourage independent thinking. His mentorship not only helped me strengthen my technical skills but also boosted my confidence in tackling challenges. I’m genuinely grateful for the opportunity to learn from him and would highly recommend Prajwal for his expertise and exceptional mentorship skills.”',
  },
  {
    id: 'saniya-shaikh',
    image: '/kind-words/linkedin-saniya-shaikh.png',
    name: 'Saniya Shaikh',
    title: 'Senior Specialist (SDET) @QualityAI',
    relationship: 'QA on the same team',
    date: 'August 2025',
    source: 'LinkedIn',
    alt: 'LinkedIn recommendation from Saniya Shaikh, Senior Specialist (SDET) at QualityAI: “I worked closely with Prajwal and released multiple features together. A rare quality I truly value in developers is their ability to not only own the features they develop but also care deeply about the user experience, rather than just meeting coding standards. Prajwal is one of those developers I genuinely enjoyed working with and he is highly dedicated to the work he owns, fast, diligent, friendly and fun to collaborate with.”',
  },
  {
    id: 'vishwanath-telsang',
    image: '/kind-words/linkedin-vishwanath-telsang.png',
    name: 'Vishwanath Telsang',
    title: 'Engineering @ Deel · Ex-Virtual Internships',
    relationship: 'Same team at Virtual Internships',
    date: 'September 2024',
    source: 'LinkedIn',
    alt: 'LinkedIn recommendation from Vishwanath Telsang, Engineering at Deel: “I had the pleasure of working with Prajwal at Virtual Internships, and I can confidently say that he is an exceptional frontend developer. Prajwal consistently demonstrates a deep sense of empathy when creating user interfaces, always keeping the end user’s experience in mind. His attention to detail ensures that every feature is clean, intuitive, and most importantly, free from bugs. One of his standout qualities is his eagerness to learn. Whether it’s tackling a challenging bug or refining complex features, Prajwal is incredibly reliable and always delivers high-quality results on time. I highly recommend Prajwal to any team looking for a dedicated, skilled, and growth-oriented frontend developer. He’s a valuable asset to any project!”',
  },
  {
    id: 'vinayak-singh',
    image: '/kind-words/linkedin-vinayak-singh.png',
    name: 'Vinayak Singh',
    title: 'DevSecOps · Cloud · Infrastructure Engineer',
    relationship: 'Same team at Virtual Internships',
    date: 'May 2024',
    source: 'LinkedIn',
    alt: 'LinkedIn recommendation from Vinayak Singh, DevSecOps and Infrastructure Engineer: “I have enjoyed collaborating with Prajwal at Virtual Internships on Creating 0 to 1 Product. He is a top-tier front-end developer, proficient in React and responsive design. Prajwal consistently delivered high-quality code, translating complex requirements into elegant solutions, all while ensuring thorough Dev Testing. He also supported fellow developers and drove process improvements. I highly recommend him for his technical prowess, collaborative spirit, and dedication to excellence.”',
  },

  {
    // Corroborates the "rebuilt PR review" line on /work.
    id: 'slack-pr-review',
    image: '/kind-words/slack-pr-review.png',
    name: 'Nitin',
    title: 'VP, Engineering @ Virtual Internships',
    relationship: 'Posted to the whole channel',
    date: 'April 2024',
    source: 'Slack',
    alt: 'Slack message from Nitin to the channel: “Appreciation for @Prajwal for raising the bar of quality of PR review.”',
  },
  {
    id: 'slack-qa-depth',
    image: '/kind-words/slack-qa-depth.png',
    name: 'Nitin',
    title: 'VP, Engineering @ Virtual Internships',
    relationship: 'On a review thread',
    date: 'April 2024',
    source: 'Slack',
    alt: 'Slack message from Nitin: “Wow. @Prajwal strong appreciation for the depth of your QA.”',
  },
  {
    // Corroborates the incident-response line on /work.
    id: 'slack-ownership',
    image: '/kind-words/slack-ownership.png',
    name: 'Nitin',
    title: 'VP, Engineering @ Virtual Internships',
    relationship: 'After a production incident',
    date: 'January 2025',
    source: 'Slack',
    alt: 'Slack message from Nitin: “A shoutout to @Prajwal and @Kamal Rohilla for setting high standards of ownership and urgency. Thank you.”',
  },
  {
    id: 'slack-ai',
    image: '/kind-words/slack-ai.png',
    name: 'Nitin',
    title: 'VP, Engineering @ Virtual Internships',
    relationship: 'On the AI-assisted development work',
    date: '2025',
    source: 'Slack',
    alt: 'Slack message from Nitin: “Want to appreciate the effort you’re putting in AI. I promise this will be 10x meaningful for your career as well.”',
  },
]

/** Interns mentored — from the résumé, not derivable from this file. */
export const INTERNS_MENTORED = 2
