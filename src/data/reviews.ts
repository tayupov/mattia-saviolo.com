// Reviews — real, consented quotes from the artists named (Veerus, Teenage
// Mutants, Alex Lentini, Stomp Boxx). Used by ReviewsCarousel (client) and by
// the Sentinella page's Product review/aggregateRating structured data
// (server) — kept here, outside any "use client" module, so both can import
// the actual array instead of a client reference proxy.
// TODO: the "Beatport #1s" achievement line is still unverified — confirm
// before launch.
export type Review = {
  quote: string;
  name: string;
  labels: string;
  achievement?: string;
  avatar?: string;
  rating: number;
};

export const REVIEWS: Review[] = [
  {
    quote:
      "Finally a reference tool that's built for techno, not the whole EDM spectrum.",
    name: "Veerus",
    labels: "Drumcode, Terminal M, Filth on Acid",
    achievement: "Multiple Beatport #1 Releases",
    avatar: "/testimonials/veerus.jpg",
    rating: 5,
  },
  {
    quote:
      "Cuts my back-and-forth between mixdown and reference tracks in half — the low end finally translates.",
    name: "Teenage Mutants",
    labels: "Get Physical, Kittball, Stil vor Talent",
    achievement: "Multiple Beatport #1 Releases",
    avatar: "/testimonials/teenage-mutants.jpg",
    rating: 5,
  },
  {
    quote:
      "The tonal balance view alone saved us a trip back to the studio before mastering.",
    name: "Alex Lentini",
    labels: "Drumcode, Unrilis, Hypnostate",
    achievement: "Multiple Beatport #1 Releases",
    avatar: "/testimonials/alex-lentini.jpg",
    rating: 5,
  },
  {
    quote:
      "Leave it open the whole session and you stop second-guessing the low end.",
    name: "Stomp Boxx",
    labels: "Drumcode, Unrilis, Hypnostate",
    achievement: "Multiple Beatport #1 Releases",
    avatar: "/testimonials/stomp-boxx.jpg",
    rating: 5,
  },
];
