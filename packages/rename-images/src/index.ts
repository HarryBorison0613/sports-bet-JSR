import { RenameImage } from './rename'

const main = async () => {
  // Create rename image instance
  const renameImages = new RenameImage()

  // Process images
  await renameImages.process()
}

main().then(() => console.log(`✅ Completed`))
