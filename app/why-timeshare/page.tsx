import Link from "next/link";

export default function WhyTimeshareReplica() {
  return (
    <main className="bg-white w-full min-h-screen text-slate-800 font-sans selection:bg-[#CDAE67] selection:text-white">
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:pr-12">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-6 tracking-wide uppercase">
              Own Your Vacation Life
            </h2>

            <div className="w-12 h-1 bg-[#CDAE67] mb-8"></div>

            <p className="text-slate-600 leading-relaxed mb-6">
              The ideal vacation looks different for everyone. The vacation
              clubs include a wide range of timeshare resorts and city
              properties that meet your needs in the most desired destinations.
              With the benefits of timeshare ownership, your unique vacation
              interests are just the beginning.
            </p>
          </div>

          <div className="relative h-[400px] w-full flex items-center justify-center lg:justify-end">
            <div className="absolute top-0 right-4 lg:right-10 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop"
                alt="Couple relaxing at resort"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute bottom-0 left-4 lg:left-20 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl z-20 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop"
                alt="Child playing in pool"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/3] overflow-hidden shadow-lg rounded-sm bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
                alt="Family walking on beach"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-10 uppercase tracking-wide">
              Curious About
              <br />
              Ownership?
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-[#CDAE67] font-bold text-sm uppercase tracking-wider mb-2">
                  More Locations and Experiences
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Through our exchange program, you can choose from 10,000+
                  vacation options, all using Club Points.
                </p>
              </div>
              <div>
                <h3 className="text-[#CDAE67] font-bold text-sm uppercase tracking-wider mb-2">
                  Spacious Accommodations
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  At our timeshare ownership resorts, you can give your family
                  and friends the space to stay together comfortably in anything
                  from a studio to a three-bedroom villa.
                </p>
              </div>
              <div>
                <h3 className="text-[#CDAE67] font-bold text-sm uppercase tracking-wider mb-2">
                  Create More Moments That Matter
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Use your Club Points to travel the way you want — from
                  renewing weekend getaways to longer, larger family gatherings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-10 uppercase tracking-wide">
              More Mindful Vacations
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-[#CDAE67] font-bold text-sm uppercase tracking-wider mb-2">
                  Brands You Can Trust
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  The difference is quality. Experience premium resorts and
                  properties from some of the most distinguished names in
                  timeshare.
                </p>
              </div>
              <div>
                <h3 className="text-[#CDAE67] font-bold text-sm uppercase tracking-wider mb-2">
                  Why Buy A Timeshare?
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  People choose ownership because it makes vacationing not just
                  a possibility — but a certainty — throughout their lives.
                </p>
              </div>
              <div>
                <h3 className="text-[#CDAE67] font-bold text-sm uppercase tracking-wider mb-2">
                  Ownership That Evolves With You
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  As your vacation dreams evolve, so does your ownership.
                  Revisit favorites or discover new destinations — anything is
                  possible.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="aspect-[4/3] overflow-hidden shadow-lg rounded-sm bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop"
                alt="Luxury Resort Pool"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-3 uppercase tracking-widest text-right">
              Resort Club at Los Sueños | Herradura, Costa Rica
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/3] overflow-hidden shadow-lg rounded-sm bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop"
                alt="Couple dining at sunset"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-10 uppercase tracking-wide">
              Even More To Ownership
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-[#CDAE67] font-bold text-sm uppercase tracking-wider mb-2">
                  Vacation Smarter
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  With amenities such as a kitchen and multiple bedrooms, it's
                  easy to see the benefits of timeshare vacationing when you
                  compare renting a hotel room every year to a spacious villa.
                </p>
              </div>
              <div>
                <h3 className="text-[#CDAE67] font-bold text-sm uppercase tracking-wider mb-2">
                  Pass It On
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  The best vacations never end. Your deeded ownership allows for
                  memorable vacation moments year after year, generation after
                  generation.
                </p>
              </div>
              <div>
                <h3 className="text-[#CDAE67] font-bold text-sm uppercase tracking-wider mb-2">
                  Own Only What You Need
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Personalize your vacation ownership by choosing the number of
                  Club Points that's right for your travel needs and desires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-24 text-center flex flex-col items-center">
        <blockquote className="text-[#CDAE67] text-xl md:text-2xl font-serif italic leading-relaxed mb-8">
          "We know we've had a few friends and family that have bought in
          because of the experience that we're getting. And they want that for
          themselves as well."
        </blockquote>

        <cite className="text-slate-400 text-xs uppercase tracking-widest not-italic block mb-6">
          — Stephanie and Kevin N., Owners Since 2014
        </cite>

        <Link
          href="#"
          className="inline-block text-slate-800 text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-1 hover:text-[#CDAE67] hover:border-[#CDAE67] transition-colors mb-12"
        >
          See More Owner Stories
        </Link>

        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=800&auto=format&fit=crop"
            alt="Beach Umbrella"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}
