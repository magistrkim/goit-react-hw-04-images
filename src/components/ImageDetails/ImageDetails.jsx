import PropTypes from 'prop-types';

const ImageDetails = ({ largeImageURL, tags }) => {
  return (
    <div>
      <img src={largeImageURL} alt={tags} width={640} height={480} />
    </div>
  );
};

export default ImageDetails;

ImageDetails.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
