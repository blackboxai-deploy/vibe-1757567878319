"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import Link from 'next/link'

const agreementSections = [
  {
    id: 1,
    title: "Природа Системы и Принятие Рисков",
    icon: "⚠️",
    priority: "critical",
    points: [
      "Экспериментальный характер: функциональность может изменяться/прекращаться без уведомления.",
      "Эмоциональное воздействие: вызывает тревогу, страх, сомнение и другие интенсивные переживания. Использование на свой риск.",
      "Рекомендуется воздержаться при наличии психологических проблем, тревожных расстройств или депрессии.",
      "Отказ от ответственности: Администрация не несет ответственности за негативные эмоциональные/психологические последствия."
    ]
  },
  {
    id: 2,
    title: "Регистрация и Создание Цифрового Двойника",
    icon: "🛡️",
    priority: "high",
    points: [
      "Возрастное ограничение: 18+.",
      "Подключение криптокошелька: ответственность за безопасность лежит на пользователе.",
      "Нейросканирование и биометрические данные: согласие на сбор (веб-камера, микрофон) для анализа мимики/голоса.",
      "Выбор Архетипа Демона: влияет на опыт, пользователь принимает последствия.",
      "NFT-Аватар: генерация уникального аватара на основе данных, пользователь получает права собственности."
    ]
  },
  {
    id: 3,
    title: "Использование Системы и Ежедневные Ритуалы",
    icon: "⚖️",
    priority: "medium",
    points: [
      "Лабиринт Первых Страхов: процедурно генерируемый, создает атмосферу тревоги.",
      "Физиологические Датчики (Опционально): интеграция данных для динамического изменения сложности.",
      "Ежедневные Ритуалы: утренний аудит, дневные квесты, вечернее DAO-голосование (добровольно).",
      "Токены Системы: внутриплатформенные токены для 'сжигания', доступа к контенту, 'Теневой Биржи'.",
      "NFT-Артефакты: получение ('фрагменты страха', 'баги надежды') и владение, возможен обмен/торговля."
    ]
  },
  {
    id: 4,
    title: "Профиль \"Комната Кривых Зеркал\" и \"Моральный Долг\"",
    icon: "🪞",
    priority: "high",
    points: [
      "Комната Кривых Зеркал: отображает эмоциональное состояние, историю, потенциальное будущее (интерпретация, не истина).",
      "'Моральный Долг' и Деформация Аватара: визуальная деформация аватара отражает состояние/действия.",
      "'Моральный долг' является метафоричным понятием, не имеет реального финансового значения.",
      "Попытки 'исправить' профиль могут усилить деформацию, подчеркивая иллюзорность контроля."
    ]
  },
  {
    id: 5,
    title: "DAO-Управление и Сообщество",
    icon: "🏛️",
    priority: "medium",
    points: [
      "DAO-Голосование: участие в принятии решений по развитию платформы (добровольно).",
      "Культовая Принадлежность: ощущение общности через совместный опыт и ритуалы (часть игрового процесса).",
      "Не должно интерпретироваться как призыв к деструктивному поведению в реальной жизни."
    ]
  },
  {
    id: 6,
    title: "Интеллектуальная Собственность",
    icon: "📜",
    priority: "medium",
    points: [
      "Контент Системы: принадлежит разработчикам, защищен авторским правом.",
      "Пользовательский Контент: пользователи сохраняют права, предоставляют SASOK лицензию на использование в рамках системы."
    ]
  },
  {
    id: 7,
    title: "Ограничение Ответственности",
    icon: "⚠️",
    priority: "critical",
    points: [
      "Предоставляется 'как есть' и 'как доступно', без гарантий.",
      "Отсутствие гарантий катарсиса и магии (опыт субъективен).",
      "Ограничение ответственности за любые убытки, включая прямые, косвенные и последующие."
    ]
  }
]

