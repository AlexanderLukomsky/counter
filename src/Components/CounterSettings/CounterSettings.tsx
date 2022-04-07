import { ChangeEvent, useState } from "react"
import { removeValuesFromLocalStorage, restoreValue, setValuesToLocalStorage } from "../../localstorage/localstorage"
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"

type CounterSettingsPropsType = {
    setSettingsCounter: () => void
    setCounterResult: (value: string) => void
    setError: (error: boolean) => void
}
export const CounterSettings = (props: CounterSettingsPropsType) => {
    const [minValue, setMinValue] = useState<string>(restoreValue('min-value', '0'))
    const [maxValue, setMaxValue] = useState<string>(restoreValue('max-value', '0'))
    const [disabled, setDisabled] = useState<boolean>(true)


    const checkIncorrectValue = (minValue: number, maxValue: number) => {
        removeValuesFromLocalStorage(['min-value', 'max-value', 'counter-value'])
        const start = minValue;
        const max = maxValue;
        if (start === max && start > 0) {
            props.setCounterResult('value cannot be equal');
            setDisabled(true);
            props.setError(true)
            return
        }
        if (start < 0) {
            props.setCounterResult('value cannot be less than zero');
            setDisabled(true);
            props.setError(true)
            return
        }
        if (max < 0) {
            props.setCounterResult('value cannot be less than zero');
            setDisabled(true);
            props.setError(true)
            return
        }
        if (start > max && start > 0) {
            props.setCounterResult('the initial value cannot be greater than the maximum value');
            setDisabled(true);
            props.setError(true)
            return
        }
        if (max === 0) {
            props.setCounterResult('');
            setDisabled(true);
            props.setError(false)
            return
        }
        setDisabled(false);
        props.setError(false)
        props.setCounterResult('');
    }
    const getErrorClassNameInputMinValue = () => {
        if (+minValue < 0) { return true }
        if (+minValue === +maxValue && +minValue !== 0) { return true }
        if (minValue > maxValue && +maxValue >= 0) { return true }
        return false
    }
    const getErrorClassNameInputMaxValue = () => {
        if (minValue === maxValue && +maxValue !== 0) { return true }
        if (+maxValue < 0) { return true }
        return false
    }

    const changeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
        const minValueAsNumber = +e.currentTarget.value
        const maxValueAsNumber = +maxValue
        setMinValue(e.currentTarget.value)
        checkIncorrectValue(minValueAsNumber, maxValueAsNumber)

    }
    const changeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        const maxValueAsNumber = +e.currentTarget.value
        const minValueAsNumber = +minValue
        setMaxValue(e.currentTarget.value)
        checkIncorrectValue(minValueAsNumber, maxValueAsNumber)
    }

    const setSettingsCounter = () => {
        setDisabled(true)
        setValuesToLocalStorage([{ key: 'min-value', value: minValue }, { key: 'max-value', value: maxValue }])
        props.setSettingsCounter()
    }

    return (
        <div className="counter_settings">
            <div className="wrapper">
                <div className="counter_settings__items">
                    <div className="counter_settings__item"><span>max:</span>
                        <Input className={getErrorClassNameInputMaxValue() ? 'error' : ''} value={maxValue} onChange={changeMaxValue} />
                    </div>
                    <div className="counter_settings__item"><span>start:</span>
                        <Input className={getErrorClassNameInputMinValue() ? 'error' : ''} value={minValue} onChange={changeMinValue} />
                    </div>
                </div>
                <div className="counter_settings__footer">
                    <Button title='set' disabled={disabled} onClick={setSettingsCounter} />
                </div>
            </div>
        </div>
    )
}