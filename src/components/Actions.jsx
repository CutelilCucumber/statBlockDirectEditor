import { Line } from "./VisualBlocks";
import { stats} from "./data";

export function Actions() {
    return (
        <div className="allActions">
            <ActionCategory title='Traits' items={stats.traits} />
            <ActionCategory title='Actions' items={stats.actions} />
            <ActionCategory title='Legendary Actions' items={stats.legendaryActions}>
                <LegActs />
            </ActionCategory>
            <ActionCategory title='Lair Actions' items={stats.lairActions}>
                <LairActs />
            </ActionCategory>
        </div>
    )
}

function ActionCategory({title, items, children}) {
    const listItems = items.map(item => {
        const count = item.count ? ' ('+item.count+')' : '';
        const type = item.type ? item.type+': ' : '';

        return(
            <p key={item.name}>
                <em>
                    <strong>{item.name} </strong>
                    {count} {type} 
                </em>
                {item.description}
            </p>
        )
    })

        
    return (
        <>
            <h2>{title}</h2>
            <Line />
            {children}
            {listItems}
        </>
    )
}

function LegActs(){
    return (
        <p>The {stats.type} can take {stats.legendaryActCount} legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The {stats.type} regains spent legendary actions at the start of its turn.</p>
    )
}

function LairActs(){
    return (
        <p>On initiative count 20 (losing initiative ties), the {stats.type} takes a lair action to cause one of the following effects; the {stats.type} can’t use the same effect two rounds in a row:</p>
    )
}