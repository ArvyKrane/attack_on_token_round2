// useChaos.ts — Zustand global chaos store
// Tracks: aura points, click count, unlocked pranks, surrender state

import { create } from 'zustand';

export interface ChaosState {
  // Aura — only goes down
  aura: number; // 0–100
  drainAura: (amount?: number) => void;

  // Click counter
  clickCount: number;
  incrementClicks: () => void;

  // Unlocked pranks
  fakeErrors: number; // count of active error dialogs
  spawnFakeError: () => void;
  closeFakeError: () => void;

  bsodVisible: boolean;
  showBsod: () => void;
  hideBsod: () => void;

  captchaVisible: boolean;
  showCaptcha: () => void;
  hideCaptcha: () => void;

  chatOpen: boolean;
  toggleChat: () => void;

  scrollInverted: boolean;
  invertScroll: () => void;

  visitorPopupVisible: boolean;
  showVisitorPopup: () => void;
  hideVisitorPopup: () => void;

  // P2 / stretch
  godMode: boolean;
  activateGodMode: () => void;

  wastedVisible: boolean;
  showWasted: () => void;
  hideWasted: () => void;

  emergencyMeetingVisible: boolean;
  showEmergencyMeeting: () => void;
  hideEmergencyMeeting: () => void;

  // Surrender — ends all pranks
  surrendered: boolean;
  surrender: () => void;

  // Dark Souls DIED screen
  diedVisible: boolean;
  showDied: () => void;
  hideDied: () => void;

  // Cookie banner
  cookieBannerVisible: boolean;
  hideCookieBanner: () => void;

  // Rickroll
  rickrollVisible: boolean;
  showRickroll: () => void;
  hideRickroll: () => void;

  // Emoji rain
  emojiRainActive: boolean;
  triggerEmojiRain: () => void;
  stopEmojiRain: () => void;
}

export const useChaos = create<ChaosState>((set, get) => ({
  aura: 100,
  drainAura: (amount = 5) => {
    if (get().surrendered) return;
    const next = Math.max(0, get().aura - amount);
    set({ aura: next });
    if (next === 0 && !get().diedVisible) {
      set({ diedVisible: true });
    }
  },

  clickCount: 0,
  incrementClicks: () => {
    const next = get().clickCount + 1;
    set({ clickCount: next });
    // Drain aura per click
    get().drainAura(3);
    // Trigger emoji rain after 5 clicks
    if (next === 5) get().triggerEmojiRain();
    // Spawn a fake error dialog randomly
    if (next > 3 && Math.random() < 0.25) get().spawnFakeError();
    // Show visitor popup after 8 clicks
    if (next === 8) get().showVisitorPopup();
  },

  fakeErrors: 0,
  spawnFakeError: () => set(s => ({ fakeErrors: s.fakeErrors + 1 })),
  closeFakeError: () => {
    const cur = get().fakeErrors;
    if (cur > 0) {
      // Closing spawns 2 more
      set({ fakeErrors: cur - 1 + 2 });
    }
  },

  bsodVisible: false,
  showBsod: () => set({ bsodVisible: true }),
  hideBsod: () => set({ bsodVisible: false }),

  captchaVisible: false,
  showCaptcha: () => set({ captchaVisible: true }),
  hideCaptcha: () => set({ captchaVisible: false }),

  chatOpen: false,
  toggleChat: () => set(s => ({ chatOpen: !s.chatOpen })),

  scrollInverted: false,
  invertScroll: () => {
    if (get().surrendered) return;
    set({ scrollInverted: true });
    setTimeout(() => set({ scrollInverted: false }), 3000);
  },

  visitorPopupVisible: false,
  showVisitorPopup: () => set({ visitorPopupVisible: true }),
  hideVisitorPopup: () => set({ visitorPopupVisible: false }),

  godMode: false,
  activateGodMode: () => set({ godMode: true }),

  wastedVisible: false,
  showWasted: () => set({ wastedVisible: true }),
  hideWasted: () => setTimeout(() => set({ wastedVisible: false }), 2500),

  emergencyMeetingVisible: false,
  showEmergencyMeeting: () => set({ emergencyMeetingVisible: true }),
  hideEmergencyMeeting: () => set({ emergencyMeetingVisible: false }),

  surrendered: false,
  surrender: () => set({
    surrendered: true,
    fakeErrors: 0,
    bsodVisible: false,
    captchaVisible: false,
    chatOpen: false,
    scrollInverted: false,
    visitorPopupVisible: false,
    wastedVisible: false,
    emergencyMeetingVisible: false,
    diedVisible: false,
    rickrollVisible: false,
    emojiRainActive: false,
    cookieBannerVisible: false,
  }),

  diedVisible: false,
  showDied: () => set({ diedVisible: true }),
  hideDied: () => {
    // Respawn: restore aura to 30
    set({ diedVisible: false, aura: 30 });
  },

  cookieBannerVisible: true,
  hideCookieBanner: () => set({ cookieBannerVisible: false }),

  rickrollVisible: false,
  showRickroll: () => set({ rickrollVisible: true }),
  hideRickroll: () => set({ rickrollVisible: false }),

  emojiRainActive: false,
  triggerEmojiRain: () => {
    set({ emojiRainActive: true });
    setTimeout(() => set({ emojiRainActive: false }), 4000);
  },
  stopEmojiRain: () => set({ emojiRainActive: false }),
}));
