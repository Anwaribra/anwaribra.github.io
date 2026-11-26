'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import styles from './Projects.module.css'
import { SegmentControl } from '@/components/thinker-ui/AgenticControls'

type NodeProps = { x: number; y: number; title: string; detail?: string; accent?: boolean; width?: number }
function Node({ x, y, title, detail, accent = false, width = 136 }: NodeProps) {
  return <g transform={`translate(${x} ${y})`} className={accent ? styles.nodeAccent : styles.node}>
    <rect width={width} height="66" rx="10" />
    <circle cx="16" cy="19" r="3" />
    <text x="16" y="39" className={styles.nodeTitle}>{title}</text>
    {detail && <text x="16" y="54" className={styles.nodeDetail}>{detail}</text>}
  </g>
}
function Pipe({ d, muted = false }: { d: string; muted?: boolean }) {
  return <path d={d} className={muted ? styles.pipeMuted : styles.pipe} />
}
function DataFlow({ agent }: { agent: boolean }) {
  if (agent) return <svg viewBox="0 0 860 240" role="img" aria-label="Prototype agent workflow: health signals, diagnosis through MCP, proposed plan, human approval, simulated actions. Execution is not a production repair system." className={styles.flowSvg}>
    <text x="34" y="30" className={styles.svgLabel}>DIAGNOSE. PROPOSE. ASK FIRST.</text>
    <Pipe d="M164 121 H198 M334 121 H368 M504 121 H538 M674 121 H708" muted />
    <Node x={28} y={88} width={136} title="Health signals" detail="pipeline evidence" />
    <Node x={198} y={88} title="Diagnosis" detail="agent + MCP" />
    <Node x={368} y={88} title="Plan" detail="proposed changes" />
    <Node x={538} y={88} title="Approval" detail="human decision" accent />
    <Node x={708} y={88} width={124} title="Actions" detail="simulated adapters" />
    <text x="430" y="207" textAnchor="middle" className={styles.svgNote}>Prototype control flow. Rerun and refresh adapters are simulated.</text>
  </svg>
  return <svg viewBox="0 0 860 240" role="img" aria-label="Sample JSON data flows through dlt into PostgreSQL raw tables, then dbt staging and marts. Dagster orchestrates ingestion, transformation, and checks." className={styles.flowSvg}>
    <text x="34" y="30" className={styles.svgLabel}>BATCH DATA / ASSET-BASED ORCHESTRATION</text>
    <path d="M206 76 V61 H784 V76" className={styles.bracket} />
    <text x="495" y="54" textAnchor="middle" className={styles.orchestrator}>Dagster</text>
    <Pipe d="M156 121 H198 M334 121 H376 M512 121 H554 M690 121 H732" />
    <Node x={28} y={88} width={128} title="Sample JSON" detail="e-commerce data" />
    <Node x={198} y={88} title="Ingest" detail="dlt" />
    <Node x={376} y={88} title="Raw tables" detail="PostgreSQL" />
    <Node x={554} y={88} title="Transform" detail="dbt" accent />
    <Node x={732} y={88} width={100} title="Marts" detail="SQL models" />
    <path d="M622 154 V187 H444" className={styles.pipeMuted} />
    <circle cx="435" cy="187" r="4" className={styles.signal} />
    <text x="421" y="191" textAnchor="end" className={styles.svgNote}>quality checks</text>
  </svg>
}
function MobileDataFlow({ agent }: { agent: boolean }) {
  const nodes = agent
    ? [['Signals', 'pipeline evidence'], ['Diagnosis', 'agent + MCP'], ['Plan', 'proposed changes'], ['Approval', 'human decision'], ['Actions', 'simulated adapters']]
    : [['Sample JSON', 'e-commerce data'], ['Ingest', 'dlt'], ['Raw tables', 'PostgreSQL'], ['Transform', 'dbt'], ['Marts', 'SQL models']]
  return <svg viewBox="0 0 340 318" className={styles.mobileFlow} role="img" aria-label={agent ? 'Prototype workflow: evidence, diagnosis, plan, human approval, simulated actions.' : 'Dagster orchestrates sample JSON ingestion through dlt into PostgreSQL, dbt transformation, and analytical marts.'}>
    <text x="17" y="17" className={styles.svgLabel}>{agent ? 'PROTOTYPE / HUMAN APPROVAL' : 'ORCHESTRATED WITH DAGSTER'}</text>
    <Pipe d="M153 69 H187 M255 102 V128 M187 161 H153 M85 194 V222" />
    <Node x={17} y={36} title={nodes[0][0]} detail={nodes[0][1]} />
    <Node x={187} y={36} title={nodes[1][0]} detail={nodes[1][1]} />
    <Node x={187} y={128} title={nodes[2][0]} detail={nodes[2][1]} />
    <Node x={17} y={128} title={nodes[3][0]} detail={nodes[3][1]} accent />
    <Node x={17} y={222} title={nodes[4][0]} detail={nodes[4][1]} />
    <text x="188" y="251" className={styles.svgNote}>{agent ? 'Execution adapters' : 'Data quality'}</text><text x="188" y="266" className={styles.svgNote}>{agent ? 'are simulated.' : 'checks included.'}</text>
  </svg>
}
function AynMap() {
  return <svg viewBox="0 0 460 270" role="img" aria-label="Ayn product map. Evidence links to criteria within standards, and gap analysis identifies criteria without approved evidence. Horus assists the workflow." className={styles.aynSvg}>
    <defs><pattern id="ayn-dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" className={styles.gridDot} /></pattern></defs>
    <rect width="460" height="270" fill="url(#ayn-dots)" />
    <circle cx="230" cy="135" r="100" className={styles.orbit} />
    <circle cx="230" cy="135" r="76" className={styles.orbitInner} />
    <path d="M143 77 Q230 44 317 77 M143 193 Q230 226 317 193 M125 94 V176 M335 94 V176" className={styles.mapLine} />
    <path d="M156 81 L199 117 M304 81 L261 117 M156 189 L199 153 M304 189 L261 153" className={styles.mapLine} />
    <g className={styles.mapPill}><rect x="61" y="51" width="130" height="44" rx="9" /><text x="126" y="78" textAnchor="middle">Evidence</text></g>
    <g className={styles.mapPill}><rect x="269" y="51" width="130" height="44" rx="9" /><text x="334" y="78" textAnchor="middle">Standards</text></g>
    <g className={styles.mapPill}><rect x="61" y="175" width="130" height="44" rx="9" /><text x="126" y="202" textAnchor="middle">Gap analysis</text></g>
    <g className={styles.mapPill}><rect x="269" y="175" width="130" height="44" rx="9" /><text x="334" y="202" textAnchor="middle">Horus</text></g>
    <circle cx="230" cy="135" r="37" className={styles.aynCore} /><text x="230" y="145" textAnchor="middle" className={styles.aynWord}>Ayn.</text>
  </svg>
}
function FleetFlow() {
  return <svg viewBox="0 0 460 270" role="img" aria-label="Simulated vehicle telemetry goes through MQTT, a Kafka bridge, Spark Structured Streaming, and Cassandra." className={styles.fleetSvg}>
    <text x="29" y="36" className={styles.svgLabel}>TELEMETRY / SIMULATED SOURCE</text>
    {[0, 1, 2].map(i => <g key={i} transform={`translate(${33 + i * 27} 66)`} className={styles.vehicle}><rect width="17" height="29" rx="4" /><path d="M4 8 H13 M4 20 H13" /></g>)}
    <path d="M66 103 V126 H86 V157" className={styles.pipeMuted} />
    <text x="103" y="130" className={styles.svgNote}>MQTT bridge</text>
    <Node x={28} y={157} width={118} title="Kafka" detail="event bridge" />
    <Node x={171} y={157} width={118} title="Spark" detail="stream processing" accent />
    <Node x={314} y={157} width={118} title="Cassandra" detail="telemetry store" />
    <Pipe d="M146 190 H171 M289 190 H314" />
    <path d="M86 134 h10 m-5 -5 v10" className={styles.crosshair} />
    <path d="M409 85 h10 m-5 -5 v10" className={styles.crosshair} />
  </svg>
}
function EconomicFlow() {
  return <svg viewBox="0 0 460 270" role="img" aria-label="Daily Airflow workflow extracts currency, metals, stocks, and economic indicators into PostgreSQL, then runs dbt models for analytical tables." className={styles.eisSvg}>
    <text x="29" y="36" className={styles.svgLabel}>ECONOMIC INDICATORS / DAILY BATCH</text>
    {['FX', 'METALS', 'MARKETS'].map((t, i) => <g key={t} transform={`translate(${28 + i * 145} 65)`} className={styles.market}><rect width="114" height="45" rx="8" /><text x="57" y="28" textAnchor="middle">{t}</text></g>)}
    <path d="M85 110 V135 H375 V110 M230 110 V135 M85 135 V158" className={styles.pipeMuted} />
    <Node x={28} y={158} width={118} title="PostgreSQL" detail="raw indicators" />
    <Node x={171} y={158} width={118} title="dbt" detail="analytics models" accent />
    <Node x={314} y={158} width={118} title="Analytics" detail="SQL models" />
    <Pipe d="M146 191 H171 M289 191 H314" />
    <text x="230" y="251" textAnchor="middle" className={styles.svgNote}>scheduled with Airflow</text>
  </svg>
}

