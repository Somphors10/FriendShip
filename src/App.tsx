import { FloatingHearts } from './components/FloatingHearts'
import { PhotoScroller } from './components/PhotoScroller'

const letter = [
  'I just want to take a moment to say thank you for being part of my life. We have shared so many good moments, funny moments, difficult times, random conversations, crazy memories, and little moments that may seem simple, but will always mean something to me.',
  'Maybe I don’t always say it, and sometimes I may not show it, but I truly appreciate every one of you. Having friends who support me, listen to me, laugh with me, understand me, and stay by my side means more to me than I can explain.',
  'When I look back at the time we have spent together, I don’t want to focus on the bad memories or the moments when we had misunderstandings. I would rather remember the good memories we created together — the laughter, the jokes, the late conversations, the times we helped each other, and all the moments that made us happy.',
  'Because at the end of the day, life is not perfect, and friendships are not always perfect either. Sometimes we misunderstand each other, sometimes we argue, and sometimes we become distant. But I believe the good memories are always more valuable than the bad ones.',
  'And if I have ever done something wrong, hurt you, disappointed you, or made you feel bad in any way, I’m truly sorry. I may not always realize when I’m wrong, but I never want to intentionally hurt any of you.',
  'I also want you all to know that I never want to see any of my friends fail or struggle in life. I always want to see all of you succeed, achieve your dreams, and become the people you want to be. Your success will never make me jealous or unhappy. Instead, I will always be proud and happy to see my friends doing well. Even if someday we are far apart, I will still wish the best for every one of you.',
  'I also know that life keeps changing. One day, we may not see each other every day anymore. We may have different jobs, different places to live, different goals, and different paths. Maybe we will become busy and talk less than we do now. But I hope that no matter where life takes us, we will always remember the time we shared together.',
  'If one day we look back at these moments, I hope we smile and think, “Those were really good days.”',
  'Thank you for every laugh, every conversation, every piece of advice, every time you helped me, and even every difficult moment that taught us something. Thank you for being part of my journey and for giving me memories that I will carry with me.',
  'I may not know what the future will look like, but I know that I will always be grateful that our paths crossed.',
  'No matter how much time passes, I hope our friendship and memories will always remain special to us.',
  'Thank you for everything, guys. I’m truly grateful to have you all in my life. ❤️',
  'I hope we can continue making more good memories together. And if someday we go our separate ways, I hope we never forget each other.',
  'No matter where life takes you, I sincerely hope you find happiness, achieve your dreams, and become successful in whatever you choose to do. I’ll always be happy to see my friends succeed. ❤️',
  'Thank you for being a part of my story. I will always cherish the memories we made together. ❤️',
]

function EmojiRow() {
  return (
    <p className="flex items-center justify-center gap-2.5 text-lg sm:text-xl" aria-hidden="true">
      <span>💕</span>
      <span>✨</span>
      <span>🤗</span>
      <span>✨</span>
      <span>💕</span>
    </p>
  )
}

export default function App() {
  return (
    <main className="relative min-h-svh overflow-hidden py-8 text-ink sm:py-14">
      <FloatingHearts />

      <header className="relative z-10 mb-6 px-5 text-center sm:mb-8">
        <p className="font-hand text-2xl text-rose sm:text-3xl">our little universe ✨</p>
        <p className="mt-1 text-sm text-muted sm:text-base">memories, laughter, and people I love 💌</p>
      </header>

      <PhotoScroller />

      <article className="relative z-10 mx-auto max-w-2xl px-5 pb-12 sm:px-8">
        <div className="rounded-[1.75rem] bg-paper/90 p-6 shadow-[0_24px_50px_-28px_rgba(61,44,44,0.45)] ring-1 ring-rose-soft/60 sm:p-10">
          <EmojiRow />

          <h1 className="mt-4 text-center font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            To all my friends ❤️
          </h1>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg sm:leading-8">
            {letter.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 text-center">
            <EmojiRow />
            <p className="mt-3 font-hand text-2xl text-rose sm:text-3xl">forever friends 🤗</p>
          </div>
        </div>
      </article>
    </main>
  )
}
