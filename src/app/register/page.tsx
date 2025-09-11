"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

interface RegistrationStep {
  id: number
  title: string
  description: string
  completed: boolean
}

const demonArchetypes = [
  {
    id: 'seducer',
    name: 'Соблазнитель',
    emoji: '😈',
    description: 'Мастер манипуляций и эмоциональных игр. Влияет через шарм и обаяние.',
    traits: ['Харизма', 'Эмпатия', 'Интуиция'],
    riskLevel: 'Средний'
  },
  {
    id: 'shadow',
    name: 'Теневой',
    emoji: '🌑',
    description: 'Скрытый наблюдатель, исследователь темных глубин психики.',
    traits: ['Интроспекция', 'Аналитика', 'Мистицизм'],
    riskLevel: 'Высокий'
  },
  {
    id: 'destroyer',
    name: 'Разрушитель',
    emoji: '💀',
    description: 'Катализатор трансформации через разрушение старых паттернов.',
    traits: ['Сила воли', 'Радикализм', 'Трансформация'],
    riskLevel: 'Критический'
  },
  {
    id: 'mirror',
    name: 'Зеркало',
    emoji: '🪞',
    description: 'Отражает и усиливает эмоциональные состояния окружающих.',
    traits: ['Рефлексия', 'Адаптация', 'Симбиоз'],
    riskLevel: 'Низкий'
  },
  {
    id: 'prophet',
    name: 'Пророк',
    emoji: '👁️',
    description: 'Видит паттерны будущего через анализ настоящего.',
    traits: ['Предвидение', 'Мудрость', 'Откровение'],
    riskLevel: 'Высокий'
  }
]

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [walletAddress, setWalletAddress] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [selectedArchetype, setSelectedArchetype] = useState('')
  const [biometricData, setBiometricData] = useState<any>(null)
  const [avatarGenerated, setAvatarGenerated] = useState(false)

  const steps: RegistrationStep[] = [
    {
      id: 1,
      title: 'Возрастная верификация',
      description: 'Подтверждение возраста 18+',
      completed: currentStep > 1
    },
    {
      id: 2,
      title: 'Подключение кошелька',
      description: 'Связывание криптокошелька',
      completed: currentStep > 2
    },
    {
      id: 3,
      title: 'Нейросканирование',
      description: 'Биометрический анализ',
      completed: currentStep > 3
    },
    {
      id: 4,
      title: 'Выбор архетипа',
      description: 'Определение демонического архетипа',
      completed: currentStep > 4
    },
    {
      id: 5,
      title: 'Генерация аватара',
      description: 'Создание NFT-аватара',
      completed: currentStep > 5
    }
  ]

  useEffect(() => {
    let interval: any
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false)
            setBiometricData({ face: 'detected', voice: 'analyzed', emotion: 'captured' })
            return 100
          }
          return prev + 2
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isScanning])

  const connectWallet = async () => {
    // Simulate wallet connection
    const simulatedAddress = '0x' + Math.random().toString(16).substr(2, 40)
    setWalletAddress(simulatedAddress)
    setCurrentStep(3)
  }

  const startNeuroScan = () => {
    setIsScanning(true)
    setScanProgress(0)
  }

  const generateAvatar = () => {
    setAvatarGenerated(true)
    setCurrentStep(6)
  }

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'Низкий':
        return <Badge variant="outline" className="text-green-400 border-green-400">Низкий риск</Badge>
      case 'Средний':
        return <Badge variant="secondary" className="text-yellow-400 bg-yellow-900/30">Средний риск</Badge>
      case 'Высокий':
        return <Badge variant="destructive" className="text-orange-400 bg-orange-900/30">Высокий риск</Badge>
      case 'Критический':
        return <Badge variant="destructive" className="text-red-400 bg-red-900/50">Критический</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-br from-red-400 via-white to-gray-400 bg-clip-text text-transparent">
            Создание Цифрового Двойника
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Процесс инициации в систему SASOK
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-300 font-semibold">Прогресс регистрации</span>
            <span className="text-white">{currentStep - 1}/5</span>
          </div>
          <Progress 
            value={((currentStep - 1) / 5) * 100} 
            className="h-3 bg-gray-800"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-6">
            {steps.map((step) => (
              <Card key={step.id} className={`p-3 text-center ${step.completed ? 'border-green-900/50 bg-green-950/20' : currentStep === step.id ? 'border-red-900/50 bg-red-950/20' : 'border-gray-800 bg-gray-900/30'}`}>
                <div className="text-sm font-medium text-white">{step.title}</div>
                <div className="text-xs text-gray-400 mt-1">{step.description}</div>
                <div className="mt-2">
                  {step.completed && <span className="text-green-400">✓</span>}
                  {currentStep === step.id && <span className="text-red-400">◉</span>}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <Card className="border-red-900/50 bg-red-950/20">
              <CardHeader>
                <CardTitle className="text-red-400 text-2xl">🔞 Возрастная верификация</CardTitle>
                <CardDescription className="text-gray-300">
                  Подтверждение права доступа к экспериментальной платформе
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-red-900/50 bg-red-950/30">
                  <AlertDescription className="text-red-200">
                    SASOK предназначена для совершеннолетних пользователей. Платформа содержит материалы психологического характера, которые могут оказать значительное эмоциональное воздействие.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="age-confirm" 
                      className="rounded border-gray-600"
                      required
                    />
                    <Label htmlFor="age-confirm" className="text-gray-200">
                      Я подтверждаю, что мне исполнилось 18 лет
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="risk-accept" 
                      className="rounded border-gray-600"
                      required
                    />
                    <Label htmlFor="risk-accept" className="text-gray-200">
                      Я принимаю все риски, связанные с использованием экспериментальной платформы
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="mental-health" 
                      className="rounded border-gray-600"
                      required
                    />
                    <Label htmlFor="mental-health" className="text-gray-200">
                      У меня нет диагностированных тревожных расстройств, панических атак или депрессии
                    </Label>
                  </div>
                </div>

                <Button 
                  onClick={() => setCurrentStep(2)} 
                  className="w-full bg-red-900 hover:bg-red-800 text-white py-3 text-lg"
                >
                  Продолжить → Подключение кошелька
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white text-2xl">🔗 Подключение криптокошелька</CardTitle>
                <CardDescription className="text-gray-300">
                  Интеграция с Web3 для управления NFT и токенами
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!walletAddress ? (
                  <>
                    <Alert className="border-yellow-900/50 bg-yellow-950/30">
                      <AlertDescription className="text-yellow-200">
                        Для участия в экосистеме SASOK требуется подключение совместимого криптокошелька. Вы несете полную ответственность за безопасность ваших приватных ключей.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button 
                        variant="outline" 
                        onClick={connectWallet}
                        className="h-20 flex flex-col gap-2 border-gray-600 hover:bg-gray-800"
                      >
                        <span className="text-2xl">🦊</span>
                        <span>MetaMask</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={connectWallet}
                        className="h-20 flex flex-col gap-2 border-gray-600 hover:bg-gray-800"
                      >
                        <span className="text-2xl">👻</span>
                        <span>Phantom</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={connectWallet}
                        className="h-20 flex flex-col gap-2 border-gray-600 hover:bg-gray-800"
                      >
                        <span className="text-2xl">🔷</span>
                        <span>WalletConnect</span>
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="text-green-400 text-4xl">✓</div>
                    <h3 className="text-xl text-white font-semibold">Кошелек подключен</h3>
                    <p className="text-gray-400 font-mono text-sm">
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </p>
                    <Button 
                      onClick={() => setCurrentStep(3)} 
                      className="bg-red-900 hover:bg-red-800 text-white"
                    >
                      Продолжить → Нейросканирование
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="border-purple-900/50 bg-purple-950/20">
              <CardHeader>
                <CardTitle className="text-purple-400 text-2xl">🧠 Нейросканирование</CardTitle>
                <CardDescription className="text-gray-300">
                  Биометрический анализ для создания уникального цифрового отпечатка
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!biometricData ? (
                  <>
                    <Alert className="border-purple-900/50 bg-purple-950/30">
                      <AlertDescription className="text-purple-200">
                        Система проанализирует вашу мимику и голос для создания уникального эмоционального профиля. 
                        Разрешите доступ к камере и микрофону.
                      </AlertDescription>
                    </Alert>

                    <div className="text-center space-y-6">
                      {!isScanning ? (
                        <>
                          <div className="text-6xl mb-4">📷</div>
                          <p className="text-gray-300">
                            Нажмите кнопку ниже, чтобы начать сканирование
                          </p>
                          <Button 
                            onClick={startNeuroScan}
                            className="bg-purple-900 hover:bg-purple-800 text-white px-8 py-3"
                          >
                            Начать нейросканирование
                          </Button>
                        </>
                      ) : (
                        <div className="space-y-4">
                          <div className="text-4xl animate-pulse">🔄</div>
                          <h3 className="text-xl text-white">Анализ в процессе...</h3>
                          <Progress value={scanProgress} className="h-3" />
                          <p className="text-sm text-gray-400">
                            {scanProgress < 30 && 'Анализ мимических паттернов...'}
                            {scanProgress >= 30 && scanProgress < 60 && 'Анализ голосовых характеристик...'}
                            {scanProgress >= 60 && scanProgress < 90 && 'Определение эмоциональных маркеров...'}
                            {scanProgress >= 90 && 'Формирование цифрового отпечатка...'}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="text-green-400 text-4xl">✓</div>
                    <h3 className="text-xl text-white font-semibold">Нейросканирование завершено</h3>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="text-2xl mb-2">👤</div>
                        <div className="text-sm text-gray-400">Лицо</div>
                        <div className="text-green-400 font-semibold">Обнаружено</div>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="text-2xl mb-2">🎤</div>
                        <div className="text-sm text-gray-400">Голос</div>
                        <div className="text-green-400 font-semibold">Проанализирован</div>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="text-2xl mb-2">😊</div>
                        <div className="text-sm text-gray-400">Эмоции</div>
                        <div className="text-green-400 font-semibold">Зафиксированы</div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setCurrentStep(4)} 
                      className="bg-red-900 hover:bg-red-800 text-white mt-6"
                    >
                      Продолжить → Выбор архетипа
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card className="border-red-900/50 bg-red-950/20">
              <CardHeader>
                <CardTitle className="text-red-400 text-2xl">👹 Выбор Демонического Архетипа</CardTitle>
                <CardDescription className="text-gray-300">
                  Определите вашу роль в экосистеме SASOK
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-red-900/50 bg-red-950/30">
                  <AlertDescription className="text-red-200">
                    Выбор архетипа демона является неотъемлемой частью процесса регистрации и влияет на ваш опыт взаимодействия с системой. Выбор необратим.
                  </AlertDescription>
                </Alert>

                <RadioGroup value={selectedArchetype} onValueChange={setSelectedArchetype}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {demonArchetypes.map((archetype) => (
                      <div key={archetype.id}>
                        <RadioGroupItem 
                          value={archetype.id} 
                          id={archetype.id} 
                          className="sr-only" 
                        />
                        <Label 
                          htmlFor={archetype.id}
                          className={`cursor-pointer block p-6 rounded-lg border-2 transition-all ${
                            selectedArchetype === archetype.id 
                              ? 'border-red-500 bg-red-950/50' 
                              : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                          }`}
                        >
                          <div className="text-center mb-4">
                            <div className="text-4xl mb-2">{archetype.emoji}</div>
                            <h3 className="text-xl font-bold text-white">{archetype.name}</h3>
                            <div className="mt-2">{getRiskBadge(archetype.riskLevel)}</div>
                          </div>
                          <p className="text-gray-300 text-sm mb-4">{archetype.description}</p>
                          <div className="space-y-2">
                            <div className="text-xs text-gray-400">Основные черты:</div>
                            <div className="flex flex-wrap gap-1">
                              {archetype.traits.map((trait, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {trait}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                {selectedArchetype && (
                  <div className="text-center">
                    <Button 
                      onClick={() => setCurrentStep(5)} 
                      className="bg-red-900 hover:bg-red-800 text-white px-8 py-3"
                    >
                      Подтвердить выбор → Генерация аватара
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {currentStep === 5 && (
            <Card className="border-green-900/50 bg-green-950/20">
              <CardHeader>
                <CardTitle className="text-green-400 text-2xl">🎭 Генерация NFT-Аватара</CardTitle>
                <CardDescription className="text-gray-300">
                  Создание уникального цифрового представления
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!avatarGenerated ? (
                  <div className="text-center space-y-6">
                    <div className="text-6xl mb-4">🎨</div>
                    <p className="text-gray-300">
                      На основе ваших биометрических данных и выбранного архетипа будет создан уникальный NFT-аватар
                    </p>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-left">
                        <div>
                          <div className="text-sm text-gray-400">Архетип:</div>
                          <div className="text-white font-semibold">
                            {demonArchetypes.find(a => a.id === selectedArchetype)?.name}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Биометрия:</div>
                          <div className="text-green-400">Интегрирована</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Кошелек:</div>
                          <div className="text-white font-mono text-xs">
                            {walletAddress.slice(0, 8)}...
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Уникальность:</div>
                          <div className="text-green-400">Гарантирована</div>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={generateAvatar}
                      className="bg-green-900 hover:bg-green-800 text-white px-8 py-3"
                    >
                      Создать NFT-аватар
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="text-green-400 text-4xl">✓</div>
                    <h3 className="text-xl text-white font-semibold">NFT-аватар создан</h3>
                    
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mx-auto max-w-md">
                      <div className="text-6xl mb-4">
                        {demonArchetypes.find(a => a.id === selectedArchetype)?.emoji}
                      </div>
                      <div className="space-y-2 text-left">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Токен ID:</span>
                          <span className="text-white font-mono">#000{Math.floor(Math.random() * 9999)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Архетип:</span>
                          <span className="text-white">{demonArchetypes.find(a => a.id === selectedArchetype)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Владелец:</span>
                          <span className="text-white font-mono text-xs">Вы</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Статус:</span>
                          <span className="text-green-400">Активирован</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Link href="/dashboard">
                        <Button 
                          size="lg"
                          className="bg-red-900 hover:bg-red-800 text-white px-8 py-4 text-lg w-full"
                        >
                          Войти в SASOK →
                        </Button>
                      </Link>
                      
                      <p className="text-sm text-gray-500">
                        Добро пожаловать в экспериментальную метавселенную
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link href="/agreement">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              ← Вернуться к соглашению
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}