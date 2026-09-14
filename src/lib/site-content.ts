export const siteContent = {
  settings: {
    company: "Friscon Tech Limited",
    phone: "+2348032461305",
    email: "hello@friscontech.com",
    address: "Block 1, Flat P, Croxley Place, Adam Prescott Flats, Cadogan Place Estate, Jakande, Lagos, Nigeria",
    heroTitle: "Your Bridge to the Nigerian Market.",
    heroIntro:
      "We help international companies and development partners build the relationships, insight and local momentum to succeed in Nigeria.",
  },
  services: [
    { number: "01", title: "Market Entry Strategy", description: "Turn ambition into an informed, executable Nigeria market plan.", detail: "We combine local intelligence, commercial analysis and practical sequencing to help new entrants make confident decisions from day one." },
    { number: "02", title: "Stakeholder & Government Relations", description: "Navigate the institutions and relationships that shape progress.", detail: "Our team builds credible engagement strategies across government, communities, industry bodies and development partners." },
    { number: "03", title: "Partnership Facilitation", description: "Find the right local partners and make collaboration work.", detail: "From first introduction to working model, we help clients identify aligned partners and create the conditions for durable value." },
    { number: "04", title: "Agricultural Value Chains", description: "Build inclusive, investable systems from farm to market.", detail: "We support organic fertiliser distribution, smallholder aggregation and programmes that grow farmer income and resilience." },
    { number: "05", title: "Market Research & Analysis", description: "See the opportunity clearly before you commit resources.", detail: "Our research turns complex local markets into a sharp view of competition, demand, risk and the next best move." },
  ],
  stats: [
    { value: "2013", label: "Founded in Nigeria" },
    { value: "12+", label: "Years of local insight" },
    { value: "05", label: "Core practice areas" },
  ],
  milestones: [
    { year: "2013", title: "Friscon Tech begins", text: "Founded to help ambitious organisations work with Nigeria, not around it." },
    { year: "2017", title: "Agriculture practice grows", text: "Expanded into value-chain programmes connecting partners, growers and markets." },
    { year: "2021", title: "New partnerships, wider reach", text: "Built a broader network across public, private and development sectors." },
    { year: "Today", title: "Built for what comes next", text: "Supporting the next generation of market entry and inclusive growth." },
  ],
  testimonial: {
    quote: "Friscon gave us the local clarity and trusted introductions we needed to move from a good idea to a credible Nigerian operation.",
    name: "Development partner",
    role: "Agriculture & market systems programme",
  },
  about: {
    pullQuote: "Friscon Tech Limited is an indigenous consulting company specializing in stakeholder relations, partnership building, and market entry implementation. Founded in 2013, we leverage deep local expertise to connect international companies and development partners with the vast opportunities in Nigeria.",
    whyNigeria: {
      title: "Why Nigeria matters",
      intro: "A land of opportunity: young, dynamic, and entrepreneurial.",
      body: "Nigeria is Africa's most populous country and a leading economy, offering unique and fertile ground for impactful business and development projects. Its young, dynamic population creates an entrepreneurial ecosystem unlike anywhere else on the continent.",
    },
    ourApproach: {
      title: "Our strategic approach",
      body: "Our insight is rooted in practical, on-the-ground experience. For years, we have actively engaged in the agricultural sector through the sale of organic fertilizers, aggregation of smallholder farmers, and empowerment programs. This direct involvement gives us unparalleled insight into local value chains and community dynamics. We utilize this foundational knowledge to design and implement market entry and partnership strategies that are sustainable, community-informed, and built for long-term success.",
    },
    government: {
      body: "Friscon Tech liaises with relevant statutory bodies and government agencies to facilitate smooth market entry and project expansion for our partners, contributing to the growth of the Nigerian economy.",
    },
  },
  team_members: [
    {
      id: "founder-ceo",
      name: "Chinenye O. Ketebu-Brown",
      subtitle: "(Nee Nwokoro)",
      title: "Founder & CEO",
      bio: "Chinenye founded Friscon Tech in 2013 with a vision to bridge international ambition with Nigerian reality. Her hands-on experience in agricultural development and stakeholder relations has positioned the company as a trusted partner for organizations seeking sustainable growth in Nigeria.",
      image: "/team/chinenye-brown.jpg",
    },
  ],
};

export type Service = (typeof siteContent.services)[number];
export type TeamMember = (typeof siteContent.team_members)[number];