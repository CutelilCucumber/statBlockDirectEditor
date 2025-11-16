export function NavBar({editor}){
    let lockSrc = editor.locked ? "src/assets/buttons/lock.svg" : "src/assets/buttons/unlock.svg";
    let wrapSrc = editor.wrap ? "src/assets/buttons/wrap.svg" : "src/assets/buttons/no-wrap.svg";

    return (
        <header>
            <h1>Monster Direct Editor</h1>
            <div className="options">
                <img src={lockSrc} className="btn option"
                onClick={() => editor.toggleLock()}/>
                <img src={wrapSrc} className="btn option"
                onClick={() => editor.toggleWrap()}/>
            </div>
        </header>
    )
}

export function MonsterImage({src, editor}){
    return (
        <img className="monImg" src={src}></img>
    )
}