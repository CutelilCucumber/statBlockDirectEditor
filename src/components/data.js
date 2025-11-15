
export const savedStats = {
    name: 'Ancient Red Dragon',
    size: 'Gargantuan',
    type: 'dragon',
    alignment: 'chaotic evil',
    ac: 22,
    acType: 'natural',
    hp: 546,
    speed: '40 ft., climb 40 ft., fly 80 ft.',
    attributes: {//compute modifiers as needed
        str: 30,//-10 % 2 = 10
        dex: 10,//+0
        con: 29,//+9
        int: 18,//+4
        wis: 15,//+2
        cha: 23,//+6
    },
    savingThrows: { //0, 1, 2 accounts for none, prof, expert
        str: 0,
        dex: 1,
        con: 1,
        int: 0,
        wis: 1,
        cha: 0
    },
    skills: { //0, 1, 2 accounts for none, prof, expert
        athletics: 0,//str
        acrobatics: 0,//dex
        sleightOfHand: 0,
        stealth: 1,
        arcana: 0,//int
        history: 0,
        investigation: 0,
        nature: 0,
        religion: 0,
        animalHandling: 0,//wis
        insight: 0,
        medicine: 0,
        perception: 2,
        survival: 0,
        deception: 0,//cha
        intimidation: 0,
        performance: 0,
        persuasion: 0
    },
    damageResistances: '',
    damageImmunities: 'fire',
    conditionImmunities: '',
    senses: 'blindsight 60 ft., darkvision 120 ft., passive Perception 26',
    languages: 'Common, Draconic',
    cr: 24,
    imgSrc: 'https://www.dndbeyond.com/avatars/thumbnails/30782/405/1000/1000/638061961232915183.png',

    traits: [{
        index: crypto.randomUUID(),
        name: 'Legendary Resistance',
        type: '',
        count: '3/Day',
        description: 'If the dragon fails a saving throw, it can choose to succeed instead.'
    }],
    bonusActions: [],
    actions: [{
        index: crypto.randomUUID(),
        name: 'Multiattack',
        type: '',
        count: '3',
        description: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.'
    },
    {//attribute + proficiency
        index: crypto.randomUUID(),
        name: 'Bite',
        type: 'Melee Weapon Attack',
        count: '',
        description: '+17 to hit, reach 15 ft., one target. Hit: (2d10 + 10) piercing damage plus (4d6) fire damage.'
    },
    {//attribute + proficiency
        index: crypto.randomUUID(),
        name: 'Claw',
        type: 'Melee Weapon Attack',
        count: '',
        description: '+17 to hit, reach 10 ft., one target. Hit: (2d6 + 10) slashing damage.'
    },
    {//attribute + proficiency
        index: crypto.randomUUID(),
        name: 'Tail',
        type: 'Melee Weapon Attack',
        count: '',
        description: '+17 to hit, reach 20 ft., one target. Hit: (2d8 + 10) bludgeoning damage.'
    },
    {//arbitrary dc
        index: crypto.randomUUID(),
        name: 'Frightful Presence',
        type: '',
        count: '',
        description: 'Each creature of the dragon\'s choice that is within 120 feet of the dragon and aware of it must succeed on a DC 25 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.'
    },
    {//arbitrary dc
        index: crypto.randomUUID(),
        name: 'Fire Breath',
        type: 'Breath Weapon',
        count: 'Recharge 5-6',
        description: 'The dragon exhales fire in a 90-foot cone. Each creature in that area must make a DC 25 Dexterity saving throw, taking (26d6) fire damage on a failed save, or half as much damage on a successful one.'
}],
    legendaryActCount: 3,
    legendaryActions: [
    {
        index: crypto.randomUUID(),
        name: 'Detect',
        count: '',
        type: '',
        description: 'The dragon makes a Wisdom (Perception) check.'
    },
    {
        index: crypto.randomUUID(),
        name: 'Tail Attack',
        count: '',
        type: '',
        description: 'The dragon makes a tail attack.'
    },
    {//arbitrary dc
        index: crypto.randomUUID(),
        name: 'Wing Attack',
        count: 'Costs 2 Actions',
        type: '',
        description: 'The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 25 Dexterity saving throw or take (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.'
}],
    lairActions: [{
        index: crypto.randomUUID(),
        name: 'Pillar of Lava',
        count: '',
        type: '',
        description: 'Magma erupts from a point on the ground the dragon can see within 120 feet of it, creating a 20-foot-high, 5-foot-radius geyser. Each creature in the geyser’s area must make a DC 15 Dexterity saving throw, taking 21 (6d6) fire damage on a failed save, or half as much damage on a successful one.'
    },
    {
        index: crypto.randomUUID(),
        name: 'Quake',
        count: '',
        type: '',
        description: 'A tremor shakes the lair in a 60-foot radius around the dragon. Each creature other than the dragon on the ground in that area must succeed on a DC 15 Dexterity saving throw or be knocked prone.'
    },
    {
        index: crypto.randomUUID(),
        name: 'Gas Vent',
        count: '',
        type: '',
        description: 'Volcanic gases form a cloud in a 20-foot-radius sphere centered on a point the dragon can see within 120 feet of it. The sphere spreads around corners, and its area is lightly obscured. It lasts until initiative count 20 on the next round. Each creature that starts its turn in the cloud must succeed on a DC 13 Constitution saving throw or be poisoned until the end of its turn. While poisoned in this way, a creature is incapacitated.'
    },]
}