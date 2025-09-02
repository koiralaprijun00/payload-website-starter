export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-white/70 backdrop-blur-sm"
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      <span className="sr-only">Loading</span>
    </div>
  )
}
