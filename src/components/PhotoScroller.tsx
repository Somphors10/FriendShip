function loadPhotos() {
  const modules = import.meta.glob('../assets/*.{jpg,jpeg,png,webp,gif}', {
    eager: true,
    import: 'default',
  }) as Record<string, string>

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
      className={`flex w-max gap-3 pr-3 ${
        direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
      } group-hover:[animation-play-state:paused]`}
      style={{ animationDuration: duration }}
    >
      {loop.map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt="A memory with friends"
          className="h-44 w-36 shrink-0 rounded-2xl object-cover shadow-md sm:h-56 sm:w-44 md:h-64 md:w-52"
        />
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
    <div className="group relative mb-10 overflow-hidden sm:mb-14">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-cream to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-cream to-transparent sm:w-16" />
      <div className="flex flex-col gap-3">
        <PhotoRow photos={topRow} direction="left" duration="32s" />
        <PhotoRow photos={bottomRow} direction="right" duration="38s" />
      </div>
    </div>
  )
}
