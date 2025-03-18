import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProductImg } from 'modules/products/redux';

const ProductImageCarousel = ({ initialImageUrls = [], handleLoadImages, isDeleteRemote }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialImageUrls.length > 0) {
      setImages(initialImageUrls);
    }
  }, [initialImageUrls]);

  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index);
  };

  const handleAddNewImage = (event) => {
    const files = Array.from(event.target.files).filter(file => file.type.startsWith('image/')); // Only accept images
    if (files.length > 0) {
      const newImages = [...images, ...files.map(file => ({ image: file }))]; // Store file objects directly
      setImages(newImages);
      handleLoadImages(newImages);
  
      // Clear the input so selecting the same file again will trigger onChange
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  

  const handleDeleteImage = async (index) => {
    const imageToDelete = images[index];
    if (isDeleteRemote && imageToDelete?.id) {
      dispatch({ type: 'products/deleteProductImg', payload: imageToDelete.id });
    }

    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    handleLoadImages(newImages);

    if (index === activeImageIndex) {
      setActiveImageIndex(0);
    } else if (index < activeImageIndex) {
      setActiveImageIndex(activeImageIndex - 1);
    }
  };

  const getImageSrc = (image) => {
    if (image.image instanceof File) {
      return URL.createObjectURL(image.image);
    }
    return image.image; // URL from API
  };

  return (
    <div className="product-image-carousel">
      {/* Main Product Image */}
      <div className="main-image mb-3">
        {images.length > 0 && (
          <img
            src={getImageSrc(images[activeImageIndex])}
            alt={`Product ${activeImageIndex}`}
            className="img-fluid"
          />
        )}
      </div>

      {/* Thumbnail Navigation */}
      <div className="thumbnail-container d-flex justify-content-center">
        {images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail-item mx-2 ${index === activeImageIndex ? 'active' : ''}`}
          >
            <img
              src={getImageSrc(image)}
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
            multiple
            ref={fileInputRef}
            onChange={handleAddNewImage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImageCarousel;
