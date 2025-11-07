import { Line } from "./VisualBlocks";
import { stats } from "./data";

export function Traits() {
    return (
        <>
            <Title />
            <Line size="greater" />
            <Attributes />
            <Line size="greater" />
            <SavingThrows />
        </>
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
        <div className="attribute">
            <strong>{abbr}</strong>
            <p>{value.toString()+' ('+mod+')'}</p>
        </div>
    )
}

function SavingThrows() {
    //filtering object for value is not possible so must be converted
    let throwArr = Object.entries(stats.savingThrows);
    const attrArr = Object.entries(stats.attributes);
    for (let i = 0; i < throwArr.length; i++){
        throwArr[i] = throwArr[i].concat(Math.floor(((attrArr[i][1]) - 10) / 2))
    }

    const proficientThrows = throwArr.filter(([key, value]) => value === true)
        .map(key => ' '+key[0]+' +'+(key[2]+stats.proficiencyBonus))
    
    return (
        <div className="keyValue">
        <strong>Saving Throws </strong>
        <p>{proficientThrows.toString()}</p>
        </div>
    )
}
