import type { TTOInstitution } from "@/lib/types/signals";

// Eight European universities with verifiable energy-tech strength and a
// public spinout programme. Data restricted to publicly disclosable facts;
// contact details left empty where they are not public, per PRD P1-10.
export const ttoInstitutions: TTOInstitution[] = [
  {
    slug: "tu-delft",
    name: "TU Delft",
    city: "Delft",
    country: "NL",
    spinout_programme_name: "YES!Delft",
    programme_url: "https://www.yesdelft.com/",
    energy_focus_description:
      "Strong in electrochemistry, grid-edge software, and offshore energy; major source of Dutch energy spinouts since 2020 via the YES!Delft programme.",
    recent_spinouts: ["Hexwise", "Ore Energy", "Battolyser Systems"],
    active_opportunities: 3,
  },
  {
    slug: "tue-eindhoven",
    name: "TU Eindhoven",
    city: "Eindhoven",
    country: "NL",
    spinout_programme_name: "TU/e Innovation Lab",
    programme_url:
      "https://www.tue.nl/en/research/innovation-and-entrepreneurship/",
    energy_focus_description:
      "Leading European centre for power-electronics, photovoltaics, and e-mobility research; spin-out pipeline is heavy on energy materials and smart-charging hardware.",
    recent_spinouts: ["Carbyon", "LeydenJar Technologies"],
    active_opportunities: 2,
  },
  {
    slug: "wageningen",
    name: "Wageningen University & Research",
    city: "Wageningen",
    country: "NL",
    spinout_programme_name: "StartLife",
    programme_url: "https://www.startlife.nl/",
    energy_focus_description:
      "Bridges agrifood and energy through bioenergy, biorefinery and food-energy-water nexus research; StartLife supports spin-outs combining biological and industrial decarbonisation.",
    recent_spinouts: ["Skytree"],
    active_opportunities: 1,
  },
  {
    slug: "rwth-aachen",
    name: "RWTH Aachen",
    city: "Aachen",
    country: "DE",
    spinout_programme_name: "RWTH Innovation / GATEWAY",
    programme_url: "https://www.rwth-innovation.de/en",
    energy_focus_description:
      "Germany's deepest pool of energy-transition engineering research; strong in power-electronics, hydrogen, and industrial decarbonisation with active GATEWAY spin-out pipeline.",
    recent_spinouts: [],
    active_opportunities: 2,
  },
  {
    slug: "tu-berlin",
    name: "TU Berlin",
    city: "Berlin",
    country: "DE",
    spinout_programme_name: "Centre for Entrepreneurship",
    programme_url: "https://www.entrepreneurship.tu-berlin.de/",
    energy_focus_description:
      "Distinctive strength in urban energy systems, smart-grid software, and green-hydrogen electrolyser research; works closely with Berlin's rapidly growing climate-tech ecosystem.",
    recent_spinouts: [],
    active_opportunities: 1,
  },
  {
    slug: "eth-zurich",
    name: "ETH Zurich",
    city: "Zurich",
    country: "CH",
    spinout_programme_name: "ETH Pioneer Fellowship",
    programme_url: "https://ethz.ch/en/research/innovation-and-entrepreneurship.html",
    energy_focus_description:
      "World-class research in solid-oxide fuel cells, thermal storage, and grid-scale optimisation; Pioneer Fellowship is the primary conduit for energy-tech spin-outs.",
    recent_spinouts: ["Climeworks", "Synhelion"],
    active_opportunities: 3,
  },
  {
    slug: "kth",
    name: "KTH Royal Institute of Technology",
    city: "Stockholm",
    country: "SE",
    spinout_programme_name: "KTH Innovation",
    programme_url: "https://www.kth.se/en/innovation",
    energy_focus_description:
      "Deep expertise in power systems, industrial electrification, and battery materials; KTH Innovation manages a growing portfolio of Nordic energy spin-outs.",
    recent_spinouts: [],
    active_opportunities: 1,
  },
  {
    slug: "epfl",
    name: "EPFL",
    city: "Lausanne",
    country: "CH",
    spinout_programme_name: "EPFL Innovation Park",
    programme_url: "https://www.epfl.ch/innovation/",
    energy_focus_description:
      "Strength in photovoltaics, energy materials, and optimal power flow research; EPFL Innovation Park hosts a dense cluster of energy-tech and materials start-ups.",
    recent_spinouts: [],
    active_opportunities: 2,
  },
];
