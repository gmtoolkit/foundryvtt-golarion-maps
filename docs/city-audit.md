# Painted City Audit

Every painted scene (all 303: towns, cities, world/continent, meta-region, nation, and city-region maps): my visual verdict of the painted image vs the PathfinderWiki description. Mismatches get biome-aware re-rolls (batch).

## Summary (audit complete, 303/303)

- **✅ pass: 130** — **❌ mismatch: 171** — **❓ verify: 2**
- **PIN-LEAK (9):** Tar-Kazmukh, Braganza, Chesed, Clear Waters, Gazbilah, Martel, Mut, Sukri, Yin-Sichasi, Zurakan — giant map-pin glyphs painted into the art; fix by recomposite or re-roll. (Thulsadus also has minor ring-icon leaks.)
- **REMOVE (6):** Alabaster Academy, Fancy Reefclaw, Gold Goblin (building POIs, not settlements) + Gholinom, Irim, Pobashabla (underwater cities) — delete the scenes.
- **❓ VERIFY (2):** Pinnacle, Sawtooth Marketplace — no wiki article; confirm they are real settlements before keeping.
- **Dominant town defect classes:** wrong biome/culture (Tian Xia, Arcadia/Xopatl, Mwangi jungle, desert, frozen north/Irrisen, gothic Nidal/Geb/Ustalav, Shackles tropical, underground dwarven cities painted open-air); under-scaled famous metropolises (Quantium, Ngōn Hoa, Xin-Shalast); over-scaled small towns (Otari).
- **Region-map defect pattern:** Gemini turned pale grassland into sand-dune desert on many 10mi city-region maps (Korvosa, Almas, Egorian, Daggermark, Pitax, Elidir, Tamran, Caliphas, Nantambu, Thronestep, Sandpoint, Ravounel, Galt, Razmiran) and painted bogus snowfields (Druma, Katapesh-north, Ustalav center); Irrisen/Whitethrone lack their canonical eternal winter; Crown of the World's High Ice reads as sand desert; Cheliax nation map is mis-framed (fit/center bug, not art).

