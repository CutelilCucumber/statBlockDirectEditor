function OrangeBorder({ side })  {

    let classy = `orange ${side}`;

    return (
        <div className={classy} />
    )
}

export function Parchment({children }) {
return (
    <main className={'parchment'}>
        <OrangeBorder side="top" />
        
        {children}
        <OrangeBorder side="bottom" />
    </main>
)
}

export function Line({ size = 'lesser' }) {
    let classy = `line ${size}`;

    return (
        <div className={classy} />
    )
}