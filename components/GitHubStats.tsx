'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

const GITHUB_USERNAME = 'Anwaribra'

interface ContributionDay {
  date: string
  count: number
  level: number
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

// Monochrome shades matching Gurbinder reference (Image 1)
const DARK_LEVEL_COLORS = [
  '#1e2024', // Level 0 (inactive)
  '#3a3d46', // Level 1
  '#656a79', // Level 2
  '#a2abbf', // Level 3
  '#ffffff', // Level 4 (white peak pop)
]

const LIGHT_LEVEL_COLORS = [
  '#ebedf0',
  '#c4c8d2',
  '#8d94a3',
  '#535a68',
  '#111215',
]

function ContributionGraph({ username }: { username: string }) {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [loading, setLoading] = useState(true)
  const [hoveredDay, setHoveredDay] = useState<{ count: number; date: string } | null>(null)
  const { theme } = useTheme()
  const levelColors = theme === 'light' ? LIGHT_LEVEL_COLORS : DARK_LEVEL_COLORS

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
        const data = await res.json()

        if (data.contributions) {
          const days: ContributionDay[] = []
          let total = 0

          data.contributions.forEach((day: { date: string; count: number; level: number }) => {
            days.push({ date: day.date, count: day.count, level: day.level })
            total += day.count
          })

          setContributions(days)
          setTotalContributions(total)
        }
      } catch (err) {
        console.error('Failed to fetch contributions:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [username])

  const { weeks, monthLabels } = useMemo(() => {
    if (contributions.length === 0) return { weeks: [], monthLabels: [] }

    const weeksArr: ContributionDay[][] = []
    let currentWeek: ContributionDay[] = []

    const firstDate = new Date(contributions[0].date)
    const firstDay = firstDate.getDay()
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push({ date: '', count: -1, level: -1 })
    }

    contributions.forEach((day) => {
      currentWeek.push(day)
      if (currentWeek.length === 7) {
        weeksArr.push(currentWeek)
        currentWeek = []
      }
    })

    if (currentWeek.length > 0) {
      weeksArr.push(currentWeek)
    }

    const labels: { label: string; col: number }[] = []
    let lastMonth = -1
    weeksArr.forEach((week, weekIdx) => {
      const validDay = week.find((d) => d.date)
      if (validDay && validDay.date) {
        const month = new Date(validDay.date).getMonth()
        if (month !== lastMonth) {
          labels.push({ label: MONTHS[month], col: weekIdx })
          lastMonth = month
        }
      }
    })

    return { weeks: weeksArr, monthLabels: labels }
  }, [contributions])

  if (loading) {
    return (
      <div className="w-full animate-pulse space-y-2 py-2">
        <div className="h-28 bg-black/5 dark:bg-white/5 rounded-lg w-full" />
        <div className="h-3 bg-black/5 dark:bg-white/5 rounded w-1/4" />
      </div>
    )
  }

  if (weeks.length === 0) return null

  const cellSize = 10
  const cellGap = 2.5
  const totalCellSize = cellSize + cellGap
  const labelWidth = 28
  const topPadding = 18
  const svgWidth = labelWidth + weeks.length * totalCellSize + 4
  const svgHeight = topPadding + 7 * totalCellSize + 4

  return (
    <div className="w-full select-none pt-1">
      <div className="overflow-x-auto pb-1 no-scrollbar">
        <svg width={svgWidth} height={svgHeight} className="block" style={{ minWidth: svgWidth }}>
          {monthLabels.map((m, i) => (
            <text
              key={i}
              x={labelWidth + m.col * totalCellSize}
              y={11}
              fill="#71717a"
              fontSize="10"
              fontFamily="var(--font-geist-mono), monospace"
            >
              {m.label}
            </text>
          ))}

          {DAYS.map(
            (day, i) =>
              day && (
                <text
                  key={i}
                  x={0}
                  y={topPadding + i * totalCellSize + cellSize - 1}
                  fill="#71717a"
                  fontSize="10"
                  fontFamily="var(--font-geist-mono), monospace"
                >
                  {day}
                </text>
              )
          )}

          {weeks.map((week, weekIdx) =>
            week.map((day, dayIdx) => {
              if (day.level < 0) return null
              return (
                <rect
                  key={`${weekIdx}-${dayIdx}`}
                  x={labelWidth + weekIdx * totalCellSize}
                  y={topPadding + dayIdx * totalCellSize}
                  width={cellSize}
                  height={cellSize}
                  rx={2.5}
                  ry={2.5}
                  fill={levelColors[day.level] || levelColors[0]}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onMouseEnter={() => setHoveredDay({ count: day.count, date: day.date })}
                  onMouseLeave={() => setHoveredDay(null)}
                />
              )
            })
          )}
        </svg>
      </div>

      {/* Clean status text below the graph matching reference screenshot */}
      <p className="mt-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
        {hoveredDay ? (
          <>
            <span className="text-zinc-900 dark:text-white font-medium">{hoveredDay.count}</span>{' '}
            {hoveredDay.count === 1 ? 'contribution' : 'contributions'} on{' '}
            <span className="text-zinc-900 dark:text-white font-medium">
              {new Date(hoveredDay.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </>
        ) : (
          `Total ${totalContributions.toLocaleString()} contributions in lifetime`
        )}
      </p>
    </div>
  )
}

export default function GitHubStats() {
  return (
    <motion.section
      id="github"
      className="pt-2 pb-2"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.35 }}
    >
      <ContributionGraph username={GITHUB_USERNAME} />
    </motion.section>
  )
}
