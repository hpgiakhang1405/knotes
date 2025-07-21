import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'
import cloudinary from '../config/cloudinary.js'

const uploadImage = async (buffer) => {
  if (!buffer || !Buffer.isBuffer(buffer)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'No image provided')
  }

  const imageResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'uploads',
        transformation: [{ width: 1280, crop: 'limit' }]
      },
      (error, result) => {
        if (error) {
          return reject(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Image upload failed'))
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id
        })
      }
    )
    stream.end(buffer)
  })

  return imageResult
}

export const uploadService = {
  uploadImage
}
