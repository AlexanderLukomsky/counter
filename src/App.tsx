import React, { useState } from 'react';
import './App.scss';
import { Counter } from './Components/Counter/Counter';
import { CounterSettings } from './Components/CounterSettings/CounterSettings';
import { restoreValue, setValuesToLocalStorage } from './localstorage/localstorage';
//*
function App() {

  const [counterValue, setCounterValue] = useState<string>(restoreValue('counter-value', ''))
  const [error, setError] = useState<boolean>(false)
  const setCounterResult = (value: string) => {
    setCounterValue(value)
  }
  const setSettingsCounter = () => {
    const counterValue = restoreValue('min-value', '')
    setCounterValue(counterValue)
    setValuesToLocalStorage([
      { key: 'counter-value', value: counterValue }
    ])

  }
  return (
    <div className="App">
      <CounterSettings
        setSettingsCounter={setSettingsCounter}
        setCounterResult={setCounterResult}
        setError={setError}
      />
      <Counter
        error={error}
        counterResult={counterValue}
        setCounterResult={setCounterResult}
      />
    </div>
  );
}

export default App;

