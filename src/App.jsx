import { useState } from 'react'
import { Parchment } from './components/VisualBlocks'
import { StatBlock } from './components/StatBlock.jsx'
import { Actions } from './components/Actions.jsx'
import { ArgStats, newMonster } from './components/data.js'
import { NavBar, MonsterImage } from './components/Options.jsx'
import './App.css'

export default function App() {
  const [bestiary, setBestiary] = useState(() => {
    const stored = localStorage.getItem('monsterList');
    if (stored) return JSON.parse(stored);
    return []
  });
  const [data, setData] = useState(() => {
    if (bestiary.length < 1) return ArgStats;
    return bestiary[0];
  });
  const [changeCount, setChangeCount] = useState(0);
  const [backupData, setBackupData] = useState(data);
  const [editIndex, setEditIndex] = useState(null);
  const [locked, setLocked] = useState(false);
  const [wrap, setWrap] = useState(false);

  const handleChange = (path, value) => {
    setData(prevData => {
      const keys = path.replace(/\[(\w+)\]/g, '.$1').split('.');
      const newData = structuredClone(prevData);
      let curr = newData;

      for (let i=0; i<keys.length-1; i++) {
        if (!(keys[i] in curr)) curr[keys[i]] = {};
        curr = curr[keys[i]];
      }

      curr[keys[keys.length-1]] = value;
      return newData;
    });
    setChangeCount(changeCount+1)
  }
  const cancelChange = () => {
    setEditIndex(null);
    setData(backupData);
  }

  const setEdit = (index) => {
    if(!locked || index === 'bestiary' || index === 'selectImg' || index === 'search') {
      setEditIndex(index);
      setBackupData(data);
    }
    else setEditIndex(null);
  }

  const actClone = (entries, index, path) => {
    let entriesClone = entries.slice();
    entriesClone.splice(index+1, 0, structuredClone(entries[index]));
    entriesClone[index].index = crypto.randomUUID();
    handleChange(path, entriesClone)
  }

  const actShiftUp = (entries, index, path) => {
    let entriesClone = entries.slice();
    if(index===0) {
      let moveEntry = entriesClone.shift();
      let newPath;
      let newEntries;
      switch (path) {
        case 'traits':
          newPath = 'lairActions'
          newEntries = data.lairActions
          break;

        case 'bonusActions':
          newPath = 'traits'
          newEntries = data.traits
          break;

        case 'actions':
          newPath = 'bonusActions'
          newEntries = data.bonusActions
          break;

        case 'reactions':
          newPath = 'actions'
          newEntries = data.actions
          break;

        case 'legendaryActions':
          newPath = 'reactions'
          newEntries = data.reactions
          break;

        case 'lairActions':
          newPath = 'legendaryActions'
          newEntries = data.legendaryActions
          break;
      }

      newEntries.push(moveEntry)
      handleChange(path, entriesClone)
      handleChange(newPath, newEntries)
    }
    else {
        [entriesClone[index], entriesClone[index-1]] = [entriesClone[index-1], entriesClone[index]];
        editor.handleChange(path, entriesClone)
    }
  }

  const actShiftDown = (entries, index, path) => {
    let entriesClone = entries.slice();
    if(index===entries.length-1) {
      let moveEntry = entriesClone.pop();
      let newPath;
      let newEntries;
      switch (path) {
        case 'legendaryActions':
          newPath = 'lairActions'
          newEntries = data.lairActions
          break;

        case 'lairActions':
          newPath = 'traits'
          newEntries = data.traits
          break;

        case 'traits':
          newPath = 'bonusActions'
          newEntries = data.bonusActions
          break;

        case 'bonusActions':
          newPath = 'actions'
          newEntries = data.actions
          break;

        case 'actions':
          newPath = 'reactions'
          newEntries = data.reactions
          break;

        case 'reactions':
          newPath = 'legendaryActions'
          newEntries = data.legendaryActions
          break;
      }

      newEntries.unshift(moveEntry)
      handleChange(path, entriesClone)
      handleChange(newPath, newEntries)

    }
    else {
        [entriesClone[index], entriesClone[index+1]] = [entriesClone[index+1], entriesClone[index]];
        editor.handleChange(path, entriesClone)
    }
  }

  const toggleLock = () => {
    setLocked(!locked);
    setEdit(null);
  }

  const toggleWrap = () => {
    setWrap(!wrap);
  }

  const addEmpty = () => {
    const emptyMon = structuredClone(newMonster);
    emptyMon.id = crypto.randomUUID();
    selectMonster(emptyMon)
  }

  const addClone = (monObject) => {
    const cloneMon = structuredClone(monObject);
    cloneMon.id = crypto.randomUUID();
    cloneMon.name += " copy"
    selectMonster(cloneMon)

  }

  const saveMonToBestiary = (monId) => {
    setChangeCount(0);
    const monIndex = bestiary.findIndex(mon => mon.id === monId)
    let newData;
    if (monIndex === -1){
      newData = bestiary.concat(data)
      setBestiary(newData)
    } else {
      newData = bestiary;
      newData[monIndex] = data
      setBestiary(newData)
    }
    localStorage.setItem('monsterList', JSON.stringify(newData))
  }

  const selectMonster = (monObject) => {
    setEdit(null);
    setChangeCount(1);
    setData(monObject);
  }

  const deleteMonster = (monId) => {
    const newData = bestiary.filter(data => data.id !== monId);
    setBestiary(newData);

    localStorage.setItem('monsterList', JSON.stringify(newData))
  }

  const editor = {
    handleChange,
    editIndex,
    setEdit,
    locked,
    toggleLock,
    wrap,
    toggleWrap,
    cancelChange,
    actClone,
    actShiftUp,
    actShiftDown,
    addEmpty,
    selectMonster,
    saveMonToBestiary,
    deleteMonster,
    addClone
  };


    return (
      <>
        <NavBar editor={editor} monList={bestiary} currId={data.id} imgSrc={data.imgSrc} changeCount={changeCount}/>
        <div className={wrap ? ("main wrap") : "main"}>
        <Parchment>
            <StatBlock stats={data} editor={editor} />
            <Actions stats={data} editor={editor} />
        </Parchment>
        <MonsterImage src={data.imgSrc} editor={editor}/>
        </div>
      </>
    )
}