| City | Match | Description (wiki) | Image |
|---|---|---|---|
| Bolgrad | ❌ | "Underground mining city… cavern city's gem-rich ceiling ('Star-Studded Bolgrad')" | Painted as open-air walled river town | [image](../painted/assets/scenes/bolgrad-town.webp) |
| Coralesian | ❌ | "Small town high in the NE Five Kings Mountains, settled by elves" | Painted as sandy lakeside town, no mountains | [image](../painted/assets/scenes/coralesian-town.webp) |
| Davarn | ❌ | "Town in the SW Five Kings Mountains, center of dwarven culture" | Surface town OK, but flat farmland — mountain terrain missing (borderline) | [image](../painted/assets/scenes/davarn-town.webp) |
| Kovlar | ❌ | "Built in the tunnels and caverns at the outskirts of Saggorak" | Painted as open-air river town | [image](../painted/assets/scenes/kovlar-town.webp) |
| Kykar | ❌ | "Located beneath Mount Gustus" | Painted as open harbor city on blue water | [image](../painted/assets/scenes/kykar-town.webp) |
| Larrad | ❌ | "Built around a cluster of temple-caverns" | Painted as open town, mountains only at edge | [image](../painted/assets/scenes/larrad-town.webp) |
| Peddlegate | ✅ | "City in NE Druma, hard against the Five Kings Mountains" | Walled trade town, farmland — plausible for Druma lowlands | [image](../painted/assets/scenes/peddlegate-town.webp) |
| Prophet's Home | ✅ | "NE Druma; Mercenary League training facilities" | Walled town with docks — plausible | [image](../painted/assets/scenes/prophet-s-home-town.webp) |
| Rolgrimmdur | ❌ | "Built among the ruins of Grakodan; one of the most fortified dwarven cities" | Modest open river town — no fortress, ruins, or mountains | [image](../painted/assets/scenes/rolgrimmdur-town.webp) |
| Taggoret | ❌ | "Seat of the ancient dwarven kingdom; major dwarven city" | Generic small walled town; dwarven stone-city character and mountains missing | [image](../painted/assets/scenes/taggoret-town.webp) |
| Tar-Kazmukh | ❌ | "Northernmost FKM settlement; famous arcane library" | Has a giant literal map-pin painted in the town square (icon leak); no mountain character | [image](../painted/assets/scenes/tar-kazmukh-town.webp) |
| Twingate | ❌ | "Semipermanent city of TENTS on the Gulf of Accord" | Painted as solid stone/timber walled town | [image](../painted/assets/scenes/twingate-town.webp) |
| Absalom (city) | ✅ | "City at the Center of the World; metropolis" | Dense harbor metropolis with districts — matches | [image](../painted/assets/scenes/absalom-city.webp) |
| Al-Hiraf | ✅ | "Qadiran city in Maharev, one of the safest and most fertile regions" | Lush riverside town — desc says fertile, plausible | [image](../painted/assets/scenes/al-hiraf-town.webp) |
| Al-Varish | ❌ | "Massive trading city on the (arid) Plains of Paresh, Qadira" | Modest town in green farmland; scale + arid plains missing | [image](../painted/assets/scenes/al-varish-town.webp) |
| Alabaster Academy | ❌ REMOVE | "A university in Kintargo's Villegre district" — not a settlement | Census mislabel: building inside Kintargo got its own town scene; should be deleted, not re-rolled | [image](../painted/assets/scenes/alabaster-academy-town.webp) |
| Algidheart | ❌ | "Capital of Irrisen province of Bleakmarch (land of eternal winter), on the Rimeflow" | Painted lush green — should be frozen/snowbound | [image](../painted/assets/scenes/algidheart-town.webp) |
| Alkenstar City | ❌ | "Capital of the Grand Duchy in the Mana Wastes" | Sand present on one side but green farmland dominates; wasteland character weak (borderline) | [image](../painted/assets/scenes/alkenstar-city-town.webp) |
| Almas (city) | ✅ | "Capital of Andoran; one of the largest Inner Sea cities" | Coastal district city with harbor and wetlands — matches | [image](../painted/assets/scenes/almas-city.webp) |
| An | ❌ | "Sister city of Sothis, Osirion (desert, worker city of the pharaohs)" | Painted as green temperate river town — Osirian desert missing | [image](../painted/assets/scenes/an-town.webp) |
| Anthusis | ❌ | "Capital of Vidrian, tropical Mwangi coast deepwater port" | Temperate farmland town — jungle/tropical coast missing | [image](../painted/assets/scenes/anthusis-town.webp) |
| Apertan | ❌ | "City in the Arcadian nation of Xopatl; largest market in Xopatl" | Generic euro-medieval town; Arcadian character absent | [image](../painted/assets/scenes/apertan-town.webp) |
| Ardis | ❌ | "Former capital of Ustalav (gothic, faded principality)" | Warm cheerful river town — gothic decay missing | [image](../painted/assets/scenes/ardis-town.webp) |
| Aspenthar | ❌ | "Thuvia's second city-state (desert nation), Inner Sea port" | Green fields — desert missing | [image](../painted/assets/scenes/aspenthar-town.webp) |
| Augustana | ✅ | "Andoran's second city, Inner Sea port on Aspo Bay, huge shipyards" | Temperate coastal town — biome right; shipyard scale understated | [image](../painted/assets/scenes/augustana-town.webp) |
| Avendale | ✅ | "Capital of the River Kingdom of Touvette" | Walled temperate river town — plausible | [image](../painted/assets/scenes/avendale-town.webp) |
| Avilan | ❌ | "Massive Qadiran trading city on the (arid) Plains of Paresh" | Modest green-field town — scale and arid plains missing | [image](../painted/assets/scenes/avilan-town.webp) |
| Ayesh | ❌ | "City on the Alavah Peninsula in Qadira (dry Casmaron coast)" | Lush green coast — Qadiran aridity missing | [image](../painted/assets/scenes/ayesh-town.webp) |
| Azurestone | ❌ | "Galtan town named for a massive blue menhir towering 100 ft above it" | No menhir anywhere in the image — signature landmark missing | [image](../painted/assets/scenes/azurestone-town.webp) |
| Bailax | ❌ | "Capital of a city-state of Iblydos (mythic Hellenic island civilization)" | Generic euro-medieval town — Iblydan character missing | [image](../painted/assets/scenes/bailax-town.webp) |
| Bildt | ❌ | "Large city of the Linnorm Kings on Aegos isle, Steaming Sea (Norse north)" | Temperate green fields — Ulfen/cold character missing | [image](../painted/assets/scenes/bildt-town.webp) |
| Blisterwell | ❌ | "Orc-held former dwarven quarry/strip-mine (Belkzen)" | Tidy walled shore town — should be a scarred quarry-pit orc hold | [image](../painted/assets/scenes/blisterwell-town.webp) |
| Bloodcove | ❌ | "Crime haven where the Vanji meets the Fever Sea, edge of Mwangi jungle" | Temperate coast; mangrove islets hinted but jungle missing | [image](../painted/assets/scenes/bloodcove-town.webp) |
| Botosani | ❌ | "Rahadoumi coastal city (arid Kingdom of Man)" | Green temperate coast — aridity missing | [image](../painted/assets/scenes/botosani-town.webp) |
| Braganza | ❌ PIN-LEAK | "Molthune plains city, Abadar worship center" | Env fine, but multiple literal map-pin glyphs painted at outskirt hamlets | [image](../painted/assets/scenes/braganza-town.webp) |
| Breachill | ❌ | "SMALL town in eastern Isger foothills (inland)" | Painted as a large coastal city on turquoise sea — scale and geography wrong | [image](../painted/assets/scenes/breachill-town.webp) |
| Butraf | ✅ | "Large prosperous city in the FERTILE Qadiran region of Pashman" | Green walled river town — fertile per canon, plausible | [image](../painted/assets/scenes/butraf-town.webp) |
| Carpenden | ✅ | "Andoren city in wine country (Carpenden Hill)" | Farmland/orchard town — matches | [image](../painted/assets/scenes/carpenden-town.webp) |
| Carrion Hill | ❌ | "Ustalav city built atop a strange mound (gothic horror)" | Flat cheerful river town — no hill, no gothic character | [image](../painted/assets/scenes/carrion-hill-town.webp) |
| Cassomir | ✅ | "Taldor's second city, imperial port at the Sellen mouth" | Temperate river-mouth town — biome right, scale understated | [image](../painted/assets/scenes/cassomir-town.webp) |
| Cettigne | ✅ | "Molthune-annexed former city-state" | Temperate walled town — plausible | [image](../painted/assets/scenes/cettigne-town.webp) |
| Chesed | ❌ PIN-LEAK | "HUGE Numerian port city, last stop on the River Road" | Modest town + several white map-pin glyphs painted at hamlets | [image](../painted/assets/scenes/chesed-town.webp) |
| Chillblight | ❌ | "Capital of Irrisen's Feyfrost province, built by cold fey on the Frozen Road" | Green temperate town; the Frozen ROAD painted as a river; zero winter | [image](../painted/assets/scenes/chillblight-town.webp) |
| Clear Waters | ❌ PIN-LEAK | "City that FLOATS atop Lake Clear Waters (Xopatl)" | Ordinary shoreline town, not floating; pin glyph at center | [image](../painted/assets/scenes/clear-waters-town.webp) |
| Corentyn | ✅ | "Chelaxian port capital of Longmarch on the Hesperoth Strait" | Strait-side port town — geography right, plausible | [image](../painted/assets/scenes/corentyn-town.webp) |
| Danjing | ❌ | "Vast Lingshen metropolis (Tian Xia, ~100k people)" | Small euro-medieval castle town — culture and scale wrong | [image](../painted/assets/scenes/danjing-town.webp) |
| Delenah | ❌ | "Massive Qadiran trading city, arid Plains of Paresh" | Modest green town — scale + aridity missing | [image](../painted/assets/scenes/delenah-town.webp) |
| Demirah | ❌ | "Massive Qadiran trading city, arid Plains of Paresh" | Modest green town — scale + aridity missing | [image](../painted/assets/scenes/demirah-town.webp) |
| Detmer | ✅ | "Druma's naval shipyard city on a rocky outcrop in the Gulf of Accord" | Coastal walled town — biome right; outcrop/shipyard scale understated | [image](../painted/assets/scenes/detmer-town.webp) |
| Drenchport | ❌ | "Shackles port on Tempest Cay, constantly lashed by Abendego storms" | Sunny pleasant archipelago town — storm-wracked pirate grit missing | [image](../painted/assets/scenes/drenchport-town.webp) |
| Duwwor | ✅ | "Thuvian city-state at the edge of the Barrier Wall (desert)" | Sandy arid terrain around town — aridity present, matches | [image](../painted/assets/scenes/duwwor-town.webp) |
| Dyinglight | ❌ | "Ruined Sarkoris city amid marshes and sulfurous hotsprings of Frostmire Fen" | Cheerful farmland town — fen, ruin, and dread missing | [image](../painted/assets/scenes/dyinglight-town.webp) |
| Ecanus | ❌ | "Fortress-city of southern Nex, hub of Nex's war machine" | Pleasant river town — fortress character and Nexian strangeness missing | [image](../painted/assets/scenes/ecanus-town.webp) |
| Edme | ✅ | "Galtan city north of the Boarwood, center of learning" | Temperate walled town — plausible | [image](../painted/assets/scenes/edme-town.webp) |
| Egede | ✅ | "Mendev's second city on the Lake of Mists and Veils" | Temperate lakeside town — plausible | [image](../painted/assets/scenes/egede-town.webp) |
| Ehur | ❌ | "Genie city in the center of the KETZ DESERT with elemental embassies" | Green-field river town — desert and genie character absent | [image](../painted/assets/scenes/ehur-town.webp) |
| El-Shelad | ❌ | "Small city on Osirion's Scorpion Coast (desert)" | Some sandy shore but green fields dominate — desert too weak (borderline) | [image](../painted/assets/scenes/el-shelad-town.webp) |
| Erages | ❌ | "SMALL half-elven fishing community on Lake Encarthan" | Large round city — scale and character wrong | [image](../painted/assets/scenes/erages-town.webp) |
| Eranmas | ✅ | "Molthune's second city, home of its Lake Encarthan navy" | Fortified lakeside city with docks — matches | [image](../painted/assets/scenes/eranmas-town.webp) |
| Escadar | ✅ | "Military outpost city on the Isle of Erran near Absalom" | Dense fortified harbor city — plausible | [image](../painted/assets/scenes/escadar-town.webp) |
| Eto | ❌ | "Largest city of central Osirion, desert trade crossroads by the Pillars of the Sun" | Green forest/lake town — desert absent | [image](../painted/assets/scenes/eto-town.webp) |
| Fancy Reefclaw | ❌ REMOVE | "A brewery in Magnimar's Lowcleft district" — not a settlement | Census mislabel (building POI became a town scene) | [image](../painted/assets/scenes/fancy-reefclaw-town.webp) |
| Free Station | ❌ | "Town at the Vanji confluence, Mwangi Expanse (jungle)" | Temperate farmland town — jungle missing | [image](../painted/assets/scenes/free-station-town.webp) |
| Garizés City | ❌ | "City in Arcadian Xopatl, famous musical style" | Generic euro-medieval town — Arcadian character missing | [image](../painted/assets/scenes/gariz-s-city-town.webp) |
| Gazbilah | ❌ PIN-LEAK | "Qadiran city in the Zho Mountain foothills" | Painted as a waterside town with multiple pin glyphs; mountains missing | [image](../painted/assets/scenes/gazbilah-town.webp) |
| Gholinom | ❌ REMOVE | "Secret alghollthu factory-city hidden in an OCEANIC TRENCH" | Underwater alien city painted as lakeside farm town — scene concept invalid | [image](../painted/assets/scenes/gholinom-town.webp) |
| Glimmerhold | ❌ | "Small independent DWARVEN city (mountain hold) in Nirmathas" | Open river town — dwarven hold character absent | [image](../painted/assets/scenes/glimmerhold-town.webp) |
| Gold Goblin | ❌ REMOVE | "A casino in Riddleport's Wharf District" — not a settlement | Census mislabel (building POI became a town scene) | [image](../painted/assets/scenes/gold-goblin-town.webp) |
| Gralton | ✅ | "River Kingdom of Galtan exiles" | Dense walled river town — plausible | [image](../painted/assets/scenes/gralton-town.webp) |
| Grand Pass | ❌ | "Small city at the mountain pass linking Xopatl and Innazpa" | Flat farmland town — mountains and pass missing | [image](../painted/assets/scenes/grand-pass-town.webp) |
| Graydirge | ❌ | "Somber OSSUARY-CITY in undead Geb, foothills of the Shattered Range" | Cheerful colorful coastal port — utterly wrong mood, biome, and geography | [image](../painted/assets/scenes/graydirge-town.webp) |
| Grayhaven | ❌ | "House Garess settlement in the Golushkin MOUNTAINS (Brevoy)" | River town without mountains (borderline) | [image](../painted/assets/scenes/grayhaven-town.webp) |
| Greengold | ✅ | "Elven port city on Lake Encarthan open to non-elves" | Lakeside port town — biome right; elven flavor mild | [image](../painted/assets/scenes/greengold-town.webp) |
| Gujaraldi | ❌ | "Capital of Xopatl (Arcadia)" | Generic euro-medieval town — Arcadian character missing | [image](../painted/assets/scenes/gujaraldi-town.webp) |
| Gurat | ❌ | "Citadel-city clinging to a mountain spire HIGH in the Zho Mountains" | Painted as a beachfront town — completely wrong terrain | [image](../painted/assets/scenes/gurat-town.webp) |
| Hajoth Hakados | ✅ | "Small Numerian trade city on the Seven Tears River" | River trade town — plausible | [image](../painted/assets/scenes/hajoth-hakados-town.webp) |
| Halgrim | ❌ | "Second city of the Linnorm Kings on Battlewall (Ulfen north)" | Temperate harbor town — Norse/cold character missing | [image](../painted/assets/scenes/halgrim-town.webp) |
| Haseong | ❌ | "Cosmopolitan capital of Hwanggot (Tian Xia)" | Euro-medieval city — Tian architecture missing | [image](../painted/assets/scenes/haseong-town.webp) |
| Hawah | ✅ | "City in the Ketz Desert of Qadira" | Sandy arid terrain — desert present, matches | [image](../painted/assets/scenes/hawah-town.webp) |
| Heger | ✅ | "Qadiran city in the Meraz Desert" | Dry tan palette around bay — acceptable aridity | [image](../painted/assets/scenes/heger-town.webp) |
| Hell Harbor | ✅ | "Largest Shackles settlement on Devil's Arches (pirate isle)" | Archipelago harbor town — plausible | [image](../painted/assets/scenes/hell-harbor-town.webp) |
| Hillcross | ❌ | "A vast TENT CITY meeting ground of Mammoth Lords nomads (subarctic steppe)" | Solid stone city in green fields — tents and tundra both missing | [image](../painted/assets/scenes/hillcross-town.webp) |
| Hinji | ✅ | "Chelaxian port city on the Inner Sea (Longmarch)" | Coastal port town — matches | [image](../painted/assets/scenes/hinji-town.webp) |
| Hisuikarasu | ❌ | "Capital of the TENGU nation Kwanlai (Tian Xia)" | Euro castle town — Tian/tengu character missing | [image](../painted/assets/scenes/hisuikarasu-town.webp) |
| Hoarwood | ❌ | "Irrisen city carved from the trunk of a petrified tree in Hoarwood Forest" | Ordinary temperate town — no winter, no tree-city | [image](../painted/assets/scenes/hoarwood-town.webp) |
| Hunthul | ❌ | "Capital of the HOBGOBLIN nation Oprak; gateway to the Onyx Citadel" | Pleasant human river city — hobgoblin fortress character absent | [image](../painted/assets/scenes/hunthul-town.webp) |
| Husanah | ❌ | "Qadiran city in the barren Meraz Desert" | Coastal town with orchards; aridity too weak (borderline) | [image](../painted/assets/scenes/husanah-town.webp) |
| Iadara | ❌ | "Illusion-shrouded, beautiful ELVEN capital of Kyonin" | Massive human-medieval stone city — elven wonder missing | [image](../painted/assets/scenes/iadara-city.webp) |
| Ihalar | ❌ | "UNDERGROUND Khattibi-style city between the Obari and the Meraz" | Open-air coastal castle town | [image](../painted/assets/scenes/ihalar-town.webp) |
| Ilizmagorti | ✅ | "Mediogalti's pirate port (tropical island, Red Mantis)" | Big harbor city with mangrove wetlands — plausible | [image](../painted/assets/scenes/ilizmagorti-city.webp) |
| Ipeq | ❌ | "Third-largest city of southern Osirion (desert), on the Crook River" | Green river town — desert missing | [image](../painted/assets/scenes/ipeq-town.webp) |
| Irim | ❌ REMOVE | "City of AQUATIC elves hidden underwater off Ravounel" | Underwater location painted as a surface town — scene concept invalid | [image](../painted/assets/scenes/irim-town.webp) |
| Isarn | ❌ | "Capital of Galt (inland, on the Sellen)" | Painted with an invented turquoise seacoast — geography wrong | [image](../painted/assets/scenes/isarn-city.webp) |
| Ishad | ✅ | "Large city in the FERTILE Qadiran region of Pashman" | Green walled river town — fertile per canon | [image](../painted/assets/scenes/ishad-town.webp) |
| Izzet | ❌ | "Qadiran city in the barren Meraz Desert" | Green-field bay town — desert missing | [image](../painted/assets/scenes/izzet-town.webp) |
| Jaha | ❌ | "Great CRUMBLING city in the northern Mwangi JUNGLE" | Tidy temperate river town — ruin and jungle both missing | [image](../painted/assets/scenes/jaha-town.webp) |
| Janderhoff | ❌ | "Dwarven SKY CITADEL in the Mindspin Mountains" | Ordinary walled town by a lake — citadel and mountains missing | [image](../painted/assets/scenes/janderhoff-town.webp) |
| Jawafeeq | ❌ | "City on Qadira's arid Alavah Peninsula" | Green fields dominate; some dry cliffs (borderline) | [image](../painted/assets/scenes/jawafeeq-town.webp) |
| Jol | ❌ | "Capital of Southmoor, Lands of the Linnorm Kings (Ulfen north)" | Temperate town — Norse/cold character missing | [image](../painted/assets/scenes/jol-town.webp) |
| Jolizpan | ❌ | "NW Xopatl city near Tumbaja Mountain (Arcadia)" | Euro castle town — Arcadian character and mountain missing | [image](../painted/assets/scenes/jolizpan-town.webp) |
| Kaer Maga (city) | ❌ | "Cliff-top hexagonal fortress-city atop the Storval Rise" | Hexagonal walls preserved (good!) but placed in sea-level marsh — the cliff/plateau is missing | [image](../painted/assets/scenes/kaer-maga-city.webp) |
| Kalios | ❌ | "Midean capital on Kardaji Bay (Iblydos, Hellenic)" | Coastal towns — Hellenic character missing (borderline) | [image](../painted/assets/scenes/kalios-town.webp) |
| Kalsgard | ❌ | "Capital of the Linnorm Kings on the Rimeflow (cold Ulfen Thanelands)" | Warm southern-looking city — Norse/cold character missing | [image](../painted/assets/scenes/kalsgard-city.webp) |
| Karcau | ✅ | "Ustalav's 'shining light of civilization' on Lake Prophyria" | Bright lakeside city — defensible for this specific city | [image](../painted/assets/scenes/karcau-town.webp) |
| Katapesh (city) | ✅ | "Great bazaar trade metropolis on the arid coast" | Dense trade city, tan fields, coast — acceptable | [image](../painted/assets/scenes/katapesh-city.webp) |
| Katheer | ✅ | "Glorious Golden Katheer, capital of Qadira" | Golden-tan metropolis on the river — palette and scale fit | [image](../painted/assets/scenes/katheer-city.webp) |
| Kavapesta | ❌ | "Grim religious center of Ustalav's Amaans on its lake" | Warm cheerful lake town — Ustalav gothic missing (borderline) | [image](../painted/assets/scenes/kavapesta-town.webp) |
| Kazuhn City | ❌ | "Taldan prefecture capital, three-quarters EMPTY and half-abandoned" | Fully alive bustling town — the defining decay absent | [image](../painted/assets/scenes/kazuhn-city-town.webp) |
| Kerim | ✅ | "Large city in FERTILE Pashman, Qadira" | Walled river town in farmland — matches | [image](../painted/assets/scenes/kerim-town.webp) |
| Kerse (city) | ✅ | "Capital of the Kalistocracy of Druma on Lake Encarthan" | Crescent lakeside metropolis — plausible | [image](../painted/assets/scenes/kerse-city.webp) |
| Kharif | ❌ | "Qadiran city in the Zho Mountain foothills" | Green river town — foothills/mountains missing | [image](../painted/assets/scenes/kharif-town.webp) |
| Khundurai | ✅ | "Carpet-weaving city in the Ketz Desert" | Tan/yellow arid surroundings — aridity present | [image](../painted/assets/scenes/khundurai-town.webp) |
| Kintargo (city) | ✅ | "Ravounel's Silver City, harbor at the Yolubilis mouth" | Grand crescent harbor city — matches | [image](../painted/assets/scenes/kintargo-city.webp) |
| Korholm | ✅ | "Molthune's gateway at the Nosam river mouth" | River-mouth town with civic buildings — plausible | [image](../painted/assets/scenes/korholm-town.webp) |
| Korvosa (city) | ✅ | "Varisia's largest city, Chelaxian colonial port" | Grand walled port metropolis — matches | [image](../painted/assets/scenes/korvosa-city.webp) |
| Kraggodan | ❌ | "DWARVEN Sky Citadel city-state in the Mindspin Mountains" | Temperate river town — citadel and mountains missing | [image](../painted/assets/scenes/kraggodan-town.webp) |
| Kragnaroth | ❌ | "FIRE GIANT kingdom in the Mindspin Mountains" | Cozy human walled town — should be a volcanic giant hold | [image](../painted/assets/scenes/kragnaroth-town.webp) |
| Laekastel | ✅ | "Chelaxian city where the Brastle meets the Bay of Deng" | Coastal river-mouth town — matches | [image](../painted/assets/scenes/laekastel-town.webp) |
| Lamasara | ❌ | "Thuvian (desert) city-state on the Junira" | Lush green orchard sprawl — desert missing | [image](../painted/assets/scenes/lamasara-town.webp) |
| Lasinavel | ❌ | "Elven city of feasts on the Kyonin River" | Human medieval town — elven character missing (borderline) | [image](../painted/assets/scenes/lasinavel-town.webp) |
| Lepidstadt | ❌ | "Ustalav's university city of Vieland (gothic)" | Warm cheerful river town — gothic missing | [image](../painted/assets/scenes/lepidstadt-town.webp) |
| Lopul | ❌ | "Large caravan city in Qadira's southern DESERT" | Green-field river town — desert missing | [image](../painted/assets/scenes/lopul-town.webp) |
| Macini | ✅ | "Chelaxian Inner Sea port in Longmarch" | Coastal port town — matches | [image](../painted/assets/scenes/macini-town.webp) |
| Maecho | ❌ | "Slow-paced hot-spring city of Hwanggot (Tian Xia)" | Euro coastal town — Tian character missing | [image](../painted/assets/scenes/maecho-town.webp) |
| Magnimar (city) | ✅ | "Varisia's City of Monuments beside the Mushfens" | Coastal district city with marsh — matches (Irespan understated) | [image](../painted/assets/scenes/magnimar-city.webp) |
| Maheto | ❌ | "Fortified Taldan city in the World's Edge foothills, dwarven smiths" | Modest river town — fortification and foothills missing | [image](../painted/assets/scenes/maheto-town.webp) |
| Manaket | ❌ | "Rahadoum port whose gardens DRIED UP as the desert took them" | Green coastal town — encroaching desert missing | [image](../painted/assets/scenes/manaket-town.webp) |
| Martel | ❌ PIN-LEAK | "Alkenstar duchy town in the Mana Wastes on the Ustradi" | Green castle town with painted RED POI DOTS; wasteland missing (mountains present) | [image](../painted/assets/scenes/martel-town.webp) |
| Mechitar | ❌ | "Capital of undead GEB: black basalt, Osirion-style pyramids" | Warm ordinary river port — utterly wrong | [image](../painted/assets/scenes/mechitar-town.webp) |
| Merev | ✅ | "City on Yanimere Island off Qadira, near the Ketz Desert" | Island coastal town with dry-toned fields — acceptable | [image](../painted/assets/scenes/merev-town.webp) |
| Mirivenn | ❌ | "Settlement of aquatic elves (partly in the water)" | Ordinary land city; model also painted a decorative map FRAME | [image](../painted/assets/scenes/mirivenn-town.webp) |
| Mivon | ✅ | "Aldori swordlords' city in the River Kingdoms" | Temperate river town — plausible | [image](../painted/assets/scenes/mivon-town.webp) |
| Morozny | ❌ | "Regional capital of the Irriseni province of Wintercrux (eternal winter)" | Green temperate river town — no snow or ice anywhere | [image](../painted/assets/scenes/morozny-town.webp) |
| Mut | ✅ PIN-LEAK | "Small Taldan city on the peninsula at the mouth of the Porthmos" | Coastal peninsula town fits, but 3 giant red map-pin glyphs painted at outlying farms | [image](../painted/assets/scenes/mut-town.webp) |
| Mzali | ❌ | "Largest Garundi city south of Katapesh; sun-baked Mwangi city of god-emperor Walkena" | Temperate European walled town with green fields — no jungle, no Mwangi character | [image](../painted/assets/scenes/mzali-town.webp) |
| Naamat | ❌ | "Luxurious TENT city in Qadira's Northern Zho Mountains on the River Ladan" | Ordinary stone walled town — no tents, no mountains | [image](../painted/assets/scenes/naamat-town.webp) |
| Nagaiyamatsu | ❌ | "Port city of the tengu kingdom of Kwanlai (Tian Xia)" | Temperate European port town — no Tian architecture | [image](../painted/assets/scenes/nagaiyamatsu-town.webp) |
| Nerosyan | ✅ | "Mendev capital built as a diamond-shaped defensive fortification" | Diamond-shaped walled city with corner bastions on the rivers — matches canon | [image](../painted/assets/scenes/nerosyan-city.webp) |
| Neruma | ❌ | "Inland Shackles city on the Terwa River (tropical jungle uplands)" | Temperate river town with autumn orchards — no jungle | [image](../painted/assets/scenes/neruma-town.webp) |
| Nesya | ✅ | "Capital of Thieron on the northern Kardaji Bay coast" | Dry-toned coastal town on a sandy bay — plausible | [image](../painted/assets/scenes/nesya-town.webp) |
| New Stetven | ✅ | "Brevoy capital on the southern banks of Lake Reykal" | Large walled lakeside capital — plausible (canon favors wooden buildings, minor) | [image](../painted/assets/scenes/new-stetven-city.webp) |
| Ngōn Hoa | ❌ | "Ornate, soaring capital of Xa Hoi; one of Tian Xia's largest cities" | Small European walled river town — wrong size and no Tian architecture | [image](../painted/assets/scenes/ng-n-hoa-town.webp) |
| Nirfan | ✅ | "Qadiran city in fertile Maharev on the Meraz River" | Fertile green river town — fits the fertile-region call-out | [image](../painted/assets/scenes/nirfan-town.webp) |
| Nisroch | ❌ | "Largest city of shadow-ruled Nidal; a closely watched port" | Warm sunny river town — none of Nidal's gothic gloom | [image](../painted/assets/scenes/nisroch-town.webp) |
| Oenopion | ❌ | "Nexian center of alchemical production (Nex is a blasted arid land)" | Lush temperate river town with autumn woods — no Nexian wasteland or alchemical character | [image](../painted/assets/scenes/oenopion-town.webp) |
| Okeno | ✅ | "The Yellow City: slave port on Stonespine Island off Katapesh" | Desert-backed harbor town on cliffs — biome fits | [image](../painted/assets/scenes/okeno-town.webp) |
| Okim | ✅ | "City of Linvarre (formerly the Taldan colony of Amanandar)" | European-style walled town — actually canon-consistent for a Taldan colony | [image](../painted/assets/scenes/okim-town.webp) |
| Ollo | ❌ | "Pirate town on Shark Island in the Shackles (tropical)" | Temperate island town — no tropical/jungle character | [image](../painted/assets/scenes/ollo-town.webp) |
| Omash | ❌ | "Fortress-city of northern Qadira with a dozen schools of war" | Lush green market town — no fortress character, too temperate for the steppe border | [image](../painted/assets/scenes/omash-town.webp) |
| Oregent | ✅ | "Central Andoran lumber city south of Darkmoon Vale" | Temperate river town with castle, woods and farmland — fits | [image](../painted/assets/scenes/oregent-town.webp) |
| Osibu | ❌ | "City in the Screaming Jungle (Mwangi); streets paved with gold, ringed by statues" | Temperate European walled town — no jungle, no gold, no statues | [image](../painted/assets/scenes/osibu-town.webp) |
| Ostenso | ✅ | "Major Chelish naval port east of Cape Erebus" | Temperate sea-coast port town — fits southern Cheliax | [image](../painted/assets/scenes/ostenso-town.webp) |
| Otari | ❌ | "SMALL port town on the Isle of Kortos at the head of a bay" | Huge crescent metropolis wrapping the bay — badly over-scaled for a ~1,200-person town | [image](../painted/assets/scenes/otari-town.webp) |
| Outsea | ❌ | "River Kingdoms town of aquatic + air-breathing citizens: canals, swampland" | Ordinary dry walled town — no canals or swamp, aquatic character absent | [image](../painted/assets/scenes/outsea-town.webp) |
| Padiskar | ❌ | "Once the Shimmering Jewel of Jalmeray (tropical Vudrani island)" | Temperate European port beside a 'Ghasi Jungle' label painted as plain fields — no Vudrani/tropical character | [image](../painted/assets/scenes/padiskar-town.webp) |
| Pangolais | ❌ | "Nidal capital deep in the Uskwood; canopy keeps it dark as night, city of shadows" | Big bright sunlit river city — no forest canopy, no shadow | [image](../painted/assets/scenes/pangolais-city.webp) |
| Peijia | ❌ | "Largely empty capital of Bachuan (Tian Xia) on Naikang Bay" | European castle town — no Tian architecture, no 'empty planned city' character | [image](../painted/assets/scenes/peijia-town.webp) |
| Pinnacle | ❓ VERIFY | (no wiki article) | Generic temperate river town; cannot verify against canon — confirm this is a real settlement, not a census mislabel | [image](../painted/assets/scenes/pinnacle-town.webp) |
| Pobashabla | ❌ REMOVE | "City-state in the UNDERWATER nation of Xidao (Xidao Gulf)" | Painted as an ordinary land town; underwater city — scene should be deleted like Gholinom/Irim | [image](../painted/assets/scenes/pobashabla-town.webp) |
| Port Ice | ✅ | "Lake-pirate refuge on the Lake of Mists and Veils, northern Brevoy" | Temperate lakeside town — passable (a colder northern look would be better) | [image](../painted/assets/scenes/port-ice-town.webp) |
| Port Peril | ✅ | "Largest port and de facto capital of the Shackles, on Jeopardy Bay" | Big labeled port city with swampy delta and tropical-toned bay — fits | [image](../painted/assets/scenes/port-peril-city.webp) |
| Prada Hanam | ❌ | "Small Jalmeray port defined by the enormous Murmur Dome" | Temperate European town — no dome, no Vudrani/tropical character | [image](../painted/assets/scenes/prada-hanam-town.webp) |
| Promise | ❌ | "Capital and only settlement of Hermea; the dragon Mengkare's gleaming planned utopia" | Ordinary organic medieval town — no planned/utopian grandeur | [image](../painted/assets/scenes/promise-town.webp) |
| Qaharid | ✅ | "The Turquoise City: mining city in Qadira's fertile Maharev region" | Fertile walled river city — fits Maharev (mining not visible, minor) | [image](../painted/assets/scenes/qaharid-town.webp) |
| Quantium | ❌ | "Capital of Nex: metropolis of palaces, hanging gardens, open-air mazes on the Obari" | Small ordinary walled town — badly under-scaled, none of the wonders | [image](../painted/assets/scenes/quantium-town.webp) |
| Quent | ❌ | "Second-largest Shackles settlement, north coast of Motaku Isle (tropical)" | Temperate port town on a pretty bay — no tropical character | [image](../painted/assets/scenes/quent-town.webp) |
| Raliscrad | ❌ | "City of Sarkoris in the Riftshadow (formerly the Worldwound) — demon-scarred land" | Pleasant sunny bay city with orchards — no Worldwound scarring at all | [image](../painted/assets/scenes/raliscrad-town.webp) |
| Rashiz | ✅ | "Qadiran city at the heart of lush, fertile Maharev on the Meraz River" | Fertile green river town — fits | [image](../painted/assets/scenes/rashiz-town.webp) |
| Remesiana | ✅ | "Chelish city at the mouth of the Iseld on the Bay of Solva" | Temperate river-mouth port town — fits | [image](../painted/assets/scenes/remesiana-town.webp) |
| Ridonport | ✅ | "Small Taldan coastal city south of Cassomir" | Temperate coastal town — fits | [image](../painted/assets/scenes/ridonport-town.webp) |
| Ridwan | ❌ | "Zon-Kuthon's religious center on a HOSTILE VOLCANIC PLAIN in Nidal" | Green temperate river town — no volcanic plain, no gothic dread | [image](../painted/assets/scenes/ridwan-town.webp) |
| Sadiyeh | ✅ | "City on Qadira's Alavah Peninsula (coastal)" | Coastal walled town with orchards — plausible for the Inner Sea coast | [image](../painted/assets/scenes/sadiyeh-town.webp) |
| Salav | ❌ | "Qadiran city in the Zho Mountain foothills at the Ladan headwaters" | Flat farmland town with an odd blank pale band across the top — no mountains or foothills | [image](../painted/assets/scenes/salav-town.webp) |
| Sanmeshul | ✅ | "Second city of fertile Maharev on the Meraz River" | Fertile walled river town with beach docks — fits | [image](../painted/assets/scenes/sanmeshul-town.webp) |
| Sawtooth Marketplace | ❓ VERIFY | (no wiki article) | Busy coastal market town; name suggests a marketplace POI, not a settlement — confirm it belongs in the pack | [image](../painted/assets/scenes/sawtooth-marketplace-town.webp) |
| Sedeq | ✅ | "Qadiran slave-trade city on the Alavah Peninsula: warm breezes, lush gardens" | Green coastal town — the 'lush gardens' call-out makes this fit | [image](../painted/assets/scenes/sedeq-town.webp) |
| Seidoyaji | ❌ | "City of the tengu kingdom of Kwanlai (Tian Xia)" | European coastal town — no Tian architecture | [image](../painted/assets/scenes/seidoyaji-town.webp) |
| Senara | ✅ | "Chelish town deep in the devil-infested Whisperwood" | River town hemmed in by dense forest — setting fits (infernal taint not visual) | [image](../painted/assets/scenes/senara-town.webp) |
| Senghor | ❌ | "Port city-state on the Fever Sea at the jungle Kaava Lands (Garund west coast)" | European port with wheat fields — no jungle coast | [image](../painted/assets/scenes/senghor-town.webp) |
| Sevenarches | ✅ | "River Kingdoms town built around seven stone arches sacred to elves" | Temperate river town fits the biome (the arches themselves aren't visible — minor) | [image](../painted/assets/scenes/sevenarches-town.webp) |
| Shamara | ✅ | "Large prosperous city in fertile Pashman, Qadira" | Green river town — fits | [image](../painted/assets/scenes/shamara-town.webp) |
| Shileh | ✅ | "Large prosperous city in fertile Pashman, Qadira" | Fertile walled river town — fits (the 'Kelal Desert' label sits on green land, minor) | [image](../painted/assets/scenes/shileh-town.webp) |
| Shiman-Sekh | ✅ | "Osirian city on the western edge of the Golden Oasis, deep in the desert" | Oasis town: green ring around a lake surrounded by sand — excellent match | [image](../painted/assets/scenes/shiman-sekh-town.webp) |
| Skathen | ✅ | "Taldan trade city on the Brokenbridge River" | Temperate river trade town — fits | [image](../painted/assets/scenes/skathen-town.webp) |
| Skelt | ✅ | "Strategically vital Nirmathi city on the Shining River" | Temperate walled river town — fits forested Nirmathas | [image](../painted/assets/scenes/skelt-town.webp) |
| Skywatch | ❌ | "ABANDONED city around a massive observatory high in the frozen Icerime Peaks" | Thriving green farmland town — no mountains, no snow, no observatory, not abandoned | [image](../painted/assets/scenes/skywatch-town.webp) |
| Starfall | ❌ | "Capital of Numeria, hard by the Silver Mount wreck (bleak tech-barbarian plains)" | Pleasant Mediterranean-looking coastal metropolis on a teal bay — wrong terrain, no Silver Mount | [image](../painted/assets/scenes/starfall-city.webp) |
| Sukri | ✅ PIN-LEAK | "City on Qadira's Alavah Peninsula (coastal)" | Coastal town fits, but 3 red map-pin glyphs painted at outlying hamlets | [image](../painted/assets/scenes/sukri-town.webp) |
| Surat Prakan | ❌ | "Capital of Tang Mai (Tian Xia), seat of the Cinnamon Throne, the nation's largest city" | European walled town — no Tian architecture, under-scaled | [image](../painted/assets/scenes/surat-prakan-town.webp) |
| Taggun Hold | ❌ | "Chelish settlement in the Menador Mountains near Nidal" | Rolling green coastal town — no mountains at all | [image](../painted/assets/scenes/taggun-hold-town.webp) |
| Talípas | ❌ | "Brewing city on the west coast of Xopatl (Arcadia)" | Lively archipelago fishing town, but zero Arcadian character — generic European | [image](../painted/assets/scenes/tal-pas-town.webp) |
| Tekeh | ❌ | "City in the Ketz Desert of Qadira" | Coastal town with wheat fields, hedgerows and green woods — not a desert | [image](../painted/assets/scenes/tekeh-town.webp) |
| Thap Samut | ❌ | "Northernmost city and largest port of sorcerous Tang Mai (Tian Xia)" | European port town — no Tian architecture | [image](../painted/assets/scenes/thap-samut-town.webp) |
| Thulsadus | ❌ | "City of the naga empire of Nagajor (tropical Tian Xia jungle)" | Half-timbered European market town in temperate farmland — no jungle, no naga character (also small ring-icon leaks at the hamlets) | [image](../painted/assets/scenes/thulsadus-town.webp) |
| Todorokaze | ❌ | "Only city in Kwanlai's Kimu Mountains (tengu kingdom, Tian Xia)" | Town beside a large blank parchment void where the mountains should be — no mountains, no Tian character | [image](../painted/assets/scenes/todorokaze-town.webp) |
| Totra | ❌ | "Largest Osirian port outside Sothis (desert Osirion)" | Green temperate fields around a European walled town — no desert | [image](../painted/assets/scenes/totra-town.webp) |
| Tripolne | ✅ | "Seat of Molthune's Backar territory" | Large temperate walled river town — fits | [image](../painted/assets/scenes/tripolne-town.webp) |
| Trollheim | ❌ | "Linnorm Kingdoms city on the Rimeflow, hard against the Irrisen border" | Warm temperate river town — no northern/Ulfen cold | [image](../painted/assets/scenes/trollheim-town.webp) |
| Tulaupan | ❌ | "One of Xopatl's three Follower's Rests cities (Arcadia)" | European river town — no Arcadian character | [image](../painted/assets/scenes/tulaupan-town.webp) |
| Ullerskad | ❌ | "Ulfen trade hub on the Rimeflow in the Thanelands (Linnorm Kings)" | Warm temperate river town — no northern/Ulfen cold | [image](../painted/assets/scenes/ullerskad-town.webp) |
| Umnyango | ❌ | "Vidrian's largest settlement: a crumbling pre-colonial Mwangi city" | Tidy European stone town — no Mwangi architecture or decay | [image](../painted/assets/scenes/umnyango-town.webp) |
| Urgir | ❌ | "Orc capital of Belkzen, built in Thassilonian ruins amid landlocked badlands" | Perfect concentric circular city on a SEA COAST with piers — Belkzen has no coast; nothing orcish or ruined | [image](../painted/assets/scenes/urgir-city.webp) |
| Urglin | ❌ | "Orc city in the ash-blasted Cinderlands of the Storval Plateau" | Green temperate town by water — no cinder wastes | [image](../painted/assets/scenes/urglin-town.webp) |
| Usaro | ❌ | "Charau-ka city of the Gorilla King on Lake Ocota (deep Mwangi jungle)" | Temperate European port town — no jungle, no simian ruin-city character | [image](../painted/assets/scenes/usaro-town.webp) |
| Ushumgal | ✅ | "Wealthy city on Qadira's Alavah Peninsula (coastal)" | Prosperous coastal walled town — fits | [image](../painted/assets/scenes/ushumgal-town.webp) |
| Vannisaria | ✅ | "City of Linvarre (formerly the Taldan colony of Amanandar)" | European river-bridge town — canon-consistent for a Taldan colony | [image](../painted/assets/scenes/vannisaria-town.webp) |
| Vellumis | ❌ | "Lastwall's largest city, now a Knights' bastion in the undead GRAVELANDS" | Idyllic green lakeside town — no blight, no fortress-bastion character | [image](../painted/assets/scenes/vellumis-town.webp) |
| Vyre | ✅ | "The City of Masks on Vyre Island in Nisroch Bay" | Labeled island city with harbor and marsh — fits | [image](../painted/assets/scenes/vyre-city.webp) |
| Winterbreak | ✅ | "House Lodovka's city on Acuben Isle, Lake of Mists and Veils (Brevoy)" | Walled lakeside town — fits | [image](../painted/assets/scenes/winterbreak-town.webp) |
| Wispil | ✅ | "Gnomish timber city in the depths of the Verduran Forest" | River town ringed by woods — broadly fits (forest could read deeper) | [image](../painted/assets/scenes/wispil-town.webp) |
| Woodsedge | ✅ | "Galtan home of dissident thought and the Red Revolution's authors" | Temperate walled town at wood's edge — fits | [image](../painted/assets/scenes/woodsedge-town.webp) |
| Wyvernsting | ❌ | "Belkzen orc settlement in a Kodar Mountains spur, ringed by a wooden stockade" | Stone-walled European farm town — no mountains, no stockade, nothing orcish | [image](../painted/assets/scenes/wyvernsting-town.webp) |
| Xer | ✅ | "Razmiri port on Lake Encarthan and the Glass River" | Temperate river-port town — fits (lake itself out of frame) | [image](../painted/assets/scenes/xer-town.webp) |
| Xin-Edasseril | ❌ | "Returned capital of the Thassilonian realm of envy (New Thassilon)" | Small ordinary coastal town — no ancient-metropolis grandeur | [image](../painted/assets/scenes/xin-edasseril-town.webp) |
| Xin-Shalast | ❌ | "Fabled gold city of greed high in the Kodar Mountains (Mhar Massif)" | Ordinary coastal farm town at sea level — mountains and gilded ruins entirely absent | [image](../painted/assets/scenes/xin-shalast-town.webp) |
| Yan Tlomíl | ❌ | "Xopatl's largest agricultural centre (Arcadia)" | European river town amid farms — farms fit but zero Arcadian character | [image](../painted/assets/scenes/yan-tlom-l-town.webp) |
| Yanmass | ✅ | "Taldan city on the desert trade routes into Casmaron" | Temperate walled trade town — fits Taldor's plains | [image](../painted/assets/scenes/yanmass-town.webp) |
| Yanti Iñulde | ❌ | "Religious centre of Xopatl, home of its last hero-god (Arcadia)" | European river town — no Arcadian character | [image](../painted/assets/scenes/yanti-i-ulde-town.webp) |
| Yin-Sichasi | ❌ PIN-LEAK | "UNDERGROUND city beneath the Gossamer Mountains (Shenmen, Tian Xia)" | Open-air walled town with 4 giant cream map-pin glyphs painted in (town centre + 3 farms) | [image](../painted/assets/scenes/yin-sichasi-town.webp) |
| Yled | ❌ | "Largest city of Geb, garrison of its undead armies" | Cheerful medieval coastal market town — none of Geb's necromantic gloom | [image](../painted/assets/scenes/yled-town.webp) |
| Zetang | ❌ | "Empyrean-ruled capital of Tianjing (Tian Xia), port on Point Aykishe" | European port town — no Tian or celestial character | [image](../painted/assets/scenes/zetang-town.webp) |
| Zilpatzi | ❌ | "Xopatl logging city by the dangerous Manzinago Forest (Arcadia)" | European river town — no Arcadian character | [image](../painted/assets/scenes/zilpatzi-town.webp) |
| Zimar | ✅ | "Taldan military stronghold guarding the southern border with Qadira" | Fortified river town with citadel — fits | [image](../painted/assets/scenes/zimar-town.webp) |
| Ziplatna | ❌ | "Northernmost of Xopatl's Follower's Rests trade cities (Arcadia)" | European walled river town — no Arcadian character | [image](../painted/assets/scenes/ziplatna-town.webp) |
| Zurakan | ❌ PIN-LEAK | "Walled capital of Hukaris at the foot of Mount Jabel" | Flat coastal city, no mountain; 4+ giant cream map-pin glyphs painted in | [image](../painted/assets/scenes/zurakan-town.webp) |
| Golarion (world) | ✅ | (world map) | Handsome painted relief world map, ocean labels clean | [image](../painted/assets/scenes/golarion-world.webp) |
| Avistan | ✅ | (continent map) | Relief map with Kodar range and Crown of the World glacier — fits | [image](../painted/assets/scenes/avistan.webp) |
| Garund | ✅ | (continent map) | Deserts north, Mwangi jungle interior — fits | [image](../painted/assets/scenes/garund.webp) |
| Tian Xia (region) | ✅ | (continent map) | Wall of Heaven, southern jungles, interior deserts — fits | [image](../painted/assets/scenes/tian-xia.webp) |
| Casmaron (region) | ✅ | (continent map) | Central deserts, steppes and the Castrovin Sea — fits | [image](../painted/assets/scenes/casmaron.webp) |
| Arcadia (region) | ✅ | (continent map) | Mountain spine with arid south — fits | [image](../painted/assets/scenes/arcadia.webp) |
| Crown of the World | ❌ | (polar region map) | The High Ice interior is painted as SAND DUNES with a desert oasis — should be ice cap/tundra, not desert | [image](../painted/assets/scenes/crown-of-the-world.webp) |
| The Inner Sea Region | ✅ | (region overview) | Green Avistan, Garundi deserts, northern ice — fits | [image](../painted/assets/scenes/inner-sea-region.webp) |
| Absalom and Starstone Isle | ✅ | (region map) | Isle of Kortos centered in the Inner Sea — fits | [image](../painted/assets/scenes/absalom-starstone-isle.webp) |
| Broken Lands (meta-region) | ✅ | (meta-region map) | Sarkoris scar, Numeria, Brevoy, River Kingdoms — fits | [image](../painted/assets/scenes/broken-lands.webp) |
| Eye of Dread (meta-region) | ✅ | (meta-region map) | Belkzen, Ustalav, Lake Encarthan all read well (snowfield in the NE corner is a bit generous) | [image](../painted/assets/scenes/eye-of-dread.webp) |
| Golden Road (meta-region) | ✅ | (meta-region map) | North-Garund deserts and the Inner Sea — fits | [image](../painted/assets/scenes/golden-road.webp) |
| High Seas (meta-region) | ✅ | (meta-region map) | The Eye of Abendego hurricane is actually painted in — excellent | [image](../painted/assets/scenes/high-seas.webp) |
| Impossible Lands (meta-region) | ✅ | (meta-region map) | Nex/Geb deserts, Mana Wastes, Jalmeray — fits | [image](../painted/assets/scenes/impossible-lands.webp) |
| Mwangi Expanse (meta-region) | ✅ | (meta-region map) | Jungle interior with the Eye of Abendego offshore — fits | [image](../painted/assets/scenes/mwangi-expanse.webp) |
| Old Cheliax (meta-region) | ✅ | (meta-region map) | Cheliax, Nidal, Ravounel, Hermea with proper forests — fits | [image](../painted/assets/scenes/old-cheliax.webp) |
| Saga Lands (meta-region) | ❌ | (meta-region map — Irrisen is a land of eternal winter) | Terrain broadly fits, but Irrisen is painted as green/brown steppe with no snow — its defining eternal winter is missing | [image](../painted/assets/scenes/saga-lands.webp) |
| Shining Kingdoms (meta-region) | ✅ | (meta-region map) | Taldor, Andoran, Kyonin, Verduran Forest — fits | [image](../painted/assets/scenes/shining-kingdoms.webp) |
| Varisia (region) | ✅ | (region map) | Quah territories, Storval Plateau, Kodar range — fits | [image](../painted/assets/scenes/varisia.webp) |
| Cheliax (nation) | ❌ FIT | (nation map) | Frame is centered on Lake Encarthan/Druma with Cheliax shoved off the left edge — the fit/center for this key looks wrong, not an art problem | [image](../painted/assets/scenes/cheliax.webp) |
| Andoran (nation) | ✅ | (nation map) | Andoran centered with Arthfell, Carpenden Plains, Five Kings to the north — fits | [image](../painted/assets/scenes/andoran.webp) |
| Taldor (nation) | ✅ | (nation map) | Verduran Forest, Tandak/Whistling Plains gradient — fits | [image](../painted/assets/scenes/taldor.webp) |
| Osirion (nation) | ✅ | (nation map) | Full desert with the Sphinx river corridor and named wastes — fits | [image](../painted/assets/scenes/osirion.webp) |
| Qadira (nation) | ✅ | (nation map) | Desert coast rising to the Zho Mountains — fits | [image](../painted/assets/scenes/qadira.webp) |
| Ustalav (nation) | ❌ | (nation map — gothic, damp, mist-shrouded temperate land) | Central Ustalav painted as a white ice/snow smear with arid tan surroundings — should be dark forests and moors | [image](../painted/assets/scenes/ustalav.webp) |
| Numeria (nation) | ✅ | (nation map) | Plains/badlands mix fits (odd white streak near Silver Mount worth a look) | [image](../painted/assets/scenes/numeria.webp) |
| Irrisen (nation) | ❌ | (nation map — ETERNAL WINTER) | Painted as unfrozen green/tan steppe with ice only at the northern edge — the whole nation should be snowbound | [image](../painted/assets/scenes/irrisen.webp) |
| Nidal (nation) | ✅ | (nation map) | Dark Uskwood, Menador range, Conqueror's Bay — fits | [image](../painted/assets/scenes/nidal.webp) |
| Katapesh (nation) | ❌ | (nation map) | Katapesh itself fits, but the whole northern (Osirion) band is painted as blue-white ICE over desert labels like 'Parched Dunes' — reads glacial, not sand | [image](../painted/assets/scenes/katapesh.webp) |
| Galt (nation) | ❌ | (nation map — fully temperate farmland nation) | Left half is right, but the eastern half is a sprawling sand desert that does not exist anywhere near Galt | [image](../painted/assets/scenes/galt.webp) |
| Kyonin (nation) | ✅ | (nation map) | Fierani Forest dominates with the Sellen branches — fits | [image](../painted/assets/scenes/kyonin.webp) |
| Brevoy (nation) | ✅ | (nation map) | Lake of Mists and Veils, Gronzi Forest, wintry eastern highlands — fits | [image](../painted/assets/scenes/brevoy.webp) |
| Belkzen (nation) | ✅ | (nation map) | Tan badlands ringed by Kodar spurs; northern ice edge plausible for the Mammoth Lords border | [image](../painted/assets/scenes/belkzen.webp) |
| Mendev (nation) | ✅ | (nation map) | Estrovian Forest, crusader plains, Lake of Mists and Veils — fits | [image](../painted/assets/scenes/mendev.webp) |
| Lands of the Linnorm Kings (nation) | ✅ | (nation map) | Fjords, Ironbound Archipelago, Stormspear range — fits | [image](../painted/assets/scenes/lands-of-the-linnorm-kings.webp) |
| Realm of the Mammoth Lords (nation) | ✅ | (nation map) | Steppe and tundra under the Tusk Mountains with northern ice — fits | [image](../painted/assets/scenes/realm-of-the-mammoth-lords.webp) |
| Absalom Region (environs) | ✅ | (city-region map) | Kortos Mounts, Immenwood, Cairnlands scrub — fits | [image](../painted/assets/scenes/absalom-environs.webp) |
| Magnimar Region (environs) | ✅ | (city-region map) | Varisian coast, islands and river lowlands — fits | [image](../painted/assets/scenes/magnimar-environs.webp) |
| Korvosa Region (environs) | ❌ | (city-region map — temperate coast below the ash-waste Storval Plateau) | Almost the entire frame is Sahara-style golden sand dunes — Korvosa's environs are temperate; the Cinderlands are grey ash, not dunes | [image](../painted/assets/scenes/korvosa-environs.webp) |
| Sandpoint Region (environs) | ❌ | (city-region map — the temperate, misty Lost Coast) | Terrain reads semi-desert scrub with scattered woods — the Lost Coast should be green temperate coastline | [image](../painted/assets/scenes/sandpoint-environs.webp) |
| Riddleport Region (environs) | ✅ | (city-region map) | North-Varisian coast, Churlwood autumn forest, snowy Kodars — fits | [image](../painted/assets/scenes/riddleport-environs.webp) |
| Kaer Maga Region (environs) | ✅ | (city-region map) | Arid Storval Plateau above, green Yondabakari lowlands below — good match for the cliff-city's setting | [image](../painted/assets/scenes/kaer-maga-environs.webp) |
| Westcrown Region (environs) | ✅ | (city-region map) | Temperate Chelish coast on its bay — fits | [image](../painted/assets/scenes/westcrown-environs.webp) |
| Sothis Region (environs) | ✅ | (city-region map) | Sphinx delta cutting through desert to the Swells of Gozreh — fits | [image](../painted/assets/scenes/sothis-environs.webp) |
| Oppara Region (environs) | ✅ | (city-region map) | Taldan coast with the World's Edge Mountains behind — fits | [image](../painted/assets/scenes/oppara-environs.webp) |
| Almas Region (environs) | ❌ | (city-region map — Andoran's green heartland at the Andoshen mouth) | Almost entirely sand desert and badlands — Andoran is temperate farmland | [image](../painted/assets/scenes/almas-environs.webp) |
| Five Kings Mountains (region) | ✅ | (region map) | Forested mountain range with snowcaps — fits (small dry patch SW, minor) | [image](../painted/assets/scenes/five-kings-mountains.webp) |
| River Kingdoms (region) | ✅ | (region map) | Green riverlands with all the petty-kingdom labels — fits | [image](../painted/assets/scenes/river-kingdoms.webp) |
| The Shackles (region) | ❌ | (region map — rain-soaked tropical pirate isles) | Islands pass, but the mainland Terwa Uplands are painted as arid desert — they are jungle hills under the Eye's rains | [image](../painted/assets/scenes/the-shackles.webp) |
| Isger (nation) | ✅ | (nation map) | Chitterwood and green valley with Five Kings snowcaps NE — fits | [image](../painted/assets/scenes/isger.webp) |
| Ravounel (nation) | ❌ | (nation map — temperate coastal breakaway nation) | Mostly pale dry steppe; only Ravounel Forest is green — Kintargo's hinterland should be temperate | [image](../painted/assets/scenes/ravounel.webp) |
| Gravelands (region) | ❌ | (region map — undead-blighted husk of Lastwall) | Pleasant green Fangwood and farmland — no blight, no grey waste | [image](../painted/assets/scenes/gravelands.webp) |
| Sarkoris Scar (region) | ✅ | (region map) | Dark radial blast-scar painted at Sarkoris — great Worldwound aftermath | [image](../painted/assets/scenes/sarkoris-scar.webp) |
| Molthune (nation) | ✅ | (nation map) | Encarthan shore, Backar Forest, southern plains — fits | [image](../painted/assets/scenes/molthune.webp) |
| Nirmathas (nation) | ✅ | (nation map) | Fangwood-dominated green with autumn patches — fits | [image](../painted/assets/scenes/nirmathas.webp) |
| Rahadoum (nation) | ✅ | (nation map) | Desert interior with a fertile coastal strip — fits | [image](../painted/assets/scenes/rahadoum.webp) |
| Thuvia (nation) | ✅ | (nation map) | Central desert behind the Barrier Wall, green Mwangi fringe SW — fits | [image](../painted/assets/scenes/thuvia.webp) |
| Jalmeray (nation) | ✅ | (nation map) | Island group with Rajni Fields and jungle north — passable (could be more tropical) | [image](../painted/assets/scenes/jalmeray.webp) |
| Druma (nation) | ❌ | (nation map — temperate mercantile nation on Lake Encarthan) | The entire northern half (into Kyonin's Fierani Forest) is buried under bogus snow | [image](../painted/assets/scenes/druma.webp) |
| Razmiran (nation) | ❌ | (nation map — temperate Encarthan east shore) | Core is fine but the southeast quarter is sand-dune desert that doesn't belong, plus stray snow at top | [image](../painted/assets/scenes/razmiran.webp) |
| Highhelm Region | ✅ | (region map) | Rugged Five Kings peaks around Highhelm — fits | [image](../painted/assets/scenes/highhelm-region.webp) |
| Otari Region | ✅ | (region map) | Immenwood, snowy Kortos Mounts and the Tyrant's Grasp crater — fits | [image](../painted/assets/scenes/otari-region.webp) |
| Whitethrone Region | ❌ | (city-region map — IRRISEN, eternal winter) | Green forests, open blue water and even sand desert — zero winter in the witch-queens' frozen heartland | [image](../painted/assets/scenes/whitethrone-region.webp) |
| Caliphas Region | ❌ | (city-region map — misty gothic Ustalav on Avalon Bay) | Bay and mountains fine, but the eastern side is sand-dune desert that doesn't exist in Ustalav | [image](../painted/assets/scenes/caliphas-region.webp) |
| Nantambu Region | ❌ | (city-region map — Mwangi jungle riverlands) | Green riverlands north, but a large sand desert sits right under the 'Mwangi Jungle' label | [image](../painted/assets/scenes/nantambu-region.webp) |
| Egorian Region | ❌ | (city-region map — temperate Chelish heartland on Lake Sorrow) | Southern half is sand-dune desert — Cheliax's capital sits in temperate farmland | [image](../painted/assets/scenes/egorian-region.webp) |
| Daggermark Region | ❌ | (city-region map — green River Kingdoms) | Almost entirely dry tan steppe/desert with one forest — should be lush riverlands | [image](../painted/assets/scenes/daggermark-region.webp) |
| Pitax Region | ❌ | (city-region map — River Kingdoms lakelands) | Mostly desert dunes — should be green riverlands and hills | [image](../painted/assets/scenes/pitax-region.webp) |
| Elidir Region | ❌ | (city-region map — temperate Isger valley) | Big dune field through the center — Isger is temperate | [image](../painted/assets/scenes/elidir-region.webp) |
| Vigil Region | ❌ | (city-region map — sacked crusader city in the Gravelands) | Semi-arid tan with a dune patch — should be grey undead-blighted temperate land | [image](../painted/assets/scenes/vigil-region.webp) |
| Kenabres Region | ✅ | (city-region map — Sarkoris Scar wasteland) | Barren pale waste with jagged ranges — passes for the Scar, though it reads sandy rather than demon-blasted | [image](../painted/assets/scenes/kenabres-region.webp) |
| Canorate Region | ✅ | (city-region map) | Dry grassland with Shrikewood and river valleys — acceptable for Molthune's plains | [image](../painted/assets/scenes/canorate-region.webp) |
| Tamran Region | ❌ | (city-region map — forested Nirmathas on Lake Encarthan) | Lake and forests fine but a large dune desert fills the south — no deserts in Nirmathas | [image](../painted/assets/scenes/tamran-region.webp) |
| Azir Region | ✅ | (city-region map) | Desert coast with green river margins — fits Rahadoum | [image](../painted/assets/scenes/azir-region.webp) |
| Merab Region | ✅ | (city-region map) | Thuvian desert coast under snow-capped Barrier Wall peaks — fits (odd white islet offshore, minor) | [image](../painted/assets/scenes/merab-region.webp) |
| Niswan Region | ✅ | (city-region map) | Bagla Bay, Rajni Fields, forested isles — fits Jalmeray | [image](../painted/assets/scenes/niswan-region.webp) |
| Thronestep Region | ❌ | (city-region map — temperate Razmiran on Lake Encarthan) | Coast and Exalted Wood fine, but a dune field fills the center — no desert in Razmiran | [image](../painted/assets/scenes/thronestep-region.webp) |
| Alkenstar Region | ✅ | (city-region map — the Mana Wastes) | Blasted barren wasteland with the Gunworks river gorge — excellent fit | [image](../painted/assets/scenes/alkenstar-region.webp) |
