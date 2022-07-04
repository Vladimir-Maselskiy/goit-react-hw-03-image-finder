import { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { src, alt } = this.props;
    return (
      <Overlay onClick={this.onClick}>
        <ModalStyled>
          <ImageStyled src={src} alt={alt} />
        </ModalStyled>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  isModalOpen: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
