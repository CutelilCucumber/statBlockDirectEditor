import { useState } from 'react'
import { Parchment } from './components/VisualBlocks'
import { StatBlock } from './components/StatBlock.jsx'
import { Actions } from './components/Actions.jsx'
import { savedStats } from './components/data.js'
import './App.css'

export default function App() {
  const [data, setData] = useState(savedStats);
  const [backupData, setBackupData] = useState(savedStats);
  const [editIndex, setEditIndex] = useState(null);
  const [locked, setLocked] = useState(false);

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
  }
  const cancelChange = () => {
    setEditIndex(null);
    setData(backupData);
  }

  const setEdit = (index) => {
    if(!locked) {
      setEditIndex(index);
      setBackupData(data);
    }
  }

  const toggleLock = () => {
    setLocked(!locked);
  }

  const editor = {
    handleChange,
    editIndex,
    setEdit,
    locked,
    cancelChange,
  };


    return (
        <Parchment>
            <StatBlock stats={data} editor={editor} />
            <Actions stats={data} editor={editor} />
        </Parchment>
    )
}

