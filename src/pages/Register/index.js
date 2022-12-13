import s from './Register.module.css'

import { useStore } from 'effector-react'
import { $codeData, $putCodeData } from 'features/register/store'
import { Step1 } from './steps/Step1'
import { Step2 } from './steps/Step2'
import { Step3 } from './steps/Step3'
import note from '../../shared/ui/assets/png/note.png'

export const Register = () => {

  const st1 = useStore($codeData)
  const st2 = useStore($putCodeData)

  return (
    <div className={s.container}>
      <div className={s.top}>
        <h1>Эмоции начинаются с музыки,<br/>
          которую ты слушаешь ежедневно</h1>
      </div>
      <div className={s.overlay}>
        <form className={s.block} onSubmit={e => e.preventDefault()}>
          <img src={note} alt={'Note img'}/>
          {st2?.type === "success" ? <Step3 /> : (st1?.type === "success" ? <Step2 /> : <Step1 />)}
        </form>
      </div>
    </div>
  )
}