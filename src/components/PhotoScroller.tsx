const stickers = ['❤️', '✨', '🤗', '💕', '🌸', '💌']
const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-0', '-rotate-3']
const pinColors = ['#e05c5c', '#e8b04a', '#6a9c9c', '#d4789a', '#7a8fd4', '#e07a5f']
const pinOffsets = ['left-1/2', 'left-[42%]', 'left-[58%]', 'left-[46%]', 'left-[54%]', 'left-[40%]']

function Pin({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 32" className="h-7 w-5 drop-shadow-sm sm:h-8 sm:w-6" aria-hidden="true">
      <ellipse cx="12" cy="30" rx="3.2" ry="1.1" fill="rgba(61,44,44,0.22)" />
      <path d="M12 14.5 L11.2 29 L12.8 29 Z" fill="#8b9198" />
      <circle cx="12" cy="9" r="7.4" fill={color} />
      <circle cx="12" cy="9" r="7.4" fill="rgba(255,255,255,0.12)" />
      <circle cx="9.5" cy="6.5" r="2.3" fill="rgba(255,255,255,0.6)" />
    </svg>
  )
}

function loadPhotos() {
  const modules = import.meta.glob('../assets/*.{jpg,jpeg,png,webp,gif}', {
    eager: true,
    import: 'default',
  }) as Record<string, string>

  // New photos in assets (pic2–pic7) are included automatically.
  return Object.entries(modules)
    .filter(([path]) => !path.toLowerCase().includes('hero'))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, src]) => src)
}

function fillRow(photos: string[], minCount: number) {
  if (photos.length === 0) return []
  const row = [...photos]
  while (row.length < minCount) {
    row.push(...photos)
  }
  return row
}

type PhotoRowProps = {
  photos: string[]
  direction: 'left' | 'right'
  duration: string
}

function PhotoRow({ photos, direction, duration }: PhotoRowProps) {
  const loop = [...photos, ...photos]

  return (
    <div
      className={`flex w-max items-end gap-4 pr-4 ${
        direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
      } group-hover:[animation-play-state:paused]`}
      style={{ animationDuration: duration }}
    >
      {loop.map((src, index) => (
        <figure
          key={`${src}-${index}`}
          className={`relative shrink-0 rounded-md bg-paper p-2 pb-8 pt-3 shadow-[0_10px_24px_-12px_rgba(61,44,44,0.35)] ${
            tilts[index % tilts.length]
          }`}
        >
          <span
            className={`absolute top-[-0.7rem] z-10 -translate-x-1/2 ${pinOffsets[index % pinOffsets.length]}`}
          >
            <Pin color={pinColors[index % pinColors.length]} />
          </span>
          <img
            src={src}
            alt="A memory with friends"
            className="h-40 w-32 object-cover sm:h-52 sm:w-40 md:h-60 md:w-48"
          />
          <figcaption className="mt-2 text-center text-base" aria-hidden="true">
            {stickers[index % stickers.length]}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export function PhotoScroller() {
  const photos = loadPhotos()
  if (photos.length === 0) return null

  const topRow = fillRow(photos, 8)
  const bottomRow = fillRow([...photos].reverse(), 8)

  return (
    <div className="group relative mb-8 overflow-hidden pt-5 pb-2 sm:mb-12 sm:pt-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-blush to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-blush to-transparent sm:w-20" />
      <div className="flex flex-col gap-8">
        <PhotoRow photos={topRow} direction="left" duration="34s" />
        <PhotoRow photos={bottomRow} direction="right" duration="40s" />
      </div>
    </div>
  )
}
