import { useState, useEffect } from "react";
import { parseMonsterData } from "./data.js";

export function SearchBar({editor}) {
    const isEditing = (editor.editIndex === 'search');
    const [monArr, setMonArr] = useState(null);
    const [searchFor, setSearchFor] = useState('');
    const [selectedMon, setSelectedMon] = useState(null)

    useEffect(() => {
        async function getMonArr() {
            const data = await fetchMons();
            setMonArr(data.results);
        }
        getMonArr()
    }, [])

    useEffect(() => {
        async function getMonData(index) {
            const data = await fetchMons(index);
            editor.selectMonster(parseMonsterData(data))
        }
        if (selectedMon) {
            getMonData(selectedMon);
            setSelectedMon(null)
        }
    }, [selectedMon, editor]);

    return(
        <>
        {isEditing ? (<>
            <img src={'/assets/buttons/search.svg'} className="btn option"
                tabIndex='0' title='Close search'
                onClick={() => editor.setEdit(null)}
                onKeyDown={(e) => {if(e.key === 'Enter') editor.setEdit(null)}}/>
            <div className="search">
                <input type="text" autoFocus value={searchFor} onChange={(e) => setSearchFor(e.target.value.toLowerCase())}
                 onKeyDown={(e) => {
                        if(e.key === 'Escape') editor.setEdit(null);
                    }} />

                <div className="monList">
                {monArr ? monArr
                    .filter(mon => mon.index.includes(searchFor))
                    .map(mon => {
                        return(
                        <div key={mon.url} className="monEntry editable" 
                            onClick={() => {
                                setSelectedMon(mon.index)
                                editor.setEdit(null)
                            }}
                            onKeyDown={(e) => {if(e.key === 'Enter') {
                                editor.setSelectedMon(mon.index)
                                editor.setEdit(null)
                                }}}>
                            <h4 tabIndex='0'>
                            {mon.name}</h4>
                    </div>
                    )
                }) : ("loading...")}
                
            </div>
            </div>
            </>) : (
            <img src={'/assets/buttons/search.svg'} className="btn option"
                tabIndex='0' title="Open search" onClick={() => editor.setEdit('search')}
                onKeyDown={(e) => {if(e.key === 'Enter') editor.setEdit('search')}}/>
            )}
        </>
    )
}

async function fetchMons(index) {
    let url = "https://www.dnd5eapi.co/api/2014/monsters/"
    if (index) url += index 
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error ('response status:', response.status);
        }
        return response.json();
    } catch (error) {
        console.error(error.message)
    }
}