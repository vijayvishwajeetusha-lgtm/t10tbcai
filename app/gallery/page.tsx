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
    { type: "image", src: "/63.jpeg", caption: "PHOTO" },
   { type: "image", src: "/100.jpeg", caption: "PHOTO" },
{ type: "image", src: "/100.jpeg", caption: "PHOTO1" },
{ type: "image", src: "/101.jpeg", caption: "PHOTO2" },
{ type: "image", src: "/102.jpeg", caption: "PHOTO3" },
{ type: "image", src: "/103.jpeg", caption: "PHOTO4" },
{ type: "image", src: "/104.jpeg", caption: "PHOTO5" },
{ type: "image", src: "/105.jpeg", caption: "PHOTO6" },
{ type: "image", src: "/106.jpeg", caption: "PHOTO7" },
{ type: "image", src: "/107.jpeg", caption: "PHOTO8" },
{ type: "image", src: "/108.jpeg", caption: "PHOTO9" },
{ type: "image", src: "/109.jpeg", caption: "PHOTO10" },
{ type: "image", src: "/110.jpeg", caption: "PHOTO11" },
{ type: "image", src: "/111.jpeg", caption: "PHOTO12" },
{ type: "image", src: "/112.jpeg", caption: "PHOTO13" },
{ type: "image", src: "/113.jpeg", caption: "PHOTO14" },
{ type: "image", src: "/114.jpeg", caption: "PHOTO15" },
{ type: "image", src: "/115.jpeg", caption: "PHOTO16" },
{ type: "image", src: "/116.jpeg", caption: "PHOTO17" },
{ type: "image", src: "/117.jpeg", caption: "PHOTO18" },
{ type: "image", src: "/118.jpeg", caption: "PHOTO19" },
{ type: "image", src: "/119.jpeg", caption: "PHOTO20" },
{ type: "image", src: "/120.jpeg", caption: "PHOTO21" },
{ type: "image", src: "/121.jpeg", caption: "PHOTO22" },
{ type: "image", src: "/122.jpeg", caption: "PHOTO23" },
{ type: "image", src: "/123.jpeg", caption: "PHOTO24" },
{ type: "image", src: "/124.jpeg", caption: "PHOTO25" },
{ type: "image", src: "/125.jpeg", caption: "PHOTO26" },
{ type: "image", src: "/126.jpeg", caption: "PHOTO27" },
{ type: "image", src: "/127.jpeg", caption: "PHOTO28" },
{ type: "image", src: "/128.jpeg", caption: "PHOTO29" },
{ type: "image", src: "/129.jpeg", caption: "PHOTO30" },
{ type: "image", src: "/130.jpeg", caption: "PHOTO31" },
{ type: "image", src: "/131.jpeg", caption: "PHOTO32" },
{ type: "image", src: "/132.jpeg", caption: "PHOTO33" },
{ type: "image", src: "/133.jpeg", caption: "PHOTO34" },
{ type: "image", src: "/134.jpeg", caption: "PHOTO35" },
{ type: "image", src: "/135.jpeg", caption: "PHOTO36" },
{ type: "image", src: "/136.jpeg", caption: "PHOTO37" },
{ type: "image", src: "/137.jpeg", caption: "PHOTO38" },
{ type: "image", src: "/138.jpeg", caption: "PHOTO39" },
{ type: "image", src: "/139.jpeg", caption: "PHOTO40" },
{ type: "image", src: "/140.jpeg", caption: "PHOTO41" },
{ type: "image", src: "/141.jpeg", caption: "PHOTO42" },
{ type: "image", src: "/142.jpeg", caption: "PHOTO43" },
{ type: "image", src: "/143.jpeg", caption: "PHOTO44" },
{ type: "image", src: "/144.jpeg", caption: "PHOTO45" },
{ type: "image", src: "/145.jpeg", caption: "PHOTO46" },
{ type: "image", src: "/146.jpeg", caption: "PHOTO47" },
{ type: "image", src: "/147.jpeg", caption: "PHOTO48" },
{ type: "image", src: "/148.jpeg", caption: "PHOTO49" },
{ type: "image", src: "/149.jpeg", caption: "PHOTO50" },
{ type: "image", src: "/150.jpeg", caption: "PHOTO51" },
{ type: "image", src: "/151.jpeg", caption: "PHOTO52" },
{ type: "image", src: "/152.jpeg", caption: "PHOTO53" },
{ type: "image", src: "/153.jpeg", caption: "PHOTO54" },
{ type: "image", src: "/154.jpeg", caption: "PHOTO55" },
{ type: "image", src: "/155.jpeg", caption: "PHOTO56" },
{ type: "image", src: "/156.jpeg", caption: "PHOTO57" },
{ type: "image", src: "/157.jpeg", caption: "PHOTO58" },
{ type: "image", src: "/158.jpeg", caption: "PHOTO59" },
{ type: "image", src: "/159.jpeg", caption: "PHOTO60" },
{ type: "image", src: "/160.jpeg", caption: "PHOTO61" },
{ type: "image", src: "/161.jpeg", caption: "PHOTO62" },
{ type: "image", src: "/162.jpeg", caption: "PHOTO63" },
{ type: "image", src: "/163.jpeg", caption: "PHOTO64" },
{ type: "image", src: "/164.jpeg", caption: "PHOTO65" },
{ type: "image", src: "/165.jpeg", caption: "PHOTO66" },
{ type: "image", src: "/166.jpeg", caption: "PHOTO67" },
{ type: "image", src: "/167.jpeg", caption: "PHOTO68" },
{ type: "image", src: "/168.jpeg", caption: "PHOTO69" },
{ type: "image", src: "/169.jpeg", caption: "PHOTO70" },
{ type: "image", src: "/170.jpeg", caption: "PHOTO71" },
{ type: "image", src: "/171.jpeg", caption: "PHOTO72" },
{ type: "image", src: "/172.jpeg", caption: "PHOTO73" },
{ type: "image", src: "/173.jpeg", caption: "PHOTO74" },
{ type: "image", src: "/174.jpeg", caption: "PHOTO75" },
{ type: "image", src: "/175.jpeg", caption: "PHOTO76" },
{ type: "image", src: "/176.jpeg", caption: "PHOTO77" },
{ type: "image", src: "/177.jpeg", caption: "PHOTO78" },
{ type: "image", src: "/178.jpeg", caption: "PHOTO79" },
{ type: "image", src: "/179.jpeg", caption: "PHOTO80" },
{ type: "image", src: "/180.jpeg", caption: "PHOTO81" },
{ type: "image", src: "/181.jpeg", caption: "PHOTO82" },
{ type: "image", src: "/182.jpeg", caption: "PHOTO83" },
{ type: "image", src: "/183.jpeg", caption: "PHOTO84" },
{ type: "image", src: "/184.jpeg", caption: "PHOTO85" },
{ type: "image", src: "/185.jpeg", caption: "PHOTO86" },
{ type: "image", src: "/186.jpeg", caption: "PHOTO87" },
{ type: "image", src: "/187.jpeg", caption: "PHOTO88" },
{ type: "image", src: "/188.jpeg", caption: "PHOTO89" },
{ type: "image", src: "/189.jpeg", caption: "PHOTO90" },
{ type: "image", src: "/190.jpeg", caption: "PHOTO91" },
{ type: "image", src: "/191.jpeg", caption: "PHOTO92" },
{ type: "image", src: "/192.jpeg", caption: "PHOTO93" },
{ type: "image", src: "/193.jpeg", caption: "PHOTO94" },
{ type: "image", src: "/194.jpeg", caption: "PHOTO95" },
{ type: "image", src: "/195.jpeg", caption: "PHOTO96" },
{ type: "image", src: "/196.jpeg", caption: "PHOTO97" },
{ type: "image", src: "/197.jpeg", caption: "PHOTO98" },
{ type: "image", src: "/198.jpeg", caption: "PHOTO99" },
{ type: "image", src: "/199.jpeg", caption: "PHOTO100" },
{ type: "image", src: "/200.jpeg", caption: "PHOTO101" },
{ type: "image", src: "/201.jpeg", caption: "PHOTO102" },
{ type: "image", src: "/202.jpeg", caption: "PHOTO103" },
{ type: "image", src: "/203.jpeg", caption: "PHOTO104" },


]

