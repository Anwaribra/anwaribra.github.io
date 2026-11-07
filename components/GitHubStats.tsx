'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
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
  const [mounted, setMounted] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? resolvedTheme !== 'light' : true
  const levelColors = isDark ? DARK_LEVEL_COLORS : LIGHT_LEVEL_COLORS

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

  // Auto-scroll to end (most recent activity) on mobile viewports
  useEffect(() => {
    if (!loading && weeks.length > 0 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth
    }
  }, [loading, weeks])

  if (loading) {
    return (
      <div className="w-full animate-pulse space-y-2 py-2">
        <div className="h-28 bg-black/5 dark:bg-white/5 rounded-lg w-full" />
        <div className="h-3 bg-black/5 dark:bg-white/5 rounded w-1/4" />
      </div>
    )
  }

  if (weeks.length === 0) return null

  const cellSize = 8.5
  const cellGap = 2
  const totalCellSize = cellSize + cellGap
  const labelWidth = 24
  const topPadding = 14
  const svgWidth = labelWidth + weeks.length * totalCellSize + 4
  const svgHeight = topPadding + 7 * totalCellSize + 2

  return (
    <div className="w-full select-none">
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto pb-1 no-scrollbar scroll-smooth [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)] sm:[mask-image:none]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <svg width={svgWidth} height={svgHeight} className="block" style={{ minWidth: svgWidth }}>
          {monthLabels.map((m, i) => (
            <text
              key={i}
              x={labelWidth + m.col * totalCellSize}
              y={9}
              fill="#71717a"
              fontSize="9"
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
                  fontSize="9"
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
                  rx={2}
                  ry={2}
                  fill={levelColors[day.level] || levelColors[0]}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onMouseEnter={() => setHoveredDay({ count: day.count, date: day.date })}
                  onMouseLeave={() => setHoveredDay(null)}
                  onTouchStart={() => setHoveredDay({ count: day.count, date: day.date })}
                />
              )
            })
          )}
        </svg>
      </div>

      {/* Clean status text below the graph with stable layout min-height */}
      <div className="mt-1 min-h-[18px] text-[11px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center">
        {hoveredDay ? (
          <p>
            <span className="text-zinc-900 dark:text-white font-medium">{hoveredDay.count}</span>{' '}
            {hoveredDay.count === 1 ? 'contribution' : 'contributions'} on{' '}
            <span className="text-zinc-900 dark:text-white font-medium">
              {new Date(hoveredDay.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </p>
        ) : (
          <p>{`Total ${totalContributions.toLocaleString()} contributions in lifetime`}</p>
        )}
      </div>
    </div>
  )
}

export default function GitHubStats() {
  return (
    <motion.section
      id="github"
      className="!mt-1 !mb-0"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.35 }}
    >
      <ContributionGraph username={GITHUB_USERNAME} />
    </motion.section>
  )
}
