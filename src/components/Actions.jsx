import { Line } from "./VisualBlocks";
import { newAction } from "./actionData";

export function Actions({stats, editor}) {
    return (
        <>
            <ActionCategory title='Traits' path='traits'
                entries={stats.traits} editor={editor}/>
            <ActionCategory title='Bonus Actions' path='bonusActions'
                entries={stats.bonusActions} editor={editor}/>
            <ActionCategory title='Actions' path='actions'
                entries={stats.actions} editor={editor}/>
            <ActionCategory title='Legendary Actions' path='legendaryActions'
                entries={stats.legendaryActions} editor={editor}>
                <LegActs stats={stats}/>
            </ActionCategory>
            <ActionCategory title='Lair Actions' path='lairActions'
                entries={stats.lairActions} editor={editor}>
                <LairActs stats={stats}/>
            </ActionCategory>
        </>
    )
}

function EditAction({entry, entries, path, parentPath, editor, i}){

    return(
        <div className="editContainer">
            <fieldset className="editAction">
                <label className="editable"><strong>Name: </strong>
                    <input className="actionInput" type="text" autoFocus value={entry.name} 
                        onChange={(e) => editor.handleChange(path+'.name', e.target.value)}
                        onKeyDown={(e) => { 
                            if(e.key === 'Enter') editor.setEdit(null);
                            if(e.key === 'Escape') editor.cancelChange();
                        }}/></label>
                <label className="editable"><strong>Type: </strong>
                    <input className="actionInput" type="text" value={entry.type} 
                        onChange={(e) => editor.handleChange(path+'.type', e.target.value)}
                        onKeyDown={(e) => { 
                            if(e.key === 'Enter') editor.setEdit(null);
                            if(e.key === 'Escape') editor.cancelChange();
                        }}/></label>
                <label className="editable"><strong>Count: </strong>
                    <input className="actionInput" type="text" value={entry.count} 
                        onChange={(e) => editor.handleChange(path+'.count', e.target.value)}
                        onKeyDown={(e) => { 
                            if(e.key === 'Enter') editor.setEdit(null);
                            if(e.key === 'Escape') editor.cancelChange();
                        }}/></label>
                <label className="editable"><strong>Description: </strong>
                    <textarea rows={3} className="actionInput" type="text" value={entry.description} 
                        onChange={(e) => editor.handleChange(path+'.description', e.target.value)}
                        onKeyDown={(e) => { 
                            if(e.key === 'Enter') editor.setEdit(null);
                            if(e.key === 'Escape') editor.cancelChange();
                        }}/></label>
                <div className="btnContainer">
                        <img className="btn" src="public/assets/buttons/save.svg" tabIndex='0'
                            alt="save" onClick={() => editor.setEdit(null)}
                            onKeyDown={(e) => {if(e.key === 'Enter') editor.setEdit(null);}}/>
                        <img className="btn" src="public/assets/buttons/cancel.svg" tabIndex='0'
                            alt="cancel" onClick={() => editor.cancelChange()}
                            onKeyDown={(e) => {if(e.key === 'Enter') editor.cancelChange();}}/>
                        <img className="btn delete" src="public/assets/buttons/delete.svg" tabIndex='0'
                            alt="delete action" onClick={() => 
                                editor.handleChange(parentPath, entries.filter(item => item.index !== entry.index))}
                            onKeyDown={(e) => {if(e.key === 'Enter') 
                                editor.handleChange(parentPath, entries.filter(item => item.index !== entry.index));}}/>
                    </div>
            </fieldset>
            <div className="actionNav">
                <img className="btn" src="public/assets/buttons/arrow-up.svg" tabIndex='0'
                    alt="move up" onClick={() => { editor.actShiftUp(entries, i, parentPath)}}
                    onKeyDown={(e) => {if(e.key === 'Enter') editor.actShiftUp(entries, i, parentPath);}}/>
                <img className="btn" src="public/assets/buttons/copy.svg" tabIndex='0'
                    alt="duplicate" onClick={() => {editor.actClone(entries, i, parentPath);}}
                    onKeyDown={(e) => {if(e.key === 'Enter') editor.actClone(entries, i, parentPath);}}/>
                <img className="btn" src="public/assets/buttons/arrow-down.svg" tabIndex='0'
                    alt="move down" onClick={() => {editor.actShiftDown(entries, i, parentPath)}}
                    onKeyDown={(e) => {if(e.key === 'Enter') editor.actShiftDown(entries, i, parentPath)}}/>
            </div>
        </div>
    )
}

function ActionCategory({title, path, entries, editor, children}) {
    let classy = "categoryHeader";
    let btnClassy = "btn";

    if (editor.locked) {
        btnClassy += " hidden";
        if (!entries.length) classy += " hidden";
    }
    
    return (
        <>
            <div className={classy}>
            <h2>{title}</h2>
            <img className={btnClassy} src="public/assets/buttons/add.svg" tabIndex='0'
                alt="add action" onClick={() => {
                    entries.push(newAction())
                    editor.handleChange(path, entries)}}
                onKeyDown={(e) => {if(e.key === 'Enter') {
                    entries.push(newAction())
                    editor.handleChange(path, entries)}}}/>
            </div>
                        
            <Line size={classy.includes('hidden') ? 'hidden' : ''}/>
            {!entries.length ? '' : children}
            {entries.map((entry, i) => {
                const isEditing = (editor.editIndex === entry.index);

                const count = entry.count ? ' ('+entry.count+')' : '';
                const type = entry.type ? entry.type+': ' : '';

                return(
                    <div key={entry.index} className="action" tabIndex='0'
                        onClick={() => { if(!isEditing) editor.setEdit(entry.index) }}
                        onKeyDown={(e) => {if(e.key === 'Enter' && !isEditing) editor.setEdit(entry.index) }}>
                        {isEditing ? (
                            <EditAction entry={entry} entries={entries} path={path+'['+i+']'} parentPath={path} editor={editor} i={i}/>
                        ) : (
                            <p className={editor.locked ? "" : "editable"}>
                                <em>
                                    <strong>{entry.name}</strong>
                                    {count} {type} 
                                </em>
                            {entry.description}
                        </p>)}
                    </div>
                    
                )
            })}
        </>
    )
}

function LegActs({stats}){
    return (
        <p>The {stats.type} can take {stats.legendaryActNum} legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The {stats.type} regains spent legendary actions at the start of its turn.</p>
    )
}

function LairActs({stats}){
    return (
        <p>On initiative count 20 (losing initiative ties), the {stats.type} takes a lair action to cause one of the following effects; the {stats.type} can’t use the same effect two rounds in a row:</p>
    )
}
// in case of attack implimentation
// function proficiencyBonus(stats) {
//     return (Math.floor(stats.cr/4)+1)
// }