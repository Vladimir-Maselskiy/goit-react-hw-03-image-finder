import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { fetchPixabay } from 'utils/fetchPixabay';
import { GalleryStyled } from './ImageGallery.styled';

export default class ImageGallery extends Component {
  state = {
    data: [],
  };

  totalHits = null;

  componentDidUpdate(prevProps, prevState) {
    const { search, currentPage, isLoading, loadMoreStatus } = this.props;
    if (prevProps.search !== search || prevProps.currentPage !== currentPage) {
      this.props.isLoading(true);
      fetchPixabay(search, currentPage, this.setData);
    }

    if (prevState.data !== this.state.data) {
      this.state.data.length >= this.totalHits
        ? loadMoreStatus(false)
        : loadMoreStatus(true);
      setTimeout(() => isLoading(false), 1000);
    }
  }

  setData = newData => {
    this.totalHits = newData.totalHits;

    this.setState(state => {
      if (this.props.currentPage === 1) {
        return { data: newData.hits };
      }
      return {
        data: [...state.data, ...newData.hits],
      };
    });
  };

  onClick = event => {
    if (event.target.tagName === 'IMG') {
      const largeImageUrl = event.target.dataset.largeimageurl;
      const imageTitle = event.target.alt;
      this.props.setDataForModal(largeImageUrl, imageTitle);
      this.props.isModalOpen(true);
      document.addEventListener('keydown', this.props.onKeyDown);
    }
  };

  render() {
    return (
      <GalleryStyled onClick={this.onClick}>
        {this.state.data.length > 0 &&
          this.state.data.map(item => {
            return <ImageGalleryItem key={item.id} item={item} />;
          })}
      </GalleryStyled>
    );
  }
}

ImageGallery.propTypes = {
  search: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  isLoading: PropTypes.func.isRequired,
  loadMoreStatus: PropTypes.func.isRequired,
  isModalOpen: PropTypes.func.isRequired,
  setDataForModal: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};
