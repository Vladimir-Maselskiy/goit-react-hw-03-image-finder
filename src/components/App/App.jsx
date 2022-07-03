import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Button from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import { AppStyled } from './App.styled';
import { Bars } from 'react-loader-spinner';
import Box from 'components/Box/Box';
import Modal from 'components/Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    currentPage: 1,
    loadMoreStatus: false,
    isLoading: false,
    isModalOpen: false,
    imageTitle: '',
    largeImageUrl: '',
  };
  onSubmit = event => {
    event.preventDefault();
    this.setState({ currentPage: 1 });
    this.setState({ search: event.currentTarget.elements.searchField.value });
  };

  onLoadMoreButtonClick = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  loadMoreStatus = status => {
    this.setState({ loadMoreStatus: status });
  };

  isLoading = status => {
    this.setState({ isLoading: status });
  };

  isModalOpen = status => {
    this.setState({ isModalOpen: status });
  };

  onKeyDown = event => {
    console.log('onKeyDown');
    if (event.key === 'Escape') {
      this.isModalOpen(false);
    }
  };

  setDataForModal = (src, imageTitle) => {
    this.setState({ imageTitle: imageTitle, largeImageUrl: src });
  };

  render() {
    const {
      search,
      currentPage,
      loadMoreStatus,
      isLoading,
      isModalOpen,
      largeImageUrl,
      imageTitle,
    } = this.state;

    return (
      <AppStyled>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          search={search}
          currentPage={currentPage}
          loadMoreStatus={this.loadMoreStatus}
          isLoading={this.isLoading}
          isModalOpen={this.isModalOpen}
          onKeyDown={this.onKeyDown}
          setDataForModal={this.setDataForModal}
        />
        {loadMoreStatus && (
          <Button onLoadMoreButtonClick={this.onLoadMoreButtonClick} />
        )}

        {isLoading && (
          <Box>
            <Bars height="100" width="100" color="grey" ariaLabel="loading" />
          </Box>
        )}

        {isModalOpen && (
          <Modal
            src={largeImageUrl}
            alt={imageTitle}
            isModalOpen={this.isModalOpen}
            onKeyDown={this.onKeyDown}
          />
        )}
      </AppStyled>
    );
  }
}
