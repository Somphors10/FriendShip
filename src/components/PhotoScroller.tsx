const stickers = ['❤️', '✨', '🤗', '💕', '🌸', '💌']
const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-0', '-rotate-3']
const pinColors = ['#e05c5c', '#e07a9a', '#d4789a', '#e8a0a0', '#c45d7a', '#e07a5f']
const pinOffsets = ['left-1/2', 'left-[42%]', 'left-[58%]', 'left-[46%]', 'left-[54%]', 'left-[40%]']

function HeartPin({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 28 36" className="h-8 w-6 drop-shadow-sm sm:h-9 sm:w-7" aria-hidden="true">
      <ellipse cx="14" cy="34.2" rx="3.4" ry="1.15" fill="rgba(61,44,44,0.22)" />
      <path d="M14 16.5 L13.15 33 L14.85 33 Z" fill="#8b9198" />
      <path
        d="M14 21.2s-8.2-5-8.2-10.05C5.8 8.3 8 6.2 10.75 6.2c1.45 0 2.75.7 3.25 1.85.5-1.15 1.8-1.85 3.25-1.85 2.75 0 4.95 2.1 4.95 4.95 0 5.05-8.2 10.05-8.2 10.05Z"
        fill={color}
      />
      <path
        d="M10.4 8.35c.7-.55 1.55-.75 2.25-.35"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
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
          className={`relative shrink-0 rounded-md bg-paper p-2 pb-5 pt-3 shadow-[0_10px_24px_-12px_rgba(61,44,44,0.35)] ${
            tilts[index % tilts.length]
          }`}
        >
          <span
            className={`absolute top-[-0.85rem] z-10 -translate-x-1/2 ${pinOffsets[index % pinOffsets.length]}`}
          >
            <HeartPin color={pinColors[index % pinColors.length]} />
          </span>
          <img
            src={src}
            alt="A memory with friends"
            className="h-40 w-32 object-cover sm:h-52 sm:w-40 md:h-60 md:w-48"
          />
          <figcaption className="mt-3.5 text-center text-base" aria-hidden="true">
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
