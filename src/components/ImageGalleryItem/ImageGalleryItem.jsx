import PropTypes from 'prop-types';
import css from './image-gallery-item.module.css';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, onClick }) => {
  return (
    <li className={css.item}>
      <img
        className={css.img}
        src={webformatURL}
        alt={tags}
        onClick={() => onClick({ largeImageURL, tags })}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
