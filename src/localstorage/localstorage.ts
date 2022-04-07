type SetValuesToLocalStorageType = {
    key: string
    value: string
}
export const restoreValue = (key: string, value: string): string => {
    const valueAsString = localStorage.getItem(key)
    if (valueAsString !== null) {
        return JSON.parse(valueAsString)
    }
    return value
}
export const setValuesToLocalStorage = (objKeyValueArr: SetValuesToLocalStorageType[]) => {
    objKeyValueArr.map(k => localStorage.setItem(k.key, k.value))
}
export const removeValuesFromLocalStorage = (arrString: string[]) => {
    arrString.map(k => localStorage.removeItem(k))
}