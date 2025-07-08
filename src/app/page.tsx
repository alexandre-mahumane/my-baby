'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Heart,
  ArrowDown,
  Sparkles,
  Camera,
  MessageCircle,
  Star,
} from 'lucide-react'

// Componente de partículas flutuantes
function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
          }}
        >
          <Heart className="text-pink-300/30" size={12 + Math.random() * 16} />
        </div>
      ))}
    </div>
  )
}

// Componente de estrelas cintilantes
function TwinklingStars() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          <Star className="text-white/20" size={4 + Math.random() * 8} />
        </div>
      ))}
    </div>
  )
}

// Componente carrossel de mídia melhorado
function MediaCarousel({ items }: { items: string[] }) {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const isVideo = (src: string) => src.endsWith('.mp4')

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1))
    }, 8000) // Aumentado de 5000 para 8000ms (8 segundos)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [items])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    const handleEnded = () =>
      setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1))

    vid.addEventListener('ended', handleEnded)
    return () => vid.removeEventListener('ended', handleEnded)
  }, [current, items])

  const goPrev = () =>
    setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1))

  const goNext = () =>
    setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1))

  return (
    <div className="relative w-full flex flex-col items-center max-w-[98vw] mx-auto">
      <div className="relative w-full min-h-[75vh] max-h-[85vh] sm:min-h-[500px] sm:max-h-[600px] flex items-center justify-center bg-gradient-to-br from-black/80 to-gray-900/80 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm border border-white/10 transition-all duration-700 hover:scale-[1.02] hover:shadow-pink-500/20">
        {/* Borda brilhante animada */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500/50 via-purple-500/50 to-red-500/50 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>

        {isVideo(items[current]) ? (
          <video
            ref={videoRef}
            src={items[current]}
            muted
            autoPlay
            loop
            playsInline
            className="w-full h-full min-h-[75vh] max-h-[85vh] sm:min-h-[500px] sm:max-h-[600px] object-cover rounded-3xl transition-all duration-700"
          />
        ) : (
          <Image
            src={items[current] || '/placeholder.svg'}
            alt="Momento especial"
            width={900}
            height={600}
            className="w-full h-full min-h-[75vh] max-h-[85vh] sm:min-h-[500px] sm:max-h-[600px] object-cover rounded-3xl transition-all duration-700 hover:scale-105"
            priority
          />
        )}

        {/* Overlay gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 rounded-3xl"></div>
      </div>

      {/* Indicadores melhorados */}
      <div className="flex justify-center items-center gap-3 mt-6 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current
                ? 'bg-gradient-to-r from-pink-400 to-red-400 scale-125 shadow-lg shadow-pink-500/50'
                : 'bg-white/40 hover:bg-white/60 hover:scale-110'
            }`}
            onClick={() => setCurrent(idx)}
            aria-label={`Ir para item ${idx + 1}`}
          />
        ))}
      </div>

      {/* Botões de navegação melhorados */}
      <button
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500/80 to-red-500/80 backdrop-blur-md text-white rounded-full p-3 z-10 shadow-xl hover:scale-110 transition-all duration-300 hover:shadow-pink-500/50"
        onClick={goPrev}
        aria-label="Anterior"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500/80 to-red-500/80 backdrop-blur-md text-white rounded-full p-3 z-10 shadow-xl hover:scale-110 transition-all duration-300 hover:shadow-pink-500/50"
        onClick={goNext}
        aria-label="Próximo"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  )
}

export default function ApologyPage() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const sectionAudioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>(
    {}
  )
  const [currentSection, setCurrentSection] = useState('')
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [typewriterText, setTypewriterText] = useState('')
  const [musicChanged, setMusicChanged] = useState(true)
  const [showHero, setShowHero] = useState(true)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

  // Arrays de mídia
  // const hero = ['/us14.jpeg', '/usBaia.jpeg']
  const photos = [
    '/aDormir.jpeg',
    '/elaSeria.jpeg',
    '/guerreira.jpeg',
    '/herProfile.jpeg',
    '/herSelf.jpeg',
  ]
  const funnyMoments = ['/baia.jpeg', '/funny5.jpeg', '/tiaDaina.mp4']
  const specialMoments = [
    '/us.jpeg',
    '/dandoFlores.mp4',
    '/minhaChegada.mp4',
    '/flowers.mp4',
    '/especial.mp4',
    '/usv3.mp4',
    '/nosPraia.mp4',
    '/us14.jpeg',
  ]

  const loveMessage = ` Ainda existe um nós. 
  Te amo. ❤️`

  const sectionMusic = {
    'first-meet': '/tempo.mp3',
    'funny-moments': '/vicio.mp3',
    'special-moments': '/ordinary.mp3',
    'love-message': '/LoveU.mp3',
  }

  useEffect(() => {
    let index = 0
    setTypewriterText('')

    const timer = setInterval(() => {
      if (index < loveMessage.length) {
        setTypewriterText(loveMessage.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [currentSection])

  const changeSectionMusic = async (sectionId: string) => {
    if (audioRef.current) audioRef.current.pause()

    Object.values(sectionAudioRefs.current).forEach((audio) => {
      if (audio && !audio.paused) {
        audio.pause()
        audio.currentTime = 0
      }
    })

    const currentAudio = sectionAudioRefs.current[sectionId]
    if (currentAudio) {
      try {
        currentAudio.currentTime = 30
        currentAudio.volume = 0.7
        await currentAudio.play()
        setCurrentSection(sectionId)
      } catch (error) {
        console.log(`Failed to play ${sectionId} music:`, error)
      }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            setVisibleSections((prev) => new Set([...prev, sectionId]))
            if (sectionMusic[sectionId as keyof typeof sectionMusic]) {
              changeSectionMusic(sectionId)
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const playMainAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.currentTime = 30
          await audioRef.current.play()
          audioRef.current.muted = false
        } catch (err) {
          console.log('Autoplay failed:', err)
        }
      }
    }

    playMainAudio()
  }, [])

  const startExperience = async () => {
    setShowHero(false)
    if (heroVideoRef.current) {
      try {
        await heroVideoRef.current.play()
      } catch (error) {
        console.log('Video play failed:', error)
      }
    }

    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 30
        await audioRef.current.play()
        audioRef.current.muted = false
      } catch (error) {
        console.log('Audio play failed:', error)
      }
    }
  }

  const scrollToSection = (sectionId: string) => {
    const section = sectionsRef.current[sectionId]
    if (section) section.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative">
      <FloatingHearts />
      <TwinklingStars />

      <audio ref={audioRef} loop muted>
        <source src="/placeholder.mp3" type="audio/mpeg" />
      </audio>

      {Object.entries(sectionMusic).map(([sectionId, musicSrc]) => (
        <audio
          key={sectionId}
          ref={(el) => {
            sectionAudioRefs.current[sectionId] = el
          }}
          loop
        >
          <source src={musicSrc} type="audio/mpeg" />
        </audio>
      ))}

      {/* Hero Section Melhorada */}
      {showHero && (
        <section className="fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-red-900/80"></div>

          <video
            ref={heroVideoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            src="/ela1.mp4"
            muted
            autoPlay
            loop
            playsInline
            poster="/herProfile.jpeg"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 bg-clip-text text-transparent animate-pulse-slow">
                Para Você
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-12 text-pink-100 font-light tracking-wide">
                Minha Princesa, Meu Amor, Minha Vida
              </p>

              <button
                onClick={startExperience}
                ref={(el) => {
                  sectionsRef.current['first-meet'] = el
                }}
                className="group bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full text-lg sm:text-xl font-semibold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-pink-500/50 animate-pulse-slow border-2 border-white/20 backdrop-blur-sm"
              >
                <Heart
                  className="inline mr-3 group-hover:animate-heartbeat"
                  size={24}
                />
                Começar
                <Sparkles
                  className="inline ml-3 group-hover:animate-spin"
                  size={20}
                />
              </button>
            </div>

            <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ArrowDown size={32} className="text-pink-300" />
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-1000 ${
          showHero ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Seção 1: Quando nos conhecemos - USANDO ARRAY PHOTOS */}
        <section
          ref={(el) => {
            sectionsRef.current['first-meet'] = el
          }}
          id="first-meet"
          className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center py-10 sm:py-20 relative overflow-hidden"
        >
          {/* Indicador musical da seção */}
          <div className="absolute top-4 sm:top-8 left-4 sm:left-8 bg-white/20 backdrop-blur-md rounded-full px-3 sm:px-4 py-2 text-white flex items-center gap-2 border border-white/10 z-20">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium">
              Recuar no Tempo
            </span>
          </div>

          <div className="container mx-auto px-4 sm:px-6">
            <div
              className={`grid lg:grid-cols-2 gap-8 sm:gap-12 items-center transition-all duration-1000 ${
                visibleSections.has('first-meet')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <div className="text-white order-2 lg:order-1">
                <div className="flex items-center mb-4 sm:mb-6">
                  <Sparkles
                    className="text-yellow-400 mr-3 sm:mr-4 animate-pulse"
                    size={28}
                  />
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-300 to-yellow-300 bg-clip-text text-transparent">
                    Minha Trajetoria Contigo
                  </h2>
                </div>

                <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 text-pink-100 font-light">
                  Partilhamos muitos momentos juntos momentos nos quais vou
                  levar para vida toda. Lembro-me de tantos momentos simples,
                  mas que guardo com muito valor: conversas longas, risos ,
                  abraços silenciosos que diziam tudo. São esses pequenos gestos
                  que, com o tempo, se tornaram grandes memórias. E mesmo sem
                  saber exatamente o que o futuro reserva, sei que quero
                  continuar a escrever essa história contigo, com calma, com
                  amor e com respeito, como temos feito até aqui. É tão bom te
                  ter na minha vida que eu não quero nem aprender a ter saudades
                  suas, não quero saber o que é estar distante de ti.
                </p>

                <div className="bg-gradient-to-r from-white/10 to-pink-500/10 p-4 sm:p-6 rounded-2xl backdrop-blur-md border border-white/20 hover:border-pink-300/50 transition-all duration-300">
                  <p className="text-base sm:text-lg italic text-pink-200 font-light">
                    {
                      "'O amor verdadeiro acontece em um instante, mas dura para sempre.'"
                    }
                  </p>
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="relative">
                  <MediaCarousel items={photos} />
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-pink-500 to-red-500 text-white p-3 sm:p-4 rounded-full animate-pulse shadow-lg">
                    <Heart size={20} className="animate-heartbeat" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 2: Momentos Engraçados */}
        <section
          ref={(el) => {
            sectionsRef.current['funny-moments'] = el
          }}
          id="funny-moments"
          className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-10 sm:py-20 relative flex flex-col justify-center overflow-hidden"
        >
          {/* Indicador musical da seção */}
          <div className="absolute top-4 sm:top-8 left-4 sm:left-8 bg-white/20 backdrop-blur-md rounded-full px-3 sm:px-4 py-2 text-white flex items-center gap-2 border border-white/10 z-20">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium">Viçio</span>
          </div>

          <div className="container mx-auto px-4 sm:px-6">
            <div
              className={`text-center mb-8 sm:mb-16 transition-all duration-1000 ${
                visibleSections.has('funny-moments')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <MessageCircle
                  className="text-yellow-400 mr-3 sm:mr-4 animate-bounce"
                  size={28}
                />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Eix kk😂😂
                </h2>
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto font-light">
                Ainda quero ter esses momentos contigo, que ao passar do tempo
                serão momentos para rirmos deles.
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${
                visibleSections.has('funny-moments')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <MediaCarousel items={funnyMoments} />
            </div>
          </div>
        </section>

        {/* Seção 3: Momentos Especiais */}
        <section
          ref={(el) => {
            sectionsRef.current['special-moments'] = el
          }}
          id="special-moments"
          className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 py-10 sm:py-20 relative flex flex-col justify-center overflow-hidden"
        >
          {/* Indicador musical da seção */}
          <div className="absolute top-4 sm:top-8 left-4 sm:left-8 bg-white/20 backdrop-blur-md rounded-full px-3 sm:px-4 py-2 text-white flex items-center gap-2 border border-white/10 z-20">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium">Ordinary</span>
          </div>

          <div className="container mx-auto px-4 sm:px-6">
            <div
              className={`text-center mb-8 sm:mb-16 transition-all duration-1000 ${
                visibleSections.has('special-moments')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <Camera
                  className="text-pink-400 mr-3 sm:mr-4 animate-pulse"
                  size={28}
                />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  Nossos Momentos Especiais
                </h2>
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-emerald-100 max-w-3xl mx-auto font-light">
                Cada momento ao seu lado é especial, mas estes ficaram gravados
                para sempre no meu coração.
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${
                visibleSections.has('special-moments')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <MediaCarousel items={specialMoments} />
            </div>
          </div>
        </section>

        {/* Seção 4: Texto de Amor */}
        <section
          ref={(el) => {
            sectionsRef.current['love-message'] = el
          }}
          id="love-message"
          className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-red-900 flex items-center py-10 sm:py-20 relative overflow-hidden"
        >
          {/* Indicador musical da seção */}
          <div className="absolute top-4 sm:top-8 left-4 sm:left-8 bg-white/20 backdrop-blur-md rounded-full px-3 sm:px-4 py-2 text-white flex items-center gap-2 border border-white/10 z-20">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium">Te Amo</span>
          </div>

          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div
              className={`transition-all duration-1000 ${
                visibleSections.has('love-message')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 sm:mb-12 animate-pulse bg-gradient-to-r from-pink-300 to-red-300 bg-clip-text text-transparent">
                Baby❤️
              </h2>

              <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/10 to-pink-500/10 backdrop-blur-lg rounded-3xl p-6 sm:p-12 shadow-2xl border border-white/20 hover:border-pink-300/50 transition-all duration-500">
                <div className="text-lg sm:text-xl lg:text-2xl text-white leading-relaxed font-light">
                  {typewriterText}
                  <span className="animate-pulse text-pink-400">|</span>
                </div>
              </div>

              <div className="mt-12 sm:mt-16 flex justify-center space-x-2 sm:space-x-4">
                {[...Array(7)].map((_, i) => (
                  <Heart
                    key={i}
                    className="text-red-400 animate-heartbeat  hover:scale-125 transition-transform duration-300"
                    size={32}
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer Final Melhorado */}
        <footer className="bg-gradient-to-t from-black via-gray-900 to-black text-white py-12 sm:py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-red-500/5"></div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-pink-400 via-purple-400 to-red-400 bg-clip-text text-transparent animate-pulse">
              Te Amo Para Sempre e Sempre
            </h3>

            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 font-light">
              Este site foi feito com todo meu amor, só para você ❤️
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              <button
                onClick={() => scrollToSection('first-meet')}
                className="text-pink-400 hover:text-pink-300 transition-all duration-300 hover:scale-110 px-4 py-2 rounded-full hover:bg-pink-500/10 backdrop-blur-sm"
              >
                Nosso Início
              </button>
              <button
                onClick={() => scrollToSection('funny-moments')}
                className="text-pink-400 hover:text-pink-300 transition-all duration-300 hover:scale-110 px-4 py-2 rounded-full hover:bg-pink-500/10 backdrop-blur-sm"
              >
                Risadas
              </button>
              <button
                onClick={() => scrollToSection('special-moments')}
                className="text-pink-400 hover:text-pink-300 transition-all duration-300 hover:scale-110 px-4 py-2 rounded-full hover:bg-pink-500/10 backdrop-blur-sm"
              >
                Momentos Especiais
              </button>
              <button
                onClick={() => scrollToSection('love-message')}
                className="text-pink-400 hover:text-pink-300 transition-all duration-300 hover:scale-110 px-4 py-2 rounded-full hover:bg-pink-500/10 backdrop-blur-sm"
              >
                Minha Princesa
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
