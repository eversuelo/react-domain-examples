import { OrderActions } from "../reducers/order-reducers"

type TipOptions = {
    id: string,
    value: number,
    label: string
}
const tipOptions: TipOptions[] = [
    {
        id: 'tip-10',
        value: .10,
        label: '10%'
    },
    {
        id: 'tip-20',
        value: .20,
        label: '20%'

    },
    {
        id: 'tip-50',
        value: .50,
        label: '50%'

    }
]
type TipPercentageFormProps = {
    dispatch: React.Dispatch<OrderActions>,
    tip: number
}
export default function TipPercentageForm({ dispatch, tip }: TipPercentageFormProps) {
    return (
        <div>
            <h3 className="text-2xl font-black ">Propina:</h3>
            <form id="tip-form">
                {tipOptions.map((tipOption,index) => {
                    //console.log(index);
                    return(
                    <div key={index}>
                        <label htmlFor={tipOption.id}>{tipOption.label}</label>
                        <input key={tipOption.id} id={tipOption.id} defaultValue={tipOption.value} name="tip" type="radio"
                            onChange={() => dispatch({ type: "set-tip", payload: { tip: tipOption.value } })}
                            checked={tipOption.value === tip} />
                    </div>
                )})}
            </form>
        </div>
    )
}
