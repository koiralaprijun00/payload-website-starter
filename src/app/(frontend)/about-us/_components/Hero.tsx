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
    <section className="container mx-auto my-8 md:my-16">
      <div className="relative h-[50vh] md:h-[60vh] flex items-end justify-start text-white rounded-lg overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-8 text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">{title}</h1>
          {description && <p className="text-lg md:text-xl max-w-2xl">{description}</p>}
        </div>
      </div>
    </section>
  )
}
