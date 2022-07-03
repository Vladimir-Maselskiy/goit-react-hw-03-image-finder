import { Component } from 'react';
import { Overlay, ModalStyled, ImageStyled } from './Modal.styled';

export default class Modal extends Component {
  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.onKeyDown);
  }

  onClick = event => {
    if (event.target === event.currentTarget) {
      this.props.isModalOpen(false);
    }
  };

  render() {
    console.log('this.props.src', this.props.src);
    return (
      <Overlay onClick={this.onClick}>
        <ModalStyled>
          <ImageStyled src={this.props.src} alt={this.props.alt} />
        </ModalStyled>
      </Overlay>
    );
  }
}
