import React, { useState } from 'react';

const ProductImageCarousel = ({ handleLoadImages }) => {
  const [images, setImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index);
  };

  const handleAddNewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...images, e.target.result];
        setImages(newImages);
        handleLoadImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    handleLoadImages(newImages);

    // Update activeImageIndex if necessary
    if (index === activeImageIndex) {
      setActiveImageIndex(0);
    } else if (index < activeImageIndex) {
      setActiveImageIndex(activeImageIndex - 1);
    }
  };

  return (
    <div className="product-image-carousel">
      {/* Main Product Image */}
      <div className="main-image mb-3">
        {images.length > 0 && (
          <img
            src={images[activeImageIndex]}
            alt={`Product ${activeImageIndex}`}
            className="img-fluid"
          />
        )}
      </div>

      {/* Thumbnail Navigation */}
      <div className="thumbnail-container d-flex justify-content-center">
        {images.length > 0 &&
          images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail-item mx-2 ${
                index === activeImageIndex ? 'active' : ''
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                className="img-thumbnail"
                onClick={() => handleThumbnailClick(index)}
              />
              <button
                className="btn btn-danger btn-sm delete-icon"
                onClick={() => handleDeleteImage(index)}
              >
                ✖
              </button>
            </div>
          ))}

        {/* Add Button */}
        <div className="thumbnail-item mx-2 add-thumbnail">
          <label htmlFor="add-image-input" className="add-image-label">
            +
          </label>
          <input
            type="file"
            id="add-image-input"
            className="d-none"
            accept="image/*"
            onChange={handleAddNewImage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImageCarousel;