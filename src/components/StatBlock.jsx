import { Line } from "./VisualBlocks";
import { stats, proficiencyBonus } from "./data";

export function StatBlock() {
    return (
        <div className="statBlock">
            <Title />
            <Line size="greater" />
            <KeyValue name='Armor Class' value={stats.ac}/>
            <KeyValue name='Hit Points' value={stats.hp}/>
            <KeyValue name='Speed' value={stats.speed}/>
            <Line size="greater" />
            <Attributes />
            <Line size="greater" />
            <SavingThrows />
            <Skills />
            {/* these 4 may need to be condensed */}
            <KeyValue name='Damage Resistances' value={stats.damageResistances}/>
            <KeyValue name='Damage Immunities' value={stats.damageImmunities}/>
            <KeyValue name='Senses' value={stats.senses}/>
            <KeyValue name='Languages' value={stats.languages} />

            <KeyValue name='Challenge' value={stats.cr}/>
            <Line size="greater" />
        </div>
    )
}

function Title() {
    return (
        <>
            <h1>{stats.name}</h1>
            <em>{stats.size} {stats.type}, {stats.alignment}</em>
        </>
    )
}

function KeyValue({name, value, classy='keyValue'}) {
    return (
        <div className={classy}>
            <strong>{name}</strong>
            <p>{value}</p>
        </div>
    )
}

function Attributes() {
    return (
        <span className="attributeContainer">
            <Attribute abbr="STR" value={stats.attributes.str} />
            <Attribute abbr="DEX" value={stats.attributes.dex} />
            <Attribute abbr="CON" value={stats.attributes.con} />
            <Attribute abbr="INT" value={stats.attributes.int} />
            <Attribute abbr="WIS" value={stats.attributes.wis} />
            <Attribute abbr="CHA" value={stats.attributes.cha} />
        </span>
    )
}
function Attribute({ abbr, value }) {
    let mod = Math.floor((value - 10) / 2);
    (mod >= 0) ? mod = `+${mod}` : mod = `${mod}`;

    return (
        <KeyValue name={abbr} value={value.toString()+' ('+mod+')'} classy='attribute' />
    )
}

function SavingThrows() {
    //filtering object for value is not possible so must be converted
    let throwArr = Object.entries(stats.savingThrows);
    const attrArr = Object.entries(stats.attributes);
    for (let i = 0; i < throwArr.length; i++){
        throwArr[i] = throwArr[i].concat(Math.floor(((attrArr[i][1]) - 10) / 2))
    }

    const proficientThrows = throwArr.filter(([, value]) => value === true)
        .map(key => ' '+key[0]+' +'+(key[2]+proficiencyBonus()))
    
    return (
        <KeyValue name={'Saving Throws'} value={proficientThrows.toString()} />
    )
}

function Skills() {
    //filtering object for value is not possible so must be converted
    let skillArr = Object.entries(stats.skills);
    const attrArr = Object.entries(stats.attributes);
    let j = 0;
    for (let i = 0; i < skillArr.length; i++){
        switch (i) {
            case 1:
                j+=1;
                break;
            case 4:
                j+=2;
                break;
            case 9:
                j+=1;
                break;
            case 14:
                j+=1;
                break;
            default:
                break;
        }

        skillArr[i] = skillArr[i].concat(Math.floor(((attrArr[j][1]) - 10) / 2))
    }

    const expertSkills = skillArr.filter(([, value]) => value === 2)
        .map(key => ' '+key[0]+' +'+(key[2]+(proficiencyBonus()*2)))

    const proficientSkills = skillArr.filter(([, value]) => value === 1)
        .map(key => ' '+key[0]+' +'+(key[2]+proficiencyBonus()))
    
    const skillStr = expertSkills.toString()+', '+proficientSkills.toString();
    return (
        <KeyValue name={'Skills'} value={skillStr} />
    )
}
