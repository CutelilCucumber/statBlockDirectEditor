
export const stats = {
    name: 'Ancient Red Dragon',
    size: 'Gargantuan',
    type: 'dragon',
    alignment: 'chaotic evil',
    ac: 22,
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
    savingThrows: { //attribute + proficiency
        str: false,
        dex: true,
        con: true,
        int: false,
        wis: true,
        cha: false
    },
    skills: { //attribute + proficiency
        athletics: false,
        acrobatics: false,
        sleightOfHand: false,
        stealth: true,
        arcana: false,
        history: false,
        investigation: false,
        nature: false,
        religion: false,
        animalHandling: false,
        insight: false,
        medicine: false,
        perception: true,
        survival: false,
        deception: false,
        intimidation: false,
        performance: false,
        persuasion: false
    },
    damageResistances: '',
    damageImmunities: 'fire',
    conditionImmunities: '',
    senses: 'blindsight 60 ft., darkvision 120 ft., passive Perception 25',
    languages: 'Common, Draconic',
    cr: 24,
    proficiencyBonus: 7, //based on cr
    legendaryResistance: 3,
    actions: [{
        name: 'Multiattack',
        description: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.'
    },
    {//attribute + proficiency
        name: 'Bite',
        description: 'Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: (2d10 + 10) piercing damage plus (4d6) fire damage.'
    },
    {//attribute + proficiency
        name: 'Claw',
        description: 'Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: (2d6 + 10) slashing damage.'
    },
    {//attribute + proficiency
        name: 'Tail',
        description: 'Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: (2d8 + 10) bludgeoning damage.'
    },
    {//arbitrary dc
        name: 'Frightful Presence',
        description: 'Each creature of the dragon\'s choice that is within 120 feet of the dragon and aware of it must succeed on a DC 25 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.'
    },
    {//arbitrary dc
        name: 'Fire Breath (Recharge 5-6)',
        description: 'The dragon exhales fire in a 90-foot cone. Each creature in that area must make a DC 25 Dexterity saving throw, taking (26d6) fire damage on a failed save, or half as much damage on a successful one.'
}],
    legendaryActions: [
        3,
    {
        name: 'Detect',
        description: 'The dragon makes a Wisdom (Perception) check.'
    },
    {
        name: 'Tail Attack',
        description: 'The dragon makes a tail attack.'
    },
    {//arbitrary dc
        name: 'Wing Attack (Costs 2 Actions)',
        description: 'The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 25 Dexterity saving throw or take (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.'
}],
    lairActions: []
}