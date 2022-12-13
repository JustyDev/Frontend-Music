import { InputCode } from 'shared/ui/atoms/InputCode'
import { useState } from 'react'
import { useEvent, useStore } from 'effector-react'
import { $codeData, $putCodeData, putCodeFx } from 'features/register/store'

export const Step2 = () => {

  const [ code, setCode ] = useState('')
  const putCode = useEvent(putCodeFx)
  const pending = useStore(putCodeFx.pending)

  const st1 = useStore($codeData)
  const st2 = useStore($putCodeData)

  const changeCode = val => {
    if (val.length === 5) {
      putCode({ number: st1.number, code: val })
    }
    if (val.length <= 5) {
      setCode(val)
    }
  }

  return (
    <>
      <h3>Созвонимся?</h3>
      <p>Введите 5 последних цифр номера, который вам позвонит, отвечать на него не нужно</p>
      <InputCode
        loading={pending}
        onChange={changeCode}
        value={code}
        length={5}
        error={st2.error ? st2.error?.message : false}
        tooltip={'Номер позвонит на ' + st1.number}
      />
    </>
  )
}