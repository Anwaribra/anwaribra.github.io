'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { ExternalLink } from 'lucide-react'

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
      <div className="p-5 sm:p-6 rounded-2xl bg-[#121214]/60 border border-white/[0.08] animate-pulse">
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
      className="p-5 sm:p-6 rounded-2xl bg-[#121214]/60 border border-white/[0.08] hover:border-white/20 transition-all duration-200"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs sm:text-sm font-mono font-medium text-zinc-300">
          <span className="text-white font-bold">{totalContributions.toLocaleString()}</span> contributions in the last year
        </h3>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <span>@{username}</span>
          <ExternalLink className="w-3 h-3 stroke-[1.8]" />
        </a>
      </div>

      <div className="overflow-x-auto pb-2 no-scrollbar">
        <svg width={svgWidth} height={svgHeight} className="block" style={{ minWidth: svgWidth }}>
          {monthLabels.map((m, i) => (
            <text key={i} x={labelWidth + m.col * totalCellSize} y={12} fill="#71717a" fontSize="10" fontFamily="var(--font-geist-mono), monospace">
              {m.label}
            </text>
          ))}

          {DAYS.map((day, i) => (
            day && (
              <text key={i} x={0} y={topPadding + i * totalCellSize + cellSize - 1} fill="#71717a" fontSize="10" fontFamily="var(--font-geist-mono), monospace">
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
                  rx={2.5}
                  ry={2.5}
                  fill={LEVEL_COLORS[day.level] || LEVEL_COLORS[0]}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <title>{`${day.count} contributions on ${day.date}`}</title>
                </rect>
              )
            })
          )}
        </svg>
      </div>

      <div className="flex items-center justify-end gap-1.5 mt-3 text-[11px] font-mono text-zinc-400">
        <span>Less</span>
        {LEVEL_COLORS.map((color, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
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
        if (Array.isArray(reposData)) {
          reposData.forEach((repo: { language: string | null }) => {
            if (repo.language) {
              langMap[repo.language] = (langMap[repo.language] || 0) + 1
            }
          })
        }

        const topLanguages = Object.entries(langMap)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            count,
            color: LANG_COLORS[name] || '#8b949e'
          }))

        setData({
          publicRepos: userData.public_repos || 14,
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
      <h2 className="section-heading mb-6 sm:mb-8">GitHub Activity</h2>

      {loading ? (
        <div className="p-6 rounded-2xl bg-[#121214]/60 border border-white/[0.08] animate-pulse mt-4">
          <div className="h-4 bg-white/5 rounded w-1/3 mb-4" />
          <div className="h-8 bg-white/5 rounded w-1/2" />
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5 mt-4">
          {/* Languages + Repos combined card */}
          {data && (
            <motion.div
              className="p-5 sm:p-6 rounded-2xl bg-[#121214]/60 border border-white/[0.08] hover:border-white/20 transition-all duration-200"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs sm:text-sm font-mono font-medium text-zinc-300">Most Used Languages</h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 bg-white/[0.05] px-2.5 py-1 rounded-lg border border-white/10">
                  <FaGithub className="text-zinc-400 text-xs" />
                  <span>{data.publicRepos} Repositories</span>
                </span>
              </div>

              <div className="flex rounded-full overflow-hidden h-2.5 mb-4 gap-0.5 bg-zinc-900 p-0.5 border border-white/5">
                {data.topLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(lang.count / totalLangs) * 100}%`,
                      backgroundColor: lang.color,
                      minWidth: '6px'
                    }}
                    title={`${lang.name}: ${lang.count} repos`}
                  />
                ))}
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {data.topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2 text-xs font-mono">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: lang.color }} />
                    <span className="text-zinc-200 font-medium">{lang.name}</span>
                    <span className="text-zinc-500">{((lang.count / totalLangs) * 100).toFixed(1)}%</span>
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

