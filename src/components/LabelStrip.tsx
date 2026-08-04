import Image from "next/image";

export function LabelStrip() {
  return (
    <section className="px-6 py-10 sm:px-12">
      <Image
        src="/brand/label-strip.png"
        alt="Releases on Drumcode, NINETOZERO, Kraftek, Factory93, Tronic"
        width={2000}
        height={166}
        className="w-full"
      />
    </section>
  );
}
