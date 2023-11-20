import { Fragment } from 'react'
import button from './component-style/button.module.css'

export default function Button() {
  return (
    <Fragment>
        <button className={button.register}>Register Now</button>
    </Fragment>
  )
}
