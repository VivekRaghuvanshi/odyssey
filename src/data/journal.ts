import type { JournalArticle } from "@/types/journal";

export const journal: JournalArticle[] = [
  {
    id: "before-the-light-changes",
    slug: "five-places-to-see-before-the-light-changes",
    title: "Five Places to See Before the Light Changes",
    excerpt:
      "Some landscapes only work at one particular hour. Here's where to be, and when, to catch them at their best.",
    category: "Photography",
    readTime: "4 min read",
    publishedAt: "2026-07-02",
    destinationSlugs: ["iceland", "morocco", "switzerland", "japan", "australia"],
    body: [
      "There's a version of every landscape that only exists for a few minutes a day. The rest of the time it's simply scenery — pleasant, photographable, forgettable. But catch it at the right hour and the same view becomes something you remember for the rest of your life.",
      "In Iceland, that hour arrives sideways, low and gold across the glacial lagoon at Jökulsárlón, turning the icebergs the color of the inside of a shell. In the high Atlas foothills outside Marrakech, it's the twenty minutes after the call to prayer, when the kasbahs stop looking like postcards and start looking like they're on fire.",
      "The Matterhorn does something similar at first light — a brief, improbable pink that has nothing to do with the mountain's usual gray severity. Kyoto's bamboo groves need almost no light at all; the effect is in the shafts that do get through, and the stillness around them.",
      "And in the outback, the reward is patience: waiting past sunset until the sky goes fully dark, revealing a version of the night sky most of the world hasn't seen in a generation.",
      "None of these moments last long. All of them are worth building a schedule around.",
    ],
  },
  {
    id: "slowest-way-through-japan",
    slug: "the-slowest-way-to-see-japan",
    title: "The Slowest Way to See Japan",
    excerpt:
      "Skip the bullet train once. What you find on the local lines is a different country entirely.",
    category: "Culture",
    readTime: "6 min read",
    publishedAt: "2026-06-14",
    destinationSlugs: ["japan"],
    body: [
      "The Shinkansen is one of the great engineering achievements of the twentieth century, and it will get you from Tokyo to Kyoto in a little over two hours. It will also show you almost nothing.",
      "Take a local line instead — the kind that stops at stations with one platform and no gate — and the country changes pace with you. Rice paddies replace suburbs. Vending machines appear in front of houses with no other business nearby. An elderly conductor punches your ticket by hand and tells you, in gestures, which side of the train to sit on for the view.",
      "This is the Japan that doesn't make it into the postcards from Shibuya: small mountain towns where the onsen closes for two hours in the afternoon because that's when the owner naps, family-run soba shops with a four-item menu perfected over three generations, shrines with no other visitors and no less reverence for it.",
      "You'll arrive later. You'll also arrive having actually seen the country you traveled to see.",
    ],
  },
  {
    id: "chasing-aurora",
    slug: "chasing-aurora-a-guide-to-the-polar-night",
    title: "Chasing Aurora: A Guide to the Polar Night",
    excerpt:
      "The lights don't perform on a schedule. Here's how to give yourself the best odds anyway.",
    category: "Nature",
    readTime: "5 min read",
    publishedAt: "2026-05-28",
    destinationSlugs: ["iceland", "norway"],
    body: [
      "Nobody can promise you the aurora. Solar activity, cloud cover, and geomagnetic timing all have to align, and none of them care about your itinerary. What you can control is where you stand and how long you're willing to wait.",
      "Tromsø, well inside the Arctic Circle, gives you the best statistical odds in Norway — dark, clear, and positioned directly under the auroral oval most winter nights. Iceland's advantage is different: fewer good viewing nights, but when it happens, the display sits low and bright over volcanic terrain that looks otherworldly even without it.",
      "The practical advice is unglamorous: dress for an hour of standing still in subzero wind, get at least twenty minutes from any town's light pollution, and stop checking your phone's aurora forecast app every five minutes — it updates less often than you'd like.",
      "Then look up, and keep looking up, longer than feels reasonable. The best displays often start as a faint gray smear that most people write off as cloud, ten minutes before it turns green.",
    ],
  },
  {
    id: "eating-northern-italy",
    slug: "eating-your-way-through-northern-italy",
    title: "Eating Your Way Through Northern Italy",
    excerpt:
      "Forget the idea of 'Italian food.' The north alone contains at least six different cuisines.",
    category: "Food",
    readTime: "5 min read",
    publishedAt: "2026-04-19",
    destinationSlugs: ["italy"],
    body: [
      "Ask a Piedmontese chef what defines Italian cooking and you'll get a patient, slightly pained smile. There is no single Italian cuisine — there's Liguria's basil and olive oil, Emilia-Romagna's egg pasta and cured pork, Piedmont's truffle and Barolo, Veneto's rice and seafood. They share a border and little else.",
      "Start in Genoa, where pesto is made in a marble mortar, not a blender, and the basil is grown specifically for the purpose on terraces above the city. Move to Bologna, where a proper ragù takes four hours and involves almost no tomato — a fact that surprises most visitors expecting spaghetti bolognese.",
      "In Piedmont, autumn means white truffle season, and restaurants build entire tasting menus around a fungus that's shaved, not cooked, directly onto the plate in front of you. Venice closes the loop with cicchetti — small plates built for standing at a bar with a glass of local wine, the closest thing Italy has to tapas.",
      "By the time you reach Florence for a bistecca alla fiorentina, you'll have eaten your way through four genuinely different food cultures without leaving the top third of the country.",
    ],
  },
  {
    id: "longest-coastlines",
    slug: "the-longest-coastlines-are-the-best-ones",
    title: "The Longest Coastlines Are the Best Ones",
    excerpt:
      "Four countries where the coast isn't a feature of the trip — it's the whole itinerary.",
    category: "Nature",
    readTime: "6 min read",
    publishedAt: "2026-03-08",
    destinationSlugs: ["canada", "new-zealand", "south-africa", "brazil"],
    body: [
      "Some countries have a coastline. Others are built around one. Canada's runs for over two hundred thousand kilometers when you count every inlet and island — long enough that no single trip could see all of it, so most travelers pick a stretch and let it stand in for the whole.",
      "New Zealand does the opposite trick: two small islands, but so much vertical and geological variety along the shore that a single week on the South Island's coast road can move you from fjord to golden-sand beach to glacier-fed river mouth.",
      "South Africa's Garden Route earns its name honestly — indigenous forest running almost to the waterline, with Cape Town's Atlantic side delivering a completely different, wilder character than the Indian Ocean beaches further east.",
      "And Brazil's coast is long enough to contain both Rio's granite peaks dropping straight into the sea and, a few thousand kilometers north, the quiet volcanic isolation of Fernando de Noronha — proof that a coastline can be a country's whole personality, told in more than one voice.",
    ],
  },
];
