type TipOptions={
    id:string,
    value:number,
    label:string
}
const tipOptions:TipOptions[]=[
    {
        id:'tip-10',
        value:.10,
        label:'10%'
    },
    {
        id:'tip-20',
        value:.20,
        label:'20%'
        
    },
    {
        id:'tip-50',
        value:.50,
        label:'50%'
    
    }
]
type TipPercentageFormProps={
    setTip: React.Dispatch<React.SetStateAction<number>>,
    tip:number
}
export default function TipPercentageForm({setTip,tip}:TipPercentageFormProps) {
    return (
        <div>
            <h3 className="text-2xl font-black ">Propina:</h3>
            <form>
            {tipOptions.map(tipOption=>(
                <div>
                    <label htmlFor={tipOption.id}>{tipOption.label}</label>
                    <input id={tipOption.id} value={tipOption.value} name="tip" type="radio"  onChange={e=>setTip(+e.target.value)} checked={tipOption.value===tip}/>
                </div>
            ))}
            </form>
        </div>
    )
}
