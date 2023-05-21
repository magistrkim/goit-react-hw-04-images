import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './image-gallery.module.css';

const ImageGallery = ({ items, showImage }) => {
  const elements = items.map(({ id, webformatURL, largeImageURL, tags }) => (
    <ImageGalleryItem
      onClick={() => showImage({ largeImageURL, tags })}
      key={id}
      webformatURL={webformatURL}
      largeImageURL={largeImageURL}
    />
  ));
  return <ul className={css.gallery}>{elements}</ul>;
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  showImage: PropTypes.func.isRequired,
};
