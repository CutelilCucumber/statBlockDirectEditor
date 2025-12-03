import { useState } from "react";
import { SearchBar } from "./monsterSearch";

export function NavBar({editor, monList, currId, imgSrc, changeCount}){
    let lockSrc = editor.locked ? "/assets/buttons/lock.svg" : "/assets/buttons/unlock.svg";
    let wrapSrc = editor.wrap ? "/assets/buttons/wrap.svg" : "/assets/buttons/no-wrap.svg";

    return (
        <header>
            <h1>Statblock Direct Editor</h1>
            <div className="options">
                <img  tabIndex='0' src='/assets/buttons/save.svg' title="Save to bestiary" className={changeCount < 1 ? "btn option saved" : "btn option"}
                onClick={() => editor.saveMonToBestiary(currId)}
                onKeyDown={(e) => {if(e.key === 'Enter') editor.saveMonToBestiary(currId)}}/>
                <Bestiary editor={editor} monList={monList}/>
                <SearchBar editor={editor}/>
                <SelectImg editor={editor} imgSrc={imgSrc}/>
                <img tabIndex='0' src={lockSrc} className="btn option" title='Lock statblock'
                onClick={() => editor.toggleLock()}
                onKeyDown={(e) => {if(e.key === 'Enter') editor.toggleLock()}}/>
                <img tabIndex='0' src={wrapSrc} className="btn option" title='Condensed view'
                onClick={() => editor.toggleWrap()}
                onKeyDown={(e) => {if(e.key === 'Enter') editor.toggleWrap()}}/>
                {changeCount > 30 ? (<em className="saveNotice"><img src="/assets/buttons/arrow-up.svg"/>You're making a lot of changes. Dont forget to save your monster!</em>) : ('')}
            </div>
        </header>
    )
}

function Bestiary({editor, monList}){
    const isEditing = (editor.editIndex === 'bestiary');
    
    return(
        <>
        {isEditing ? (<>
            <img src={'/assets/buttons/book-open.svg'} className="btn option"
                tabIndex='0' title='Close bestiary'
                onClick={() => editor.setEdit(null)}
                onKeyDown={(e) => {if(e.key === 'Enter') editor.setEdit(null)}}/>
            <div className="monList">
                <div tabIndex='0' className="btn monEntry" onClick={() => editor.addEmpty()}>
                <h4>New Monster </h4>
                    <img className="listBtn" src="/assets/buttons/add.svg" />
                </div>
                {monList.map(mon => {
                    return(
                    <div key={mon.id} className="monEntry">
                        <h4 tabIndex='0' className="btn" onClick={() => editor.selectMonster(mon)}
                onKeyDown={(e) => {if(e.key === 'Enter') editor.selectMonster(mon)}}>
                            {mon.name}</h4>
                        <img tabIndex='0' className="listBtn btn" title='Clone monster' src="/assets/buttons/copy.svg" 
                        onClick={() => editor.addClone(mon)}
                onKeyDown={(e) => {if(e.key === 'Enter') editor.addClone(mon)}}/>
                        <img tabIndex='0' className="btn" title='Remove from Bestiary' src="/assets/buttons/delete.svg" 
                        onClick={() => editor.deleteMonster(mon.id)}
                onKeyDown={(e) => {if(e.key === 'Enter') editor.deleteMonster(mon.id)}}/>
                    </div>
                    )
                })}
                
            </div>
            </>) : (
            <img src={'/assets/buttons/book.svg'} className="btn option"
                tabIndex='0' title="Open bestiary" onClick={() => editor.setEdit('bestiary')}
                onKeyDown={(e) => {if(e.key === 'Enter') editor.setEdit('bestiary')}}/>
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
            <input type="text" autoFocus onChange={(e) => setTempSrc(e.target.value)}
            onKeyDown={(e) => { 
                        if(e.key === 'Enter') {
                            setTempSrc('');
                            editor.setEdit(null);
                            editor.handleChange('imgSrc', tempSrc)
                        }
                        if(e.key === 'Escape') editor.setEdit(null);
                    }} />
            </label>
            <img tabIndex='0' className="btn" src="/assets/buttons/save.svg" onClick={() => {
                    setTempSrc('');
                    editor.setEdit(null);
                    editor.handleChange('imgSrc', tempSrc)}}
                onKeyDown={(e) => {if(e.key === 'Enter') {
                    setTempSrc('');
                    editor.setEdit(null);
                    editor.handleChange('imgSrc', tempSrc)}}
                }/>
            <img tabIndex='0' className="btn" src="/assets/buttons/cancel.svg" onClick={() => editor.setEdit(null)}
                onKeyDown={(e) => {if(e.key === 'Enter') editor.setEdit(null)}}/>
            </div>
        ) : (
            <img tabIndex='0' src={'/assets/buttons/image.svg'} className="btn option listBtn" title="Select image"
                onClick={() => {
                    setTempSrc('');
                    editor.setEdit('selectImg')}}
                onKeyDown={(e) => {if(e.key === 'Enter') {
                    setTempSrc('');
                    editor.setEdit('selectImg')}}
                }/>
        )}
        </>
    )
}

export function MonsterImage({src}){
    if (src === '') src = null;
    return (
        <>
            {src ? (<img className="monImg" src={src} />) : ('')}
        </>
    )
}