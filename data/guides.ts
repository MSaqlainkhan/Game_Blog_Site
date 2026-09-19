import { Guide } from '@/types';

export const guides: Guide[] = [
  {
    id: 'shadow-of-the-erdtree-scadutree-fragment-progression',
    slug: 'shadow-of-the-erdtree-scadutree-fragment-progression',
    title: 'Shadow of the Erdtree: Scadutree Fragment Progression and Stat Scaling Playbook',
    category: 'Strategies',
    summary:
      'Understanding how the expansion’s regional blessing system works, priority fragment locations in early regions, and how to calibrate your character before facing major Remembrance bosses.',
    heroImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    readTime: '8 min read',
    publishedAt: 'June 25, 2024',
    updatedAt: 'July 2, 2024',
    author: {
      name: 'Marcus Vance',
      role: 'Senior Editorial Reviewer'
    },
    gameSlug: 'elden-ring-shadow-of-the-erdtree',
    gameTitle: 'Elden Ring: Shadow of the Erdtree',
    sections: [
      {
        title: 'How Scadutree Blessings Actually Work',
        content:
          'Unlike the base Lands Between where your survivability depends strictly on your Rune Level and Vigor stat, the Land of Shadow employs an independent scaling layer known as Scadutree Blessings (for your character) and Revered Spirit Ash Blessings (for your summons and spectral steed). Each blessing tier confers a percentage-based boost to physical, magic, fire, lightning, and holy damage negation, alongside a direct multiplier to your total offensive attack power. Even a Level 250 character will feel fragile without blessing levels.',
        keyPoints: [
          'Level 1 to 10 provides the steepest percentage gains per fragment tier',
          'Blessings only activate while inside the Land of Shadow and deactivate upon returning to the Lands Between',
          'A total of 50 Scadutree Fragments are scattered across the map to reach the maximum Level 20 cap'
        ]
      },
      {
        title: 'Safe Early-Game Fragment Route (Gravesite Plain & Scadu Altus)',
        content:
          'Before attempting the dancing lion in Belurat or Rellana in Castle Ensis, you can easily obtain 10 to 12 fragments without initiating a single major boss encounter. In Gravesite Plain, check the Church of Consolation in the far southeast corner for two guaranteed fragments. Seek out wandering Pot-bearing shadows throughout the ruins; defeating them before they vanish yields fragments directly into your inventory. In Castle Ensis, locate the checkpoint shrine before the courtyard gate to secure two additional fragments.',
        keyPoints: [
          'Church of Consolation: 2 Fragments guarded by Black Knight Garrew',
          'Three-Path Cross Site of Grace: 1 Fragment alongside hornsent NPC',
          'Main Gate Cross outside Belurat: 1 Fragment adjacent to Moore and Ansbach',
          'Pillar Path Waypoint: 1 Fragment sitting on the stone altar'
        ]
      },
      {
        title: 'Recommended Blessing Thresholds for Major Encounters',
        content:
          'Do not bash your head against colossal encounters when your defensive absorption is lagging. If a boss is eliminating your entire health bar in two standard swipes, you are under-leveled in blessing tiers. Here is our tested roadmap for a balanced progression experience without artificial frustration.',
        keyPoints: [
          'Belurat Legacy Dungeon (Dancing Beast): Blessing Level 3 to 4',
          'Castle Ensis (Twin Moon Knight): Blessing Level 5 to 6',
          'Shadow Keep Entrance (Golden Hippopotamus): Blessing Level 8 to 10',
          'Ancient Ruins of Rauh & Specimen Storehouse: Blessing Level 12 to 14',
          'Enir-Ilim & Final Boss: Blessing Level 17 to 20'
        ]
      },
      {
        title: 'Optimizing Defensive Talismans',
        content:
          'Because Scadutree blessings multiply your baseline percentage resistances, stacking defense talismans produces exponential returns. Equip the Dragoncrest Greatshield Talisman for an immediate 20% boost to physical damage negation. Pair it with elemental negation talismans (Pearl Drake +3, Flamedrake +3, or Golden Braid) depending on the damage types of your specific boss nemesis.',
        keyPoints: [
          'Golden Braid (Holy Negation +35%) is indispensable for end-game bosses',
          'Opaline Hardtear in your Flask of Wondrous Physick stacks additively with blessings',
          'Avoid soreseals or scarseals, as their 15% damage penalty severely punishes late-game absorption'
        ]
      }
    ],
    keyTips: [
      'Always observe glowing pot shadows from a distance and sprint to ambush them before they despawn.',
      'Cross markers left by Miquella invariably contain either a Scadutree Fragment or crucial NPC dialogue.',
      'Check Miquella Cross maps in your inventory to track unvisited landmark shrines across high mountain passes.',
      'If you get stuck on a boss, explore another branch of the vertical map—there are almost always fragments accessible elsewhere.'
    ],
    relatedGuideSlugs: [
      'baldurs-gate-3-honour-mode-survival-guide',
      'cyberpunk-2077-ultimate-cyberware-synergy-builds'
    ],
    relatedGameSlugs: ['elden-ring-shadow-of-the-erdtree', 'armored-core-vi', 'baldurs-gate-3']
  },
  {
    id: 'cyberpunk-2077-ultimate-cyberware-synergy-builds',
    slug: 'cyberpunk-2077-ultimate-cyberware-synergy-builds',
    title: 'Cyberpunk 2077 (2.0+): Ultimate Cyberware Synergy and Stat Cap Optimization',
    category: 'Builds',
    summary:
      'Master the post-2.0 cyberware capacity system, the best chrome combinations for Sandevistan, Berserk, and Cyberdeck setups, and how to maximize the Edgerunner perk.',
    heroImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    readTime: '9 min read',
    publishedAt: 'October 12, 2023',
    updatedAt: 'January 15, 2024',
    author: {
      name: 'Elena Rostova',
      role: 'Lead RPG Critic'
    },
    gameSlug: 'cyberpunk-2077-phantom-liberty',
    gameTitle: 'Cyberpunk 2077: Phantom Liberty',
    sections: [
      {
        title: 'The 2.0 Cyberware Architecture Explained',
        content:
          'In Cyberpunk 2077 patch 2.0 and Phantom Liberty, clothing no longer provides armor values (outside of a few select tactical vests and helmets). Your survivability and defensive thresholds now reside entirely within your skeletal, dermal, and circulatory cyberware implants. You possess a strict Cyberware Capacity meter governed by your character level and the Technical Ability attribute tree.',
        keyPoints: [
          'Armor rating reduces incoming kinetic and elemental projectile damage directly',
          'Exceeding your capacity limit requires the Technical Ability level 20 "Edgerunner" perk',
          'Upgrading cyberware at ripperdocs rerolls stat modifiers based on your chip tier'
        ]
      },
      {
        title: 'The "Apogee" Sandevistan Shinobi Infiltrator',
        content:
          'This build slows time to a crawl while delivering devastating critical katana strikes and throwing knives. The cornerstone is the Militech "Apogee" Sandevistan, which allows toggling time dilation on and off at will rather than waiting for full cooldown cycles, refunding duration for every enemy neutralized while active.',
        keyPoints: [
          'Operating System: Militech "Apogee" Sandevistan (Tier 5++)',
          'Circulatory System: Blood Pump + Biomonitor for automated healing whenever health dips below 50%',
          'Nervous System: Adreno-trigger and Reflex Tuner for continuous movement speed buffs',
          'Skeletal System: Epimorphic Skeleton and Dense Marrow for melee stamina reduction and heavy armor'
        ]
      },
      {
        title: 'The Netrunner Overclock Demon',
        content:
          'Modern netrunning centers around the "Overclock" mechanic, which allows spending your health bar as RAM once your active RAM pool is depleted. By pairing the Tetratronic Rippler or Militech Paraline Cyberdeck with health-regenerating circulatory chrome, you can queue multiple high-tier ultimate quickhacks across entire rooms in seconds.',
        keyPoints: [
          'Operating System: Tetratronic Rippler Mk.5 for massive weapon damage bonuses against hacked targets',
          'Crucial Quickhacks: Cyberware Malfunction (stacked twice) + Short Circuit for devastating burst shock',
          'Frontal Cortex: Axolotl (reduces all cyberware cooldowns by up to 10% per kill) and Memory Boost',
          'Perk Anchor: "Spillover" in the Intelligence tree to spread hacks to neighboring hostiles'
        ]
      },
      {
        title: 'Maximizing the "Edgerunner" Fury State',
        content:
          'When taking the Edgerunner perk, your cyberware capacity expands by up to 50 points into a yellow warning zone at the cost of a minor percentage penalty to maximum health. In exchange, killing enemies while in combat grants a chance to trigger "Fury"—a state conferring +10% damage, +30% crit damage, and +50% critical strike chance accompanied by maniacal laughter and screen distortion.',
        keyPoints: [
          'Hunt for Cyberware Capacity Shards dropped by elite Arasaka and Barghest officers',
          'Equip Chrome Compressor if you wish to bypass active OS abilities for pure raw stat supremacy',
          'Use the "Chipware Connoisseur" perk to hand-pick the secondary stat rolls on every upgrade'
        ]
      }
    ],
    keyTips: [
      'Never skip visiting Ripperdocs whenever you advance a character tier (levels 10, 20, 30, 40, 50).',
      'The Biomonitor + Blood Pump synergy eliminates the need to manually press health buttons during intense firefights.',
      'Always disassemble unwanted green and blue weapons to accumulate Tier 5 crafting components for upgrading iconic chrome.'
    ],
    relatedGuideSlugs: [
      'shadow-of-the-erdtree-scadutree-fragment-progression',
      'helldivers-2-high-difficulty-loadout-breakdown'
    ],
    relatedGameSlugs: ['cyberpunk-2077-phantom-liberty', 'elden-ring-shadow-of-the-erdtree', 'alan-wake-2']
  },
  {
    id: 'baldurs-gate-3-honour-mode-survival-guide',
    slug: 'baldurs-gate-3-honour-mode-survival-guide',
    title: 'Baldur’s Gate 3: Honour Mode Survival Playbook — Camp Economy and Boss Actions',
    category: 'Walkthroughs',
    summary:
      'A tactical survival blueprint for completing the single-save Honour Mode, covering Legendary Actions of Act 1 & 2 bosses, safe positioning, and risk mitigation.',
    heroImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    readTime: '10 min read',
    publishedAt: 'December 10, 2023',
    updatedAt: 'March 8, 2024',
    author: {
      name: 'Elena Rostova',
      role: 'Lead RPG Critic'
    },
    gameSlug: 'baldurs-gate-3',
    gameTitle: "Baldur's Gate 3",
    sections: [
      {
        title: 'Core Rules of Honour Mode',
        content:
          'Honour Mode enforces strict permadeath mechanics: you have only one save slot that saves continuously upon decisions and combat turns. If your entire four-member party is wiped, your Honour run is terminated (you can continue in custom mode, but the golden D20 die achievement is forfeited). Furthermore, major bosses possess brand-new "Legendary Actions" that trigger automatically outside regular turn order.',
        keyPoints: [
          'Full Total Party Kill (TPK) ends the Honour attempt permanently',
          'Bosses possess Legendary Actions that retaliate immediately against standard offensive spells',
          'Camp supplies cost 80 food instead of 40 for a Long Rest',
          'Action Economy exploits (such as Haste granting full multi-attacks) are strictly rebalanced'
        ]
      },
      {
        title: 'The Act 1 Danger Zones: Owlbear, Spider Matriarch, and Grym',
        content:
          'Overconfidence in Act 1 is the number one cause of wiped runs. The Phase Spider Matriarch summons swarms and retaliates against fallen eggs; destroy the webbing bridges beneath her with fire bolts while she stands upon them to inflict 40+ falling damage. For the Owlbear, be prepared for her mate to drop in as a secondary boss via Legendary Action; focus down the original mother before engaging the mate.',
        keyPoints: [
          'Phase Spider: Shoot webs beneath her feet; carry Antidote potions on all party members',
          'Owlbear: Bring the two Absolute cultists outside the cave to absorb initial claw strikes',
          'Grym (Adamantine Forge): Keep high ground on the stairs and use the massive forge hammer twice with Minor Illusion baiting'
        ]
      },
      {
        title: 'Essential Party Composition and Safety Protocols',
        content:
          'Never explore uncharted territory with all four party members clustered together in tight formation. Area-of-effect ambush spells (such as surprise Fireballs or barrel explosions) can wipe a clumped party before you get a turn. Keep a high-initiative Scout (Gloomstalker Assassin or Throwing Barbarian) ahead, and maintain at least one character capable of Misty Step or Sanctuary to flee combat and revive fallen comrades at Withers in camp.',
        keyPoints: [
          'Slot 1: Frontline Control / Tank (Paladin/Sorcerer multiclass or Open Hand Tavern Brawler Monk)',
          'Slot 2: Ranged High Burst Damage (Gloomstalker 5 / Assassin 3 / Battle Master 4)',
          'Slot 3: Support & Buff Master (Life or Light Domain Cleric with Radiant Orb gear)',
          'Slot 4: Utility & Crowd Control (Divination Wizard with Portent dice to guarantee vital spell saves)'
        ]
      },
      {
        title: 'Camp Buff Economy (Warding Bond and Longstrider)',
        content:
          'You can recruit hirelings from Withers to act as designated Camp Buffers. After each Long Rest, have your camp hirelings cast Longstrider (+3m movement on everyone for free), Aid (+5 to +25 maximum HP), Freedom of Movement, and Heroes\' Feast on your active party members before leaving camp. Because the hirelings remain safely at camp, these buffs last until your next rest without endangering your spell slots.',
        keyPoints: [
          'Longstrider is a ritual spell: cast it on all four party members every morning for free mobility',
          'Death Ward on your squishiest character prevents sudden one-shot wipe incidents',
          'Stockpile Elixirs of Hill Giant Strength from Auntie Ethel in the Druid Grove early on'
        ]
      }
    ],
    keyTips: [
      'Always inspect boss tooltips before making an attack to read their active Legendary Action triggers.',
      'In conversations with unpredictable consequences (Vlaakith, Bernard, Raphael), choose respectful dialogue rather than testing provocative lines.',
      'Always keep Invisibility Potions on every character hotbar as an emergency escape ticket.',
      'Never send your whole party across rickety elevators or moving platforms together—move one character at a time.'
    ],
    relatedGuideSlugs: [
      'shadow-of-the-erdtree-scadutree-fragment-progression',
      'balatro-deck-building-joker-synergies-guide'
    ],
    relatedGameSlugs: ['baldurs-gate-3', 'elden-ring-shadow-of-the-erdtree', 'manor-lords']
  },
  {
    id: 'helldivers-2-high-difficulty-loadout-breakdown',
    slug: 'helldivers-2-high-difficulty-loadout-breakdown',
    title: 'Helldivers 2: High-Difficulty Terminid & Automaton Loadout Breakdown (Helldive & Super Helldive)',
    category: 'Tips & Tricks',
    summary:
      'Optimal weapon loadouts, armor passives, and stratagem compositions necessary to extract successfully on Difficulty 9 and 10 planetary operations.',
    heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    readTime: '7 min read',
    publishedAt: 'April 5, 2024',
    updatedAt: 'August 10, 2024',
    author: {
      name: 'Julian Hayes',
      role: 'Hardware & Tech Editor'
    },
    gameSlug: 'helldivers-2',
    gameTitle: 'Helldivers 2',
    sections: [
      {
        title: 'The Terminid (Bug) Front: Mobility & Armor Piercing',
        content:
          'Against Terminid swarms on high difficulties, stagnation equals death. Chargers, Stalkers, and colossal Bile Titans will overwhelm any squad that attempts to establish static defensive firing lines. Lightweight armor with the "Scout" passive (reduces detection range by 30%) or "Engineering Kit" (+2 grenades and 30% less recoil when crouching) is paramount for outrunning Hunters.',
        keyPoints: [
          'Primary: SG-225IE Breaker Incendiary or JAR-5 Dominator for fast crowd clearing',
          'Support Weapon: Quasar Cannon or EAT-17 (Expendable Anti-Tank) for one-shotting Charger heads',
          'Crucial Stratagems: Orbital Precision Strike + Eagle 500kg Bomb for rapid Bile Titan deletion',
          'Backpack: Shield Generator Pack to nullify Stalker tongue slaps and hunter acid slows'
        ]
      },
      {
        title: 'The Automaton (Bot) Front: Cover, Stagger, and Anti-Air',
        content:
          'The Automaton front plays like a tactical military shooter where hard cover is required. Rocket Devastators and Heavy Devastators will suppress and eliminate standing players across 100-meter fields. Medium or Heavy armor with the "Fortified" passive (50% explosive damage resistance and 30% crouch recoil reduction) is mandatory.',
        keyPoints: [
          'Primary: Plas-1 Scorcher or CB-9 Exploding Crossbow to stagger Devastators through shields',
          'Support Weapon: Autocannon (AC-8) or AMR (Anti-Materiel Rifle) for headshot snipes on Hulks',
          'Crucial Stratagems: Eagle Airstrike (clears fabricators and patrols reliably) and Orbital Laser',
          'Tactics: Always prioritize destroying Jammer Towers and Detector Towers before main objectives'
        ]
      },
      {
        title: 'Coordinated Squad Composition for Super Helldive',
        content:
          'A balanced squad of four should designate specific tactical roles rather than all carrying identical equipment. One designated Anti-Heavy specialist, one Crowd Sweeper, one Objective Infiltrator, and one Flex/Support creates an unstoppable unit.',
        keyPoints: [
          'Player 1 (Anti-Armor): Spear or Recoilless Rifle with team reload communication',
          'Player 2 (Area Denial): Flamethrower/Gas Strike and EMS Mortar Sentry',
          'Player 3 (Recon Infiltrator): Scout armor, Jump Pack, and Radar booster',
          'Player 4 (Support Anchor): Supply Pack, Laser Cannon, and Localization Confusion booster'
        ]
      }
    ],
    keyTips: [
      'Disengage from pointless fights: you earn zero experience or samples from killing wandering patrols.',
      'Drop your collected samples at the extraction pad early so you do not risk losing them across the map.',
      'The Orbital Precision Strike has a 1-second call-in time when fully upgraded, making it just as effective as a 500kg bomb with faster cooldown.',
      'Coordinate with your squad to destroy Stalker Nests the instant a Stalker becomes visible.'
    ],
    relatedGuideSlugs: [
      'balatro-deck-building-joker-synergies-guide',
      'shadow-of-the-erdtree-scadutree-fragment-progression'
    ],
    relatedGameSlugs: ['helldivers-2', 'cyberpunk-2077-phantom-liberty', 'balatro']
  },
  {
    id: 'balatro-deck-building-joker-synergies-guide',
    slug: 'balatro-deck-building-joker-synergies-guide',
    title: 'Balatro: Deck Building Fundamentals, Multiplier Sequencing, and Joker Synergies',
    category: 'Beginner Guides',
    summary:
      'The essential mathematical guide to conquering Ante 8: how chips and multipliers interact, Joker slot positioning rules, and high-synergy combos.',
    heroImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
    readTime: '6 min read',
    publishedAt: 'March 20, 2024',
    updatedAt: 'May 14, 2024',
    author: {
      name: 'Julian Hayes',
      role: 'Hardware & Tech Editor'
    },
    gameSlug: 'balatro',
    gameTitle: 'Balatro',
    sections: [
      {
        title: 'The Golden Formula: Chips × (+Mult) × (×Mult)',
        content:
          'Balatro scores your hands using a straightforward mathematical equation: Total Chips multiplied by your Multiplier. The crucial insight that separates novice players from Ante 8 victors is the difference between additive multiplier (+Mult) and multiplicative multiplier (×Mult). Additive Mult adds a flat sum to your multiplier, whereas Multiplicative Mult multiplies your entire accumulated multiplier by that number.',
        keyPoints: [
          'Additive Mult (+4, +15, +30) should always trigger BEFORE Multiplicative Mult (×1.5, ×2, ×3)',
          'Jokers trigger from LEFT to RIGHT: always place your flat chips and +Mult on the left, and ×Mult on the far right',
          'Failing to place ×Mult Jokers on the far right will drastically diminish your final score calculation'
        ]
      },
      {
        title: 'The Blueprint / Brainstorm / Baron Trinity',
        content:
          'Among the 150 Jokers in Balatro, Jokers that copy other Joker abilities are the undisputed royalty. "Blueprint" copies the ability of the Joker to its right, and "Brainstorm" copies the leftmost Joker. By placing high-scaling multiplicative Jokers (such as Constellation, Cavendish, or Baron) in the targeted slot, you double or triple exponential scaling.',
        keyPoints: [
          'Baron (each King held in hand gives ×1.5 Mult) + Mime (retriggers all cards held in hand)',
          'Photograph (first face card gives ×2 Mult) + Hanging Chad (retriggers first played card twice) = ×8 multiplier from one card',
          'DNA (creates a duplicate of first played card if only 1 card is played) for rapidly stacking customized enhanced cards'
        ]
      },
      {
        title: 'Shop Economy and Interest Management',
        content:
          'Money is the lifeblood of your run. For every $5 in your bank at the end of a round, you earn $1 in interest up to a default cap of $25 (earning $5 per round). In the early Antes (Ante 1 and 2), refrain from rerolling the shop unnecessarily. Reach the $25 interest threshold as quickly as possible, and only spend income generated above $25.',
        keyPoints: [
          'Try to defeat Ante 1 Small and Big Blinds in a single hand each to maximize money rewards',
          'Purchase Investment Tags or Economy Jokers (Golden Joker, Mail-In Rebate, To the Moon) early to supercharge compounding interest',
          'Planet cards level up your preferred hand base values, providing consistent scoring floor even with cold card draws'
        ]
      }
    ],
    keyTips: [
      'Always rearrange your Joker order before clicking Play Hand—Joker positioning can double or quadruple your score!',
      'Check the upcoming Boss Blind at the start of each Ante so you do not build toward a Flush when "The Club" or "The Eye" is waiting.',
      'Tarot cards like "The Hanged Man" (destroys 2 selected cards) are more valuable than adding random cards because they thin your deck toward your best hands.',
      'Glass cards grant ×2 Mult but have a 1 in 4 chance to shatter—save them for clutch Boss Blind completions.'
    ],
    relatedGuideSlugs: [
      'baldurs-gate-3-honour-mode-survival-guide',
      'shadow-of-the-erdtree-scadutree-fragment-progression'
    ],
    relatedGameSlugs: ['balatro', 'hades-2', 'baldurs-gate-3']
  },
  {
    id: 'alan-wake-2-inventory-words-of-power-guide',
    slug: 'alan-wake-2-inventory-words-of-power-guide',
    title: 'Alan Wake 2: Inventory Management, Words of Power Locations, and Echo Alignments',
    category: 'Secrets',
    summary:
      'Maximize Saga’s weapon charms and Alan’s Words of Power across Bright Falls, Watery, and the surreal Dark Place.',
    heroImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    readTime: '7 min read',
    publishedAt: 'November 8, 2023',
    updatedAt: 'January 20, 2024',
    author: {
      name: 'Marcus Vance',
      role: 'Senior Editorial Reviewer'
    },
    gameSlug: 'alan-wake-2',
    gameTitle: 'Alan Wake 2',
    sections: [
      {
        title: 'Finding and Aligning Words of Power in the Dark Place',
        content:
          'While playing as Alan Wake, Words of Power are hidden graffiti spirals made of golden text, visible only when shining your flashlight beam directly from specific angles. Spotting these spirals awards skill points into specific enhancement categories: Words of War (firearm damage), Words of Aid (healing and flares), Words of Fix (health expansion), and Words of Stuff (inventory capacity).',
        keyPoints: [
          'Listen for the subtle high-pitched whistling audio frequency when near an undiscovered spiral',
          'Flashlight focus is required: center the golden ring until the chime rings and upgrade points are granted',
          'Prioritize "Words of Stuff" early to unlock extra inventory rows for Alan\'s crowded attache case'
        ]
      },
      {
        title: 'Mastering Saga’s Cult Stashes and Nursery Rhymes',
        content:
          'In Bright Falls, Cauldron Lake, and Watery, Saga Anderson encounters locked Cult Stashes requiring mathematical deductions or environmental key hunts. Cracking these containers rewards precious ammunition, Trauma Pads, and rare weapon expansion pouches. Simultaneously, solving wooden doll Nursery Rhymes alters regional reality to spawn powerful Charms for Saga’s bracelet.',
        keyPoints: [
          'Coffee Mug Charm: Prevents death once upon fatal damage, breaking in the process',
          'Lantern Charm: Increases Saga\'s flashlight battery charge rate by 10%',
          'Deer Mask Charm: Prevents Saga from being staggered or interrupted while reloading',
          'Kalevala Knights Workshop contains the bolt cutters needed to open chain-link gated areas'
        ]
      },
      {
        title: 'Inventory Economy and Shoebox Caching',
        content:
          'Survival horror requires strict item discipline. Never carry more than 2 full magazines of pistol ammo and 8 shotgun shells on Saga\'s person at once. Use Break Rooms as safe havens to deposit surplus flares, flashbangs, and propane tanks into the universal Shoebox cache.',
        keyPoints: [
          'Always keep one open 2x2 grid slot free when venturing into unexplored territory to avoid abandoning rare items',
          'Combine low-charge batteries with flashlights before entering dark forests rather than hoarding them',
          'Flares interrupt enemy grappling attacks instantly—keep one slotted on your quick-select D-pad'
        ]
      }
    ],
    keyTips: [
      'Whenever you notice golden arrows painted on trees or building walls, follow them with your flashlight focused.',
      'Saga’s Mind Place Case Board will indicate when an area has uncollected clues or unresolved stashes.',
      'Switch between Saga and Alan’s campaigns periodically at the janitor’s bucket in Break Rooms for optimal narrative pacing.'
    ],
    relatedGuideSlugs: [
      'cyberpunk-2077-ultimate-cyberware-synergy-builds',
      'shadow-of-the-erdtree-scadutree-fragment-progression'
    ],
    relatedGameSlugs: ['alan-wake-2', 'cyberpunk-2077-phantom-liberty', 'elden-ring-shadow-of-the-erdtree']
  }
];
