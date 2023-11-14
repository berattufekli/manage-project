import React, { useRef, useState } from 'react';

function UploadPhoto({ setInForm }) {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setInForm("photo", selectedFile);
      setSelectedImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemove = () => {
    setSelectedImage(null);
    setInForm("photo", "");
  }

  return (
    <div className="mt-2 flex items-center gap-x-3">

      {
        selectedImage ?
          <div className='flex'>
            <img
              className="h-24 w-24 text-gray-300 bg-gray-100 object-cover rounded-xl"
              aria-hidden="true"
              src={selectedImage}
              alt={selectedImage.name}
            />
          </div>
          :
          <div className="h-24 w-24 text-gray-300 bg-gray-100 object-cover rounded-xl" />

      }

      {
        selectedImage && <button
          type="button"
          className="rounded-md bg-red-500  px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-red-400 hover:bg-red-400"
          onClick={handleRemove}
        >
          Remove
        </button>
      }
      <button
        type="button"
        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={handleButtonClick}
      >
        {selectedImage ? "Change" : "Upload Photo"}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default UploadPhoto;