"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, ZoomIn, Play } from "lucide-react"
import { galleryImages } from "@/lib/data"

const extendedGallery = [
  ...galleryImages,
  { type: "image", src: "/73.jpeg", caption: "Press Conference" },
    { type: "image", src: "/71.jpeg", caption: "Press Conference" },
    { type: "image", src: "/55.jpeg", caption: "Fans Cheering at the Stadium" },
    { type: "image", src: "/56.jpeg", caption: "Perfect Batting Shot" },
    { type: "image", src: "/58.jpeg", caption: "Award Ceremony" },
    { type: "image", src: "/60.jpeg", caption: "Practice Session" },
    { type: "image", src: "/62.jpeg", caption: "Tournament Venue" },
    { type: "image", src: "/63.jpeg", caption: "Tournament Venue" },
]

const youtubeVideos = [
  {
    id: "VIDEO_ID_1",
    title: "Tournament Highlights 2024",
    thumbnail: "/cricket-tournament-highlights.jpg",
  },
  {
    id: "VIDEO_ID_2",
    title: "Final Match - Championship 2024",
    thumbnail: "/cricket-final-match.jpg",
  },
  {
    id: "VIDEO_ID_3",
    title: "Best Catches & Wickets",
    thumbnail: "/cricket-best-catches.jpg",
  },
  {
    id: "VIDEO_ID_4",
    title: "Award Ceremony",
    thumbnail: "/cricket-award-ceremony.jpg",
  },
  {
    id: "VIDEO_ID_5",
    title: "Player Interviews",
    thumbnail: "/cricket-player-interview.jpg",
  },
  {
    id: "VIDEO_ID_6",
    title: "Behind the Scenes",
    thumbnail: "/cricket-behind-scenes.jpg",
  },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos")

  const openLightbox = (index: number) => setSelectedImage(index)
  const closeLightbox = () => setSelectedImage(null)
  const nextImage = () => setSelectedImage((prev) => (prev !== null ? (prev + 1) % extendedGallery.length : null))
  const prevImage = () =>
    setSelectedImage((prev) => (prev !== null ? (prev - 1 + extendedGallery.length) % extendedGallery.length : null))

  const openVideoModal = (videoId: string) => setSelectedVideo(videoId)
  const closeVideoModal = () => setSelectedVideo(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[300px] overflow-hidden">
          <Image src="/cricket-fans-cheering-stadium.jpg" alt="Gallery" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Media Gallery</h1>
              <p className="text-xl text-primary-foreground/90">Photos and videos from our tournaments and events</p>
            </div>
          </div>
        </section>

        {/* Tab Navigation for Photos/Videos */}
        <section className="py-8 bg-muted/30 border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setActiveTab("photos")}
                className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                  activeTab === "photos"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                Photos
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                  activeTab === "videos"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                Videos
              </button>
            </div>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {/* Photos Grid */}
            {activeTab === "photos" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-500">
                {extendedGallery.map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center">
                        <ZoomIn className="h-6 w-6 text-foreground" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-background font-semibold">{image.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Videos Grid */}
            {activeTab === "videos" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                {youtubeVideos.map((video, index) => (
                  <div
                    key={index}
                    className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
                    onClick={() => openVideoModal(video.id)}
                  >
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/50 transition-colors duration-300" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-destructive rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <Play
                          className="h-8 w-8 md:h-10 md:w-10 text-destructive-foreground ml-1"
                          fill="currentColor"
                        />
                      </div>
                    </div>

                    {/* Video Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/90 to-transparent">
                      <p className="text-background font-semibold text-lg">{video.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Photo Lightbox */}
        <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-5xl p-0 bg-foreground border-0">
            <div className="relative">
              <button
                onClick={closeLightbox}
                className="absolute right-4 top-4 z-10 w-10 h-10 bg-background/20 hover:bg-background/40 rounded-full flex items-center justify-center text-background transition-colors"
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>

              {selectedImage !== null && (
                <div className="relative aspect-[16/10]">
                  <Image
                    src={extendedGallery[selectedImage].src || "/placeholder.svg"}
                    alt={extendedGallery[selectedImage].title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevImage}
                  className="text-background hover:bg-background/20"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                {selectedImage !== null && (
                  <p className="text-background font-medium">{extendedGallery[selectedImage].title}</p>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextImage}
                  className="text-background hover:bg-background/20"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* YouTube Video Modal */}
        <Dialog open={selectedVideo !== null} onOpenChange={closeVideoModal}>
          <DialogContent className="max-w-4xl p-0 bg-foreground border-0 overflow-hidden">
            <div className="relative">
              <button
                onClick={closeVideoModal}
                className="absolute right-4 top-4 z-10 w-10 h-10 bg-background/20 hover:bg-background/40 rounded-full flex items-center justify-center text-background transition-colors"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>

              {selectedVideo && (
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  )
}
