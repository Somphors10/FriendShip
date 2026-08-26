const hearts = [
  { emoji: '❤️', top: '6%', left: '6%', size: 'text-xl', delay: '0s' },
  { emoji: '✨', top: '12%', right: '10%', size: 'text-lg', delay: '1.2s' },
  { emoji: '🤗', top: '38%', left: '3%', size: 'text-2xl', delay: '0.6s' },
  { emoji: '💌', top: '58%', right: '5%', size: 'text-xl', delay: '1.8s' },
  { emoji: '🌸', top: '78%', left: '8%', size: 'text-lg', delay: '0.3s' },
  { emoji: '💕', top: '88%', right: '12%', size: 'text-xl', delay: '2.2s' },
  { emoji: '🌟', top: '28%', right: '4%', size: 'text-lg', delay: '1.5s' },
]

export function FloatingHearts() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={`${heart.emoji}-${heart.delay}`}
          className={`animate-float absolute ${heart.size}`}
          style={{
            top: heart.top,
            left: heart.left,
            right: heart.right,
            animationDelay: heart.delay,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  )
}
