import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaPencil, FaCheck } from "react-icons/fa6";
import { uploadImages } from "../../api/image";
import ApiLoader from "../Loader/ApiLoader";
import { toast } from "react-toastify";
const FileUpload = () => {
  const [images, setImages] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFileUpload = (e) => {
    const files = e.target.files;
    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uniqueId = `${file.name}-${Date.now()}`;
      const imageUrl = URL.createObjectURL(file);

      uploadedImages.push({
        id: uniqueId,
        title: file.name,
        fileName: file.name,
        url: imageUrl,
        file: file,
        isEditing: false,
      });
    }

    setImages([...images, ...uploadedImages]);
  };

  const handleSort = () => {
    const reorderedImages = [...images];
    const [movedItem] = reorderedImages.splice(draggedIndex, 1);
    reorderedImages.splice(dragOverIndex, 0, movedItem);
    setImages(reorderedImages);
  };
  const handleUploadSubmit = async () => {
    const formData = new FormData();

    if (images && images.length > 0) {
      images.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
          formData.append("titles[]", image.title);
        }
      });
    }

    const orderedImageNames = images.map((image) => image.title);
    formData.append("orderedImages", JSON.stringify(orderedImageNames));

    try {
      setLoading(true);
      const res = await uploadImages(formData);
      if (res) {
        images.forEach((image) => {
          if (image.url) {
            URL.revokeObjectURL(image.url);
          }
        });
        toast.success("images uploaded successfully");
        setImages([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    const imageClone = [...images];
    const imageToRemove = imageClone[index];

    URL.revokeObjectURL(imageToRemove.url);

    imageClone.splice(index, 1);
    setImages(imageClone);
  };
  const toggleEdit = (index) => {
    const imageClone = [...images];
    if (!imageClone[index].originalTitle) {
      imageClone[index].originalTitle = imageClone[index].title;
    }
    imageClone[index].isEditing = !imageClone[index].isEditing;
    if (imageClone[index].isEditing) {
      setTimeout(() => {
        const inputField = document.getElementById(`edit-input-${index}`);
        if (inputField) inputField.focus();
      }, 100);
    }
    setImages(imageClone);
  };

  const handleTitleChange = (e, index) => {
    const imageClone = [...images];
    imageClone[index].title = e.target.value;
    setImages(imageClone);
  };

  const handleSaveTitle = (index) => {
    const imageClone = [...images];
    imageClone[index].isEditing = false;
    setImages(imageClone);
  };

  const handleCancelEdit = (index) => {
    const imageClone = [...images];
    imageClone[index].title = imageClone[index].originalTitle;
    imageClone[index].isEditing = false;
    setImages(imageClone);
  };

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            onChange={handleFileUpload}
          />
        </label>
      </div>
      {images?.length > 0 && (
        <>
          <div className="container mx-auto px-4 py-8 max-w-8/12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`relative bg-white rounded-lg p-6 shadow-md cursor-pointer aspect-square
                ${
                  draggedIndex === index
                    ? "opacity-50 transform scale-105 border-2 border-dashed border-gray-500"
                    : ""
                }
                ${dragOverIndex === index ? "border-4 border-green-300" : ""}`}
                  draggable
                  onDragStart={() => {
                    setDraggedIndex(index);
                  }}
                  onDragEnter={() => {
                    setDragOverIndex(index);
                  }}
                  onDragEnd={() => {
                    handleSort();
                    setDraggedIndex(null);
                    setDragOverIndex(null);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <RxCross2
                    className="rounded-full absolute top-2 right-2 bg-red-500 text-white hover:bg-red-700 h-6 w-6 z-50"
                    onClick={() => handleRemoveImage(index)}
                  />

                  <img
                    src={image.url}
                    alt={image.title}
                    className="object-cover h-full w-full absolute inset-0"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-white bg-opacity-80">
                    {image.isEditing ? (
                      <>
                        <input
                          id={`edit-input-${index}`}
                          type="text"
                          value={image.title}
                          onChange={(e) => handleTitleChange(e, index)}
                          className="w-full px-2 py-1 rounded-md border border-gray-300"
                        />
                        <div className="flex justify-end gap-2 ">
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white rounded-full"
                            onClick={() => handleSaveTitle(index)}
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleCancelEdit(index)}
                            className="bg-red-500 hover:bg-red-700 text-white rounded-full"
                          >
                            <RxCross2 />
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between items-center">
                        <span className="truncate">{image.title}</span>
                        <FaPencil
                          className="text-gray-500 hover:text-gray-700 cursor-pointer ml-2"
                          onClick={() => toggleEdit(index)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              disabled={loading}
              onClick={handleUploadSubmit}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Upload Images
            </button>
          </div>
        </>
      )}
      {loading && <ApiLoader />}
    </>
  );
};

export default FileUpload;
