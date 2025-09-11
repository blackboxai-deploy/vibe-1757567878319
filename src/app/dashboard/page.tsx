"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function DashboardPage() {
  const [currentUser] = useState({
    archetype: 'Теневой',
    emoji: '🌑',
    tokenBalance: 1250,
    moralDebt: 75,
    avatarCorruption: 23,
    dayStreak: 7,
    lastRitual: 'Утренний аудит',
    emotionalState: 'Тревожное ожидание'
  })

  const [mirrors] = useState([
    { id: 1, type: 'Прошлое', reflection: 'Отголоски детских страхов', distortion: 45 },
    { id: 2, type: 'Настоящее', reflection: 'Искаженная реальность', distortion: 67 },
    { id: 3, type: 'Будущее', reflection: 'Неопределенность', distortion: 89 },
  ])

  const [artifacts] = useState([
    { id: 1, name: 'Фрагмент Страха #0342', type: 'fear', rarity: 'rare', value: 120 },
    { id: 2, name: 'Баг Надежды #0891', type: 'hope', rarity: 'uncommon', value: 45 },
    { id: 3, name: 'NFT-Исповедь #1205', type: 'confession', rarity: 'legendary', value: 340 },
    { id: 4, name: 'Теневое Воспоминание #0567', type: 'memory', rarity: 'rare', value: 89 }
  ])

  const [dailyRituals] = useState({
    morningAudit: { completed: true, time: '07:23', reward: 50 },
    dailyQuest: { completed: false, progress: 60, reward: 100 },
    eveningDAO: { completed: false, time: '21:00', reward: 75 }
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400'
      case 'uncommon': return 'text-green-400'
      case 'rare': return 'text-blue-400'
      case 'legendary': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'fear': return '😱'
      case 'hope': return '💫'
      case 'confession': return '📜'
      case 'memory': return '🧠'
      default: return '❓'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-black mb-2 bg-gradient-to-br from-red-400 via-white to-gray-400 bg-clip-text text-transparent">
                Комната Кривых Зеркал
              </h1>
              <p className="text-xl text-gray-300">
                {currentUser.archetype} {currentUser.emoji} • День {currentUser.dayStreak}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                🔥 {currentUser.tokenBalance} токенов
              </Badge>
              <Badge variant="destructive" className={`${currentUser.moralDebt > 50 ? 'bg-red-900/50' : 'bg-orange-900/50'}`}>
                ⚖️ Долг: {currentUser.moralDebt}%
              </Badge>
            </div>
          </div>
        </div>

        {/* Current State Alert */}
        <Alert className="mb-8 border-purple-900/50 bg-purple-950/20">
          <AlertDescription className="text-purple-200 text-lg">
            <strong>Текущее состояние:</strong> {currentUser.emotionalState}
            <br />
            <span className="text-sm text-purple-300">
              Последний ритуал: {currentUser.lastRitual} • Искажение аватара: {currentUser.avatarCorruption}%
            </span>
          </AlertDescription>
        </Alert>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="mirrors" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gray-800">
            <TabsTrigger value="mirrors" className="data-[state=active]:bg-red-900">
              🪞 Зеркала
            </TabsTrigger>
            <TabsTrigger value="rituals" className="data-[state=active]:bg-red-900">
              🕯️ Ритуалы
            </TabsTrigger>
            <TabsTrigger value="artifacts" className="data-[state=active]:bg-red-900">
              🎭 Артефакты
            </TabsTrigger>
            <TabsTrigger value="labyrinth" className="data-[state=active]:bg-red-900">
              🌀 Лабиринт
            </TabsTrigger>
          </TabsList>

          {/* Mirrors Tab */}
          <TabsContent value="mirrors" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Отражения Вашей Сущности</h2>
              <p className="text-gray-400">Искаженная реальность через призму времени</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mirrors.map((mirror) => (
                <Card key={mirror.id} className="border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:border-red-900/50 transition-all">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">🪞</div>
                    <CardTitle className="text-white">{mirror.type}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {mirror.reflection}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Искажение:</span>
                        <span className={`font-semibold ${mirror.distortion > 70 ? 'text-red-400' : mirror.distortion > 40 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {mirror.distortion}%
                        </span>
                      </div>
                      <Progress 
                        value={mirror.distortion} 
                        className={`h-2 ${mirror.distortion > 70 ? 'bg-red-950' : mirror.distortion > 40 ? 'bg-yellow-950' : 'bg-green-950'}`}
                      />
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full border-gray-600 hover:bg-gray-700"
                      >
                        Исследовать отражение
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-red-900/50 bg-red-950/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-red-400">⚠️ Предупреждение о Моральном Долге</h3>
                  <p className="text-gray-300">
                    Ваш текущий моральный долг составляет <strong className="text-red-400">{currentUser.moralDebt}%</strong>. 
                    Высокий уровень долга приводит к усилению искажений в зеркалах.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button 
                      size="sm" 
                      variant="destructive"
                      className="bg-red-900/50 hover:bg-red-800/50"
                    >
                      🔥 Сжечь 100 токенов
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-gray-600"
                    >
                      📖 Прочитать чужой дневник
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rituals Tab */}
          <TabsContent value="rituals" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Ежедневные Ритуалы</h2>
              <p className="text-gray-400">Поддержание связи с системой</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className={`${dailyRituals.morningAudit.completed ? 'border-green-900/50 bg-green-950/20' : 'border-gray-700 bg-gray-800/50'}`}>
                <CardHeader>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🌅</div>
                    <CardTitle className="text-white">Утренний Аудит</CardTitle>
                    <CardDescription>
                      Анализ эмоционального состояния
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dailyRituals.morningAudit.completed ? (
                    <div className="text-center space-y-2">
                      <div className="text-green-400 font-semibold">✓ Завершен</div>
                      <div className="text-sm text-gray-400">
                        Время: {dailyRituals.morningAudit.time}
                      </div>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        +{dailyRituals.morningAudit.reward} токенов
                      </Badge>
                    </div>
                  ) : (
                    <Button className="w-full bg-orange-900 hover:bg-orange-800">
                      Начать аудит
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="border-gray-700 bg-gray-800/50">
                <CardHeader>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎯</div>
                    <CardTitle className="text-white">Дневной Квест</CardTitle>
                    <CardDescription>
                      Исследование лабиринта страхов
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Прогресс:</span>
                      <span className="text-white">{dailyRituals.dailyQuest.progress}%</span>
                    </div>
                    <Progress value={dailyRituals.dailyQuest.progress} className="h-2" />
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                      +{dailyRituals.dailyQuest.reward} токенов
                    </Badge>
                  </div>
                  <Button className="w-full bg-red-900 hover:bg-red-800">
                    Продолжить квест
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-gray-700 bg-gray-800/50">
                <CardHeader>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🏛️</div>
                    <CardTitle className="text-white">Вечернее DAO</CardTitle>
                    <CardDescription>
                      Коллективное принятие решений
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-2">
                    <div className="text-yellow-400">Ожидает участия</div>
                    <div className="text-sm text-gray-400">
                      Начало: {dailyRituals.eveningDAO.time}
                    </div>
                    <Badge variant="outline" className="text-purple-400 border-purple-400">
                      +{dailyRituals.eveningDAO.reward} токенов
                    </Badge>
                  </div>
                  <Button variant="outline" className="w-full border-gray-600" disabled>
                    Ожидание времени
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="border-purple-900/50 bg-purple-950/20">
              <CardHeader>
                <CardTitle className="text-purple-400">🔮 Теневая Биржа</CardTitle>
                <CardDescription className="text-gray-300">
                  Обмен токенов и артефактов с другими участниками
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-950/50">
                    📊 Статистика рынка
                  </Button>
                  <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-950/50">
                    💱 Обменять токены
                  </Button>
                  <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-950/50">
                    🎭 Продать артефакт
                  </Button>
                  <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-950/50">
                    🔍 Поиск предложений
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Artifacts Tab */}
          <TabsContent value="artifacts" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Коллекция NFT-Артефактов</h2>
              <p className="text-gray-400">Ваши цифровые реликвии</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {artifacts.map((artifact) => (
                <Card key={artifact.id} className="border-gray-700 bg-gray-800/50 hover:border-yellow-600/50 transition-all">
                  <CardHeader className="text-center pb-2">
                    <div className="text-4xl mb-2">{getTypeEmoji(artifact.type)}</div>
                    <CardTitle className="text-sm text-white leading-tight">
                      {artifact.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getRarityColor(artifact.rarity)} border-current`}
                      >
                        {artifact.rarity}
                      </Badge>
                      <span className="text-yellow-400 font-semibold text-sm">
                        {artifact.value} т.
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full text-xs border-gray-600 hover:bg-gray-700"
                      >
                        Подробнее
                      </Button>
                      <Button 
                        size="sm" 
                        className="w-full text-xs bg-purple-900 hover:bg-purple-800"
                      >
                        Продать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-yellow-900/50 bg-yellow-950/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-yellow-400">💫 Генерация Нового Артефакта</h3>
                  <p className="text-gray-300">
                    Потратьте токены на создание случайного артефакта
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button className="bg-yellow-900/50 hover:bg-yellow-800/50 text-yellow-200">
                      🎲 Обычный (50 т.)
                    </Button>
                    <Button className="bg-yellow-900/70 hover:bg-yellow-800/70 text-yellow-100">
                      ✨ Редкий (150 т.)
                    </Button>
                    <Button className="bg-yellow-900 hover:bg-yellow-800 text-white">
                      🌟 Легендарный (500 т.)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Labyrinth Tab */}
          <TabsContent value="labyrinth" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Лабиринт Первых Страхов</h2>
              <p className="text-gray-400">Процедурно генерируемое пространство тревоги</p>
            </div>

            <Card className="border-red-900/50 bg-red-950/20">
              <CardHeader>
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-pulse">🌀</div>
                  <CardTitle className="text-red-400 text-2xl">Вход в Лабиринт</CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    Готовы ли вы встретиться со своими страхами?
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-red-900/50 bg-red-950/30">
                  <AlertDescription className="text-red-200">
                    <strong>Предупреждение:</strong> Лабиринт адаптируется к вашему эмоциональному состоянию и может вызвать интенсивные переживания. 
                    Убедитесь, что вы готовы к этому опыту.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl mb-2">🚪</div>
                      <div className="text-sm text-white font-semibold">Новичок</div>
                      <div className="text-xs text-gray-400">Базовый уровень</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-orange-950/50 border-orange-900/50">
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl mb-2">🔥</div>
                      <div className="text-sm text-orange-400 font-semibold">Испытанный</div>
                      <div className="text-xs text-orange-300">Средняя сложность</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-950/50 border-red-900/50">
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl mb-2">💀</div>
                      <div className="text-sm text-red-400 font-semibold">Безумец</div>
                      <div className="text-xs text-red-300">Максимальная интенсивность</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-gray-300 mb-4">
                      Текущее состояние позволяет доступ к уровню <strong className="text-orange-400">"Испытанный"</strong>
                    </p>
                    <Button 
                      size="lg"
                      className="bg-red-900 hover:bg-red-800 text-white px-8 py-4"
                    >
                      🌀 Войти в Лабиринт
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm text-gray-500">
                    <p>Последнее посещение: 2 дня назад</p>
                    <p>Лучший результат: Прошел 7 из 12 комнат</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-gray-700 bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-white">📊 Статистика</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Всего заходов:</span>
                    <span className="text-white font-semibold">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Пройдено комнат:</span>
                    <span className="text-white font-semibold">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Найдено артефактов:</span>
                    <span className="text-yellow-400 font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Уровень страха:</span>
                    <span className="text-red-400 font-semibold">Высокий</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-700 bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-white">🏆 Достижения</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300 text-sm">Первые шаги во тьме</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300 text-sm">Коллекционер кошмаров</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">⏳</span>
                    <span className="text-gray-400 text-sm">Мастер лабиринтов</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">○</span>
                    <span className="text-gray-500 text-sm">Покоритель бездны</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}