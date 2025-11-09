import { useState } from 'react'
import { Parchment } from './components/VisualBlocks'
import { StatBlock } from './components/StatBlock.jsx'
import { Actions } from './components/Actions.jsx'
import './App.css'

export default function App() {
const [editingId, setEditingId] = useState(null);

  return (
    <>
    <Parchment>
        <StatBlock />
        <Actions />
    </Parchment>
    </>
  )
}

