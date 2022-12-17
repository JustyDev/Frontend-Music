import s from './Register.module.css'

import { useStore } from 'effector-react'
import { $step } from 'features/register/store'
import { Step1 } from './steps/Step1'
import { Step2 } from './steps/Step2'
import { Step3 } from './steps/Step3'
import { Step4 } from './steps/Step4'
import note from '../../shared/ui/assets/png/note.png'

export const Register = () => {

  const step = useStore($step)

  return (
    <div className={s.container}>
      <div className={s.top}>
        <h1>Эмоции начинаются с музыки,<br/>
          которую ты слушаешь ежедневно</h1>
      </div>
      <div className={s.overlay}>
        <form className={s.block} onSubmit={e => e.preventDefault()}>
          <img src={note} alt={'Note img'}/>
          {step === 1 ? <Step1 /> : null}
          {step === 2 ? <Step2 /> : null}
          {step === 3 ? <Step3 /> : null}
          {step === 4 ? <Step4 /> : null}
        </form>
      </div>
    </div>
  )
}