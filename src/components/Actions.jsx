import { Line } from "./VisualBlocks";

export function Actions({stats, editor}) {
    return (
        <div className="actionBlock">
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
        </div>
    )
}

function EditAction({entry, path, editor}){
    return(
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
                    <img className="btn" src="src/assets/buttons/save.svg" tabIndex='0'
                        alt="save" onClick={() => editor.setEdit(null)}
                        onKeyDown={(e) => {if(e.key === 'Enter') editor.setEdit(null);}}/>
                    <img className="btn" src="src/assets/buttons/cancel.svg" tabIndex='0'
                        alt="cancel" onClick={() => editor.cancelChange()}
                        onKeyDown={(e) => {if(e.key === 'Enter') editor.cancelChange();}}/>
                    <img className="btn delete" src="src/assets/buttons/delete.svg" tabIndex='0'
                        alt="delete action" onClick={() => editor.deleteAction(path)}
                        onKeyDown={(e) => {if(e.key === 'Enter') editor.deleteAction(path);}}/>
                </div>
        </fieldset>
    )
}

function ActionCategory({title, path, entries, editor, children}) {

    return (
        <>
            <h2>{title}</h2>
            <Line />
            {children}
            {entries.map((entry, i) => {
                const isEditing = (editor.editIndex === entry.index);

                const count = entry.count ? ' ('+entry.count+')' : '';
                const type = entry.type ? entry.type+': ' : '';

                return(
                    <div key={entry.index} className="action"
                        onClick={() => { if(!isEditing) editor.setEdit(entry.index) }}>
                        {isEditing ? (
                            <EditAction entry={entry} path={path+'['+i+']'} editor={editor}/>
                        ) : (
                            <p className="editable">
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
        <p>The {stats.type} can take {stats.legendaryActCount} legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The {stats.type} regains spent legendary actions at the start of its turn.</p>
    )
}

function LairActs({stats}){
    return (
        <p>On initiative count 20 (losing initiative ties), the {stats.type} takes a lair action to cause one of the following effects; the {stats.type} can’t use the same effect two rounds in a row:</p>
    )
}

function proficiencyBonus(stats) {
    return (Math.floor(stats.cr/4)+1)
}