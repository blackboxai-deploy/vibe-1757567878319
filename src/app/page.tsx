"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentText, setCurrentText] = useState(0)

  const glitchTexts = [
    "SASOK: Отражение во Тьме",
    "SΛSØK: Ðrçɛκţιοŋ ωο Ŧμє",
    "S₳₴Ø₭: ØŧɍɇŉɇɳƗɇ ɨɳ Ðɑɍʞɳɛss",
    "SASOK: Отражение во Тьме"
  ]

  useEffect(() => {
    setIsLoaded(true)
    
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % glitchTexts.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-900/20">
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500/50 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-br from-red-400 via-white to-gray-400 bg-clip-text text-transparent glitch-text">
              {glitchTexts[currentText]}
            </h1>
            <div className="flex justify-center space-x-2 mb-6">
              <Badge variant="destructive" className="bg-red-900/50 text-red-100">Web3</Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">Экспериментальная</Badge>
              <Badge variant="secondary" className="bg-gray-800 text-gray-100">Метавселенная</Badge>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Платформа для исследования глубин человеческой психики через призму цифрового взаимодействия.
            <span className="block mt-2 text-red-400 font-semibold">
              Психоделический триллер в формате метавселенной.
            </span>
          </p>
        </div>

        {/* Warning Card */}
        <div className={`max-w-4xl mx-auto mb-16 transition-all duration-2000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="border-red-900/50 bg-red-950/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-red-400 text-2xl flex items-center gap-2">
                ⚠️ ВНИМАНИЕ: ЭКСПЕРИМЕНТАЛЬНАЯ ПЛАТФОРМА
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Эмоциональное воздействие и принятие рисков
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-200 leading-relaxed">
                SASOK разработана с целью вызвать спектр эмоций, включая <strong className="text-red-400">тревогу, страх, сомнение, стыд</strong> и другие интенсивные переживания. Взаимодействие с системой может оказать значительное эмоциональное воздействие на ваше психическое состояние.
              </p>
              <div className="bg-red-950/30 p-4 rounded-lg border border-red-900/50">
                <p className="text-red-200 font-semibold">
                  Если вы склонны к тревожным расстройствам, паническим атакам, депрессии или другим психологическим проблемам, мы настоятельно рекомендуем воздержаться от использования системы.
                </p>
              </div>
              <p className="text-sm text-gray-400">
                Возрастное ограничение: <strong>18+</strong> • Использование на собственный риск
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 transition-all duration-2000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-red-900/50 transition-all">
            <CardHeader>
              <CardTitle className="text-red-400">🔮 Лабиринт Первых Страхов</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Процедурно генерируемое пространство для исследования ваших внутренних страхов и создания атмосферы тревоги.</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-red-900/50 transition-all">
            <CardHeader>
              <CardTitle className="text-red-400">🪞 Комната Кривых Зеркал</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Ваш профиль-отражение эмоционального состояния, истории взаимодействия и потенциального цифрового будущего.</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-red-900/50 transition-all">
            <CardHeader>
              <CardTitle className="text-red-400">👹 Архетипы Демонов</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Выбор архетипа демона определяет ваш опыт взаимодействия с системой и формирование NFT-аватара.</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-red-900/50 transition-all">
            <CardHeader>
              <CardTitle className="text-red-400">🎭 NFT-Артефакты</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Коллекционируйте уникальные артефакты: фрагменты страха, баги надежды, NFT-исповеди и другие цифровые реликвии.</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-red-900/50 transition-all">
            <CardHeader>
              <CardTitle className="text-red-400">🔥 Система Токенов</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">"Сжигание" для очистки памяти, доступ к чужим дневникам, участие в Теневой Бирже и ритуальные практики.</p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-red-900/50 transition-all">
            <CardHeader>
              <CardTitle className="text-red-400">🏛️ DAO-Управление</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Участвуйте в коллективном принятии решений через вечернее голосование и влияйте на развитие платформы.</p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-16 bg-gray-700" />

        {/* Action Buttons */}
        <div className={`text-center space-y-6 transition-all duration-2000 delay-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-x-4">
            <Link href="/agreement">
              <Button size="lg" className="bg-red-900 hover:bg-red-800 text-white px-8 py-4 text-lg">
                Прочитать Пользовательское Соглашение
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg" className="border-gray-600 text-gray-200 hover:bg-gray-800 px-8 py-4 text-lg">
                Начать Регистрацию
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Приступая к использованию системы SASOK, вы подтверждаете, что достигли возраста 18 лет и принимаете все риски, связанные с экспериментальным характером платформы.
          </p>
        </div>
      </div>

      {/* Custom CSS for glitch effect */}
      <style jsx>{`
        .glitch-text {
          position: relative;
          animation: glitch 2s infinite;
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  )
}