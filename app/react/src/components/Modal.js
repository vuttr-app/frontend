import React from 'react'

const defaultProps = {
  title: '',
  body: '',
  footer: '',
  onClose: () => {}
}

export default class Modal extends React.Component {
  constructor (props = {}) {
    super(props)
  }

  onDismissClick = () => {
    (this.props.onClose || defaultProps.onClose)()
  }

  keyDown = (e) => {
    if (e.keyCode === 27) {
      this.onDismissClick()
    }
  }

  // modalRef = React.createRef()

  // documentClick = (e) => {
  //   console.log(this.modalRef, e.target)
  //   if (
  //     e.target === this.modalRef.current ||
  //     this.modalRef.current.contains(e.target)
  //   ) {
  //     return
  //   }
  //   this.onDismissClick()
  // }

  componentDidMount () {
    document.addEventListener('keydown', this.keyDown, false)
    // document.addEventListener('click', this.documentClick, false)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.keyDown, false)
    // document.removeEventListener('click', this.documentClick, false)
  }

  render () {
    const { visible, title, body, footer } = this.props
    return (
      visible &&
      <>
        <div
          className="modal-backdrop fade show"
        ></div>
        <article
          className="modal fade show data-set-modal"
          tabIndex="-1" role="dialog"
          style={{display: 'block'}}
          data-set="modal"
        >
          <div
            className="modal-dialog"
            role="document"
            // ref={this.modalRef}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  data-set="modal-title"
                >{title || defaultProps.title}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.onDismissClick}
                  action-trigger="dismiss"
                ><span aria-hidden="true">&times;</span></button>
              </div>
              <div
                className="modal-body"
                data-set='modal-body'
              >{body || defaultProps.body}</div>
              <footer
                className="modal-footer"
                data-set="modal-footer"
              >{footer || defaultProps.footer}</footer>
            </div>
          </div>
        </article>
      </>
    )
  }
}

