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
      'Shadow of the Erdtree adds roughly 35-50 hours of content built around vertically stacked legacy dungeons and a Scadutree blessing system that scales damage and defense independently of character level. It rewards patient exploration, but the difficulty spike for players who rush the early bosses is real.',
    gameplay:
      'Combat in the Land of Shadow is some of the tightest and most demanding FromSoftware has ever created. The eight new weapon categories—most notably the Light Greatswords and martial arts Hand-to-Hand combat—breathe new life into character builds that may have felt exhausted in the base game. The Scadutree blessing progression system is a brilliant equalizer: by decoupling expansion survivability from your base character level, the studio preserved genuine tension and danger, compelling players to scour every ravine and castle parapet for upgrades.',
    graphics:
      'The art direction leans on silhouette and color rather than raw polygon counts — the burnt-gold Scadutree dominates the skyline from nearly every region, and the azure flower fields of the Cerulean Coast read as a deliberate tonal break from the rest of the expansion. Belurat and the Shadow Keep use architectural density to guide players toward objectives without relying on map icons.',
    performance:
      'On PlayStation 5, performance mode reliably delivers near-60 FPS gameplay, though occasional drops occur during colossal encounters involving sweeping particle effects. The PC release benefits noticeably from recent shader compilation updates, maintaining stable frametimes on mid-tier and high-tier hardware.',
    sound:
      'The audio design alternates between eerie, wind-swept ambient desolation and thunderous orchestral climaxes. Choral chants during major boss encounters amplify the mythic tragedy of the Hornsent and the Golden Order, while audio cues for enemy wind-ups remain sharp and readable.',
    contentDepth:
      'With over 35 to 50 hours of content, several colossal legacy dungeons, dozen-plus major bosses, and an expansive subterranean map layer, this expansion eclipses the scale of many full-priced standalone releases.',
    value:
      'At $39.99 for 35-50 hours of new legacy dungeons and boss content, the expansion is priced in line with — or below — comparable full-priced action RPGs, provided you enjoy FromSoftware\'s difficulty curve.',
    pros: [
      'Vertically layered map design that rewards exploring every ravine and rooftop',
      'Eight new weapon categories that meaningfully change how existing builds play',
      'Distinct art direction across each legacy dungeon, from Belurat to the Shadow Keep',
      'Scadutree progression keeps end-game characters from trivializing the expansion'
    ],
    cons: [
      'Erratic camera behavior during colossal multi-phase boss fights',
      'Navigating to certain secluded regions can be obtuse without guides'
    ],
    verdict:
      'Shadow of the Erdtree earns its price through vertical level design and eight new weapon categories that meaningfully change how builds play. Erratic camera behavior in multi-phase boss fights and a steep early blessing-tier wall keep it from being a flawless send-off to the base game.',
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
      'Phantom Liberty pairs a 25-to-30-hour espionage storyline set in the walled district of Dogtown with the 2.0 update\'s overhauled perk trees and cyberware capacity system. Vehicle combat is a highlight in scripted moments but rarely comes up outside them.',
    gameplay:
      'Paired with the 2.0 overhaul, the core loop is dramatically improved. Cyberware is now constrained by an explicit capacity threshold with real tradeoffs, perk trees offer active tactical perks rather than passive statistical nudges, and mid-air dashing enables blistering kinetic shootouts. Dogtown’s vertical combat spaces reward aggressive mobility and hacking mastery.',
    graphics:
      'On high-end PC with Full Path Tracing and DLSS 3.5 Ray Reconstruction enabled, light bounces through smoky neon markets and puddles reflect detailed signage without the screen-space clipping older ray-tracing implementations show. Without a recent GPU, expect to run the standard rasterized or hybrid ray-traced modes instead.',
    performance:
      'Current-generation consoles run smoothly at 60 FPS in Performance Mode, utilizing dynamic scaling to maintain responsive inputs. High-end PC setups require modern hardware and AI upscaling to enable full path tracing, but standard rasterized and hybrid ray-traced modes perform gracefully.',
    sound:
      'The soundtrack crackles with dark synth pulses, tense string arrangements, and authentic club tracks. Idris Elba’s performance as Solomon Reed grounds the narrative in weary gravitas, while Keanu Reeves turns in his most nuanced portrayal of Johnny Silverhand to date.',
    contentDepth:
      'A dense 25-to-30-hour campaign packed with high-quality gig missions, dynamic airdrop encounters, and meaningful branching decisions that lead to emotionally resonant, devastating conclusions.',
    value:
      'Phantom Liberty is an essential purchase for any cyberpunk fan, delivering a focused, premium story arc that elevates the entirety of Cyberpunk 2077 into one of modern gaming\'s finest experiences.',
    pros: [
      'Espionage storyline with morally ambiguous characters and multiple distinct endings',
      'Rebuilt skill trees and cyberware capacity system make combat more tactical',
      'Full path tracing and DLSS 3.5 Ray Reconstruction are a genuine visual benchmark on capable hardware',
      'Dogtown\'s vertical layout rewards mobility-focused builds'
    ],
    cons: [
      'Vehicle combat, while cinematic, is somewhat underutilized in main missions',
      'Very high PC requirements to experience full path-tracing features'
    ],
    verdict:
      'Phantom Liberty is a focused, well-paced expansion that benefits enormously from the 2.0 combat overhaul underneath it. Full path tracing is genuinely demanding on PC hardware, and the vehicle combat set pieces are more memorable than the systems supporting them.',
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
      'Baldur\'s Gate 3 translates D&D 5th Edition rules into a turn-based RPG with an unusual amount of reactivity — most encounters have a non-combat solution if you look for one. A single playthrough of Acts 1 through 3 runs 100+ hours, and Act 3\'s crowded city noticeably strains CPU performance.',
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
      'A single playthrough runs 100+ hours with no microtransactions, and the number of viable class and origin combinations gives it replay value well beyond that first run.',
    pros: [
      'Narrative reactivity where most decisions have visible downstream consequences',
      'Tactical combat that rewards environmental use — height, surfaces, and terrain',
      'Companion writing and voice performances that hold up across a full playthrough',
      'High replay value across different origin characters and class builds'
    ],
    cons: [
      'Dense inventory system can feel clunky across prolonged campaigns',
      'Act 3 urban centers can cause noticeable CPU framerate dips'
    ],
    verdict:
      'Baldur\'s Gate 3 sets a high bar for how much a CRPG can react to player choice without breaking. The tactical combat and companion writing carry the whole runtime, even though Act 3\'s performance dips and the cluttered inventory system are real friction points on a 100-hour game.',
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
      'Alan Wake 2 splits its 20-to-25-hour campaign between Saga Anderson\'s investigation and Alan\'s reality-editing Plot Board, mixing live-action footage with in-engine rendering. Ammunition scarcity keeps the pacing tense, though the mesh-shader visual effects require a fairly modern GPU.',
    gameplay:
      'Slowing down the frenetic combat of the 2010 original in favor of genuine survival horror pacing was an inspired choice. Ammunition is sparse, flashlight batteries are precious, and each enemy encounter feels tense and intimate. Saga Anderson’s Case Board and Alan Wake’s Plot Board provide engaging mental pauses where you construct narrative deductions and literally rewrite architectural reality.',
    graphics:
      'Remedy’s Northlight engine produces some of the most striking visuals of this console generation. Dynamic volumetric mist winding through Pacific Northwest pine forests and the neon-drenched nightmarish alleys of the Dark Place set a new standard for atmospheric horror fidelity.',
    sound:
      'Spatial audio design makes every floorboard creak, disembodied whisper, and metallic rumble feel close, which does most of the work in maintaining tension between encounters. The musical interludes and Old Gods of Asgard sequences function as clear tonal punctuation marks in the campaign.',
    performance:
      'PC users require capable modern GPUs with mesh shader support, but the visual payoff is extraordinary. On consoles, Performance Mode maintains a smooth 60 FPS target with minimal compromises in visual immersion.',
    contentDepth:
      'A tightly paced 20-to-25-hour dual campaign that offers secrets, nursery rhymes, Words of Power upgrades, and hidden cult stashes without diluting the narrative momentum.',
    value:
      'A distinctive, tightly authored horror campaign in a genre where most big-budget releases play it safe — worth the GPU requirements for players who specifically want narrative-driven horror.',
    pros: [
      'Dual-protagonist structure ties live-action footage into the in-engine story cleanly',
      'Deliberate survival horror pacing with genuinely scarce ammunition and batteries',
      'Northlight engine lighting and weather effects hold up on capable hardware',
      'Spatial audio design that makes every creak and whisper feel close'
    ],
    cons: [
      'High GPU requirements on older PC systems',
      'A few repetitive jump scares in the first two chapters'
    ],
    verdict:
      'Alan Wake 2 commits fully to a slower, more deliberate survival horror pace than the 2010 original, and the dual Case Board / Plot Board structure gives its detective and meta-fiction threads room to breathe. The hardware requirements and a handful of overused jump scares in the opening chapters are its clearest weak points.',
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
      'Helldivers 2 is a four-player cooperative shooter where stratagem call-ins, permanent friendly fire, and a live, server-wide Galactic War campaign combine to create most of its best moments. Weapon balance patches have been frequent enough that favorite loadouts don\'t always stay favorite for long.',
    gameplay:
      'Weapons have physical weight, bullets originate from the barrel rather than the camera, and reloading prematurely discards remaining rounds in the magazine — small details that make the gunplay feel deliberate. Inputting stratagem directional combinations while a Bile Titan closes in forces genuine split-second decisions, and permanent friendly fire means squads have to communicate.',
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
      'Cooperative loop built around stratagem timing and mandatory squad communication',
      'Weighty gunplay with realistic bullet origin points and armor penetration',
      'Server-wide Galactic War campaign that ties individual missions to a shared outcome',
      'Warbond progression is earnable through play, without pay-to-win locks'
    ],
    cons: [
      'Server strain during peak global galactic operations',
      'Can feel punishing when playing with silent or uncoordinated random lobbies'
    ],
    verdict:
      'Helldivers 2 pairs weighty, physics-driven gunplay with a monetization model that avoids pay-to-win mechanics, and the live Galactic War gives squads a reason to keep dropping in. Server strain during peak hours and uneven matches with uncoordinated random squads are the recurring downsides.',
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
      'Balatro takes standard poker hands and stacks 150 Joker cards on top of them, turning a familiar ruleset into a roguelike about multiplier math rather than card luck. A single run is short enough to restart immediately, which is part of why it\'s easy to lose track of time playing it.',
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
      'Short run length makes it easy to start "just one more" attempt',
      'Deep Joker synergies that reward planning trigger order and positioning',
      'Satisfying audio-visual feedback on large multiplier triggers',
      'Runs at a stable framerate on everything from desktop rigs to handhelds and mobile'
    ],
    cons: [
      'Unfavorable late-game Boss Blind counters can abruptly end deep runs',
      'Can easily derail your sleep schedule'
    ],
    verdict:
      'Balatro is a tightly scoped roguelike built almost entirely around one scoring formula, and the depth comes from how many ways 150 Jokers can interact with it rather than from content volume. Unfavorable Boss Blind draws can end a strong run abruptly, which is the main source of frustration in an otherwise low-friction game.',
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
