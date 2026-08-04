import Image from "next/image";

// label-strip.png is 10125x843. Row 1 (Drumcode, NINETOZERO, Kraftek) and
// row 2 (Volta, factory93, Tronic) are cropped tight to their actual content
// bounds (not the raw split point) so the source image's uneven side margins
// don't throw off centering in the mobile two-row layout below.
const FULL_WIDTH = 10125;
const FULL_HEIGHT = 843;
const ROW_1_BOUNDS = { start: 770, end: 5860 };
const ROW_2_BOUNDS = { start: 6148, end: 9382 };

const ROW_HEIGHT = 56; // px, mobile rows only — both rows share this height so logos render at the same size
const SCALE = ROW_HEIGHT / FULL_HEIGHT;
const RENDERED_WIDTH = FULL_WIDTH * SCALE;
const ROW_1_WIDTH = (ROW_1_BOUNDS.end - ROW_1_BOUNDS.start) * SCALE;
const ROW_2_WIDTH = (ROW_2_BOUNDS.end - ROW_2_BOUNDS.start) * SCALE;
const ROW_1_OFFSET = ROW_1_BOUNDS.start * SCALE;
const ROW_2_OFFSET = ROW_2_BOUNDS.start * SCALE;

export function LabelStrip() {
  return (
    <section className="px-4 pb-10 sm:px-12 sm:pt-0 sm:pb-10">
      {/* Mobile: split into two rows of equal height so each logo is legible at a glance */}
      <div
        className="flex flex-col items-center gap-4 sm:hidden"
        role="img"
        aria-label="Releases on Drumcode, NINETOZERO, Kraftek, Volta, Factory93, Tronic"
      >
        <div
          className="overflow-hidden"
          style={{ height: ROW_HEIGHT, width: ROW_1_WIDTH }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/label-strip.png"
            alt=""
            aria-hidden="true"
            style={{
              height: ROW_HEIGHT,
              width: RENDERED_WIDTH,
              maxWidth: "none",
              marginLeft: -ROW_1_OFFSET,
            }}
          />
        </div>
        <div
          className="overflow-hidden"
          style={{ height: ROW_HEIGHT, width: ROW_2_WIDTH }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/label-strip.png"
            alt=""
            aria-hidden="true"
            style={{
              height: ROW_HEIGHT,
              width: RENDERED_WIDTH,
              maxWidth: "none",
              marginLeft: -ROW_2_OFFSET,
            }}
          />
        </div>
      </div>

      {/* sm and up: original single-row strip */}
      <Image
        src="/brand/label-strip.png"
        alt="Releases on Drumcode, NINETOZERO, Kraftek, Volta, Factory93, Tronic"
        width={2000}
        height={166}
        className="hidden w-full sm:block"
      />
    </section>
  );
}
