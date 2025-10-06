import React, { useContext , useRef, useState , useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";

const ProfilePicUploader = () => {
  const { setUpdateProfilePic , uploadPhoto , checkSession } = useContext(StoreContext);
  const[preview , setPreview] = useState(null);
  const[selectedImage , setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);


  const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setSelectedImage(file);
        }

  }

    useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="overflow-hidden fixed inset-0 flex justify-center items-center bg-black/20 z-50">
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
        className="rounded-3xl h-[450px] w-[650px] bg-purple-75 p-4 flex flex-col justify-between items-center"
      >
        {/* Upper div */}
        <div className="relative h-9/12 w-full border-4 border-dashed border-violet-300 rounded-3xl flex flex-col justify-center items-center">
          <div className="h-[250px] w-[250px] overflow-hidden rounded-full border-dashed border-4 border-violet-300">
            <img
              src={preview || assets.userDefaultImage}
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Lower div */}
        <div className="flex justify-between w-11/12">
                <div 
                onClick={() => fileInputRef.current.click()}
                className="bg-violet-300 text-white border-2 w-fit p-1 px-5 rounded-full hover:bg-purple-75 hover:text-violet-300 hover:border-violet-300 cursor-pointer">
                    <p className="font-medium text-lg">Browse</p>
                </div>
                <input type="file" accept="image/*" name="fileImage" className="hidden" ref={fileInputRef} onChange={handleImageChange}/>

                    <div className="flex gap-3">
                        {/* Upload btn */}
                        <div
                        className="bg-violet-300 text-white border-2 w-fit p-1 px-5 rounded-full hover:bg-purple-75 hover:text-violet-300 hover:border-violet-300 cursor-pointer"
                            onClick={async() => {
                                if(!selectedImage) return;
                               const res = await uploadPhoto(selectedImage, "profile");
                               if (res.success) {
                                   setUpdateProfilePic(false);
                                   checkSession()
                               }
                            }}
                        >
                        <p className="font-medium text-lg">Upload</p>
                        </div>

                        {/* Cancel btn */}
                        <div
                        className="bg-violet-300 text-white border-2 w-fit p-1 px-5 rounded-full hover:bg-purple-75 hover:text-violet-300 hover:border-violet-300 cursor-pointer"
                        onClick={() => setUpdateProfilePic(false)}
                        >
                        <p className="font-medium text-lg">Cancel</p>
                        </div>
                    </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicUploader;
