
import { restoreValue, setValuesToLocalStorage } from "../../localstorage/localstorage"
import { Button } from "../Button/Button"
type CounterType = {
    counterResult: string
    setCounterResult: (value: string) => void
    error: boolean
}
export const Counter = (props: CounterType) => {
    console.log(props.counterResult);
    const getResultClassName = () => {

        const maxValue = restoreValue('max-value', '')
        if (props.error) return true
        if ((+props.counterResult === +maxValue) && maxValue !== '') { return true }
        return false
    }
    const incDisabled = () => {
        const maxValue = restoreValue('max-value', '')
        if (+maxValue === +props.counterResult || props.error) { return true }
        return false
    }
    const resetDisabled = () => {
        const counterValueFromStorage = localStorage.getItem('counter-value')
        if (counterValueFromStorage !== null) {
            return false
        }
        return true
    }
    const increment = () => {
        const result = (+props.counterResult + 1).toString()
        props.setCounterResult(result)
        setValuesToLocalStorage([{ key: 'counter-value', value: result }])
    }
    const reset = () => {
        const minValue = restoreValue('min-value', '')
        props.setCounterResult(restoreValue('min-value', ''))
        setValuesToLocalStorage([{ key: 'counter-value', value: minValue }])
    }
    return (
        <div className="counter counter_settings">
            <div className="wrapper">
                <div className={`counter__top ${getResultClassName() ? 'red' : ''}`}>
                    {props.counterResult !== '' ? props.counterResult : `Enter values and press 'Set'`}
                </div>
                <div>
                    <div className="counter__footer">
                        <Button title='inc' disabled={incDisabled()} onClick={increment} />
                        <Button title='reset' disabled={resetDisabled()} onClick={reset} />
                    </div>
                </div>
            </div>
        </div>
    )
}