import { Line } from "./VisualBlocks";
import { useId } from 'react'

export function StatBlock({stats, editor}) {
    return (
        <div className="statBlock">
            <Name value={stats.name}
                editor={editor} />
            <Details stats={stats}
                editor={editor} />
            <Line size="greater" />
            <KeyValue name='Armor Class'
                path='ac'
                value={stats.ac}
                editor={editor}/>
            <KeyValue name='Hit Points' 
                path='hp'
                value={stats.hp}
                editor={editor} />
            <KeyValue name='Speed' 
                path='speed'
                value={stats.speed}
                editor={editor} />
            <Line size="greater" />
            <Attributes attributes={stats.attributes}
                editor={editor} />
            <Line size="greater" />
            <SavingThrows stats={stats}
                editor={editor} />
            <Skills stats={stats} 
                editor={editor}/>
            <KeyValue name='Damage Resistances' 
                path='damageResistances'
                value={stats.damageResistances}
                editor={editor}/>
            <KeyValue name='Damage Immunities' 
                path='damageImmunities'
                value={stats.damageImmunities}
                editor={editor}/>
            <KeyValue name='Senses' 
                path='senses'
                value={stats.senses}
                editor={editor}/>
            <KeyValue name='Languages' 
                path='languages'
                value={stats.languages}
                editor={editor}/>
            <KeyValue name='Challenge'
                path='cr'
                value={stats.cr}
                editor={editor}/>
            <Line size="greater" />
        </div>
    )
}

function SingleEditable({path, value, editor, index}){
    const isEditing = (editor.editIndex === index);

    return (
        <>
        {isEditing ? (
                <input type="text" autoFocus
                    value={value} 
                    onChange={(e) => editor.handleChange(path, e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter') editor.setEdit(null);}} />
            
        ) : (
            <p>{value}</p>
        )
    }          
        
    </>
    )
}

function KeyValue({name, path, value, classy='keyValue', editor}) {
    classy += ' editable'
    const index = useId();
    
    if (editor.editIndex === index && name) {
        let words = name.trim().split(' ');
        name = words[words.length-1];
    }

    return (
        <div className={classy}
                onClick={() => editor.setEdit(index)}>
            {name ? (<strong>{name}</strong>) : ('')}
            <SingleEditable path={path} 
                value={value} 
                editor={editor} 
                index={index}/>
        </div>
    )
}

function Name({value, editor}){
    const index = useId()
    const isEditing = (editor.editIndex === index);

    return (
        <>
        {isEditing ? (
                <input type="text" autoFocus className="h1"
                    value={value} 
                    onChange={(e) => editor.handleChange('name', e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter') editor.setEdit(null);}} />
        ) : (
            <h1 className="editable" 
            onClick={() => editor.setEdit(index)}>
                {value ? value : 'Name'}
            </h1>
        )
    }          
        
    </>
    )
}

function Details({stats, editor}) {
    return(
            <em className="details">
                <KeyValue name=''
                    path='size'
                    value={stats.size}
                    editor={editor}/> 
                <KeyValue name=''
                    path='type'
                    value={stats.type}
                    editor={editor}/>,
                <KeyValue name=''
                    path='alignment'
                    value={stats.alignment}
                    editor={editor}/>
            </em>
    )
}



function Attributes({attributes, editor}) {
    return (
        <span className="attributeContainer">
            <Attribute abbr="STR" value={attributes.str} editor={editor}/>
            <Attribute abbr="DEX" value={attributes.dex} editor={editor}/>
            <Attribute abbr="CON" value={attributes.con} editor={editor}/>
            <Attribute abbr="INT" value={attributes.int} editor={editor}/>
            <Attribute abbr="WIS" value={attributes.wis} editor={editor}/>
            <Attribute abbr="CHA" value={attributes.cha} editor={editor}/>
        </span>
    )
}
function Attribute({ abbr, value, editor }) {
    let mod = Math.floor((value - 10) / 2);
    (mod >= 0) ? mod = `+${mod}` : mod = `${mod}`;

    const path = 'attributes'+'.'+abbr.toLowerCase();

    return (
        <div className="attribute">
            <KeyValue path={path} name={abbr} value={value} classy='attribute' editor={editor}/>
            <p>({mod})</p>
        </div>
    )
}

function SelectProficient({stats, editor, parentIndex}){

    return(
        <fieldset>
            
        </fieldset>
    )
}

function SavingThrows({stats, editor}) {
    const index = useId();
    const isEditing = (editor.editIndex === index);

    let throwArr = Object.entries(stats.savingThrows);
    const attrArr = Object.entries(stats.attributes);
    let proficientThrows;

    if (!isEditing){
    for (let i = 0; i < throwArr.length; i++){
        throwArr[i] = throwArr[i].concat(Math.floor(((attrArr[i][1]) - 10) / 2))
    }
    proficientThrows = throwArr.filter(([, value]) => value === true)
        .map(key => ' '+key[0]+' +'+(key[2]+proficiencyBonus(stats)))
    }
    
    return (
        <div className="keyValue editable"
            onClick={() => editor.setEdit(index)}>
            <strong>Saving Throws</strong>
            {isEditing ? (
                <SelectProficient stats={stats} editor={editor} parentIndex={index}/>
            ) : (
                <p>{proficientThrows}</p>
            )}
        </div>
    )
}

function Skills({stats, editor}) {
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
        .map(key => ' '+key[0]+' +'+(key[2]+(proficiencyBonus(stats)*2)))

    const proficientSkills = skillArr.filter(([, value]) => value === 1)
        .map(key => ' '+key[0]+' +'+(key[2]+proficiencyBonus(stats)))
    
    const skillStr = expertSkills.toString()+', '+proficientSkills.toString();
    return (
        <KeyValue path='skills' name={'Skills'} value={skillStr} editor={editor}/>
    )
}

function proficiencyBonus(stats) {
    return (Math.floor(stats.cr/4)+1)
}