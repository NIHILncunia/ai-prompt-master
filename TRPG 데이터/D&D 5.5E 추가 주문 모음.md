# D&D 5.5E 추가 주문 모음

- 원본 ID: `1khXljo6hUtFxYCgb0uIzcvyDt6zLdIhEilMtmO-20eA`
- 원본 탭: `시트1`
- 원본 사용 범위: `A1:D135`
- 전환 기준: 원본 행·열 순서와 현재 표시값을 보존했다.
- 수식 보존: B~D열의 2~126행은 아래 수식의 계산 결과를 값으로 고정했다. 127~135행은 원본의 수동 입력값이다.

```text
B열: =IFERROR(REGEXEXTRACT($A2, "^([^,]+)"), "")
C열: =IFERROR(REGEXEXTRACT($A2, "^[^,]+,([^,]+)"), "")
D열: =IFERROR(REGEXEXTRACT($A2, "^[^,]+,[^,]+,(.*)"), "")
```

| 원본 (Original) | Source Book | Spell Level | Spell Names |
| --- | --- | --- | --- |
| D&D 5e 2015 Princes of the Apocalypse,소마법 (Cantrip),Control Flames\, Create Bonfire, Frostbite, Gust, Magic Stone, Mold Earth, Shape Water, Thunderclap | D&D 5e 2015 Princes of the Apocalypse | 소마법 (Cantrip) | Control Flames\, Create Bonfire, Frostbite, Gust, Magic Stone, Mold Earth, Shape Water, Thunderclap |
| D&D 5e 2015 Princes of the Apocalypse,1레벨,Absorb Elements, Beast Bond, Catapult, Earth Tremor, Ice Knife | D&D 5e 2015 Princes of the Apocalypse | 1레벨 | Absorb Elements, Beast Bond, Catapult, Earth Tremor, Ice Knife |
| D&D 5e 2015 Princes of the Apocalypse,2레벨,Aganazzar’s Scorcher, Dust Devil, Earthbind, Maximilian’s Earthen Grasp, Pyrotechnics, Skywrite, Snilloc’s Snowball Swarm, Warding Wind | D&D 5e 2015 Princes of the Apocalypse | 2레벨 | Aganazzar’s Scorcher, Dust Devil, Earthbind, Maximilian’s Earthen Grasp, Pyrotechnics, Skywrite, Snilloc’s Snowball Swarm, Warding Wind |
| D&D 5e 2015 Princes of the Apocalypse,3레벨,Erupting Earth, Flame Arrows, Melf’s Minute Meteors, Tidal Wave, Wall of Sand, Wall of Water | D&D 5e 2015 Princes of the Apocalypse | 3레벨 | Erupting Earth, Flame Arrows, Melf’s Minute Meteors, Tidal Wave, Wall of Sand, Wall of Water |
| D&D 5e 2015 Princes of the Apocalypse,4레벨,Elemental Bane, Storm Sphere, Vitriolic Sphere, Watery Sphere | D&D 5e 2015 Princes of the Apocalypse | 4레벨 | Elemental Bane, Storm Sphere, Vitriolic Sphere, Watery Sphere |
| D&D 5e 2015 Princes of the Apocalypse,5레벨,Control Winds, Immolation, Maelstrom, Transmute Rock | D&D 5e 2015 Princes of the Apocalypse | 5레벨 | Control Winds, Immolation, Maelstrom, Transmute Rock |
| D&D 5e 2015 Princes of the Apocalypse,6레벨,Bones of the Earth, Investiture of Flame, Investiture of Ice, Investiture of Stone, Investiture of Wind, Primordial Ward | D&D 5e 2015 Princes of the Apocalypse | 6레벨 | Bones of the Earth, Investiture of Flame, Investiture of Ice, Investiture of Stone, Investiture of Wind, Primordial Ward |
| D&D 5e 2015 Princes of the Apocalypse,7레벨,Whirlwind | D&D 5e 2015 Princes of the Apocalypse | 7레벨 | Whirlwind |
| D&D 5e 2015 Princes of the Apocalypse,8레벨,Abi-Dalzim’s Horrid Wilting | D&D 5e 2015 Princes of the Apocalypse | 8레벨 | Abi-Dalzim’s Horrid Wilting |
| D&D 5e 2017 Xanathar's Guide to Everything,소마법 (Cantrip),Infestation, Primal Savagery, Toll the Dead, Word of Radiance | D&D 5e 2017 Xanathar's Guide to Everything | 소마법 (Cantrip) | Infestation, Primal Savagery, Toll the Dead, Word of Radiance |
| D&D 5e 2017 Xanathar's Guide to Everything,1레벨,Cause Fear, Ceremony, Chaos Bolt, Snare, Zephyr Strike | D&D 5e 2017 Xanathar's Guide to Everything | 1레벨 | Cause Fear, Ceremony, Chaos Bolt, Snare, Zephyr Strike |
| D&D 5e 2017 Xanathar's Guide to Everything,2레벨,Dragon's Breath, Healing Spirit, Mind Spike, Shadow Blade | D&D 5e 2017 Xanathar's Guide to Everything | 2레벨 | Dragon's Breath, Healing Spirit, Mind Spike, Shadow Blade |
| D&D 5e 2017 Xanathar's Guide to Everything,3레벨,Catnap, Enemies Abound, Life Transference, Summon Lesser Demons, Thunder Step, Tiny Servant | D&D 5e 2017 Xanathar's Guide to Everything | 3레벨 | Catnap, Enemies Abound, Life Transference, Summon Lesser Demons, Thunder Step, Tiny Servant |
| D&D 5e 2017 Xanathar's Guide to Everything,4레벨,Charm Monster, Find Greater Steed, Guardian of Nature, Shadow of Moil, Sickening Radiance, Summon Greater Demon | D&D 5e 2017 Xanathar's Guide to Everything | 4레벨 | Charm Monster, Find Greater Steed, Guardian of Nature, Shadow of Moil, Sickening Radiance, Summon Greater Demon |
| D&D 5e 2017 Xanathar's Guide to Everything,5레벨,Danse Macabre, Dawn, Enervation, Far Step, Holy Weapon, Infernal Calling, Negative Energy Flood, Skill Empowerment, Steel Wind Strike, Synaptic Static, Wall of Light, Wrath of Nature | D&D 5e 2017 Xanathar's Guide to Everything | 5레벨 | Danse Macabre, Dawn, Enervation, Far Step, Holy Weapon, Infernal Calling, Negative Energy Flood, Skill Empowerment, Steel Wind Strike, Synaptic Static, Wall of Light, Wrath of Nature |
| D&D 5e 2017 Xanathar's Guide to Everything,6레벨,Create Homunculus, Druid Grove, Mental Prison, Scatter, Soul Cage, Tenser's Transformation | D&D 5e 2017 Xanathar's Guide to Everything | 6레벨 | Create Homunculus, Druid Grove, Mental Prison, Scatter, Soul Cage, Tenser's Transformation |
| D&D 5e 2017 Xanathar's Guide to Everything,7레벨,Crown of Stars, Power Word Pain, Temple of the Gods | D&D 5e 2017 Xanathar's Guide to Everything | 7레벨 | Crown of Stars, Power Word Pain, Temple of the Gods |
| D&D 5e 2017 Xanathar's Guide to Everything,8레벨,Illusory Dragon, Maddening Darkness, Mighty Fortress | D&D 5e 2017 Xanathar's Guide to Everything | 8레벨 | Illusory Dragon, Maddening Darkness, Mighty Fortress |
| D&D 5e 2017 Xanathar's Guide to Everything,9레벨,Invulnerability, Mass Polymorph, Psychic Scream | D&D 5e 2017 Xanathar's Guide to Everything | 9레벨 | Invulnerability, Mass Polymorph, Psychic Scream |
| D&D 5e 2018 Guildmasters’ Guide to Ravnica,소마법 (Cantrip),Encode Thoughts | D&D 5e 2018 Guildmasters’ Guide to Ravnica | 소마법 (Cantrip) | Encode Thoughts |
| D&D 5e 2020 Tasha's Cauldron of Everything,소마법 (Cantrip),Booming Blade, Green-Flame Blade, Lightning Lure, Mind Sliver, Sword Burst | D&D 5e 2020 Tasha's Cauldron of Everything | 소마법 (Cantrip) | Booming Blade, Green-Flame Blade, Lightning Lure, Mind Sliver, Sword Burst |
| D&D 5e 2020 Tasha's Cauldron of Everything,1레벨,Tasha's Caustic Brew | D&D 5e 2020 Tasha's Cauldron of Everything | 1레벨 | Tasha's Caustic Brew |
| D&D 5e 2020 Tasha's Cauldron of Everything,2레벨,Summon Beast, Tasha's Mind Whip | D&D 5e 2020 Tasha's Cauldron of Everything | 2레벨 | Summon Beast, Tasha's Mind Whip |
| D&D 5e 2020 Tasha's Cauldron of Everything,3레벨,Intellect Fortress, Spirit Shroud, Summon Fey, Summon Shadowspawn, Summon Undead | D&D 5e 2020 Tasha's Cauldron of Everything | 3레벨 | Intellect Fortress, Spirit Shroud, Summon Fey, Summon Shadowspawn, Summon Undead |
| D&D 5e 2020 Tasha's Cauldron of Everything,4레벨,Summon Aberration, Summon Construct, Summon Elemental | D&D 5e 2020 Tasha's Cauldron of Everything | 4레벨 | Summon Aberration, Summon Construct, Summon Elemental |
| D&D 5e 2020 Tasha's Cauldron of Everything,5레벨,Summon Celestial | D&D 5e 2020 Tasha's Cauldron of Everything | 5레벨 | Summon Celestial |
| D&D 5e 2020 Tasha's Cauldron of Everything,6레벨,Summon Fiend, Tasha's Otherworldly Guise | D&D 5e 2020 Tasha's Cauldron of Everything | 6레벨 | Summon Fiend, Tasha's Otherworldly Guise |
| D&D 5e 2020 Tasha's Cauldron of Everything,7레벨,Dream of the Blue Veil | D&D 5e 2020 Tasha's Cauldron of Everything | 7레벨 | Dream of the Blue Veil |
| D&D 5e 2020 Tasha's Cauldron of Everything,9레벨,Blade of Disaster | D&D 5e 2020 Tasha's Cauldron of Everything | 9레벨 | Blade of Disaster |
| D&D 5e 2020 Explorer's Guide to Wildemount,소마법 (Cantrip),Sapping Sting | D&D 5e 2020 Explorer's Guide to Wildemount | 소마법 (Cantrip) | Sapping Sting |
| D&D 5e 2020 Explorer's Guide to Wildemount,1레벨,Gift of Alacrity, Magnify Gravity | D&D 5e 2020 Explorer's Guide to Wildemount | 1레벨 | Gift of Alacrity, Magnify Gravity |
| D&D 5e 2020 Explorer's Guide to Wildemount,2레벨,Fortune's Favor, Immovable Object, Wristpocket | D&D 5e 2020 Explorer's Guide to Wildemount | 2레벨 | Fortune's Favor, Immovable Object, Wristpocket |
| D&D 5e 2020 Explorer's Guide to Wildemount,3레벨,Pulse Wave | D&D 5e 2020 Explorer's Guide to Wildemount | 3레벨 | Pulse Wave |
| D&D 5e 2020 Explorer's Guide to Wildemount,4레벨,Gravity Sinkhole | D&D 5e 2020 Explorer's Guide to Wildemount | 4레벨 | Gravity Sinkhole |
| D&D 5e 2020 Explorer's Guide to Wildemount,5레벨,Temporal Shunt | D&D 5e 2020 Explorer's Guide to Wildemount | 5레벨 | Temporal Shunt |
| D&D 5e 2020 Explorer's Guide to Wildemount,6레벨,Gravity Fissure | D&D 5e 2020 Explorer's Guide to Wildemount | 6레벨 | Gravity Fissure |
| D&D 5e 2020 Explorer's Guide to Wildemount,7레벨,Tether Essence | D&D 5e 2020 Explorer's Guide to Wildemount | 7레벨 | Tether Essence |
| D&D 5e 2020 Explorer's Guide to Wildemount,8레벨,Dark Star, Reality Break | D&D 5e 2020 Explorer's Guide to Wildemount | 8레벨 | Dark Star, Reality Break |
| D&D 5e 2020 Explorer's Guide to Wildemount,9레벨,Ravenous Void, Time Ravage | D&D 5e 2020 Explorer's Guide to Wildemount | 9레벨 | Ravenous Void, Time Ravage |
| D&D 5e 2021 Fizban's Treasury of Dragons,2레벨,Nathair's Mischief, Rime's Binding Ice | D&D 5e 2021 Fizban's Treasury of Dragons | 2레벨 | Nathair's Mischief, Rime's Binding Ice |
| D&D 5e 2021 Fizban's Treasury of Dragons,3레벨,Ashardalon's Stride | D&D 5e 2021 Fizban's Treasury of Dragons | 3레벨 | Ashardalon's Stride |
| D&D 5e 2021 Fizban's Treasury of Dragons,4레벨,Raulothim's Psychic Lance | D&D 5e 2021 Fizban's Treasury of Dragons | 4레벨 | Raulothim's Psychic Lance |
| D&D 5e 2021 Fizban's Treasury of Dragons,5레벨,Summon Draconic Spirit | D&D 5e 2021 Fizban's Treasury of Dragons | 5레벨 | Summon Draconic Spirit |
| D&D 5e 2021 Fizban's Treasury of Dragons,6레벨,Fizban's Platinum Shield | D&D 5e 2021 Fizban's Treasury of Dragons | 6레벨 | Fizban's Platinum Shield |
| D&D 5e 2021 Fizban's Treasury of Dragons,7레벨,Draconic Transformation | D&D 5e 2021 Fizban's Treasury of Dragons | 7레벨 | Draconic Transformation |
| D&D 5e 2021 Strixhaven A Curriculum of Chaos,1레벨,Silvery Barbs | D&D 5e 2021 Strixhaven A Curriculum of Chaos | 1레벨 | Silvery Barbs |
| D&D 5e 2021 Strixhaven A Curriculum of Chaos,2레벨,Borrowed Knowledge, Kinetic Jaunt, Vortex Warp, Wither and Bloom | D&D 5e 2021 Strixhaven A Curriculum of Chaos | 2레벨 | Borrowed Knowledge, Kinetic Jaunt, Vortex Warp, Wither and Bloom |
| D&D 5e 2022 The Astral Adventurer's Guide,2레벨,Air Bubble | D&D 5e 2022 The Astral Adventurer's Guide | 2레벨 | Air Bubble |
| D&D 5e 2022 The Astral Adventurer's Guide,5레벨,Create Spelljamming Helm | D&D 5e 2022 The Astral Adventurer's Guide | 5레벨 | Create Spelljamming Helm |
| D&D 5e 2023 Abomination Vaults,2레벨,Awaken Portal | D&D 5e 2023 Abomination Vaults | 2레벨 | Awaken Portal |
| D&D 5e 2023 Abomination Vaults,4레벨,Daydreamer's Curse | D&D 5e 2023 Abomination Vaults | 4레벨 | Daydreamer's Curse |
| D&D 5e 2023 Abomination Vaults,5레벨,Ectoplasmic Expulsion | D&D 5e 2023 Abomination Vaults | 5레벨 | Ectoplasmic Expulsion |
| D&D 5e 2023 Eberron - Forge of the Artificer,소마법 (Cantrip),Magecraft | D&D 5e 2023 Eberron - Forge of the Artificer | 소마법 (Cantrip) | Magecraft |
| D&D 5e 2023 Eberron - Forge of the Artificer,2레벨,Homunculus Servant | D&D 5e 2023 Eberron - Forge of the Artificer | 2레벨 | Homunculus Servant |
| D&D 5e 2023 Monsters of Drakkenheim,3레벨,Purge Contamination | D&D 5e 2023 Monsters of Drakkenheim | 3레벨 | Purge Contamination |
| D&D 5e 2023 Tales from the Shadows - 2,소마법 (Cantrip),Claws of Darkness, Douse Light, Shadow Bite, Shadow Blindness | D&D 5e 2023 Tales from the Shadows - 2 | 소마법 (Cantrip) | Claws of Darkness, Douse Light, Shadow Bite, Shadow Blindness |
| D&D 5e 2023 Tales from the Shadows - 2,1레벨,Black Ribbons, Cloak of Shadow, Shadow Armor, Shadow Hands | D&D 5e 2023 Tales from the Shadows - 2 | 1레벨 | Black Ribbons, Cloak of Shadow, Shadow Armor, Shadow Hands |
| D&D 5e 2023 Tales from the Shadows - 2,2레벨,Dark Path, Darkbolt, Negative Image, Shadow Puppets, Slither | D&D 5e 2023 Tales from the Shadows - 2 | 2레벨 | Dark Path, Darkbolt, Negative Image, Shadow Puppets, Slither |
| D&D 5e 2023 Tales from the Shadows - 2,3레벨,Call Shadow Mastiff, Shadow Tendrils, Shadow Trove | D&D 5e 2023 Tales from the Shadows - 2 | 3레벨 | Call Shadow Mastiff, Shadow Tendrils, Shadow Trove |
| D&D 5e 2023 Tales from the Shadows - 2,4레벨,Black Hand, Hide in One’s Shadow, Shadow Step | D&D 5e 2023 Tales from the Shadows - 2 | 4레벨 | Black Hand, Hide in One’s Shadow, Shadow Step |
| D&D 5e 2023 Tales from the Shadows - 2,5레벨,Dark Dementing, Shadow Gateway | D&D 5e 2023 Tales from the Shadows - 2 | 5레벨 | Dark Dementing, Shadow Gateway |
| D&D 5e 2023 Tales from the Shadows - 2,6레벨,Become Nightwing, Black Well | D&D 5e 2023 Tales from the Shadows - 2 | 6레벨 | Become Nightwing, Black Well |
| D&D 5e 2023 Tales from the Shadows - 2,7레벨,Conjure Shadow Titan, Dying of the Light | D&D 5e 2023 Tales from the Shadows - 2 | 7레벨 | Conjure Shadow Titan, Dying of the Light |
| D&D 5e 2023 Tales from the Shadows - 2,8레벨,Creeping Darkness | D&D 5e 2023 Tales from the Shadows - 2 | 8레벨 | Creeping Darkness |
| D&D 5e 2023 Tales from the Shadows - 2,9레벨,Umbral Storm | D&D 5e 2023 Tales from the Shadows - 2 | 9레벨 | Umbral Storm |
| D&D 5e 2023 The Book of Many Things,2레벨,Spray of Cards | D&D 5e 2023 The Book of Many Things | 2레벨 | Spray of Cards |
| D&D 5e 2023 The Book of Many Things,3레벨,Antagonize | D&D 5e 2023 The Book of Many Things | 3레벨 | Antagonize |
| D&D 5e 2023 The Book of Many Things,4레벨,Spirit of Death | D&D 5e 2023 The Book of Many Things | 4레벨 | Spirit of Death |
| D&D 5e 2024 Forgotten Realms - Heroes of Faerûn,1레벨,Spellfire Flare, Wardaway | D&D 5e 2024 Forgotten Realms - Heroes of Faerûn | 1레벨 | Spellfire Flare, Wardaway |
| D&D 5e 2024 Forgotten Realms - Heroes of Faerûn,2레벨,Death Armor, Elminster's Elusion | D&D 5e 2024 Forgotten Realms - Heroes of Faerûn | 2레벨 | Death Armor, Elminster's Elusion |
| D&D 5e 2024 Forgotten Realms - Heroes of Faerûn,3레벨,Syluné’s Viper | D&D 5e 2024 Forgotten Realms - Heroes of Faerûn | 3레벨 | Syluné’s Viper |
| D&D 5e 2024 Forgotten Realms - Heroes of Faerûn,4레벨,Backlash, Doomtide, Spellfire Storm | D&D 5e 2024 Forgotten Realms - Heroes of Faerûn | 4레벨 | Backlash, Doomtide, Spellfire Storm |
| D&D 5e 2024 Forgotten Realms - Heroes of Faerûn,5레벨,Alustriel's Mooncloak, Songal's Elemental Suffusion | D&D 5e 2024 Forgotten Realms - Heroes of Faerûn | 5레벨 | Alustriel's Mooncloak, Songal's Elemental Suffusion |
| D&D 5e 2024 Forgotten Realms - Heroes of Faerûn,6레벨,Dirge, Elminster's Effulgent Spheres | D&D 5e 2024 Forgotten Realms - Heroes of Faerûn | 6레벨 | Dirge, Elminster's Effulgent Spheres |
| D&D 5e 2024 Forgotten Realms - Heroes of Faerûn,7레벨,Simbul's Synostodweomer | D&D 5e 2024 Forgotten Realms - Heroes of Faerûn | 7레벨 | Simbul's Synostodweomer |
| D&D 5e 2024 Forgotten Realms - Heroes of Faerûn,8레벨,Holy Star of Mystra | D&D 5e 2024 Forgotten Realms - Heroes of Faerûn | 8레벨 | Holy Star of Mystra |
| D&D 5e 2024 Forgotten Realms - Heroes of Faerûn,9레벨,Blade of Disaster | D&D 5e 2024 Forgotten Realms - Heroes of Faerûn | 9레벨 | Blade of Disaster |
| D&D 5e 2024 Heliana’s Guide to Monster Hunting,소마법 (Cantrip),Can't Trip, Can'trip, Concussion, Ferocious Strike, Flare, Howl, Magnetobolt, Pins & Needles, Primal Scent, Smokescreen, Spark, Spore Cloud, Stalker's Eye, Swarm, Water Whip | D&D 5e 2024 Heliana’s Guide to Monster Hunting | 소마법 (Cantrip) | Can't Trip, Can'trip, Concussion, Ferocious Strike, Flare, Howl, Magnetobolt, Pins & Needles, Primal Scent, Smokescreen, Spark, Spore Cloud, Stalker's Eye, Swarm, Water Whip |
| D&D 5e 2024 Heliana’s Guide to Monster Hunting,1레벨,Cannotrip, Chameleon Skin, Corrupting Ichor, Daydream, Fixit, Flipperform, Humperdink's Halitosis, Initiative, Peppermint Plate | D&D 5e 2024 Heliana’s Guide to Monster Hunting | 1레벨 | Cannotrip, Chameleon Skin, Corrupting Ichor, Daydream, Fixit, Flipperform, Humperdink's Halitosis, Initiative, Peppermint Plate |
| D&D 5e 2024 Heliana’s Guide to Monster Hunting,2레벨,Arcanomagnetic Repulsion, Dreamwalk, Eelskin, Endoleech, Inequality, Influenza, Mortiferous Pulse, Preserve, Protection, Riptide, Shielding Word, Sugar Rush | D&D 5e 2024 Heliana’s Guide to Monster Hunting | 2레벨 | Arcanomagnetic Repulsion, Dreamwalk, Eelskin, Endoleech, Inequality, Influenza, Mortiferous Pulse, Preserve, Protection, Riptide, Shielding Word, Sugar Rush |
| D&D 5e 2024 Heliana’s Guide to Monster Hunting,3레벨,Acid Rain, Depth Charge, Enrage, Firther's Shadow, Food Coma, Magnetite Shard, Mass Leech, Mireball, Stench, Switcheroo, The Bends, Zippit! | D&D 5e 2024 Heliana’s Guide to Monster Hunting | 3레벨 | Acid Rain, Depth Charge, Enrage, Firther's Shadow, Food Coma, Magnetite Shard, Mass Leech, Mireball, Stench, Switcheroo, The Bends, Zippit! |
| D&D 5e 2024 Heliana’s Guide to Monster Hunting,4레벨,Aura of Impurity, Blinding Radiance, Frogskin, Fungal Infection, Gravity Repulsion, Mechamagic, Shackles of Pain, Tentacle Lash, Totem Arrows, Weavebend | D&D 5e 2024 Heliana’s Guide to Monster Hunting | 4레벨 | Aura of Impurity, Blinding Radiance, Frogskin, Fungal Infection, Gravity Repulsion, Mechamagic, Shackles of Pain, Tentacle Lash, Totem Arrows, Weavebend |
| D&D 5e 2024 Heliana’s Guide to Monster Hunting,5레벨,Bone Cage, Conjure Anomaly, Endure, Feverskin, Gravity Smash, Incorporeality | D&D 5e 2024 Heliana’s Guide to Monster Hunting | 5레벨 | Bone Cage, Conjure Anomaly, Endure, Feverskin, Gravity Smash, Incorporeality |
| D&D 5e 2024 Heliana’s Guide to Monster Hunting,6레벨,Lungburst, Weave Entanglement | D&D 5e 2024 Heliana’s Guide to Monster Hunting | 6레벨 | Lungburst, Weave Entanglement |
| D&D 5e 2024 Heliana’s Guide to Monster Hunting,7레벨,Arcanomagnetic Storm, Power Word Shield | D&D 5e 2024 Heliana’s Guide to Monster Hunting | 7레벨 | Arcanomagnetic Storm, Power Word Shield |
| D&D 5e 2024 Obojima Tales from the Tall Grass,소마법 (Cantrip),Jolt, Resilient Friendship, Retrieve, Root Grab, Task | D&D 5e 2024 Obojima Tales from the Tall Grass | 소마법 (Cantrip) | Jolt, Resilient Friendship, Retrieve, Root Grab, Task |
| D&D 5e 2024 Obojima Tales from the Tall Grass,1레벨,Armament, Bubble Lift, Duplicate, Forest Guard, Gift, Pacify Person, Sand Structure, Sprout Foliage, Summon Vehicle, Swallow Magic, Water Bullet, Whelm Weapon | D&D 5e 2024 Obojima Tales from the Tall Grass | 1레벨 | Armament, Bubble Lift, Duplicate, Forest Guard, Gift, Pacify Person, Sand Structure, Sprout Foliage, Summon Vehicle, Swallow Magic, Water Bullet, Whelm Weapon |
| D&D 5e 2024 Obojima Tales from the Tall Grass,2레벨,At Your Side, Beast Transmutation, Control Animal, Counterspy, Ember Belly, Monkey's Grasp, Mushroom Ballista, Obscure Object, Pillar of Force, Rageful Nimbus, Shared Vision, Spell Signature, Switched Form, Transparency, Wind Sprint | D&D 5e 2024 Obojima Tales from the Tall Grass | 2레벨 | At Your Side, Beast Transmutation, Control Animal, Counterspy, Ember Belly, Monkey's Grasp, Mushroom Ballista, Obscure Object, Pillar of Force, Rageful Nimbus, Shared Vision, Spell Signature, Switched Form, Transparency, Wind Sprint |
| D&D 5e 2024 Obojima Tales from the Tall Grass,3레벨,Butterfly Storm, Conjure Ocean, Dara Blocks, Light Snare, Plummet, Pogmo's Pot, Vegetable Blade | D&D 5e 2024 Obojima Tales from the Tall Grass | 3레벨 | Butterfly Storm, Conjure Ocean, Dara Blocks, Light Snare, Plummet, Pogmo's Pot, Vegetable Blade |
| D&D 5e 2024 Obojima Tales from the Tall Grass,4레벨,Pacify Monster, Storm Stallion | D&D 5e 2024 Obojima Tales from the Tall Grass | 4레벨 | Pacify Monster, Storm Stallion |
| D&D 5e 2024 Obojima Tales from the Tall Grass,5레벨,Create Spirit Train Stop, Festival King, Mass Levitate, Origami Bird Swarm, Submerge, Summon Jack-O'-Lantern, Tamh Gon's Fiery Festival Feast | D&D 5e 2024 Obojima Tales from the Tall Grass | 5레벨 | Create Spirit Train Stop, Festival King, Mass Levitate, Origami Bird Swarm, Submerge, Summon Jack-O'-Lantern, Tamh Gon's Fiery Festival Feast |
| D&D 5e 2024 Obojima Tales from the Tall Grass,6레벨,Crustacean Form | D&D 5e 2024 Obojima Tales from the Tall Grass | 6레벨 | Crustacean Form |
| D&D 5e 2024 Obojima Tales from the Tall Grass,7레벨,Divine Arrow | D&D 5e 2024 Obojima Tales from the Tall Grass | 7레벨 | Divine Arrow |
| D&D 5e 2024 The Gunslinger Class- Valda’s Spire of Secrets,소마법 (Cantrip),Concealed Shot, Finger Guns | D&D 5e 2024 The Gunslinger Class- Valda’s Spire of Secrets | 소마법 (Cantrip) | Concealed Shot, Finger Guns |
| D&D 5e 2024 The Gunslinger Class- Valda’s Spire of Secrets,1레벨,Conjure Cover | D&D 5e 2024 The Gunslinger Class- Valda’s Spire of Secrets | 1레벨 | Conjure Cover |
| D&D 5e 2024 The Gunslinger Class- Valda’s Spire of Secrets,2레벨,Jam Weapon, Jethro's Instant Reload | D&D 5e 2024 The Gunslinger Class- Valda’s Spire of Secrets | 2레벨 | Jam Weapon, Jethro's Instant Reload |
| D&D 5e 2024 The Gunslinger Class- Valda’s Spire of Secrets,6레벨,Antiballistics Field | D&D 5e 2024 The Gunslinger Class- Valda’s Spire of Secrets | 6레벨 | Antiballistics Field |
| D&D 5e 2024 The Gunslinger Class- Valda’s Spire of Secrets,알 수 없음,Ballistic Smite, Conjure Cannonball | D&D 5e 2024 The Gunslinger Class- Valda’s Spire of Secrets | 알 수 없음 | Ballistic Smite, Conjure Cannonball |
| D&D 5e 2024 The Illrigger Revised,소마법 (Cantrip),Hellfire, Vengeful Blade | D&D 5e 2024 The Illrigger Revised | 소마법 (Cantrip) | Hellfire, Vengeful Blade |
| D&D 5e 2024 The Illrigger Revised,1레벨,Hell's Lash | D&D 5e 2024 The Illrigger Revised | 1레벨 | Hell's Lash |
| D&D 5e 2024 The Illrigger Revised,2레벨,Infernal Challenge | D&D 5e 2024 The Illrigger Revised | 2레벨 | Infernal Challenge |
| D&D 5e 2024 The Illrigger Revised,4레벨,Maligned Weapon | D&D 5e 2024 The Illrigger Revised | 4레벨 | Maligned Weapon |
| D&D 5e 2024 The Illrigger Revised,알 수 없음,Aura of Desecration, Mote of Hell, Wall of Death | D&D 5e 2024 The Illrigger Revised | 알 수 없음 | Aura of Desecration, Mote of Hell, Wall of Death |
| D&D 5e 2025 Grim Hollow- Player’s Guide,소마법 (Cantrip),Calling Card, Hunter Sense | D&D 5e 2025 Grim Hollow- Player’s Guide | 소마법 (Cantrip) | Calling Card, Hunter Sense |
| D&D 5e 2025 Grim Hollow- Player’s Guide,1레벨,Blood Rush, Consumption, Creeping Touch, Crimson Lash, Ghost Light, Neutralize Aura | D&D 5e 2025 Grim Hollow- Player’s Guide | 1레벨 | Blood Rush, Consumption, Creeping Touch, Crimson Lash, Ghost Light, Neutralize Aura |
| D&D 5e 2025 Grim Hollow- Player’s Guide,2레벨,Bloodletter, Fiend Flesh, Sanguine Shield, Sense Lifeblood, Theft of Vitae, Wilting Smite, Wrack | D&D 5e 2025 Grim Hollow- Player’s Guide | 2레벨 | Bloodletter, Fiend Flesh, Sanguine Shield, Sense Lifeblood, Theft of Vitae, Wilting Smite, Wrack |
| D&D 5e 2025 Grim Hollow- Player’s Guide,3레벨,Blood Bond, Flash Fever, Reanimate, Sanguine Poppet, Serpent Tongue, Suffocate | D&D 5e 2025 Grim Hollow- Player’s Guide | 3레벨 | Blood Bond, Flash Fever, Reanimate, Sanguine Poppet, Serpent Tongue, Suffocate |
| D&D 5e 2025 Grim Hollow- Player’s Guide,4레벨,Circle of Scarlet, Consume Mind, Dark Sacrament, Ride the Lightning, Supernal Smite | D&D 5e 2025 Grim Hollow- Player’s Guide | 4레벨 | Circle of Scarlet, Consume Mind, Dark Sacrament, Ride the Lightning, Supernal Smite |
| D&D 5e 2025 Grim Hollow- Player’s Guide,5레벨,Incite Riot, Investiture of Venom, Little Death, Magic Mirror, Mortality, Spirit Swarm | D&D 5e 2025 Grim Hollow- Player’s Guide | 5레벨 | Incite Riot, Investiture of Venom, Little Death, Magic Mirror, Mortality, Spirit Swarm |
| D&D 5e 2025 Grim Hollow- Player’s Guide,6레벨,Crown of Radiance, Earth Worm, Heartseeker | D&D 5e 2025 Grim Hollow- Player’s Guide | 6레벨 | Crown of Radiance, Earth Worm, Heartseeker |
| D&D 5e 2025 Grim Hollow- Player’s Guide,7레벨,Arboreal Curse | D&D 5e 2025 Grim Hollow- Player’s Guide | 7레벨 | Arboreal Curse |
| D&D 5e 2025 Grim Hollow- Player’s Guide,8레벨,Creeping Death, Flense, Red Rain, Wall of Gloom | D&D 5e 2025 Grim Hollow- Player’s Guide | 8레벨 | Creeping Death, Flense, Red Rain, Wall of Gloom |
| D&D 5e 2025 Grim Hollow- Player’s Guide,9레벨,Phoenix Flames, Steal Immortality | D&D 5e 2025 Grim Hollow- Player’s Guide | 9레벨 | Phoenix Flames, Steal Immortality |
| D&D 5e 2026 Dr Dhrolin’s Dictionary of Dinosaurs,2레벨,Evolution/Devolution | D&D 5e 2026 Dr Dhrolin’s Dictionary of Dinosaurs | 2레벨 | Evolution/Devolution |
| D&D 5e 2026 Exploring Eberron,소마법 (Cantrip),Boldrei's Broom, Culinary Transmutation, Grogan's Grime, Halan's Dramatic Entrance, Incendiary Purge, Kellan's Kindling, Magecraft, Phiarlan Whispers, Shol Flame, Tialaen Tongue | D&D 5e 2026 Exploring Eberron | 소마법 (Cantrip) | Boldrei's Broom, Culinary Transmutation, Grogan's Grime, Halan's Dramatic Entrance, Incendiary Purge, Kellan's Kindling, Magecraft, Phiarlan Whispers, Shol Flame, Tialaen Tongue |
| D&D 5e 2026 Northlands Worldbook & Sagas,소마법 (Cantrip),Aegir's Breath | D&D 5e 2026 Northlands Worldbook & Sagas | 소마법 (Cantrip) | Aegir's Breath |
| D&D 5e 2026 Northlands Worldbook & Sagas,1레벨,Coldheart, Drummer's Cadence, Extinguish, Freyja's Allure, Freyja's Grace, Ice Shape, Icewalker, Inbar's Giant-Friend, Loki's Escape, Shield-Maiden's Favor, Speechmaster's Rune, Talons of the Eagle, Trickster's Bluff | D&D 5e 2026 Northlands Worldbook & Sagas | 1레벨 | Coldheart, Drummer's Cadence, Extinguish, Freyja's Allure, Freyja's Grace, Ice Shape, Icewalker, Inbar's Giant-Friend, Loki's Escape, Shield-Maiden's Favor, Speechmaster's Rune, Talons of the Eagle, Trickster's Bluff |
| D&D 5e 2026 Northlands Worldbook & Sagas,2레벨,Aspect of the Narwhal, Billowing Sails, Call to Action, Disrupt the Wyrd, Encase in Ice, Eyes of the Raven, Fire Rune, Giantbane, Giantdodge, Glimpse the Wyrd, Infectious Skal, Melody of Sheltered Rest, Reaver's Rune, Reinforce Hull, Sailor's Shanty, Thought Rune, Valkyrie's Vision, Wotan's Retribution | D&D 5e 2026 Northlands Worldbook & Sagas | 2레벨 | Aspect of the Narwhal, Billowing Sails, Call to Action, Disrupt the Wyrd, Encase in Ice, Eyes of the Raven, Fire Rune, Giantbane, Giantdodge, Glimpse the Wyrd, Infectious Skal, Melody of Sheltered Rest, Reaver's Rune, Reinforce Hull, Sailor's Shanty, Thought Rune, Valkyrie's Vision, Wotan's Retribution |
| D&D 5e 2026 Northlands Worldbook & Sagas,3레벨,Bergelmir's Provocation, Bone-Chilling Smite, Compel Avarice, Freezing Fog, Giant's Teeth, Luckfingers, Murmurs of Doom, Protection Rune, Repair Hull, Shared Expertise, Sif's Grace, Trollblood Infusion, Truth's Blade, Valkyrie's Guidance, Wall of Snow, Weave Detonation | D&D 5e 2026 Northlands Worldbook & Sagas | 3레벨 | Bergelmir's Provocation, Bone-Chilling Smite, Compel Avarice, Freezing Fog, Giant's Teeth, Luckfingers, Murmurs of Doom, Protection Rune, Repair Hull, Shared Expertise, Sif's Grace, Trollblood Infusion, Truth's Blade, Valkyrie's Guidance, Wall of Snow, Weave Detonation |
| D&D 5e 2026 Northlands Worldbook & Sagas,4레벨,Angrboda's Fury, Beseech the Norns, Claws of the Bear, Earthsail, Fiery Siege, Fist of the Frost Jarl, Ghostly Crew, Hearthfire, Noble Sacrifice, Ode to Wrath, Pawn of the Wyrd, Skaldic Scolding, Song of the Shield Wall, Storm Maiden's Edge, Valhalla's Cohort | D&D 5e 2026 Northlands Worldbook & Sagas | 4레벨 | Angrboda's Fury, Beseech the Norns, Claws of the Bear, Earthsail, Fiery Siege, Fist of the Frost Jarl, Ghostly Crew, Hearthfire, Noble Sacrifice, Ode to Wrath, Pawn of the Wyrd, Skaldic Scolding, Song of the Shield Wall, Storm Maiden's Edge, Valhalla's Cohort |
| D&D 5e 2026 Northlands Worldbook & Sagas,5레벨,Bearstormer, Bound Fortunes, Bragi's Theatrical Fall, Branch and Root of Yggdrasil, Fenris's Howl, Regenerative Hull, Whiteout | D&D 5e 2026 Northlands Worldbook & Sagas | 5레벨 | Bearstormer, Bound Fortunes, Bragi's Theatrical Fall, Branch and Root of Yggdrasil, Fenris's Howl, Regenerative Hull, Whiteout |
| D&D 5e 2026 Northlands Worldbook & Sagas,6레벨,Ensnared Threads, Hungry Jaws of Fenris, Sun Rune | D&D 5e 2026 Northlands Worldbook & Sagas | 6레벨 | Ensnared Threads, Hungry Jaws of Fenris, Sun Rune |
| D&D 5e 2026 Northlands Worldbook & Sagas,7레벨,Summon Leviathan Avatar | D&D 5e 2026 Northlands Worldbook & Sagas | 7레벨 | Summon Leviathan Avatar |
| D&D 5e 2026 Northlands Worldbook & Sagas,8레벨,Awaken Ship Guardian, Jotun Form | D&D 5e 2026 Northlands Worldbook & Sagas | 8레벨 | Awaken Ship Guardian, Jotun Form |
| D&D 5e 2026 Northlands Worldbook & Sagas,9레벨,Beast of Ragnarok, Wyrd Sight | D&D 5e 2026 Northlands Worldbook & Sagas | 9레벨 | Beast of Ragnarok, Wyrd Sight |
|  | D&D 5e 2023 Book of Ebon Tides | 소마법 (Cantrip) | Bright Sparks / Drayfn’s Bane of Excellence / Obfuscate Object / Drizzle / Flowering |
|  | D&D 5e 2023 Book of Ebon Tides | 1레벨 | Doom of Poor Fortune / Elf Shot / Pratfall / Gloaming / Blade of Blood and Bone / Emerald Goblet / Fireflies |
|  | D&D 5e 2023 Book of Ebon Tides | 2레벨 | Drayfn’s Blunted Blade / Leiloch’s Irritating Kazoo / Ominous Winds / Ugly Duckling / Krail’s Maggot / Krail’s Rupture / Conjure Ferryman / Shadow Adaptation / Hibernation |
|  | D&D 5e 2023 Book of Ebon Tides | 3레벨 | Faerie Toast / Lost / Shadow Portal / Bitter Wind / Grim Shadows / Orros Mark of Fate / Deep Roots of the Moon |
|  | D&D 5e 2023 Book of Ebon Tides | 4레벨 | Drayfn’s Curse of Incompetence / Fire Dance / Knife of Fate / Lunar Transfer / Moonlight Sending / Polychromatic Bubble / Portho’s Portal / Spider Song / Storm Door |
|  | D&D 5e 2023 Book of Ebon Tides | 5레벨 | Feast of Flesh / Krail’s Rot / Radiant Beacon / Lost and Wandering / Hero of Fable |
|  | D&D 5e 2023 Book of Ebon Tides | 6레벨 | Conjure Giant / Doom of Stacked Stones / Grim Harvest |
|  | D&D 5e 2023 Book of Ebon Tides | 7레벨 | Charnel Banquet / Doom of Summer Years / Ebon Tide / Leiloch’s Arduous Shuffle |
|  | D&D 5e 2023 Book of Ebon Tides | 8레벨 | Child of Light and Darkness / Doom of False Friends |

