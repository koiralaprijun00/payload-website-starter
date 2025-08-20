export default function Hero({
  title,
  backgroundImage,
  description, // Assuming a description field might be available
}: {
  title: string
  backgroundImage?: { url?: string }
  description?: string
}) {
  const bgUrl = backgroundImage?.url || '/fallback-image.jpg'

  return (
    <section className="w-full my-4 sm:my-6 md:my-8 lg:my-12 xl:my-16">
      <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] flex items-end justify-start text-white rounded-lg overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4 sm:p-6 md:p-8 text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold leading-tight mb-2 sm:mb-3 md:mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
