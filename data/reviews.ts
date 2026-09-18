import { Review } from '@/types';

export const reviews: Review[] = [
  {
    id: 'elden-ring-shadow-of-the-erdtree-review',
    slug: 'elden-ring-shadow-of-the-erdtree-review',
    gameSlug: 'elden-ring-shadow-of-the-erdtree',
    gameTitle: 'Elden Ring: Shadow of the Erdtree',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    genre: 'Action',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    score: 9.6,
    author: {
      name: 'Marcus Vance',
      role: 'Senior Editorial Reviewer'
    },
    publishedAt: 'June 27, 2024',
    updatedAt: 'July 5, 2024',
    summary:
      'Shadow of the Erdtree is an astounding expansion that elevates FromSoftware’s open-world design through staggering vertical architecture, unforgettable legacy dungeons, and punishing combat encounters that demand tactical patience.',
    gameplay:
      'Combat in the Land of Shadow is some of the tightest and most demanding FromSoftware has ever created. The eight new weapon categories—most notably the Light Greatswords and martial arts Hand-to-Hand combat—breathe new life into character builds that may have felt exhausted in the base game. The Scadutree blessing progression system is a brilliant equalizer: by decoupling expansion survivability from your base character level, the studio preserved genuine tension and danger, compelling players to scour every ravine and castle parapet for upgrades.',
    graphics:
      'Art direction triumphs over raw polygon counts in every vista. From the somber silhouette of the veiled Scadutree dripping golden sap to the azure flower fields of the Cerulean Coast, the visual storytelling is mesmerizing. The architectural density of Belurat and the Shadow Keep showcase extraordinary geometric complexity that guides players organically without map icons.',
    performance:
      'On PlayStation 5, performance mode reliably delivers near-60 FPS gameplay, though occasional drops occur during colossal encounters involving sweeping particle effects. The PC release benefits noticeably from recent shader compilation updates, maintaining stable frametimes on mid-tier and high-tier hardware.',
    sound:
      'The audio design alternates between eerie, wind-swept ambient desolation and thunderous orchestral climaxes. Choral chants during major boss encounters amplify the mythic tragedy of the Hornsent and the Golden Order, while audio cues for enemy wind-ups remain sharp and readable.',
    contentDepth:
      'With over 35 to 50 hours of content, several colossal legacy dungeons, dozen-plus major bosses, and an expansive subterranean map layer, this expansion eclipses the scale of many full-priced standalone releases.',
    value:
      'Priced at $39.99, the expansion provides exceptional value for players who enjoy rigorous exploration and demanding action RPG combat. It sets an impossibly high benchmark for post-launch expansions.',
    pros: [
      'Peerless vertical exploration with dense, layered map design',
      'Exciting new weapon categories that fundamentally transform build variety',
      'Atmospheric art direction that produces breathtaking panoramas',
      'Clever Scadutree progression maintains challenge for end-game characters'
    ],
    cons: [
      'Erratic camera behavior during colossal multi-phase boss fights',
      'Navigating to certain secluded regions can be obtuse without guides'
    ],
    verdict:
      'Shadow of the Erdtree is not just an outstanding expansion; it is one of the crowning achievements of modern action RPG design, demonstrating an unmatched understanding of exploration, spatial design, and combat mastery.',
    breakdown: [
      { category: 'Gameplay Mechanics', score: 9.7 },
      { category: 'Level Design & Exploration', score: 9.9 },
      { category: 'Visual Presentation', score: 9.5 },
      { category: 'Audio & Music', score: 9.6 },
      { category: 'Performance & Polish', score: 8.8 },
      { category: 'Value & Longevity', score: 9.8 }
    ]
  },
  {
    id: 'cyberpunk-2077-phantom-liberty-review',
    slug: 'cyberpunk-2077-phantom-liberty-review',
    gameSlug: 'cyberpunk-2077-phantom-liberty',
    gameTitle: 'Cyberpunk 2077: Phantom Liberty',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    genre: 'RPG',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    score: 9.3,
    author: {
      name: 'Elena Rostova',
      role: 'Lead RPG Critic'
    },
    publishedAt: 'October 3, 2023',
    summary:
      'Phantom Liberty delivers a gripping espionage thriller within the walled district of Dogtown. Combined with the transformative 2.0 system overhaul, it represents the definitive realization of Night City’s promise.',
    gameplay:
      'Paired with the 2.0 overhaul, the core loop is dramatically improved. Cyberware is now constrained by an explicit capacity threshold with real tradeoffs, perk trees offer active tactical perks rather than passive statistical nudges, and mid-air dashing enables blistering kinetic shootouts. Dogtown’s vertical combat spaces reward aggressive mobility and hacking mastery.',
    graphics:
      'Visually, Phantom Liberty on high-end PC with Full Path Tracing and DLSS 3.5 Ray Reconstruction is a technological triumph. Light bounces realistically through smoky neon markets, puddles reflect detailed neon signs without screen-space clipping, and character models exhibit convincing subsurface skin scattering.',
    performance:
      'Current-generation consoles run smoothly at 60 FPS in Performance Mode, utilizing dynamic scaling to maintain responsive inputs. High-end PC setups require modern hardware and AI upscaling to enable full path tracing, but standard rasterized and hybrid ray-traced modes perform gracefully.',
    sound:
      'The soundtrack crackles with dark synth pulses, tense string arrangements, and authentic club tracks. Idris Elba’s performance as Solomon Reed grounds the narrative in weary gravitas, while Keanu Reeves turns in his most nuanced portrayal of Johnny Silverhand to date.',
    contentDepth:
      'A dense 25-to-30-hour campaign packed with high-quality gig missions, dynamic airdrop encounters, and meaningful branching decisions that lead to emotionally resonant, devastating conclusions.',
    value:
      'Phantom Liberty is an essential purchase for any cyberpunk fan, delivering a focused, premium story arc that elevates the entirety of Cyberpunk 2077 into one of modern gaming\'s finest experiences.',
    pros: [
      'Exceptional spy-thriller storytelling with morally complex characters',
      'Rebuilt skill trees and cyberware systems make combat fluid and reactive',
      'Spectacular graphical presentation and lighting technology',
      'Dogtown feels dense, dangerous, and atmospheric'
    ],
    cons: [
      'Vehicle combat, while cinematic, is somewhat underutilized in main missions',
      'Very high PC requirements to experience full path-tracing features'
    ],
    verdict:
      'Phantom Liberty delivers the sharp, thrilling espionage drama that Night City always deserved. It solidifies Cyberpunk 2077’s redemption as a high-water mark for contemporary action RPGs.',
    breakdown: [
      { category: 'Narrative & Characters', score: 9.6 },
      { category: 'Combat & Build Variety', score: 9.2 },
      { category: 'Visuals & Tech Benchmark', score: 9.8 },
      { category: 'Audio & Voice Acting', score: 9.5 },
      { category: 'Performance Stability', score: 8.9 },
      { category: 'Value Proposition', score: 9.0 }
    ]
  },
  {
    id: 'baldurs-gate-3-review',
    slug: 'baldurs-gate-3-review',
    gameSlug: 'baldurs-gate-3',
    gameTitle: "Baldur's Gate 3",
    coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    genre: 'RPG',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    score: 9.8,
    author: {
      name: 'Elena Rostova',
      role: 'Lead RPG Critic'
    },
    publishedAt: 'August 18, 2023',
    updatedAt: 'December 1, 2023',
    summary:
      'Baldur’s Gate 3 is a generational RPG masterpiece. Larian Studios has achieved unprecedented narrative reactivity, tactical tabletop freedom, and companion character writing that will define role-playing standards for years.',
    gameplay:
      'The translation of D&D 5th Edition rules into an interactive 3D tactical environment is nothing short of miraculous. Combat invites wild creative solutions: stacking barrels for aerial smites, coating stairs in grease before igniting them, or shoving enemy commanders into subterranean chasms. Beyond combat, social encounters and skill checks are treated with equal mechanical rigor.',
    graphics:
      'Character facial animations during intimate conversations reveal subtle glances, smirks, and hesitations that bring companions like Shadowheart, Astarion, and Gale to vibrant life. Environments are rich in tactical geography, elevation, and atmospheric lighting.',
    sound:
      'Borislav Slavov’s musical score matches the emotional grandeur of the journey, with battle hymns and solemn camp ballads remaining lodged in memory. The vocal performances across the entire ensemble are among the finest ever recorded for video games.',
    performance:
      'Acts 1 and 2 run with buttery smoothness. Act 3’s bustling city of Baldur’s Gate places heavy strain on CPUs due to thousands of simulated crowd entities and intricate scripting, though post-launch patches have substantially improved frame consistency across all platforms.',
    contentDepth:
      'Over 100 hours for a single thorough playthrough, with enough divergent quest outcomes, origin stories, and tactical configurations to warrant multiple entire playthroughs.',
    value:
      'A true magnum opus that delivers hundreds of hours of uncompromised, microtransaction-free roleplaying craftsmanship.',
    pros: [
      'Unmatched narrative reactivity where virtually every decision bears weight',
      'Tabletop combat depth that rewards emergent thinking and environmental physics',
      'Deep, layered companion writing with brilliant voice performances',
      'Phenomenal replay value across different character builds and moral paths'
    ],
    cons: [
      'Dense inventory system can feel clunky across prolonged campaigns',
      'Act 3 urban centers can cause noticeable CPU framerate dips'
    ],
    verdict:
      'Baldur’s Gate 3 is a watershed achievement in interactive storytelling. It proves that deep, uncompromising tactical RPGs can captivate millions when created with love, patience, and unyielding respect for player freedom.',
    breakdown: [
      { category: 'Player Agency & Writing', score: 10.0 },
      { category: 'Tactical Combat Depth', score: 9.7 },
      { category: 'World Building & Quests', score: 9.9 },
      { category: 'Audio & Music Composition', score: 9.8 },
      { category: 'Technical Performance', score: 9.0 },
      { category: 'Replayability & Scope', score: 10.0 }
    ]
  },
  {
    id: 'alan-wake-2-review',
    slug: 'alan-wake-2-review',
    gameSlug: 'alan-wake-2',
    gameTitle: 'Alan Wake 2',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    genre: 'Horror',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    score: 9.4,
    author: {
      name: 'Marcus Vance',
      role: 'Senior Editorial Reviewer'
    },
    publishedAt: 'November 4, 2023',
    summary:
      'Alan Wake 2 is an audaciously inventive survival horror experience that daringly blends live-action film, meta-narrative detective work, and oppressive atmospheric dread.',
    gameplay:
      'Slowing down the frenetic combat of the 2010 original in favor of genuine survival horror pacing was an inspired choice. Ammunition is sparse, flashlight batteries are precious, and each enemy encounter feels tense and intimate. Saga Anderson’s Case Board and Alan Wake’s Plot Board provide engaging mental pauses where you construct narrative deductions and literally rewrite architectural reality.',
    graphics:
      'Remedy’s Northlight engine produces some of the most striking visuals of this console generation. Dynamic volumetric mist winding through Pacific Northwest pine forests and the neon-drenched nightmarish alleys of the Dark Place set a new standard for atmospheric horror fidelity.',
    sound:
      'Sound design is weaponized to maintain unrelenting tension. Spatial audio makes every floorboard creak, disembodied whisper, and metallic rumble feel dangerously close. The musical interludes and Old Gods of Asgard sequences provide unforgettable sonic high points.',
    performance:
      'PC users require capable modern GPUs with mesh shader support, but the visual payoff is extraordinary. On consoles, Performance Mode maintains a smooth 60 FPS target with minimal compromises in visual immersion.',
    contentDepth:
      'A tightly paced 20-to-25-hour dual campaign that offers secrets, nursery rhymes, Words of Power upgrades, and hidden cult stashes without diluting the narrative momentum.',
    value:
      'A triumph of singular artistic vision in an industry often dominated by safe sequels. A must-play for horror and narrative gaming enthusiasts.',
    pros: [
      'Extraordinary multimedia narrative integration and meta-storytelling',
      'True survival horror pacing with tactile resource management',
      'Breathtaking lighting, atmospheric weather, and photorealistic environments',
      'Exceptional sound design that generates palpable psychological dread'
    ],
    cons: [
      'High GPU requirements on older PC systems',
      'A few repetitive jump scares in the first two chapters'
    ],
    verdict:
      'Alan Wake 2 is a bold, unforgettable survival horror masterpiece that pushes the boundaries of storytelling in games. It is Remedy Entertainment operating at the pinnacle of their creative and technical powers.',
    breakdown: [
      { category: 'Atmosphere & Storytelling', score: 9.8 },
      { category: 'Survival Horror Mechanics', score: 9.1 },
      { category: 'Visual Direction & Tech', score: 9.7 },
      { category: 'Audio & Soundscapes', score: 9.7 },
      { category: 'Pacing & Design', score: 9.0 },
      { category: 'Artistic Execution', score: 9.6 }
    ]
  },
  {
    id: 'helldivers-2-review',
    slug: 'helldivers-2-review',
    gameSlug: 'helldivers-2',
    gameTitle: 'Helldivers 2',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    genre: 'Multiplayer',
    platforms: ['PC', 'PlayStation'],
    score: 8.9,
    author: {
      name: 'Julian Hayes',
      role: 'Hardware & Tech Editor'
    },
    publishedAt: 'March 1, 2024',
    summary:
      'Helldivers 2 is an intoxicating cooperative tactical shooter that blends cinematic warfare with chaotic slapstick emergent comedy and a captivating community-driven galactic war.',
    gameplay:
      'The tactile gunplay is exceptionally rewarding. Weapons have physical weight, bullets originate from the barrel rather than the camera, and reloading prematurely discards remaining rounds in the magazine. Inputting stratagem directional combinations under siege from a swarm of Bile Titans creates exhilarating panic, and friendly fire ensures squads communicate continuously.',
    graphics:
      'Atmospheric planetary simulation is stellar. Laser beams slice through thick smoke, explosions throw realistic debris across dusty red planetscapes, and lighting conditions shift dramatically as day cycles into pitch-black night.',
    sound:
      'The heroic orchestral score kicks in during extraction countdowns to deliver pulse-pounding cinematic crescendos. Weapons crack with authentic percussive punch, and bug shrieks echo across alien canyons.',
    performance:
      'Performance on PS5 holds up well in 60 FPS Performance Mode, though heavy stratagem barrages can cause occasional momentary frame dips. PC optimization is solid with ample graphics customizability.',
    contentDepth:
      'While planetary objectives share core archetypes, the dynamic Galactic War and varied enemy behaviors against bugs versus bots keep matches feeling distinct and compelling.',
    value:
      'At a $39.99 launch price with all future content drops and weapons earnable through standard in-game play, Helldivers 2 offers one of the most honest value propositions in modern multiplayer gaming.',
    pros: [
      'Phenomenal cooperative gameplay loop with organic emergent drama',
      'Outstanding physical shooting mechanics and explosive visual feedback',
      'Dynamic Galactic War meta-campaign unites the player community',
      'Fair, player-respecting Warbond progression system'
    ],
    cons: [
      'Server strain during peak global galactic operations',
      'Can feel punishing when playing with silent or uncoordinated random lobbies'
    ],
    verdict:
      'Helldivers 2 captures the chaotic magic of multiplayer gaming at its finest. It is an exhilarating, hilarious, and deeply satisfying cooperative shooter that respects players’ time and wallets.',
    breakdown: [
      { category: 'Co-op Gameplay Loop', score: 9.4 },
      { category: 'Gunplay & Physics', score: 9.2 },
      { category: 'Atmospheric Effects', score: 8.8 },
      { category: 'Audio Design', score: 9.0 },
      { category: 'Online Stability', score: 8.0 },
      { category: 'Value Proposition', score: 9.5 }
    ]
  },
  {
    id: 'balatro-review',
    slug: 'balatro-review',
    gameSlug: 'balatro',
    gameTitle: 'Balatro',
    coverImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
    genre: 'Indie',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile'],
    score: 9.5,
    author: {
      name: 'Julian Hayes',
      role: 'Hardware & Tech Editor'
    },
    publishedAt: 'March 14, 2024',
    summary:
      'Balatro is a sublime, dangerously addictive poker roguelike that transforms the simple rules of traditional card play into an electrifying playground of mathematical cascades and Joker synergies.',
    gameplay:
      'The core mechanics are deceptive in their simplicity: play classic poker hands to score chips multiplied by your multiplier. The magic lies in the 150 unique Joker cards that warp every rule imaginable. Stacking Jokers that duplicate triggers, retrigger played cards, and multiply multipliers produces a euphoric cascade of astronomical scores.',
    graphics:
      'The retro CRT monitor shader, subtle scanline distortion, and tactile card-flipping animations create a cozy, nostalgic aesthetic that suits the meditative yet intense flow state.',
    sound:
      'A tranquil, hypnotic lo-fi synthesizer soundtrack keeps your brain relaxed while processing complex probabilistic equations, punctuated by the intensely satisfying clack of chips and rising chime arpeggios as scores tally.',
    performance:
      'Flawless across every conceivable platform. Instantaneous load times, zero stutter, and negligible power draw make it the quintessential portable gaming experience.',
    contentDepth:
      'With 15 unique starting decks, 150 Jokers, multiple stake difficulties, and dozens of challenge runs, Balatro offers near-infinite tactical variety.',
    value:
      'Priced under $15, it easily delivers 100+ hours of intelligent, dopamine-rich entertainment without a single microtransaction or paywall.',
    pros: [
      'Incomparably addictive gameplay loop that captures pure mechanical joy',
      'Astounding depth of Joker synergies and deck-building strategies',
      'Satisfying audio-visual feedback on big multiplier triggers',
      'Runs like a dream on everything from desktop rigs to portable handhelds'
    ],
    cons: [
      'Unfavorable late-game Boss Blind counters can abruptly end deep runs',
      'Can easily derail your sleep schedule'
    ],
    verdict:
      'Balatro is a triumph of pure video game design. Solo developer LocalThunk has delivered one of the finest roguelike deckbuilders ever conceived, proving that brilliant mechanics and tactile polish trump hundred-million-dollar production budgets.',
    breakdown: [
      { category: 'Core Game Mechanics', score: 9.9 },
      { category: 'Strategic Depth', score: 9.7 },
      { category: 'Audio-Visual Aesthetic', score: 9.2 },
      { category: 'Replayability & Longevity', score: 9.8 },
      { category: 'Performance & Portability', score: 10.0 },
      { category: 'Overall Value', score: 9.9 }
    ]
  }
];
