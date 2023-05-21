import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { Component } from 'react';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { searchGallery } from './shared/gallery-api';
import LoadMoreButton from './Button/Button';
import ImageDetails from './ImageDetails/ImageDetails';

export class App extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    imageDetails: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }
  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await searchGallery(search, page);
      this.setState(({ items }) => ({
        items: [...items, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImages = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showImage = ({ largeImageURL, tags }) => {
    this.setState({
      showModal: true,
      imageDetails: {
        largeImageURL,
        tags,
      },
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      imageDetails: null,
    });
  };

  render() {
    const { items, loading, error, showModal, imageDetails } = this.state;
    const { searchImages, loadMore, showImage, closeModal } = this;
    return (
      <div className="App">
        <Searchbar onSubmit={searchImages} />
        <ImageGallery items={items} showImage={showImage} />
        {error && <p>{error}</p>}
        {loading && <Loader />}
        {Boolean(items.length) && <LoadMoreButton onClick={loadMore} />}
        {showModal && (
          <Modal close={closeModal}>
            <ImageDetails {...imageDetails} />
          </Modal>
        )}
      </div>
    );
  }
}