export default function AgreementPage() {
  const [expandedSections, setExpandedSections] = useState<number[]>([])
  const [acceptedSections, setAcceptedSections] = useState<number[]>([])
  const [finalAcceptance, setFinalAcceptance] = useState(false)

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const toggleAcceptance = (sectionId: number) => {
    setAcceptedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge variant="destructive" className="text-xs">КРИТИЧНО</Badge>
      case 'high':
        return <Badge variant="secondary" className="text-xs bg-orange-900 text-orange-100">ВАЖНО</Badge>
      case 'medium':
        return <Badge variant="outline" className="text-xs">СТАНДАРТ</Badge>
      default:
        return null
    }
  }

  const allSectionsAccepted = acceptedSections.length === agreementSections.length
  const canProceed = allSectionsAccepted && finalAcceptance

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-br from-red-400 via-white to-gray-400 bg-clip-text text-transparent">
            Пользовательское Соглашение
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            SASOK: Отражение во Тьме - Экспериментальная Web3 платформа
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 border-red-900/50 bg-red-950/20">
          <CardHeader>
            <CardTitle className="text-red-400 text-2xl">⚠️ Обязательное Ознакомление</CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Внимательно изучите каждый раздел соглашения
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-200 leading-relaxed mb-4">
              Использование вами системы SASOK означает ваше безоговорочное согласие с условиями настоящего соглашения. 
              SASOK представляет собой экспериментальную Web3 платформу для исследования глубин человеческой психики 
              через призму цифрового взаимодействия.
            </p>
            <div className="bg-red-950/30 p-4 rounded-lg border border-red-900/50">
              <p className="text-red-200 font-semibold">
                Платформа разработана для создания уникального, эмоционально насыщенного опыта, 
                который может быть интерпретирован как психоделический триллер в формате метавселенной.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Agreement Sections */}
        <div className="space-y-6 mb-8">
          {agreementSections.map((section) => (
            <Card key={section.id} className="border-gray-800 bg-gray-900/50">
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <div 
                    className="cursor-pointer hover:bg-gray-800/50 transition-colors"
                    onClick={() => toggleSection(section.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-red-400 text-xl">
                            {section.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg text-white">
                              {section.id}. {section.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              {getPriorityBadge(section.priority)}
                              <Badge variant="outline" className="text-xs">
                                {section.points.length} пунктов
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={acceptedSections.includes(section.id)}
                            onCheckedChange={() => toggleAcceptance(section.id)}
                            onClick={(e: any) => e.stopPropagation()}
                          />
                          <span className="text-gray-400 text-lg">
                            {expandedSections.includes(section.id) ? '▼' : '▶'}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <Separator className="mb-4 bg-gray-700" />
                    <ul className="space-y-3">
                      {section.points.map((point, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-300">
                          <span className="text-red-400 mt-1">•</span>
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Progress Indicator */}
        <Card className="mb-8 border-gray-700 bg-gray-800/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Прогресс ознакомления:</span>
              <span className="text-white font-semibold">
                {acceptedSections.length}/{agreementSections.length}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-red-600 to-red-400 h-3 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(acceptedSections.length / agreementSections.length) * 100}%` 
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Final Acceptance */}
        <Card className={`mb-8 ${allSectionsAccepted ? 'border-green-900/50 bg-green-950/20' : 'border-gray-700 bg-gray-800/30'}`}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={finalAcceptance}
                onCheckedChange={(checked) => setFinalAcceptance(checked === true)}
                disabled={!allSectionsAccepted}
              />
              <div className="text-gray-300">
                <p className="font-semibold mb-2">Финальное подтверждение:</p>
                <p className="text-sm leading-relaxed">
                  Я подтверждаю, что внимательно прочитал, понял и принимаю все условия настоящего 
                  пользовательского соглашения SASOK. Я понимаю экспериментальный характер платформы, 
                  принимаю все связанные с этим риски и подтверждаю, что достиг возраста 18 лет.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              ← Вернуться на главную
            </Button>
          </Link>
          
          <Link href="/register">
            <Button 
              size="lg" 
              className={`px-8 py-4 text-lg font-semibold ${
                canProceed 
                  ? 'bg-red-900 hover:bg-red-800 text-white' 
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!canProceed}
            >
              {canProceed ? 'Продолжить регистрацию →' : 'Завершите ознакомление'}
            </Button>
          </Link>
        </div>

        {!allSectionsAccepted && (
          <p className="text-center text-gray-500 text-sm mt-4">
            Необходимо ознакомиться и принять все разделы соглашения
          </p>
        )}
      </div>
    </div>
  )
}