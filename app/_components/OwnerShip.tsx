import ownershipImg from "@/img/ownership.jpg";
const stats = [
  { value: "90+", label: "World-Class Resorts & Properties" },
  { value: "55", label: "Global Destinations" },
  { value: "3,000+", label: "Interval International® Resorts" },
  { value: "4,000+", label: "Unique Experiences" },
];

const StatCard = ({ value, label }: any) => (
  <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 hover:scale-105 transition-transform text-center">
    <p className="text-4xl sm:text-5xl font-extrabold text-[#C6AC5E] mb-2">
      {value}
    </p>
    <p className="text-gray-200 text-md sm:text-lg">{label}</p>
    {/* Floating glow effect */}
    <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#C6AC5E]/30 rounded-full blur-2xl pointer-events-none"></div>
  </div>
);

const StatisticsGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 relative z-10">
    {stats.map((stat) => (
      <StatCard key={stat.value} value={stat.value} label={stat.label} />
    ))}
  </div>
);

const Ownership = () => (
  <section
    id="ownership"
    className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden"
  >
    {/* Background gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-darkBlue via-lightgray to-lightGray pointer-events-none"></div>

    <div className="max-w-7xl mx-auto relative z-20">
      {/* Heading */}
      <h2 className="text-center text-5xl sm:text-6xl font-extrabold text-white mb-24 tracking-tight">
        Ownership
      </h2>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Image left */}
        <div className="lg:w-1/2 relative">
          <div
            className="w-full h-96 sm:h-[28rem] rounded-tr-[5rem] rounded-bl-[5rem] overflow-hidden shadow-2xl border-4 border-white ring-4 ring-[#C6AC5E]/20 transform hover:scale-105 transition-transform duration-500"
            style={{
              backgroundImage: `url(${ownershipImg.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        {/* Text right */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white pb-3 inline-block border-b-4 border-[#C6AC5E]">
            MORE THAN A VACATION
          </h2>
          <p className="mt-6 text-gray-300 text-lg sm:text-xl max-w-lg leading-relaxed">
            Create the moments that matter most.{" "}
            <strong>Timeshare ownership </strong>
            gives you dedicated time for extraordinary vacations with loved
            ones. Captivating destinations, luxury accommodations, and curated
            experiences — all with one of the most admired names in hospitality.
          </p>
          <button className="mt-8 px-12 py-3 rounded-full bg-gradient-to-r from-[#C6AC5E] to-yellow-400 text-gray-900 font-semibold shadow-lg hover:scale-105 transition-transform">
            See Resorts
          </button>
        </div>
      </div>

      {/* Stats */}
      <StatisticsGrid />
    </div>

    {/* Decorative shapes */}
    <div className="absolute top-10 left-1/4 w-[25rem] h-[25rem] bg-[#C6AC5E]/10 rounded-full blur-3xl pointer-events-none"></div>
    <div className="absolute bottom-20 right-1/4 w-[20rem] h-[20rem] bg-[#C6AC5E]/20 rounded-full blur-3xl pointer-events-none"></div>
  </section>
);

export default Ownership;
