const images = ['/image1.jfif','/image2.jpg','/image3.jpg','/image4.jpg','/image5.jpg','/image6.jpg','image7.jpg','/image1.jfif','/image2.jpg','/image3.jpg','/image4.jpg','/image5.jpg','/image6.jpg','image7.jpg']

const HomeCarousel = () => {
  return (
    <div className="h-[550px] mb-10 mt-20 overflow-hidden relative shadow-lg w-full opacity-70">
    <div className="flex h-full w-[calc(900px*14)] animate-scrollImage ">
      { images.map((image, index) => 
        <div className=" h-full w-[900px] " key={index}>
          <img src={image} alt="" className="h-full w-full "/>
        </div>
      )}
    </div>
  </div>
  )
}

export default HomeCarousel
