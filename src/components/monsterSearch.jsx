import { useState, useEffect } from "react";

export function SearchBar({editor}) {
    const isEditing = (editor.editIndex === 'search');
    const [monArr, setMonArr] = useState(null);
    const [searchFor, setSearchFor] = useState('');
    console.log(monArr)
    useEffect(() => {
        async function getMonArr() {
            const data = await getMonData();
            setMonArr(data.results);
        }
        getMonArr();
    }, []);

    return(
        <>
        {isEditing ? (<>
            <img src={'/assets/buttons/search.svg'} className="btn option"
                tabIndex='0' title='Close search'
                onClick={() => editor.setEdit(null)}
                onKeyDown={(e) => {if(e.key === 'Enter') editor.setEdit(null)}}/>
            <div className="monList">
                
                <input type="text" autoFocus value={searchFor} onChange={(e) => setSearchFor(e.target.value.toLowerCase())}
                 onKeyDown={(e) => {
                        if(e.key === 'Escape') editor.setEdit(null);
                    }} />

                {monArr ? monArr
                    .filter(mon => mon.index.includes(searchFor))
                    .map(mon => {
                        return(
                        <div key={mon.url} className="monEntry">
                            <h4 tabIndex='0' className="btn" onClick={() => editor.selectMonster(mon)}
                            onKeyDown={(e) => {if(e.key === 'Enter') editor.selectMonster(mon)}}>
                            {mon.name}</h4>
                    </div>
                    )
                }) : ("loading...")}
                
            </div>
            </>) : (
            <img src={'/assets/buttons/search.svg'} className="btn option"
                tabIndex='0' title="Open search" onClick={() => editor.setEdit('search')}
                onKeyDown={(e) => {if(e.key === 'Enter') editor.setEdit('search')}}/>
            )}
        </>
    )
}

async function getMonData() {
    try {
        const response = await fetch("https://www.dnd5eapi.co/api/2014/monsters/");

        if (!response.ok) {
            throw new Error ('response status:', response.status);
        }

        return response.json();
    } catch (error) {
        console.error(error.message)
    }
}