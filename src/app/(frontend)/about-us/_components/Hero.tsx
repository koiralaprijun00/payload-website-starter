export default function Hero({
  title,
  backgroundImage,
}: {
  title: string
  backgroundImage?: { url?: string }
}) {
  const bgUrl = backgroundImage?.url || '/fallback-image.jpg' // Use a fallback image or empty string

  return (
    <div
      className="relative h-[400px] flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <h1 className="relative text-white text-4xl md:text-5xl font-bold z-10 text-center px-4">
        {title}
      </h1>
    </div>
  )
}
