import { useContext, useRef, useState , useEffect } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

const FileUploader = () => {
  const { setUpdateBackGroundPic , uploadPhoto , fetchFreelancer } = useContext(StoreContext);

  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const dragCounter = useRef(0);

  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      console.log("Selected file:", file);
    }
  };

  // Drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current += 1;
    setDragActive(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dragCounter.current = 0;
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleBrowse = () => {
    fileInputRef.current.click();
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  useEffect(() => {
  return () => {
    if (preview) URL.revokeObjectURL(preview);
  };
}, [preview]);


  return (
    <div className="overflow-hidden fixed inset-0 flex justify-center items-center bg-black/20 z-50">
      {/* Main Container */}
      <div
        style={{
          boxShadow: `
    rgba(87, 36, 255, 0.25) 0px 54px 55px,
    rgba(87, 36, 255, 0.12) 0px -12px 30px,
    rgba(87, 36, 255, 0.12) 0px 4px 6px,
    rgba(87, 36, 255, 0.17) 0px 12px 13px,
    rgba(87, 36, 255, 0.09) 0px -3px 5px
  `,
        }}
        className="rounded-3xl h-[380px] w-[600px] bg-purple-75 p-4 flex flex-col justify-between items-center"
      >
        {/* Upper div (drag area) */}
        <div
          className={`relative h-9/12 w-full border-4 border-dashed border-violet-300 rounded-3xl flex flex-col justify-center items-center`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full rounded-2xl object-cover"
            />
          ) : (
            <img src={assets.fileUploaderImg} className="size-40" />
          )}

          {dragActive ? (
            <div className="absolute rounded-2xl h-full w-full bg-violet-300 flex flex-col justify-center items-center text-center">
              {/* Drag overlay content */}
              <div className="w-3/6 h-3/6 flex justify-between ">
                {/* Arrow Up */}
                <div className="self-end">
                  <lord-icon
                    src="https://cdn.lordicon.com/mgsvqean.json"
                    trigger="loop"
                    stroke="bold"
                    state="in-reveal"
                    style={{ width: "70px", height: "70px" }}
                  ></lord-icon>
                </div>
                {/* Arrow Down */}
                <div className="self-start">
                  <lord-icon
                    src="https://cdn.lordicon.com/iztkybbu.json"
                    trigger="loop"
                    stroke="bold"
                    state="in-reveal"
                    style={{ width: "70px", height: "70px" }}
                  ></lord-icon>
                </div>
              </div>
              <p className="text-3xl font-outfit font-semibold text-purple-50">
                Drop'em right here!!
              </p>
            </div>
          ) : (
            !preview && (
              <div className="absolute top-42 flex flex-col justify-center items-center text-center">
                <p className="font-semibold text-3xl font-outfit">
                  Drag and drop <span className="text-violet-300">images</span>
                </p>
                <p className="font-outfit">
                  or{" "}
                  <span
                    onClick={handleBrowse}
                    className="text-violet-300 border-b-2 border-violet-300 cursor-pointer"
                  >
                    browse file
                  </span>{" "}
                  on your computer
                </p>
              </div>
            )
          )}

          {/* Hidden input */}
          <input
            type="file"
            accept="image/*"
            name="imageFiles"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImage}
          />
        </div>

        {/* Lower div */}
        <div className="flex gap-3">
          {/* Upload btn */}
          <div
            className="bg-violet-300 text-white border-2 w-fit p-1 px-5 rounded-full hover:bg-purple-75 hover:text-violet-300 hover:border-violet-300 cursor-pointer"
          onClick={async () => {
            if (!selectedFile) return; 
            const res = await uploadPhoto(selectedFile, "background");
            if (res?.success) {
              setUpdateBackGroundPic(false); 
              fetchFreelancer()
            }
          }}
          >
            <p className="font-medium text-lg">Upload</p>
          </div>

          {/* Cancel btn */}
          <div
            className="bg-violet-300 text-white border-2 w-fit p-1 px-5 rounded-full hover:bg-purple-75 hover:text-violet-300 hover:border-violet-300 cursor-pointer"
            onClick={() => setUpdateBackGroundPic(false)}
          >
            <p className="font-medium text-lg">Cancel</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
