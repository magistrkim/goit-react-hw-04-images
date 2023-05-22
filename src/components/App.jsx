import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { useState, useEffect, useCallback } from 'react';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { searchGallery } from './shared/gallery-api';
import LoadMoreButton from './Button/Button';
import ImageDetails from './ImageDetails/ImageDetails';

const App = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imageDetails, setImageDetails] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await searchGallery(search, page);
        setItems(prevItems => [...prevItems, ...data.hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [search, page]);

  const searchImages = useCallback(({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  }, []);

  const showImage = useCallback(({ largeImageURL, tags }) => {
    setImageDetails({ largeImageURL, tags });
    setShowModal(true);
  }, []);

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setImageDetails(null);
  }, []);

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
};

export default App;
