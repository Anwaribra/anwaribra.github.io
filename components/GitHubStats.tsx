'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaCode } from 'react-icons/fa'

const GITHUB_USERNAME = 'Anwaribra'

interface GitHubData {
  publicRepos: number
  topLanguages: { name: string; count: number; color: string }[]
}

interface ContributionDay {
  date: string
  count: number
  level: number
}

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Jupyter: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  SQL: '#e38c00',
  PLpgSQL: '#336790',
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

const LEVEL_COLORS = [
  '#161b22',
  '#0e4429',
  '#006d32',
  '#26a641',
  '#39d353',
]

function ContributionGraph({ username }: { username: string }) {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [loading, setLoading] = useState(true)

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
      const validDay = week.find(d => d.date)
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
      <div className="glow-card p-5 sm:p-6 animate-pulse">
        <div className="h-4 bg-white/5 rounded w-1/3 mb-4" />
        <div className="h-24 bg-white/5 rounded" />
      </div>
    )
  }

  if (weeks.length === 0) return null

  const cellSize = 11
  const cellGap = 3
  const totalCellSize = cellSize + cellGap
  const labelWidth = 32
  const topPadding = 20
  const svgWidth = labelWidth + weeks.length * totalCellSize + 10
  const svgHeight = topPadding + 7 * totalCellSize + 5

  return (
    <motion.div
      className="glow-card p-5 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-400">
          {totalContributions.toLocaleString()} contributions in the last year
        </h3>
      </div>

      <div className="overflow-x-auto pb-2">
        <svg width={svgWidth} height={svgHeight} className="block" style={{ minWidth: svgWidth }}>
          {monthLabels.map((m, i) => (
            <text key={i} x={labelWidth + m.col * totalCellSize} y={12} fill="#8b949e" fontSize="10" fontFamily="Inter, sans-serif">
              {m.label}
            </text>
          ))}

          {DAYS.map((day, i) => (
            day && (
              <text key={i} x={0} y={topPadding + i * totalCellSize + cellSize - 1} fill="#8b949e" fontSize="10" fontFamily="Inter, sans-serif">
                {day}
              </text>
            )
          ))}

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
                  fill={LEVEL_COLORS[day.level] || LEVEL_COLORS[0]}
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                >
                  <title>{`${day.count} contributions on ${day.date}`}</title>
                </rect>
              )
            })
          )}
        </svg>
      </div>

      <div className="flex items-center justify-end gap-1.5 mt-3 text-[11px] text-gray-500">
        <span>Less</span>
        {LEVEL_COLORS.map((color, i) => (
          <div key={i} className="w-[11px] h-[11px] rounded-sm" style={{ backgroundColor: color }} />
        ))}
        <span>More</span>
      </div>
    </motion.div>
  )
}

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
        const userData = await userRes.json()

        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`)
        const reposData = await reposRes.json()

        const langMap: Record<string, number> = {}
        reposData.forEach((repo: { language: string | null }) => {
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1
          }
        })

        const topLanguages = Object.entries(langMap)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            count,
            color: LANG_COLORS[name] || '#8b949e'
          }))

        setData({
          publicRepos: userData.public_repos,
          topLanguages
        })
      } catch (err) {
        console.error('Failed to fetch GitHub data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  const totalLangs = data?.topLanguages.reduce((acc, l) => acc + l.count, 0) || 1

  return (
    <motion.section
      id="github"
      className="py-8 sm:py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-heading mb-8 sm:mb-10">GitHub Activity</h2>

      {loading ? (
        <div className="glow-card p-6 animate-pulse mt-4">
          <div className="h-4 bg-white/5 rounded w-1/3 mb-4" />
          <div className="h-8 bg-white/5 rounded w-1/2" />
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5 mt-4">
          {/* Languages + Repos combined card */}
          {data && (
            <motion.div
              className="glow-card p-5 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-400">Top Languages</h3>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-mono bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                  <FaCode className="text-green-400 text-[10px]" />
                  {data.publicRepos} repos
                </span>
              </div>

              <div className="flex rounded-full overflow-hidden h-3 mb-4 gap-0.5">
                {data.topLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    className="h-full rounded-sm transition-all duration-500"
                    style={{
                      width: `${(lang.count / totalLangs) * 100}%`,
                      backgroundColor: lang.color,
                      minWidth: '8px'
                    }}
                    title={`${lang.name}: ${lang.count} repos`}
                  />
                ))}
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {data.topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: lang.color }} />
                    <span className="text-gray-300 font-medium">{lang.name}</span>
                    <span className="text-gray-600">{((lang.count / totalLangs) * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Contribution Graph */}
          <ContributionGraph username={GITHUB_USERNAME} />
        </div>
      )}
    </motion.section>
  )
}
