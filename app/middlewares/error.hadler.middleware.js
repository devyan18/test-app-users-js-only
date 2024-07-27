import multer from 'multer'

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Manejar errores específicos de Multer
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'Unexpected field' })
    } else if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large' })
    } else if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ message: 'Too many files' })
    }
  } else if (err) {
    // Manejar otros tipos de errores
    console.log(err)
    return res.status(500).json({ message: 'An unexpected error occurred' })
  }

  console.log(err)
  next()
}
