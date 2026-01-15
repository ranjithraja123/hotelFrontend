import React from "react";
import homeved from '../../assets/images/pondicherry.jpg'


const Facilities = () => {
  return (
    <section className="w-full min-h-screen text-white bg-black/50 backdrop-blur-2xl">

      {/* ================= EDITORIAL INTRO ================= */}
      <div className="max-w-[1400px] mx-auto px-8 py-28 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* IMAGE */}
        <div className="relative">
          <img
            src={homeved}
            alt="Pondicherry"
            className="w-full h-[520px] object-cover rounded-3xl shadow-2xl"
          />
          <div className="absolute inset-0 rounded-3xl bg-black/10" />
        </div>

        {/* TEXT */}
        <div className="max-w-xl">
          <h1 className="text-5xl font-light leading-tight mb-6">
            Facilities
          </h1>

          <p className="text-lg text-neutral-300 mb-6">
            Charming Beachside Boutique Stay in Pondicherry’s Historic French Town
          </p>

          <p className="text-neutral-400 leading-relaxed">
            Welcome to <span className="text-amber-300">Hotel Continental</span> —
            a freshly renovated boutique hotel nestled in the heart of Pondicherry’s
            French Town, just steps from the Promenade.
          </p>

          <p className="mt-4 text-neutral-500">
            This is not a place with restaurant menus or car parks.
            It’s an invitation to experience Pondicherry as locals do.
          </p>
        </div>
      </div>

      {/* ================= WHY NO PARKING ================= */}
      <div className="bg-[#111] py-28">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">

          <div>
            <h2 className="text-3xl font-light mb-6">
              Why No Restaurant or Parking Is Perfect
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              Forget dining in, and forget driving.
              Our location puts you exactly where Pondicherry’s food culture lives.
            </p>
            <p className="mt-4 text-neutral-400">
              Within minutes you’ll find cafés, bistros, street food and
              French-influenced kitchens — stepping out is stepping into the city.
            </p>
          </div>

          <div className="text-neutral-400 leading-relaxed">
            <p>
              The beachfront is a 2-minute walk.
              Aurobindo Ashram, museums, galleries — all walkable.
            </p>
            <p className="mt-4">
              Autorickshaws are everywhere. Our concierge handles transfers effortlessly.
            </p>
            <p className="mt-4 text-neutral-500 italic">
              Living car-free means discovering Pondicherry, not just visiting it.
            </p>
          </div>
        </div>
      </div>

      {/* ================= ROOMS ================= */}
      <div className="py-28">
        <div className="max-w-[1100px] mx-auto px-8 text-center">
          <h2 className="text-3xl font-light mb-12">
            Rooms — Modern, Fresh & Comfortable
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Full air conditioning — essential for the coast",
              "Modern en-suite bathrooms",
              "Quality beds with fresh linen",
              "Free high-speed Wi-Fi",
              "Compact heritage-style layouts",
            ].map((item, i) => (
              <div
                key={i}
                className="border border-white/15 rounded-xl px-6 py-5 text-neutral-300"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="mt-8 text-neutral-500 italic">
            Natural light, minimal fuss, and a clean modern finish throughout.
          </p>
        </div>
      </div>

      {/* ================= FULL BLEED LOCATION ================= */}
      <div className="relative h-[70vh]">
        <img
          src={homeved}
          className="absolute inset-0 w-full h-full object-cover"
          alt="White Town"
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 h-full flex flex-col justify-center px-10 max-w-4xl">
          <h2 className="text-4xl font-light mb-6">
            French Town, Pondicherry
          </h2>
          <p className="text-neutral-300 leading-relaxed max-w-xl">
            Two minutes to the Promenade. Colonial streets.
            Galleries, cafés, local life — all at your doorstep.
          </p>
        </div>
      </div>

      {/* ================= REAL TALK ================= */}
      <div className="py-28 text-center px-8">
        <h2 className="text-3xl font-light mb-6">
          Real Talk About Us
        </h2>
        <p className="text-neutral-400 max-w-3xl mx-auto leading-relaxed">
          We’ve renovated. We’ve refreshed. We’ve listened.
          If you stayed before and it wasn’t right — give us another chance.
        </p>
        <p className="mt-4 text-neutral-500 italic">
          Honest, comfortable hospitality in the best location to experience real Pondicherry.
        </p>
      </div>

    </section>
  );
};

export default Facilities;
