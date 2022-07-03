import { Bars } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Button from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import { AppStyled } from './App.styled';

export class App extends Component {
  state = {
    search: '',
    currentPage: 1,
    loadMoreStatus: false,
    isLoading: false,
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

  render() {
    return (
      <AppStyled>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          search={this.state.search}
          currentPage={this.state.currentPage}
          loadMoreStatus={this.loadMoreStatus}
          isLoading={this.isLoading}
        />
        {this.state.loadMoreStatus && (
          <Button onLoadMoreButtonClick={this.onLoadMoreButtonClick} />
        )}
        {this.state.isLoading && (
          <Bars height="100" width="100" color="grey" ariaLabel="loading" />
        )}
      </AppStyled>
    );
  }
}
