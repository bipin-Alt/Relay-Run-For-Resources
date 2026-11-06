import Link from "next/link";
import { 
  Server, 
  Printer, 
  Laptop, 
  Wifi, 
  Wrench, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  CheckCircle2
} from "lucide-react";

// Resource items reflecting your hardware and facility infrastructure
// These Resource Categories and description are temporary i will set up these on real time once i implement backend and websockets//
const resourceCategories = [
  {
    title: "High-Performance Servers",
    description: "Dedicated server racks and cloud nodes configured for heavy compilation, distributed network workloads, and backend testing.",
    icon: Server,
    availability: "4 Racks Available",
    status: "online",
    specs: ["Multi-core Xeon / EPYC", "64GB+ ECC RAM", "Gigabit Uplink"],
  },
  {
    title: "3D Printers & Prototyping",
    description: "High-precision FDM and resin 3D printers for rapid hardware enclosure prototyping and physical structure fabrication.",
    icon: Printer,
    availability: "2 Units Ready",
    status: "online",
    specs: ["PLA/ABS/Resin support", "0.05mm layer precision", "Remote queue system"],
  },
  {
    title: "PCB & Electronic Workbenches",
    description: "Fully equipped soldering stations, oscilloscopes, and PCB milling machines for circuit design and hardware debugging.",
    icon: Wrench,
    availability: "6 Stations Open",
    status: "online",
    specs: ["Digital Storage Oscilloscope", "Precision Soldering Rigs", "DC Power Supplies"],
  },
  {
    title: "Development Laptops",
    description: "Pre-configured portable workstations equipped with standard toolchains, Docker, and full development environments.",
    icon: Laptop,
    availability: "12 Units Available",
    status: "online",
    specs: ["Linux / Windows dual boot", "16GB RAM / SSD", "Long battery life"],
  },
  {
    title: "Specialized Laboratories",
    description: "Secure, isolated lab spaces designated for advanced networking simulations, robotics testing, and hardware hacking.",
    icon: Layers,
    availability: "3 Labs Open",
    status: "limited",
    specs: ["Isolated Subnets", "Workbench seating", "Access control integration"],
  },
  {
    title: "Networking Hardware",
    description: "Switches, routers, patch panels, and wireless AP development kits for testing routing protocols and network topologies.",
    icon: Wifi,
    availability: "15 Kits Ready",
    status: "online",
    specs: ["Managed Gigabit Switches", "Wi-Fi 6 AP Units", "Crimping & Testing tools"],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Concept & Introduction Section */}
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-wide uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Infrastructure & Asset Management</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Centralized Access to <br />
            <span className="bg-linear-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Hardware & Lab Resources
            </span>
          </h1>

          <p className="text-lg text-zinc-400 leading-relaxed">
            Relay eliminates bottlenecks in physical asset allocation. Whether you need high-end compute servers, specialized lab rooms, 3D printers, or networking kits, our reservation engine handles concurrency, conflict checking, and session validation in real-time—ensuring fair access for students and researchers.
          </p>
        </div>

        {/* Resource Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-200">
              Available Inventory & Facilities
            </h2>
            <span className="text-sm text-zinc-400 font-medium">
              Live status synchronized with backend DB
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceCategories.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-amber-500/5"
                >
                  <div className="space-y-4">
                    {/* Icon & Status Header */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'online' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        {item.availability}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Specs / Tags */}
                    <div className="pt-2 border-t border-zinc-800/60">
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                        Specifications
                      </p>
                      <ul className="space-y-1.5">
                        {item.specs.map((spec, sIdx) => (
                          <li key={sIdx} className="text-xs text-zinc-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Reserve Action Button */}
                  <div className="pt-6 mt-6 border-t border-zinc-800/60 flex items-center justify-between">
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Instant Booking
                    </span>
                    <Link
                      href="/login" 
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-amber-500 text-zinc-200 hover:text-zinc-950 font-semibold text-xs transition-all flex items-center gap-1.5 group/btn shadow-md"
                    >
                      Reserve
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}