type ProjectId = 'dataops' | 'ayn' | 'fleet' | 'eis' | 'space' | 'thinkerui' | 'toolkit'
const selectedProjects: { id: ProjectId; name: string; line: string; source: string; category: string; website?: string }[] = [
  { id: 'thinkerui', name: 'Thinker UI', line: 'Open-source React components with tactile materials and motion.', category: 'Component library', source: 'https://github.com/Thinker-Labs/thinker-ui', website: 'https://www.thinkerlab.tech/thinker-ui' },
  { id: 'toolkit', name: 'Thinker Toolkit', line: 'Engineering rules for AI-assisted development, with a verify step.', category: 'Developer tool', source: 'https://github.com/Thinker-Labs/Thinker-toolkit-', website: 'https://www.thinkerlab.tech/' },
  { id: 'dataops', name: 'DataOps Agent', line: 'Pipeline diagnosis, with a human in the loop.', category: 'Agent prototype', source: 'https://github.com/Anwaribra/DataOps-Agent' },
  { id: 'ayn', name: 'Ayn', line: 'Evidence, standards, and accreditation.', category: 'Full-stack product', source: 'https://github.com/Anwaribra/Ayn', website: 'https://aynplatform.app/' },
  { id: 'fleet', name: 'IoT Fleet', line: 'One pipeline for simulated vehicle telemetry.', category: 'Streaming', source: 'https://github.com/Anwaribra/IoT-Fleet-Monitoring-System' },
  { id: 'eis', name: 'Egypt Economic Indicators', line: 'A daily view of rates, markets, and metals.', category: 'Analytics', source: 'https://github.com/Anwaribra/Real-Time-EIS-Pipeline' },
  { id: 'space', name: 'Space Benders', line: 'A crew. A spacecraft. A shared mission.', category: 'Multiplayer game', source: 'https://github.com/Eyad-Dawood/Nasa-hackathon-project' },
]
const stacks: Record<string,string> = {"thinkerui": "React \u00b7 TypeScript \u00b7 CSS", "toolkit": "Node \u00b7 TypeScript \u00b7 CLI", "dataops": "dlt \u00b7 dbt \u00b7 Dagster \u00b7 FastMCP", "ayn": "Next.js \u00b7 FastAPI \u00b7 PostgreSQL", "fleet": "MQTT \u00b7 Kafka \u00b7 Spark \u00b7 Cassandra", "eis": "Airflow \u00b7 Kafka \u00b7 PostgreSQL \u00b7 dbt", "space": "Phaser \u00b7 Colyseus \u00b7 Node.js"}
const furtherWork = [
  { name: 'Lakehouse Analytics', url: 'https://github.com/Anwaribra/Lakehouse-Analytics-Platform' },
  { name: 'Platform Observability', url: 'https://github.com/Anwaribra/Data-Platform-Observability' },
  { name: 'Forex Pipeline', url: 'https://github.com/Anwaribra/Real-time-Forex-Data-Pipeline' },
]
function ExpandedDiagram({ id }: { id: ProjectId }) {
  const [agent, setAgent] = useState(false)
  if (id === 'dataops') return <>
    <div className={styles.detailTools}><SegmentControl label="DataOps diagram view" options={['Data flow','Agent loop']} value={agent?'Agent loop':'Data flow'} onChange={(v)=>setAgent(v==='Agent loop')} /><a href="/demo/dataops">Interactive simulation <ArrowUpRight size={12} /></a></div>
    <DataFlow agent={agent} /><MobileDataFlow agent={agent} />
  </>
  return <>{id==='ayn'?<AynMap />:id==='fleet'?<FleetFlow />:<EconomicFlow />}</>
}
export default function Projects() {
  const [open, setOpen] = useState<ProjectId | null>(null)
  return <section id="projects" className={styles.showcase}>
    <header className={styles.intro}><div><p className={styles.eyebrow}>SELECTED WORK</p><h1>Projects<span>.</span></h1></div></header>
    <div className={styles.projectList}>
      {selectedProjects.map((p,i)=><motion.article initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: i * 0.04 }} className={styles.project} key={p.id} aria-labelledby={`${p.id}-title`}>
        <div className={styles.projectRow}>
          <div className={styles.projectCopy}><p className={styles.category}>{p.category}</p><h2 id={`${p.id}-title`}><a href={p.website||p.source} target="_blank" rel="noopener noreferrer">{p.name}<ArrowUpRight size={12} /></a></h2><p className={styles.oneLine}>{p.line}</p>
<p className={styles.stack}>{stacks[p.id]}</p>
          </div>
          
          <a className={`glass-btn ${styles.repoBtn}`} href={p.source} target="_blank" rel="noopener noreferrer" aria-label={`Source for ${p.name}`}><FaGithub size={13} /><span>Code</span></a>
        </div>
      </motion.article>)}
    </div>
    <section className={styles.more} aria-labelledby="more-title"><div className={styles.moreHeading}><h2 id="more-title">More experiments</h2><a href="https://github.com/Anwaribra" target="_blank" rel="noopener noreferrer">All repositories <ArrowUpRight size={12} /></a></div><div className={styles.moreLinks}>{furtherWork.map(p=><a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a>)}</div></section>
  </section>
}
