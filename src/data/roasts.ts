// roasts.ts — 60+ roast lines in 4 categories
// No slurs, no identity-based insults. Skill, vibes, gaming, choices only.
// Randomizes without repeating the last 5.

export type RoastCategory = 'gaming' | 'brainrot' | 'fake-corporate' | 'fake-motivational' | 'passive-aggressive';

export interface Roast {
  text: string;
  category: RoastCategory;
}

export const roasts: Roast[] = [
  // --- gaming ---
  { text: 'skill issue', category: 'gaming' },
  { text: 'L + ratio + bozo', category: 'gaming' },
  { text: 'touch grass immediately', category: 'gaming' },
  { text: 'you are an NPC in someone else\'s playthrough', category: 'gaming' },
  { text: 'your aura is −10,000', category: 'gaming' },
  { text: 'certified bronze lobby behavior', category: 'gaming' },
  { text: 'you would feed in ranked', category: 'gaming' },
  { text: 'WASTED — try again', category: 'gaming' },
  { text: 'bro thinks he\'s him 💀', category: 'gaming' },
  { text: 'git gud or go home', category: 'gaming' },
  { text: 'you have negative K/D in real life', category: 'gaming' },
  { text: 'zero damage output detected', category: 'gaming' },
  { text: 'bro pulled a no scope and missed the floor', category: 'gaming' },
  { text: 'respawning in 10… 9… still a bot', category: 'gaming' },
  { text: 'you would get Fanum-taxed at character select', category: 'gaming' },

  // --- brainrot ---
  { text: 'mid', category: 'brainrot' },
  { text: 'it\'s giving unemployed', category: 'brainrot' },
  { text: 'delulu with no solulu', category: 'brainrot' },
  { text: 'bro is cooked', category: 'brainrot' },
  { text: 'certified Ohio resident', category: 'brainrot' },
  { text: 'no cap this is a flop era', category: 'brainrot' },
  { text: 'skibidi energy detected 📡', category: 'brainrot' },
  { text: 'bro doesn\'t have sigma rizz', category: 'brainrot' },
  { text: 'NPC behaviour off the charts', category: 'brainrot' },
  { text: 'ratio incoming in 3… 2… 1…', category: 'brainrot' },
  { text: 'the gyatt dropped to 0 after that move', category: 'brainrot' },
  { text: 'this is your villain origin story and it\'s underwhelming', category: 'brainrot' },
  { text: 'you are the plot device, not the protagonist', category: 'brainrot' },
  { text: 'bro manifested a L', category: 'brainrot' },
  { text: 'the brainrot is strong with this one', category: 'brainrot' },

  // --- fake-corporate ---
  { text: 'your KPIs indicate a 97% reduction in value', category: 'fake-corporate' },
  { text: 'we are proceeding with your vibe deletion', category: 'fake-corporate' },
  { text: 'your synergy is not aligned with our chaos metrics', category: 'fake-corporate' },
  { text: 'per my last email, you are a bot', category: 'fake-corporate' },
  { text: 'your Q4 rizz report shows declining numbers', category: 'fake-corporate' },
  { text: 'we have decided to move forward with other candidates (everyone else)', category: 'fake-corporate' },
  { text: 'your aura points have been liquidated. HR will be in touch.', category: 'fake-corporate' },
  { text: 'please see the attached invoice for Fanum tax owed', category: 'fake-corporate' },
  { text: 'your performance review: needs improvement (in everything)', category: 'fake-corporate' },
  { text: 'your Slack status is permanently set to "in a meeting with the L"', category: 'fake-corporate' },

  // --- fake-motivational ---
  { text: 'every failure is a learning opportunity — and you are a learning opportunity', category: 'fake-motivational' },
  { text: 'you are one in a million — of NPCs', category: 'fake-motivational' },
  { text: 'believe in yourself (I cannot do this for you, I have seen your gameplay)', category: 'fake-motivational' },
  { text: 'the grindset continues, unfortunately', category: 'fake-motivational' },
  { text: 'you are the main character — of a loading screen', category: 'fake-motivational' },
  { text: 'hustle harder. Or just touch grass. Preferably both.', category: 'fake-motivational' },
  { text: 'sigma rule #404: sigma not found', category: 'fake-motivational' },
  { text: 'your arc is still loading (it is taking a while)', category: 'fake-motivational' },

  // --- passive-aggressive ---
  { text: 'interesting choice. A bad one, but interesting.', category: 'passive-aggressive' },
  { text: 'you tried and that is what matters (it did not matter)', category: 'passive-aggressive' },
  { text: 'nah you\'re not worthy', category: 'passive-aggressive' },
  { text: 'respectfully, what was that?', category: 'passive-aggressive' },
  { text: 'I did not say anything. I do not need to.', category: 'passive-aggressive' },
  { text: 'bold of you to assume that counted', category: 'passive-aggressive' },
  { text: 'noted. Moving on.', category: 'passive-aggressive' },
  { text: 'mission failed — we\'ll get \'em next time', category: 'passive-aggressive' },
  { text: 'bruh.', category: 'passive-aggressive' },
  { text: 'I rate that a solid 2/10. And I am being generous.', category: 'passive-aggressive' },
];

const recentIndices: number[] = [];

export function getRandomRoast(): Roast {
  const available = roasts
    .map((_r, i) => i)
    .filter(i => !recentIndices.includes(i));

  const pick = available[Math.floor(Math.random() * available.length)];
  recentIndices.push(pick);
  if (recentIndices.length > 5) recentIndices.shift();
  return roasts[pick];
}

export function getRoastsByCategory(cat: RoastCategory): Roast[] {
  return roasts.filter(r => r.category === cat);
}
