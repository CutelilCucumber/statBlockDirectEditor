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
            <>
                <input type="text" autoFocus
                    value={value} 
                    onChange={(e) => editor.handleChange(path, e.target.value)}
                    onKeyDown={(e) => { 
                        if(e.key === 'Enter') editor.setEdit(null);
                        if(e.key === 'Escape') editor.cancelChange();
                    }} />
                <div className="btnContainer">
                    <img className="btn" src="src/assets/buttons/save.svg" tabIndex='0'
                        alt="save" onClick={() => editor.setEdit(null)}
                        onKeyDown={(e) => {if(e.key === 'Enter') editor.setEdit(null);}}/>
                    <img className="btn" src="src/assets/buttons/cancel.svg" tabIndex='0'
                        alt="cancel" onClick={() => editor.cancelChange()}
                        onKeyDown={(e) => {if(e.key === 'Enter') editor.cancelChange();}}/>
                </div>
            </>
            
        ) : (
            <p  tabIndex="0"
                onKeyDown={(e) => {if(e.key === 'Enter') editor.setEdit(index);}}>
                {value}</p>
        )
    }          
        
    </>
    )
}

function KeyValue({name, path, value, classy='keyValue', editor}) {
    const index = useId();
    const isEditing = (editor.editIndex === index); 
    
    if(!isEditing) classy += ' editable';
    if (editor.editIndex === index && name) {
        let words = name.trim().split(' ');
        name = words[words.length-1];
    }

    return (
        <div className={classy}
                onClick={() => { if(!isEditing) editor.setEdit(index) }}>
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
            <>
                <input type="text" autoFocus className="h1"
                    value={value} 
                    onChange={(e) => editor.handleChange('name', e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') editor.setEdit(null);
                        if(e.key === 'Escape') editor.cancelChange();
                    }}
                     />
                <div className="btnContainer">
                    <img className="btn" src="src/assets/buttons/save.svg" tabIndex='0'
                        alt="save" onClick={() => editor.setEdit(null)}
                        onKeyDown={(e) => {if(e.key === 'Enter') editor.setEdit(null);}}/>
                    <img className="btn" src="src/assets/buttons/cancel.svg" tabIndex='0'
                        alt="cancel" onClick={() => editor.cancelChange()}
                        onKeyDown={(e) => {if(e.key === 'Enter') editor.cancelChange();}}/>
                </div>
            </>
        ) : (
            <h1 className="editable" 
            onClick={() => { if(!isEditing) editor.setEdit(index) }}>
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
    const attrArr = Object.entries(attributes);

    return (
        <span className="attributeContainer">
            {attrArr.map((attr) => {
                let mod = Math.floor((attr[1] - 10) / 2);
                (mod >= 0) ? mod = `+${mod}` : mod = `${mod}`;

                const path = 'attributes'+'.'+attr[0];

                return (
                    <div className="attribute" key={attr[0]}>
                        <KeyValue path={path} name={attr[0].toUpperCase()} value={attr[1]} classy='attribute' editor={editor}/>
                        <p>({mod})</p>
                    </div>
                )
            })}
        </span>
    )
}
function SelectProficient({arr, editor, parent}){

    return(
        <fieldset>
            {arr.map((check) => {
                
                return (
                <span key={check[0]}>
                    <strong>{check[0].toUpperCase()}</strong>
                    <label className="editable">Untrained<input type="radio" 
                        name={check[0]} value={0} checked={check[1]===0}
                        onChange={() => editor.handleChange(parent+'.'+check[0], 0)}/></label>
                    <label className="editable">Proficient<input type="radio"
                        name={check[0]} value={1} checked={check[1]===1}
                        onChange={() => editor.handleChange(parent+'.'+check[0], 1)}/></label>
                    <label className="editable">Expert(2x)<input type="radio"
                        name={check[0]} value={2} checked={check[1]===2}
                        onChange={() => editor.handleChange(parent+'.'+check[0], 2)}/></label>
                </span>
            )} ) }
            <div className="btnContainer offset">
                    <img className="btn" src="src/assets/buttons/save.svg" tabIndex='0'
                        alt="save" onClick={() => editor.setEdit(null)}
                        onKeyDown={(e) => {if(e.key === 'Enter') editor.setEdit(null);}}/>
                    <img className="btn" src="src/assets/buttons/cancel.svg" tabIndex='0'
                        alt="cancel" onClick={() => editor.cancelChange()}
                        onKeyDown={(e) => {if(e.key === 'Enter') editor.cancelChange();}}/>
                </div>
        </fieldset>
    )
}

function SavingThrows({stats, editor}) {
    const index = useId();
    const isEditing = (editor.editIndex === index);
    
    let throwArr = Object.entries(stats.savingThrows);
    const attrArr = Object.entries(stats.attributes);
    let classy = "keyValue";


    if (!isEditing){//apply attribute bonuses
        for (let i = 0; i < throwArr.length; i++){
            throwArr[i] = throwArr[i].concat(Math.floor(((attrArr[i][1]) - 10) / 2))
        }
        classy += " editable";
    }
    
    return (
        <div className={classy}
            onClick={() => { if(!isEditing) editor.setEdit(index) }}>
            {isEditing ? (
                <>
                    <strong>Throws</strong>
                    <SelectProficient arr={throwArr} editor={editor} parent={'savingThrows'} parentIndex={index}/>
                </>
            ) : (
                <>
                    <strong>Saving Throws</strong>
                    <p>{displayString(throwArr, stats)}</p>
                </>
            )}
        </div>
    )
}

function Skills({stats, editor}) {
    let index = useId();
    const isEditing = (editor.editIndex === index);

    let skillArr = Object.entries(stats.skills);
    const attrArr = Object.entries(stats.attributes);
    let classy = "keyValue";

    if (!isEditing){//apply attribute bonuses
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
        classy += " editable";
    }
    
    
    return(
        <div className={classy}
            onClick={() => { if(!isEditing) editor.setEdit(index) }}>
            <strong>Skills</strong>
            {isEditing ? (
                <SelectProficient arr={skillArr} editor={editor} parent={'skills'} parentIndex={index}/>
            ) : (
                <p>{displayString(skillArr, stats)}</p>
            )}
        </div>
    )
}

function displayString(arr, stats){
    const expertSkills = arr.filter(([, value]) => value === 2)
        .map(key => ' '+key[0]+' +'+(key[2]+(proficiencyBonus(stats)*2)))

    const proficientSkills = arr.filter(([, value]) => value === 1)
        .map(key => ' '+key[0]+' +'+(key[2]+proficiencyBonus(stats)))
    
    return expertSkills.length>0 ? (expertSkills.toString()+', '+proficientSkills.toString()) : (proficientSkills.toString())
}

function proficiencyBonus(stats) {
    return (Math.floor(stats.cr/4)+1)
}
