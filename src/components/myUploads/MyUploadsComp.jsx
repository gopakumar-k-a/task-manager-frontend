import React, { useEffect, useState } from "react";
import { getUploadedImages } from "../../api/image";
import { useNavigate } from "react-router-dom";
import ApiLoader from "../Loader/ApiLoader";
import { RxCross2 } from "react-icons/rx";
import { FaPencil, FaCheck } from "react-icons/fa6";
import { motion } from "framer-motion";
import { updateImage } from "../../api/image";
import { toast } from "react-toastify";
function MyUploadsComp() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [removedImages, setRemovedImages] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [uploadedImageStack, setUploadedImageStack] = useState([]);
  const navigate = useNavigate();
  const fetchUploadedImages = async () => {
    try {
      setLoading(true);
      const { myUploads } = await getUploadedImages();

      if (myUploads) {
        const uploadsWithEditingState = myUploads.map((image) => ({
          ...image,
          isEditing: false,
          isEdited: false,
        }));
        setUploadedImages(uploadsWithEditingState);
        setUploadedImageStack(uploadsWithEditingState);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUploadedImages();
  }, []);
  const handleSort = () => {
    const reorderedImages = [...uploadedImages];
    const [movedItem] = reorderedImages.splice(draggedIndex, 1);
    reorderedImages.splice(dragOverIndex, 0, movedItem);
    setUploadedImages(reorderedImages);
  };

  const toggleEdit = (index) => {
    const imageClone = [...uploadedImages];
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
    setUploadedImages(imageClone);
  };

  const handleRemoveImage = (index) => {
    const imageClone = [...uploadedImages];
    const imageToRemove = imageClone[index];

    const allRemovedImages = [...removedImages];
    allRemovedImages.push(imageToRemove);
    setRemovedImages(allRemovedImages);
    imageClone.splice(index, 1);
    setUploadedImages(imageClone);
    setHasUnsavedChanges(true);
  };

  const undoChanges = () => {
    setUploadedImages(uploadedImageStack);
    setHasUnsavedChanges(false);
  };

  const handleTitleChange = (e, index) => {
    const imageClone = [...uploadedImages];
    imageClone[index].title = e.target.value;
    setUploadedImages(imageClone);
  };

  const handleSaveTitle = (index) => {
    const imageClone = [...uploadedImages];
    imageClone[index].isEditing = false;
    if (imageClone[index].title != imageClone[index].originalTitle) {
      imageClone[index].isEdited = true;
      setHasUnsavedChanges(true);
    }
    setUploadedImages(imageClone);
  };

  const handleCancelEdit = (index) => {
    const imageClone = [...uploadedImages];
    imageClone[index].title = imageClone[index].originalTitle;
    imageClone[index].isEditing = false;
    setUploadedImages(imageClone);
  };
  const handleSaveChanges = async () => {

    try {
      setLoading(true);
      const res = await updateImage({
        removedImages,
        updatedImages: uploadedImages,
      });
      if (res) {
        toast.success("images updated successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    setRemovedImages([]);
    setHasUnsavedChanges(false);
  };
  


  return (
    <>
      {uploadedImages && uploadedImages.length > 0 ? (
        <>
          {uploadedImageStack?.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => navigate("/upload")}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                >
                  add more images
                </button>
              </motion.div>
            </>
          )}
          <div className="container mx-auto px-4 py-8 max-w-8/12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {uploadedImages.map((image, index) => (
                <div
                  key={image._id}
                  className={`relative border-4 border-gray-300 bg-white rounded-lg p-6 shadow-md cursor-pointer aspect-square
                    ${image.isEdited && "border-4 border-blue-300"}
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
                    setHasUnsavedChanges(true);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <RxCross2
                    className="rounded-full absolute top-2 right-2 bg-red-500 text-white hover:bg-red-700 h-6 w-6 z-50"
                    onClick={() => handleRemoveImage(index)}
                  />

                  <img
                    src={image.previewImageUrl || image.imageUrl}
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
        </>
      ) : (
        <>
          {!hasUnsavedChanges && (
            <div className="flex justify-center">
              <div className="w-full max-w-[570px] rounded-[20px] bg-gray-900 py-12 px-8 text-center md:py-[60px] md:px-[70px] ">
                <h3 className="text-white pb-2 text-xl font-bold sm:text-2xl">
                  You have No Uploads
                </h3>
                <span className="bg-indigo-500 mx-auto mb-6 inline-block h-1 w-[90px] rounded"></span>
                <p className="text-gray-400 mb-10 text-base leading-relaxed">
                  Click The Button Below To Upload The images
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate("/upload")}
                    className="text-white block w-full rounded-lg border border-gray-700 p-3 text-center text-base font-medium transition hover:border-green-600 hover:bg-green-600 hover:text-white bg-gray-500"
                  >
                    upload
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {hasUnsavedChanges && (
        <>
          <div className="flex gap-4">
            <div className="mt-6">
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg"
                >
                  Save Changes
                </button>
              </motion.div>
            </div>
            <div className="mt-6">
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={undoChanges}
                  className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg"
                >
                  undo changes
                </button>
              </motion.div>
            </div>
          </div>
        </>
      )}
      {loading && <ApiLoader />}
    </>
  );
}

export default MyUploadsComp;
