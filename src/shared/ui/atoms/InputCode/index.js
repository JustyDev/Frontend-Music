import React from "react"

import s from './InputCode.module.css'

export class InputCode extends React.Component {

  state = {
    refs: [],
    code: this.props.value
  }

  pushRef = ref => {
    this.setState(prevState => {

      if (prevState.refs.length === 0) {
        ref.focus();
      }

      return { ...prevState, refs: [...prevState.refs, ref] }

    });
  }

  handleChangeInputValue = event => {
    if (event.target.value.length <= this.props.length) {
      const updatedCode = this.state.code.split('')

      let newVar = event.target.value

      // if (event.target.value === '') {
      //   newVar = '-'
      // }

      let backVar = event.target.value.length === 0 ? 1 : event.target.value.length

      updatedCode.splice(event.target.id, backVar, newVar)

      this.setState({ code: updatedCode.join('') }, () => {
        this.props.onChange(this.state.code)
      })

      if (backVar > 1 && Number(event.target.id) !== (this.props.length - 1)) {
        const input = this.state.refs[Number(event.target.id) + (event.target.value.length - 1)];
        input.focus();
      }
    }

    if (event.target.value.length === 0) {
      if (Number(event.target.id) !== 0) {
        const input = this.state.refs[Number(event.target.id) - 1];

        input.focus();
      }
    }

    if (event.target.value.length === 1) {
      if (Number(event.target.id) !== this.state.refs.length - 1 && Number(event.target.id) !== 0) {
        const input = this.state.refs[Number(event.target.id) + 1];

        input.focus();
      }
    }
  }

  render() {
    return (
      <div className={s.overlay}>
        {this.props.loading ? <div className={s.loader}/> : null}
        <div className={s.wrapper} style={this.props.margin === 'disable' ? {margin: 0} : null}>
          {[...Array(Number(this.props.length))].map((_, idx) => (
            <React.Fragment key={idx}>
              <div
                className={s.code}
              >
                <input
                  placeholder='0'
                  type='number'
                  ref={this.pushRef}
                  id={idx}
                  value={this.state.code[idx]}
                  onChange={this.handleChangeInputValue}
                />
              </div>
              {(idx === 2 && this.props.length === 6) || (idx === 1 && this.props.length === 4) ? <div className={s.separator + ' ' + (this.props.error ? s.error : '')} /> : null}
            </React.Fragment>
          ))}
        </div>
        {this.props.error || this.props.tooltip ? (
          <div className={s.tooltip + ' ' + (this.props.error ? s.error : '')}>
            {this.props.error ? this.props.error : this.props.tooltip}
          </div>
        ) : null}
      </div>
    );
  }
}