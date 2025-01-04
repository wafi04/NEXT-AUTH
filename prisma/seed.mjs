import { PrismaClient } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary'
import path from 'path'
import fs from 'fs/promises'

const prisma = new PrismaClient()

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'venues'
    })
    return result.secure_url
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    return null
  }
}

const venues = [
  {
    name: "Grand Ballroom Jakarta",
    description: "Ballroom mewah dengan interior modern dan teknologi terkini",
    address: "Jl. Sudirman No. 123",
    city: "Jakarta",
    province: "DKI Jakarta",
    capacity: 1000,
    price: 25000000,
    facilities: ["Parking", "WiFi", "Sound System", "Stage", "Lighting"],
    createdBy: "user1",
    images: [
      { localPath: "/GrandBallroom1.jpg" },
      { localPath: "/GrandBallroom2.jpg" },
      { localPath: "/GrandBallroom3.jpg" }
    ]
  },
  {
    name: "Bali Beach Resort",
    description: "Venue outdoor dengan pemandangan pantai yang memukau",
    address: "Jl. Pantai Kuta No. 456",
    city: "Denpasar",
    province: "Bali",
    capacity: 500,
    price: 15000000,
    facilities: ["Beach Access", "Garden", "Catering", "Parking"],
    createdBy: "user1",
    images: [
      { localPath: "/BaliBestResort1.jpg" },
      { localPath: "/BaliBestResort2.jpg" },
      { localPath: "/BaliBestResort3.jpg" }
    ]
  },
  {
    name: "Bandung Convention Center",
    description: "Pusat konvensi modern dengan fasilitas lengkap",
    address: "Jl. Asia Afrika No. 789",
    city: "Bandung",
    province: "Jawa Barat",
    capacity: 2000,
    price: 35000000,
    facilities: ["AC", "Parking", "Security", "Sound System", "Projector", "Stage"],
    createdBy: "user2",
    images: [
      { localPath: "/BandungConventionCenter1.jpeg" },
      { localPath: "/BandungConventionCenter2.jpeg" }
    ]
  }
]

async function main() {
  console.log('Start seeding...')
  
  await prisma.venueImage.deleteMany()
  await prisma.venue.deleteMany()

  for (const venue of venues) {
    const { images, ...venueData } = venue
    
    const createdVenue = await prisma.venue.create({
      data: {
        ...venueData,
        createdBy: '',
      }
    })

    if (images?.length) {
      for (const image of images) {
        try {
          const absolutePath = path.join(process.cwd(), 'public', image.localPath)
          
          await fs.access(absolutePath)
          console.log(`Processing image: ${image.localPath}`)
          
          const cloudinaryUrl = await uploadToCloudinary(absolutePath)
          
          if (cloudinaryUrl) {
            await prisma.venueImage.create({
              data: {
                url: cloudinaryUrl,
                venueId: createdVenue.id
              }
            })
            console.log(`Successfully uploaded image: ${image.localPath}`)
          }
        } catch (error) {
          console.error(`Failed to process image ${image.localPath}:`, error.message)
          continue 
        }
      }
    }

    const venueImages = await prisma.venueImage.findMany({
      where: { venueId: createdVenue.id }
    })
    console.log(`Created venue: ${createdVenue.name} with ${venueImages.length} images`)
  }

  console.log('Seeding finished')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })