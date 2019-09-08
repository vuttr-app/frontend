import React from 'react'
import { render } from 'react-dom'

let resolve

const defaultProps = {
  title: 'Title',
  body: 'Body',
  okText: 'Ok',
  cancelText: 'Cancel'
}

class Confirm extends React.Component {
  static create (props = {}) {
    const container = document.createElement('div')
    document.body.appendChild(container)
    return render(<Confirm createConfirmProps={props}/>, container)
  }

  constructor () {
    super()
    this.state = {
      visible: false,
      showConfirmProps: {}
    }
    this.buttonOk = null
  }

  componentDidMount () {
    document.addEventListener("keydown", this.keyDown, false)
    if (this.buttonOk) {
      this.buttonOk.focus()
    }
  }

  componentWillUnmount () {
    document.removeEventListener("keydown", this.keyDown, false)
  }

  keyDown = (e) => {
    if (e.keyCode === 13) {
      this.onOkClick()
    }
    if (e.keyCode === 27) {
      this.onCancelClick()
    }
  }

  onOkClick = () => {
    this.setState({ visible: false })
    resolve(Promise.resolve())
  }

  onCancelClick = () => {
    this.setState({ visible: false })
    resolve(Promise.reject())
  }

  show = (props ={}) => {
    const showConfirmProps = { ...this.props.createConfirmProps, ...props }
    this.setState({ visible: true, showConfirmProps })
    return new Promise(result => {
      console.log(result)
      resolve = result
    })
  }

  render () {
    const { visible, showConfirmProps } = this.state
    const { title, body, okText, cancelText } = showConfirmProps
    return (
      visible &&
      <>
        <div className="modal-backdrop fade show"></div>
        <div
          className="modal fade show data-set-confirm"
          id="exampleModal" tabIndex="-1" role="dialog"
          style={{display: 'block'}}
          onClick={this.onCancelClick}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {title || defaultProps.title}
                </h5>
                <button type="button" className="close" data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.onCancelClick}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {body || defaultProps.body}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary"
                  data-dismiss="modal" onClick={this.onCancelClick}
                >{cancelText || defaultProps.cancelText}</button>
                <button type="button" className="btn btn-primary"
                  onClick={this.onOkClick}
                  ref={element => this.buttonOk = element}
                  autoFocus
                >{okText || defaultProps.okText}</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Confirm.create({})
