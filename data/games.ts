import { Game } from '@/types';

export const games: Game[] = [
  {
    id: 'elden-ring-shadow-of-the-erdtree',
    slug: 'elden-ring-shadow-of-the-erdtree',
    title: 'Elden Ring: Shadow of the Erdtree',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    genre: 'Action',
    genres: ['Action', 'RPG', 'Adventure'],
    platforms: ['PC', 'PlayStation', 'Xbox'],
    releaseDate: 'June 21, 2024',
    developer: 'FromSoftware Inc.',
    publisher: 'Bandai Namco Entertainment',
    rating: 9.6,
    description:
      'A large-scale expansion set in the Land of Shadow, built around vertically stacked level design, demanding boss encounters, and an independent Scadutree blessing progression system separate from base-game character level.',
    overview:
      'Guided by Empyrean Miquella, players enter the Land of Shadow, a realm severed from the Lands Between. Shadow of the Erdtree builds on FromSoftware\'s open-world formula by concentrating exploration into multi-layered vertical regions filled with legacy dungeons, hidden catacombs, and item-based lore.',
    gameplay:
      'Combat remains deliberately paced and demanding, bolstered by eight completely new weapon archetypes including Light Greatswords, Hand-to-Hand Arts, and Backhand Blades. A dedicated regional scaling system known as Scadutree Blessings dictates damage output and damage negation, ensuring that high-level base game builds still encounter calibrated resistance throughout the expansion.',
    features: [
      'Over 100 new weapons, shields, and catalyst armaments',
      'Eight fresh weapon categories with distinct movesets and Ashes of War',
      'Scadutree and Revered Spirit Ash regional progression scaling',
      'Intricate multi-tier vertical map architecture with interconnected regions',
      'Over 40 unique boss and field boss encounters'
    ],
    graphics:
      'The expansion runs on FromSoftware\'s proprietary engine with enhanced volumetric lighting and atmospheric fog. The burnt silhouette of the Scadutree dominates the skyline from most regions, giving players a consistent landmark for orientation across the map.',
    sound:
      'An orchestral score composed by Tsukasa Saitoh, Shoi Miyazawa, and colleagues delivers haunting choral melodies and aggressive brass sections that underscore catastrophic boss encounters.',
    performance:
      'Runs at up to 60 FPS on PlayStation 5 and Xbox Series X in performance mode, with ray-tracing toggles available. On PC, framerates scale with modern hardware, with stutter mitigation improved over initial launch patches.',
    pros: [
      'Vertically interconnected map layout that rewards thorough exploration',
      'Eight new weapon archetypes that open up underused build categories',
      'Distinct art direction across individual legacy dungeons',
      'High mechanical challenge that rewards learning enemy patterns'
    ],
    cons: [
      'Steep difficulty spike for uncollected blessing tiers',
      'Camera tracking difficulties during dense multi-phase colossal bosses'
    ],
    reviewSlug: 'elden-ring-shadow-of-the-erdtree-review',
    relatedGameSlugs: ['armored-core-vi', 'baldurs-gate-3', 'alan-wake-2', 'hades-2'],
    relatedGuideSlugs: ['shadow-of-the-erdtree-scadutree-fragment-progression'],
    relatedNewsSlugs: ['unreal-engine-5-nanite-tessellation-performance', 'cross-platform-progression-standards']
  },
  {
    id: 'cyberpunk-2077-phantom-liberty',
    slug: 'cyberpunk-2077-phantom-liberty',
    title: 'Cyberpunk 2077: Phantom Liberty',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1600&q=80',
    genre: 'RPG',
    genres: ['RPG', 'Action', 'Adventure'],
    platforms: ['PC', 'PlayStation', 'Xbox'],
    releaseDate: 'September 26, 2023',
    developer: 'CD PROJEKT RED',
    publisher: 'CD PROJEKT RED',
    rating: 9.3,
    description:
      'A gritty spy-thriller expansion set in the walled combat zone of Dogtown, featuring overhauled perk progression, vehicle combat, and complex moral dilemmas.',
    overview:
      'When the orbital shuttle of the New United States of America president crashes in Night City\'s deadliest district, mercenary V is thrust into a labyrinth of espionage, government secrets, and personal betrayal. Phantom Liberty is CD Projekt Red operating at the absolute peak of narrative tension.',
    gameplay:
      'Paired with the transformative 2.0 system overhaul, gameplay emphasizes fluid mobility with mid-air dashes, bullet deflection, and rebuilt skill trees. The Relic perk branch adds game-changing abilities to cyberware arm implants, while vehicle combat delivers high-speed firefights across Dogtown\'s militarized streets.',
    features: [
      'Expansive Dogtown district with distinct black markets and militia checkpoints',
      'Dedicated Relic skill tree for cyberware modifications',
      'High-speed vehicular combat with mounted weaponry and hack-on-the-fly mechanics',
      'Branching narrative with multiple distinct endings',
      'Revamped cyberware capacity and armor balance systems'
    ],
    graphics:
      'One of the modern benchmarks for PC rendering, offering full Path Tracing (Ray Tracing Overdrive) alongside DLSS 3.5 Ray Reconstruction for ultra-realistic indirect lighting and reflections.',
    sound:
      'Features high-intensity industrial synthwave scores composed by P.T. Adamczyk and Jacek Paciorkowski, combined with authentic performance voice acting by Idris Elba and Keanu Reeves.',
    performance:
      'Demanding on hardware when utilizing full path tracing, yet highly scalable across modern GPUs with DLSS and FSR upscaling. Current-gen consoles maintain a steady 60 FPS performance mode with dynamic resolution.',
    pros: [
      'Griping political espionage storyline with authentic character depth',
      'Substantial combat fluidity and cyberware build diversity',
      'Full path-tracing support delivers a genuine visual benchmark on capable GPUs',
      'Impactful narrative decisions that challenge personal allegiances'
    ],
    cons: [
      'High PC system requirements for path tracing modes',
      'Dogtown border checkpoints can occasionally interrupt traversal flow'
    ],
    reviewSlug: 'cyberpunk-2077-phantom-liberty-review',
    relatedGameSlugs: ['elden-ring-shadow-of-the-erdtree', 'baldurs-gate-3', 'alan-wake-2', 'helldivers-2'],
    relatedGuideSlugs: ['cyberpunk-2077-ultimate-cyberware-synergy-builds'],
    relatedNewsSlugs: ['handheld-gaming-pcs-in-2026-linux-proton-status', 'unreal-engine-5-nanite-tessellation-performance']
  },
  {
    id: 'baldurs-gate-3',
    slug: 'baldurs-gate-3',
    title: "Baldur's Gate 3",
    coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80',
    genre: 'RPG',
    genres: ['RPG', 'Strategy', 'Adventure'],
    platforms: ['PC', 'PlayStation', 'Xbox'],
    releaseDate: 'August 3, 2023',
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    rating: 9.8,
    description:
      'A generational Dungeons & Dragons tactical role-playing game that sets a new industry standard for player agency, reactivity, and companion storytelling.',
    overview:
      'Infected with an illithid mind-flayer parasite, you and your party embark on an epic journey across the Sword Coast. Larian Studios translates tabletop D&D 5e mechanics into a digital landscape where creative problem solving, environmental physics, and character relationships produce limitless emergent gameplay.',
    gameplay:
      'Turn-based tactical combat leverages height advantage, elemental surface reactions, and tactical positioning. Outside combat, hundreds of skill checks and dialogue branches allow players to talk their way past boss encounters, recruit unlikely allies, or fundamentally alter the fate of entire civilizations.',
    features: [
      'Faithful digital adaptation of Dungeons & Dragons 5th Edition rules',
      '12 classes, 46 subclasses, and hundreds of functional spells and feats',
      'Unprecedented narrative branching with thousands of permutation paths',
      'Four-player online cooperative campaign with individual dialogue agency',
      'Honour Mode with single-save permadeath and legendary boss actions'
    ],
    graphics:
      'Expressive character animations during cinematic conversations capture nuanced micro-expressions. Environments feature rich textures and reactive lighting that visually communicates elemental hazards.',
    sound:
      'Borislav Slavov\'s sweeping orchestral score weaves memorable character motifs, accompanied by an award-winning voice cast delivering hundreds of thousands of voiced dialogue lines.',
    performance:
      'Solid performance through Acts 1 and 2; Act 3 city density places heavy demands on CPU performance, though ongoing patches have substantially stabilized framerates across console and PC.',
    pros: [
      'High degree of narrative reactivity across most quests and dialogue',
      'Companion story arcs with distinct character progression paths',
      'Tactically rewarding turn-based combat with environmental manipulation',
      'High replayability across different origin characters and moral paths'
    ],
    cons: [
      'Act 3 urban centers remain CPU heavy during intensive rendering',
      'Inventory management can become cumbersome across deep party inventories'
    ],
    reviewSlug: 'baldurs-gate-3-review',
    relatedGameSlugs: ['elden-ring-shadow-of-the-erdtree', 'hades-2', 'manor-lords', 'cyberpunk-2077-phantom-liberty'],
    relatedGuideSlugs: ['baldurs-gate-3-honour-mode-survival-guide'],
    relatedNewsSlugs: ['the-resurgence-of-single-player-immersive-sims', 'cross-platform-progression-standards']
  },
  {
    id: 'alan-wake-2',
    slug: 'alan-wake-2',
    title: 'Alan Wake 2',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1609523235355-82f40b23a6f2?auto=format&fit=crop&w=1600&q=80',
    genre: 'Horror',
    genres: ['Horror', 'Adventure', 'Action'],
    platforms: ['PC', 'PlayStation', 'Xbox'],
    releaseDate: 'October 27, 2023',
    developer: 'Remedy Entertainment',
    publisher: 'Epic Games Publishing',
    rating: 9.4,
    description:
      'A psychological survival horror game bridging two realities through FBI agent Saga Anderson and trapped novelist Alan Wake, mixing live-action footage with in-engine rendering.',
    overview:
      'Thirteen years after disappearing into the Dark Place beneath Cauldron Lake, writer Alan Wake attempts to write his escape into reality while FBI agent Saga Anderson investigates ritualistic murders in the Pacific Northwest town of Bright Falls. Remedy creates an intense, multimedia survival horror experience.',
    gameplay:
      'Classic survival horror mechanics emphasize deliberate resource management, strategic light usage, and defensive positioning. Players switch between Saga\'s Mind Place clue-deduction board and Alan\'s Writer\'s Room reality-altering Plot Board to solve environmental puzzles and advance the dual campaigns.',
    features: [
      'Dual playable protagonists with distinct mechanics and psychological spaces',
      'Mind Place Case Board for forensic deduction and profiling',
      'Writer\'s Room Plot Board for altering physical geography in the Dark Place',
      'Meticulously crafted survival horror resource economy',
      'Seamless fusion of live-action cinematography and in-engine rendering'
    ],
    graphics:
      'Remedy\'s Northlight engine establishes a high-water mark for digital lighting, featuring mesh shaders, path-traced indirect illumination, and photorealistic foliage simulation.',
    sound:
      'State-of-the-art spatial audio design with petrifying binaural whispers, sudden mechanical rumbles, and custom diegetic rock anthems created by Poets of the Fall (as Old Gods of Asgard).',
    performance:
      'Pushes GPU hardware heavily on PC. Requires modern GPUs with hardware mesh shader support for optimal performance. Consoles provide 30 FPS quality and 60 FPS performance modes.',
    pros: [
      'Mesmerizing atmosphere and genre-defining psychological storytelling',
      'Innovative Case Board and Plot Board narrative puzzle mechanics',
      'Stunning lighting design and surrealist visual sequences',
      'Impactful sound design that heightens constant dread'
    ],
    cons: [
      'Stringent hardware requirements on PC older generation GPUs',
      'Jump scares can feel occasionally overutilized in early chapters'
    ],
    reviewSlug: 'alan-wake-2-review',
    relatedGameSlugs: ['cyberpunk-2077-phantom-liberty', 'elden-ring-shadow-of-the-erdtree', 'helldivers-2'],
    relatedGuideSlugs: ['alan-wake-2-inventory-words-of-power-guide'],
    relatedNewsSlugs: ['the-resurgence-of-single-player-immersive-sims', 'unreal-engine-5-nanite-tessellation-performance']
  },
  {
    id: 'helldivers-2',
    slug: 'helldivers-2',
    title: 'Helldivers 2',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1600&q=80',
    genre: 'Multiplayer',
    genres: ['Multiplayer', 'Action'],
    platforms: ['PC', 'PlayStation'],
    releaseDate: 'February 8, 2024',
    developer: 'Arrowhead Game Studios',
    publisher: 'Sony Interactive Entertainment',
    rating: 8.9,
    description:
      'A third-person cooperative extraction shooter built on relentless chaos, hilarious friendly fire, and a dynamic community-driven Galactic War.',
    overview:
      'Enlist as a Helldiver and fight for Super Earth against swarms of Terminid insects and relentless Automaton legions. Helldivers 2 trades the top-down perspective of its predecessor for an over-the-shoulder tactical shooter built around heavy physics, strategic stratagem call-ins, and squad-dependent cooperative play.',
    gameplay:
      'Four-player squads drop into hostile alien planets to complete primary and secondary tactical objectives. Calling down orbital strikes, heavy artillery, and support weaponry requires memorizing keypad code sequences under extreme pressure, while always avoiding lethal friendly fire.',
    features: [
      'Four-player squad tactical cooperative combat against distinct enemy factions',
      'Real-time Galactic War campaign updated dynamically by live Game Masters',
      'Over 50 call-in Stratagems ranging from 500kg bombs to automated sentries',
      'Physics-based ballistic simulation, armor penetration, and limb damage',
      'Friendly fire permanently active for emergent humor and tactical discipline'
    ],
    graphics:
      'Atmospheric planetary weather effects including blinding sandstorms, blizzard conditions, and dense night jungles illuminated by weapon tracers and orbital fire.',
    sound:
      'A booming heroic orchestral soundtrack composed by Wilbert Roget II, paired with thunderous audio effects for explosions and distinct directional audio cues for approaching enemy heavies.',
    performance:
      'Fluid 60 FPS performance mode on PlayStation 5 with high particle density. PC optimization scales well across mid-to-high tier rigs, supporting ultrawide displays and customizable keybindings.',
    pros: [
      'Addictive cooperative loop with organic comedic tension',
      'Spectacular visual feedback and explosive stratagem firepower',
      'Engaging community-driven galactic campaign directives',
      'Consumer-friendly Warbond monetization model without pay-to-win locks'
    ],
    cons: [
      'Occasional connection stability drops during peak weekend galactic battles',
      'Weapon balance revisions have occasionally disrupted favorite loadouts'
    ],
    reviewSlug: 'helldivers-2-review',
    relatedGameSlugs: ['armored-core-vi', 'cyberpunk-2077-phantom-liberty', 'balatro'],
    relatedGuideSlugs: ['helldivers-2-high-difficulty-loadout-breakdown'],
    relatedNewsSlugs: ['cross-platform-progression-standards', 'playstation-5-pro-pssr-analysis']
  },
  {
    id: 'balatro',
    slug: 'balatro',
    title: 'Balatro',
    coverImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1627664220128-ff2232937726?auto=format&fit=crop&w=1600&q=80',
    genre: 'Indie',
    genres: ['Indie', 'Strategy', 'Puzzle'],
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile'],
    releaseDate: 'February 20, 2024',
    developer: 'LocalThunk',
    publisher: 'Playstack',
    rating: 9.5,
    description:
      'A hypnotic poker roguelike deck-builder where illegal hands, game-breaking Joker cards, and cascading multipliers combine into a masterclass of mathematical fun.',
    overview:
      'Solo developer LocalThunk took the universal familiarity of standard poker hands and warped it into an endlessly replayable roguelike. Balatro challenges players to reach astronomical point thresholds by modifying cards, enhancing suits, and stacking synergistic Joker bonuses across increasingly unforgiving Blinds.',
    gameplay:
      'Each round demands defeating Small, Big, and Boss Blinds with limited hand attempts and discards. Successful rounds award cash used in the shop to purchase Jokers, Tarot cards, Planet cards, and Spectral packs. The thrill comes from identifying synergistic combos that turn humble two-pair hands into millions of scoring chips.',
    features: [
      '150 unique Joker cards with distinct scoring, economic, and tactical multipliers',
      '15 different starting decks with unique passive modifiers and strategic challenges',
      '22 Tarot cards, 12 Planet cards, and 18 Spectral cards for deck customization',
      'Boss Blinds with restrictive rules like debuffed suits or hidden cards',
      'Universal release across consoles, PC, and touch-optimized mobile devices'
    ],
    graphics:
      'Retro CRT aesthetic complete with subtle scanline curvature, vibrant pixel-art card art, and hypnotic chip-counting animations that make every successful multiplier pop.',
    sound:
      'A smooth, chill psychedelic lo-fi score that loops seamlessly in the background, punctuated by satisfying mechanical card snaps and chime-laden point tallying audio.',
    performance:
      'Flawless 60+ FPS performance across every platform including low-power handhelds and mobile devices, with rapid load times and negligible battery drain.',
    pros: [
      'Easy-to-learn loop with a high mechanical ceiling once Joker synergies click',
      'Wide build variety driven by 150 Joker cards and their interactions',
      'Charming retro visual presentation with tactile card-handling feedback',
      'Perfect balance between calculated risk and tactical decision making'
    ],
    cons: [
      'Unfavorable Boss Blind counters can occasionally extinguish a run unexpectedly',
      'Can easily consume hours without realizing the passage of time'
    ],
    reviewSlug: 'balatro-review',
    relatedGameSlugs: ['hades-2', 'manor-lords', 'baldurs-gate-3'],
    relatedGuideSlugs: ['balatro-deck-building-joker-synergies-guide'],
    relatedNewsSlugs: ['handheld-gaming-pcs-in-2026-linux-proton-status', 'the-resurgence-of-single-player-immersive-sims']
  },
  {
    id: 'hades-2',
    slug: 'hades-2',
    title: 'Hades II',
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1716967318503-05b7064afa41?auto=format&fit=crop&w=1600&q=80',
    genre: 'Indie',
    genres: ['Indie', 'Action', 'RPG'],
    platforms: ['PC'],
    releaseDate: 'May 6, 2024 (Early Access)',
    developer: 'Supergiant Games',
    publisher: 'Supergiant Games',
    rating: 9.4,
    description:
      'Battle beyond the Underworld using dark sorcery as Melinoë, Princess of the Underworld, in Supergiant Games\' first-ever sequel.',
    overview:
      'Supergiant expands upon the celebrated mythology of the first game with Melinoë, sister of Zagreus, embarking on a quest to defeat Chronos, the Titan of Time. Hades II doubles down on responsive action, deep Greek mythological lore, and an expanded hub world filled with witchy alchemy.',
    gameplay:
      'Combat expands with Magick resource pools, enabling charged Omega attacks for basic, special, and cast abilities. Boons from Olympian gods offer branching elemental combinations, while an alchemical cauldron in the Crossroads unlocks permanent upgrades, new weapon aspects, and regional pathways.',
    features: [
      'New protagonist Melinoë equipped with witchy incantations and distinct weaponry',
      'Magick system introducing Omega variations for strikes, specials, and casts',
      'Dual route progression: delve deep into Tartarus or ascend to Mount Olympus',
      'Crossroads hub featuring gardening, alchemy, and dynamic companion interactions',
      'Deep mythological storytelling with progressive voice lines across runs'
    ],
    graphics:
      'Jen Zee\'s hand-drawn art direction reaches new heights with rich bioluminescent flora, bewitching character portraits, and dynamic spell effects.',
    sound:
      'Darren Korb returns with a haunting Mediterranean acoustic and metal soundtrack, featuring hypnotic vocals by Ashley Barrett.',
    performance:
      'Polished and responsive even in Early Access, maintaining lockstep 60 to 120 FPS across modern hardware and portable PC handheld devices.',
    pros: [
      'Refined combat mechanics with the addition of the tactical Magick system',
      'Hand-drawn visual presentation and distinct character designs',
      'Substantial amount of content and routes already available in Early Access',
      'Audio score that shifts dynamically with player combat momentum'
    ],
    cons: [
      'Early access status means balancing adjustments remain active',
      'Resource gathering mechanics can occasionally slow run pacing'
    ],
    relatedGameSlugs: ['balatro', 'elden-ring-shadow-of-the-erdtree', 'baldurs-gate-3'],
    relatedGuideSlugs: ['balatro-deck-building-joker-synergies-guide'],
    relatedNewsSlugs: ['handheld-gaming-pcs-in-2026-linux-proton-status', 'the-resurgence-of-single-player-immersive-sims']
  },
  {
    id: 'manor-lords',
    slug: 'manor-lords',
    title: 'Manor Lords',
    coverImage: 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1446104838475-bc6508184f08?auto=format&fit=crop&w=1600&q=80',
    genre: 'Strategy',
    genres: ['Strategy', 'Indie'],
    platforms: ['PC'],
    releaseDate: 'April 26, 2024 (Early Access)',
    developer: 'Slavic Magic',
    publisher: 'Hooded Horse',
    rating: 9.1,
    description:
      'A medieval city builder featuring in-depth organic settlement development, historical resource chains, and large-scale tactical battlefield combat.',
    overview:
      'Crafted primarily by solo developer Slavic Magic, Manor Lords delivers an authentic 14th-century Franconian medieval settlement simulator without rigid grid constraints. Roads follow natural contours, burgage plots curve organically, and economic supply chains mirror historical reality.',
    gameplay:
      'Players manage seasonal farming, timber production, trade routes, and citizen happiness. When rival lords or bandits threaten your land, peasant villagers muster into organized militia units where troop fatigue, weather conditions, and terrain elevation dictate battlefield outcomes.',
    features: [
      'Gridless organic road and plot placement inspired by authentic medieval villages',
      'Realistic seasonal agricultural cycles and detailed resource refining chains',
      'Total War-style tactical combat with unit fatigue, armor, and morale systems',
      'Third-person Walk Mode allowing lords to stroll through their own towns',
      'Complex market supply mechanics and inter-regional trading barter systems'
    ],
    graphics:
      'Built in Unreal Engine with photogrammetry assets that produce photorealistic mud, timber framing, and dynamic weather changes across four distinct seasons.',
    sound:
      'Immersive ambient sounds of rural village life paired with authentic medieval period instruments and battlefield war horns.',
    performance:
      'Well-optimized for an early access title, supporting DLSS and FSR upscalers. CPU usage scales with late-game village populations.',
    pros: [
      'Strong historical authenticity in its gridless, organic town layouts',
      'Harmonious blend between peaceful economic building and tactical warfare',
      'Impressive visual fidelity powered by photogrammetry materials',
      'Engaging third-person exploration mode brings settlements to life'
    ],
    cons: [
      'Late-game tech tree and diplomacy options currently expanding',
      'Trade barter mechanics require careful micro-management to prevent bottlenecks'
    ],
    relatedGameSlugs: ['baldurs-gate-3', 'balatro', 'forza-horizon-5'],
    relatedGuideSlugs: ['baldurs-gate-3-honour-mode-survival-guide'],
    relatedNewsSlugs: ['the-resurgence-of-single-player-immersive-sims', 'unreal-engine-5-nanite-tessellation-performance']
  },
  {
    id: 'forza-horizon-5',
    slug: 'forza-horizon-5',
    title: 'Forza Horizon 5',
    coverImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
    genre: 'Racing',
    genres: ['Racing', 'Sports', 'Adventure'],
    platforms: ['PC', 'Xbox'],
    releaseDate: 'November 9, 2021',
    developer: 'Playground Games',
    publisher: 'Xbox Game Studios',
    rating: 9.2,
    description:
      'An open-world racing showcase set across vibrant Mexican biomes, delivering hundreds of cars, dynamic weather, and accessible driving physics.',
    overview:
      'Playground Games crafts an expansive playground in Mexico, spanning active caldera volcanoes, dense jungle canopies, historic cities, and sweeping desert dunes. Forza Horizon 5 pairs a large vehicle roster with extensive accessibility options, including adjustable game speed and colorblind modes.',
    gameplay:
      'Whether participating in point-to-point road rallies, dirt trail expeditions, drift zones, or cross-country scrambles, vehicle handling bridges realistic weight physics with intuitive accessibility. The EventLab tool allows the community to build custom racetracks and mini-games.',
    features: [
      'Over 800 officially licensed vehicles with comprehensive tuning and customization',
      'Massive open-world map with 11 distinct biomes and dynamic seasonal storms',
      'EventLab toolset for constructing custom racing events and obstacle courses',
      'Seamless online Horizon Open multiplayer and cooperative convoy expeditions',
      'Extensive accessibility features including game speed modification and colorblind modes'
    ],
    graphics:
      'Spectacular HDR skies captured from real Mexican weather data, pristine car modeling with ray-traced reflections in ForzaVista, and high-density terrain photogrammetry.',
    sound:
      'Overhauled authentic car engine recordings captured from dyno testing, supported by licensed radio stations covering bass, rock, pop, and classical compositions.',
    performance:
      'Flawless 60 FPS performance modes on Xbox Series consoles, with robust PC scalability supporting ultrawide resolutions and high refresh rates.',
    pros: [
      'Driving physics that stay approachable on a controller while rewarding wheel setups',
      'Massive, diverse vehicle roster with deep customization depth',
      'Stunning environmental diversity and atmospheric weather storms',
      'Generous progression system that respects player time'
    ],
    cons: [
      'Online convoy synchronization issues can occasionally crop up',
      'Festival playlist structure can feel slightly repetitive over long periods'
    ],
    relatedGameSlugs: ['armored-core-vi', 'helldivers-2', 'manor-lords'],
    relatedGuideSlugs: ['helldivers-2-high-difficulty-loadout-breakdown'],
    relatedNewsSlugs: ['cross-platform-progression-standards', 'playstation-5-pro-pssr-analysis']
  },
  {
    id: 'armored-core-vi',
    slug: 'armored-core-vi',
    title: 'Armored Core VI: Fires of Rubicon',
    coverImage: 'https://images.unsplash.com/photo-1621164071312-67bb68821b3f?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1555618565-9f2b0323a10d?auto=format&fit=crop&w=1600&q=80',
    genre: 'Action',
    genres: ['Action', 'Strategy'],
    platforms: ['PC', 'PlayStation', 'Xbox'],
    releaseDate: 'August 25, 2023',
    developer: 'FromSoftware Inc.',
    publisher: 'Bandai Namco Entertainment',
    rating: 9.1,
    description:
      'High-octane omnidirectional mech combat on the ruined industrial planet Rubicon 3, emphasizing tactical garage assembly and blisteringly fast boss battles.',
    overview:
      'As independent mercenary Raven, players navigate corporate conflicts and planetary resistance over the volatile energy substance Coral. FromSoftware revitalized the storied franchise by blending signature mechanical assembly with fluid, fast-paced 3D spatial combat.',
    gameplay:
      'Combat takes place in full 360-degree three-dimensional airspace. The garage is just as critical as the battlefield: adjusting boosters, generator capacities, weapon weights, and frame types determines whether your mech maneuvers like an agile lightweight hummingbird or an armored tank citadel.',
    features: [
      'Deep garage customization with hundreds of interchangeable mech components',
      'Attitude Control System (ACS) stagger gauge rewarding coordinated weapon bursts',
      'Omnidirectional 3D combat with high-speed assault boosts and vertical dodging',
      'Multi-chapter campaign with branching mission paths and three distinct endings',
      'Challenging Arena duels against custom AI-controlled AC combatants'
    ],
    graphics:
      'Evocative industrial brutalist architecture, towering megastructures, and blinding missile salvos with fluid thruster particle effects.',
    sound:
      'Industrial electronic soundtracks composed by Kota Hoshino, featuring distinct mechanical clanks, booster howls, and missile lock alarms.',
    performance:
      'Well optimized on PC and modern consoles, sustaining 60 to 120 FPS with minimal frametime variance.',
    pros: [
      'Incredible mechanical customizability with immediate battlefield impact',
      'Blistering, responsive combat that rewards deliberate spatial awareness',
      'Masterful boss design testing both piloting reflexes and garage assembly',
      'Multiple story paths that reward progressive New Game+ playthroughs'
    ],
    cons: [
      'Steep early-game difficulty wall for players unfamiliar with mech tuning',
      'Multiplayer mode is limited primarily to direct arena skirmishes'
    ],
    relatedGameSlugs: ['elden-ring-shadow-of-the-erdtree', 'helldivers-2', 'cyberpunk-2077-phantom-liberty'],
    relatedGuideSlugs: ['shadow-of-the-erdtree-scadutree-fragment-progression'],
    relatedNewsSlugs: ['unreal-engine-5-nanite-tessellation-performance', 'the-resurgence-of-single-player-immersive-sims']
  },
  {
    id: 'the-legend-of-zelda-tears-of-the-kingdom',
    slug: 'the-legend-of-zelda-tears-of-the-kingdom',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    coverImage: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1612036781124-847f8939b154?auto=format&fit=crop&w=1600&q=80',
    genre: 'Adventure',
    genres: ['Adventure', 'Action', 'Puzzle'],
    platforms: ['Nintendo'],
    releaseDate: 'May 12, 2023',
    developer: 'Nintendo EPD',
    publisher: 'Nintendo',
    rating: 9.7,
    description:
      'A physics-driven open-world adventure that spans the kingdom of Hyrule across floating Sky Islands, the terrestrial surface, and the subterranean Depths.',
    overview:
      'Following the upheaval that shatters Hyrule, Link embarks on a quest to locate Princess Zelda and confront the resurrected Demon King. Tears of the Kingdom expands its predecessor\'s open-world sandbox into a triple-layered realm built around player-driven construction physics.',
    gameplay:
      'Abilities like Ultrahand, Fuse, Ascend, and Recall grant players unprecedented systemic agency. Ultrahand allows assembling Zonai contraptions ranging from hot-air balloons to walking siege mechs, while Fuse combines weapons with monster horns and elemental stones to craft tactical armaments.',
    features: [
      'Three interconnected map layers: Sky Islands, Hyrule Surface, and Pitch-Black Depths',
      'Ultrahand building physics system allowing construction of vehicles and machinery',
      'Fuse mechanic that transforms standard armaments and arrows with unique properties',
      'Ascend and Recall abilities that shatter traditional level-design boundaries',
      'Traditional themed dungeons alongside over 150 physics-based Shrines'
    ],
    graphics:
      'Pushes Nintendo Switch hardware to its absolute limits with painterly cell-shaded art direction, volumetric cloud simulations, and impressive draw distances.',
    sound:
      'Delicate piano motifs that transition seamlessly into grand orchestral movements during regional boss battles, alongside rich environmental soundscapes.',
    performance:
      'Remarkably stable considering the intensive physics engine, holding close to 30 FPS at 900p docked, with minor frame drops occurring during complex Ultrahand rotations.',
    pros: [
      'Ultrahand and Fuse building systems that support a wide range of player-designed solutions',
      'Massive three-tiered world that rewards curiosity at every turn',
      'Superb puzzle design that embraces emergent player solutions',
      'Emotional and expansive main questline with memorable story beats'
    ],
    cons: [
      'Inventory menus for weapon fusing can disrupt combat rhythm',
      'Subterranean Depths biome can occasionally feel visually repetitive'
    ],
    relatedGameSlugs: ['elden-ring-shadow-of-the-erdtree', 'baldurs-gate-3', 'balatro'],
    relatedGuideSlugs: ['shadow-of-the-erdtree-scadutree-fragment-progression'],
    relatedNewsSlugs: ['nintendo-backward-compatibility-roadmap', 'the-resurgence-of-single-player-immersive-sims']
  },
  {
    id: 'final-fantasy-vii-rebirth',
    slug: 'final-fantasy-vii-rebirth',
    title: 'Final Fantasy VII Rebirth',
    coverImage: 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1709587797077-7a2c94411514?auto=format&fit=crop&w=1600&q=80',
    genre: 'RPG',
    genres: ['RPG', 'Action', 'Adventure'],
    platforms: ['PlayStation'],
    releaseDate: 'February 29, 2024',
    developer: 'Square Enix',
    publisher: 'Square Enix',
    rating: 9.3,
    description:
      'Cloud and company leave Midgar for the wider world of Gaia, spanning six open regions with strategic synergy combat and the Queen\'s Blood card minigame.',
    overview:
      'The second installment in the Final Fantasy VII remake project expands beyond the industrial metropolis of Midgar into the lush grasslands, coastal resorts, and rugged mountains of Gaia. Rebirth expands classic character arcs while introducing strategic open-world discovery.',
    gameplay:
      'Active Time Battle combat is refined through Synergy Skills and Synergy Abilities that execute tag-team attacks without expending ATB gauges. Beyond combat, the game is packed with minigames, headlined by Queen\'s Blood—a tactical lane-based card game with deep strategic complexity.',
    features: [
      'Six expansive open regions including the Grasslands, Junon, Corel, and Cosmo Canyon',
      'Synergy Combat system featuring dual-character cooperative offensive techniques',
      'Addictive Queen\'s Blood collectible card game integrated throughout every settlement',
      'Expanded playable roster introducing Red XIII, Yuffie, and Cait Sith with unique styles',
      'Chocobo breeding, regional exploration traversal, and extensive Gold Saucer minigames'
    ],
    graphics:
      'High-detail character models and wide panoramic vistas bring classic PS1-era locations to life with modern fidelity and cinematic lighting.',
    sound:
      'A mammoth 400-track orchestral soundtrack reimagines Nobuo Uematsu\'s legendary compositions across varied genres from jazz to heavy metal.',
    performance:
      'Offers a crisp 30 FPS Graphics Mode and a 60 FPS Performance Mode, with recent patches significantly improving image clarity in performance mode on PS5.',
    pros: [
      'Brilliant hybrid action-tactical combat system with deep party synergy',
      'Heartfelt character interactions and expanded story moments',
      'Queen\'s Blood is one of the finest minigames in modern RPG history',
      'A roughly 400-track orchestral soundtrack that reinterprets the original score across multiple genres'
    ],
    cons: [
      'Performance mode soft image resolution at initial release (improved via patch)',
      'Open-world Chadley tower activities can feel slightly formulaic'
    ],
    relatedGameSlugs: ['baldurs-gate-3', 'cyberpunk-2077-phantom-liberty', 'elden-ring-shadow-of-the-erdtree'],
    relatedGuideSlugs: ['cyberpunk-2077-ultimate-cyberware-synergy-builds'],
    relatedNewsSlugs: ['playstation-5-pro-pssr-analysis', 'cross-platform-progression-standards']
  }
];
