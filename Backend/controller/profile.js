import uploadPhoto from "../utils/photoUpload";


const backgroundPic = async(req , res) => {
    try {
        
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success:false,
                message:"Unauthorized user"
            })
        }

        const image = req.files.imageFiles;

        if (!image) {
            return res.status(401).json({
                success:false,
                message:"Please upload image "
            })
        }

        const uploadResponse = uploadPhoto(image , "Background_Pic");

        if (uploadResponse) {
            const background_upload = await 
        }



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Error occured while uploading background pic`
        })
    }
}