const youtubeVideos = [
  {
    id: "CBvGlOvHa_c",
    title: "Tournament Highlights 2024",
    thumbnail: "119.jpeg",
  },
  {
    id: "ETNlrmPOdmU",
    title: "Final Match - Championship 2024",
    thumbnail: "107.jpeg",
  },
  {
    id: "qUIbcTJSbOg",
    title: "Best Catches & Wickets",
    thumbnail: "/106.jpeg",
  },
  {
    id: "lc78khgFNho",
    title: "Award Ceremony",
    thumbnail: "/105.jpeg",
  },
  {
    id: "I641AcX-aGw",
    title: "Player Interviews",
    thumbnail: "/167.jpeg",
  },
  {
    id: "tspPe1mCW4E",
    title: "Behind the Scenes",
    thumbnail: "/155.jpeg",
  },
  {
    id: "ySOCvcPmXso",
    title: "Behind the Scenes",
    thumbnail: "/158.jpeg",
  },
  {
    id: "kdZXj9XupwE",
    title: "Behind the Scenes",
    thumbnail: "/142.jpeg",
  },
  {
    id: "MvJUzE46bf0",
    title: "Behind the Scenes",
    thumbnail: "/143.jpeg",
  },
  {
    id: "vJ_jVG6tnmY",
    title: "Behind the Scenes",
    thumbnail: "/157.jpeg",
  },
  {
    id: "ah6KxaokbBQ",
    title: "Behind the Scenes",
    thumbnail: "/147.jpeg",
  },
  {
    id: "54A2nk1h290",
    title: "Behind the Scenes",
    thumbnail: "/184.jpeg",
  },
  {
    id: "tspPe1mCW4E",
    title: "Behind the Scenes",
    thumbnail: "/183.jpeg",
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
