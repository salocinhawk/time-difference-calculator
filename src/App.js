import React, { useState } from 'react';
import styled from '@emotion/styled'
import Input from './Input'
import Select from './Select'
import CheckBox from './Checkbox'
import format from 'date-fns/format'
import differenceInHours from 'date-fns/difference_in_hours'
import differenceInMinutes from 'date-fns/difference_in_minutes'
import addMinutes from 'date-fns/add_minutes'
import convertTime from 'convert-time'
import 'normalize.css'
import './App.css';
import { addHours } from 'date-fns';

function App() {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [startPeriod, setStartPeriod] = useState('am')
  const [endPeriod, setEndPeriod] = useState('am')
  const [result, setResult] = useState('')
  const [includeLunch, setIncludeLunch] = useState(false)
  const [lunchPeriod, setLunchPeriod] = useState(15)

  const calculate = () => {
    const startTime = new Date(`${format(new Date(), 'MMMM DD, YYYY')} ${convertTime(`${start}${startPeriod}`, 'hh:MM')}:00`)
    const endTime = new Date(`${format(new Date(), 'MMMM DD, YYYY')} ${convertTime(`${end}${endPeriod}`, 'hh:MM')}:00`)
    startTime = includeLunch && lunchPeriod === 1 ? addHours(startTime, lunchPeriod) : startTime
    startTime = includeLunch && lunchPeriod > 1 ? addMinutes(startTime, lunchPeriod) : startTime
    const hourDiff = differenceInHours(endTime, startTime)
    const minuteDiff = differenceInMinutes(endTime, startTime) % 60
    setResult({ hours: hourDiff, minutes: minuteDiff })
  }

  const handleLunchChange = () => {
    setIncludeLunch(!includeLunch)
  };

  return (
    <PageWrapper>
      <InputRow>
        <Input label='Start Time' placeholder='00:00' value={start} onChange={e => setStart(e.target.value)} />
        <Select options={[{ value: 'am', label: 'am' }, { value: 'pm', label: 'pm' }]} value={startPeriod} onChange={e => setStartPeriod(e.target.value)} />
        <Input label='End Time' placeholder='00:00' value={end} onChange={e => setEnd(e.target.value)} />
        <Select options={[{ value: 'am', label: 'am' }, { value: 'pm', label: 'pm' }]} value={endPeriod} onChange={e => setEndPeriod(e.target.value)} />
        <CheckBox label='Includes Lunch?' checked={includeLunch} onChange={handleLunchChange} />
        {includeLunch ? <Select options={[{ value: 15, label: '15m' }, { value: 30, label: '30m' }, { value: 45, label: '45m' }, { value: 1, label: '1h' }]} value={lunchPeriod} onChange={e => setLunchPeriod(e.target.value)} /> : null}
        <Button onClick={calculate} disabled={!start || !end}>Calculate</Button>

      </InputRow>
      {
        result && (
          <Result>
            {result.hours} {result.hours > 1 ? 'hours' : 'hour'} {result.minutes !== 0 ? `and ${result.minutes} ${result.minutes > 1 ? 'minutes' : 'minute'}` : ''}
          </Result>
        )
      }
    </PageWrapper>
  );
}

export default App;

const PageWrapper = styled('main')`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InputRow = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45vh;
`

const Button = styled('button')`
  color: #fff;
  border: .15vw solid rgba(255, 255, 255, 0.51);
  background: none;
  border-radius: .4vw;
  margin-left: 2vw;
  text-transform: uppercase;
  font-weight: 300;
  padding: .6vw 1vw;
  font-size: 1.4vw;
  margin-top: .8vw;
  &:disabled{
    opacity: .4;
  }
`

const Result = styled('div')`
  margin-top: 2vw;
  font-size: 3vw;
  font-weight: 300;
`
