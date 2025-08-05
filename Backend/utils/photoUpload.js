import { v2 as cloudinary } from 'cloudinary'
import path from 'path';


function isFileTypeSupported(supportedFileTypes , fileTypes){
    const valid = supportedFileTypes.includes(fileTypes);
    return valid;
}

async function uploadToCloudinarty(file , folder){
    const options = {folder};

    return await cloudinary.uploader.upload(file.tempFilePath , options);
}

const uploadPhoto = async(image , folder) => {
    try {
        
        const supportedFileTypes =  ["jpeg" , "png" , "jpg"];
        const fileTypes = path.extname(image.name).slice(1).toLowerCase();


        if (!isFileTypeSupported(supportedFileTypes , fileTypes)) {
            throw new Error("file type not supported")
        }

        const uploadResponse = await uploadToCloudinarty(image , folder);

           if (uploadResponse) {
            return uploadResponse;
        }

    } catch (error) {
         throw new Error(`${error}`);
    }
}

export default uploadPhoto;