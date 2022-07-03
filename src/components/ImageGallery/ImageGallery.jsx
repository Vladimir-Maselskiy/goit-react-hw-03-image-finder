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
    if (
      prevProps.search !== this.props.search ||
      prevProps.currentPage !== this.props.currentPage
    ) {
      this.props.isLoading(true);
      fetchPixabay(
        this.props.search,
        this.props.currentPage,
        this.setData,
        this.props.isLoading
      ).finally(() => this.props.isLoading(false));
    }
    if (prevState.data !== this.state.data) {
      this.state.data.length >= this.totalHits
        ? this.props.loadMoreStatus(false)
        : this.props.loadMoreStatus(true);
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

  render() {
    return (
      <GalleryStyled>
        {this.state.data.length > 0 &&
          this.state.data.map(item => {
            return <ImageGalleryItem key={item.id} item={item} />;
          })}
      </GalleryStyled>
    );
  }
}
