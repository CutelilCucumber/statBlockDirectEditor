import { useState } from "react";

export function NavBar({editor, monList, currId, imgSrc}){
    let lockSrc = editor.locked ? "src/assets/buttons/lock.svg" : "src/assets/buttons/unlock.svg";
    let wrapSrc = editor.wrap ? "src/assets/buttons/wrap.svg" : "src/assets/buttons/no-wrap.svg";

    return (
        <header>
            <h1>Monster Direct Editor</h1>
            <div className="options">
                <img src='src/assets/buttons/save.svg' title="Save to bestiary" className="btn option"
                onClick={() => editor.saveMonToBestiary(currId)}/>
                <Bestiary editor={editor} monList={monList}/>
                <SelectImg editor={editor} imgSrc={imgSrc}/>
                <img src={lockSrc} className="btn option" title='Lock statblock'
                onClick={() => editor.toggleLock()}/>
                <img src={wrapSrc} className="btn option" title='Single page view'
                onClick={() => editor.toggleWrap()}/>
            </div>
        </header>
    )
}

function Bestiary({editor, monList}){
    const isEditing = (editor.editIndex === 'bestiary');
    
    return(
        <>
        {isEditing ? (<>
            <img src={'src/assets/buttons/book-open.svg'} className="btn option" title='Close bestiary'
                        onClick={() => editor.setEdit(null)}/>
            <div className="monList">
                <div className="btn monEntry" onClick={() => editor.addEmpty()}>
                <h4>New Monster </h4>
                    <img className="listBtn" src="src/assets/buttons/add.svg" />
                </div>
                {monList.map(mon => {
                    return(
                    <div key={mon.id} className="monEntry">
                        <h4 className="btn" onClick={() => editor.selectMonster(mon)}>
                            {mon.name}</h4>
                        <img className="listBtn btn" title='Clone monster' src="src/assets/buttons/copy.svg" 
                        onClick={() => editor.addClone(mon)}/>
                        <img className="btn" title='Remove from Bestiary' src="src/assets/buttons/delete.svg" 
                        onClick={() => editor.deleteMonster(mon.id)}/>
                    </div>
                    )
                })}
                
            </div>
            </>) : (
            <img src={'src/assets/buttons/book.svg'} className="btn option" title="Open bestiary"
                onClick={() => editor.setEdit('bestiary')}/>
            )}
        </>
    )
}

function SelectImg({editor}){
    const [tempSrc, setTempSrc] = useState('')
    const isEditing = (editor.editIndex === 'selectImg');

    return (
        <>
        {isEditing? (
            <div className="imgInput listBtn">
            <label>Enter a valid image Url.
            <input type="text" autoFocus onChange={(e) => setTempSrc(e.target.value)}/>
            </label>
            <img className="btn" src="src/assets/buttons/save.svg" onClick={() => {
                setTempSrc('');
                editor.setEdit(null);
                editor.handleChange('imgSrc', tempSrc)}}/>
            <img className="btn" src="src/assets/buttons/cancel.svg" onClick={() => editor.setEdit(null)}/>
            </div>
        ) : (
            <img src={'src/assets/buttons/image.svg'} className="btn option listBtn" title="Select image"
                onClick={() => {
                    setTempSrc('');
                    editor.setEdit('selectImg')}}/>
        )}
        </>
    )
}

export function MonsterImage({src}){
    if (src === '') src = null;
    return (
            <img className="monImg" src={src} />
    )
}