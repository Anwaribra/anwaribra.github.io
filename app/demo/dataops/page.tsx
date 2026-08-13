'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import {
  ArrowLeft,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  Layers,
  Lock,
  Play,
  RefreshCw,
  Server,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Workflow,
  Zap,
  Info,
  Clock
} from 'lucide-react'

// Data models for the control plane simulation
interface NodeData {
  id: string
  name: string
  category: string
  status: 'HEALTHY' | 'WARNING' | 'FAILED'
  tech: string
  description: string
  metrics: Record<string, string | number>
}

interface MCPStep {
  step: number
  tool: string
  purpose: string
  status: 'SUCCESS' | 'RUNNING' | 'PENDING'
  args: Record<string, any>
  resultSummary: string
  factExtracted: string
}

export default function DataOpsDemoPage() {
  const [activeTab, setActiveTab] = useState<'nodes' | 'mcp' | 'diagnosis' | 'remediation' | 'verification'>('nodes')
  const [incidentStatus, setIncidentStatus] = useState<'DETECTED' | 'PENDING_APPROVAL' | 'EXECUTING' | 'RESOLVED'>('PENDING_APPROVAL')
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null)
  const [executingProgress, setExecutingProgress] = useState(0)

  // Simulation node states
  const initialNodes: NodeData[] = [
    {
      id: 'data_sources',
      name: 'Data Sources',
      category: 'Ingestion',
      status: 'HEALTHY',
      tech: 'JSON / REST API',
      description: 'E-commerce transactional JSON batch files',
      metrics: { 'Source Datasets': 4, 'Total Records': 505, Format: 'JSON' }
    },
    {
      id: 'dlt_ingestion',
      name: 'dlt Ingestion',
      category: 'Ingestion',
      status: 'HEALTHY',
      tech: 'dlt (data load tool)',
      description: 'Python dlt pipeline extracting raw JSON data into PostgreSQL',
      metrics: { Pipeline: 'ecommerce_ingestion', Destination: 'PostgreSQL 16', Schema: 'raw_data' }
    },
    {
      id: 'postgres_raw',
      name: 'PostgreSQL Raw',
      category: 'Storage',
      status: 'HEALTHY',
      tech: 'PostgreSQL 16',
      description: 'Relational database housing raw & staging tables',
      metrics: { Port: 5433, 'Active Tables': 11, 'Row Count': 525 }
    },
    {
      id: 'dbt_transformation',
      name: 'dbt Models',
      category: 'Transformation',
      status: incidentStatus === 'RESOLVED' ? 'HEALTHY' : 'FAILED',
      tech: 'dbt-core / dbt-postgres',
      description: 'Modular SQL transformations with 27 data quality assertions',
      metrics: { Models: 7, Staging: 4, Marts: 3, 'Quality Tests': 27 }
    },
    {
      id: 'dagster_orchestrator',
      name: 'Dagster Engine',
      category: 'Orchestration',
      status: incidentStatus === 'RESOLVED' ? 'HEALTHY' : 'FAILED',
      tech: 'Dagster 1.6+',
      description: 'Asset orchestration, lineage graphs, and runtime asset checks',
      metrics: { Assets: 8, 'Asset Checks': 4, 'Failed Assets': incidentStatus === 'RESOLVED' ? 0 : 2 }
    },
    {
      id: 'mcp_server',
      name: 'MCP Server',
      category: 'Protocol',
      status: 'HEALTHY',
      tech: 'FastMCP (stdio transport)',
      description: '22 standardized read-only & proposal tools for LLM agent reasoning',
      metrics: { 'Registered Tools': 22, Transport: 'stdio', Access: 'Read-Only / Proposal' }
    }
  ]

  const mcpToolSteps: MCPStep[] = [
    {
      step: 1,
      tool: 'get_failed_dbt_tests',
      purpose: 'Fetch assertion failure logs from dbt execution artifacts',
      status: 'SUCCESS',
      args: { select_severity: 'error' },
      resultSummary: 'Found 1 failed test: stg_customers_email_null_check',
      factExtracted: '12 records in stg_customers table contain NULL email fields'
    },
    {
      step: 2,
      tool: 'get_asset_lineage',
      purpose: 'Trace upstream and downstream lineage graph for stg_customers',
      status: 'SUCCESS',
      args: { asset_key: 'stg_customers', depth: 3 },
      resultSummary: 'Upstream: raw_customers. Downstream: customers_mart, executive_dashboard',
      factExtracted: 'Executive Revenue Dashboard is downstream of the failing model'
    },
    {
      step: 3,
      tool: 'query_column_metrics',
      purpose: 'Profile column null rates and value distribution across staging schema',
      status: 'SUCCESS',
      args: { table: 'raw_customers', column: 'email' },
      resultSummary: 'Null rate: 2.38% (12 / 505 rows). Pattern matches payload ingestion batch #8812',
      factExtracted: 'Data corruption localized to batch #8812 ingested at 14:00 UTC'
    },
    {
      step: 4,
      tool: 'propose_remediation_plan',
      purpose: 'Formulate safe, allowlisted recovery actions with risk assessment',
      status: 'SUCCESS',
      args: { incident_id: 'INC-2026-0814' },
      resultSummary: 'Proposed: quarantine_invalid_records -> refresh_dbt_model -> rerun_dagster_asset',
      factExtracted: 'Zero database schema alterations. Safe quarantine procedure'
    }
  ]

  const handleApproveRemediation = () => {
    setIncidentStatus('EXECUTING')
    setExecutingProgress(10)

    const interval = setInterval(() => {
      setExecutingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIncidentStatus('RESOLVED')
          return 100
        }
        return prev + 30
      })
    }, 600)
  }

  const handleResetSimulation = () => {
    setIncidentStatus('PENDING_APPROVAL')
    setExecutingProgress(0)
    setActiveTab('nodes')
  }

  return (
    <main className="min-h-screen bg-[#070A10] text-zinc-100 font-sans selection:bg-cyan-500/30">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#090D16]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Portfolio
          </Link>

          <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              DataOps Agent
              <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                LIVE DEMO SIMULATOR
              </span>
            </h1>
            <p className="text-xs text-zinc-400 font-mono">
              Operational Control Center • Autonomous Pipeline Remediation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetSimulation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            Reset Simulation
          </button>

          <a
            href="https://github.com/Anwaribra/DataOps-Agent"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 text-black font-semibold text-xs hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
          >
            <FaGithub className="w-3.5 h-3.5" />
            GitHub Repo
          </a>
        </div>
      </header>

      {/* Main Control Panel Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* TOP METRIC BANNER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1: System Status */}
          <div className="p-4 rounded-2xl bg-[#0C101A] border border-zinc-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>PIPELINE HEALTH</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  incidentStatus === 'RESOLVED'
                    ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]'
                    : 'bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]'
                }`}
              />
              <span className="text-lg font-bold text-white font-mono">
                {incidentStatus === 'RESOLVED' ? '100% HEALTHY' : 'ACTION REQUIRED'}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono">
              {incidentStatus === 'RESOLVED' ? '0 active incidents' : '1 critical assertion failure'}
            </p>
          </div>

          {/* Metric 2: Active Incident */}
          <div className="p-4 rounded-2xl bg-[#0C101A] border border-zinc-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>ACTIVE INCIDENT</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-lg font-bold text-white font-mono truncate">
              {incidentStatus === 'RESOLVED' ? 'NONE' : 'INC-2026-0814'}
            </div>
            <p className="text-[11px] text-zinc-500 font-mono truncate">
              {incidentStatus === 'RESOLVED' ? 'All systems operational' : 'stg_customers_email_null_check'}
            </p>
          </div>

          {/* Metric 3: MCP Protocol */}
          <div className="p-4 rounded-2xl bg-[#0C101A] border border-zinc-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>MCP SERVER</span>
              <Terminal className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-lg font-bold text-white font-mono">
              22 STDIO TOOLS
            </div>
            <p className="text-[11px] text-zinc-500 font-mono">
              FastMCP Read-Only / Proposal
            </p>
          </div>

          {/* Metric 4: Governance Gate */}
          <div className="p-4 rounded-2xl bg-[#0C101A] border border-zinc-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>SAFETY GATE</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white font-mono">
                {incidentStatus === 'RESOLVED'
                  ? 'VERIFIED'
                  : incidentStatus === 'EXECUTING'
                  ? 'EXECUTING'
                  : 'AWAITING APPROVAL'}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono">
              30m TTL • Self-Approve Blocked
            </p>
          </div>
        </div>

        {/* INCIDENT STATUS ACTION CALLOUT BANNER */}
        {incidentStatus !== 'RESOLVED' && (
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Incident INC-2026-0814 Detected
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    HIGH SEVERITY
                  </span>
                </h3>
                <p className="text-xs text-amber-200/80 mt-0.5">
                  12 NULL values detected in <code className="font-mono bg-black/40 px-1 rounded text-amber-300">stg_customers.email</code> assertion. AI Agent formulated allowlisted remediation.
                </p>
              </div>
            </div>

            {incidentStatus === 'PENDING_APPROVAL' && (
              <button
                onClick={handleApproveRemediation}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 flex-shrink-0 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Approve & Execute Remediation
              </button>
            )}

            {incidentStatus === 'EXECUTING' && (
              <div className="flex items-center gap-3">
                <div className="w-32 bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full transition-all duration-300"
                    style={{ width: `${executingProgress}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-cyan-400 animate-pulse">
                  Executing ({executingProgress}%)...
                </span>
              </div>
            )}
          </div>
        )}

        {incidentStatus === 'RESOLVED' && (
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Incident INC-2026-0814 Resolved & Verified
                </h3>
                <p className="text-xs text-emerald-200/80 mt-0.5">
                  Quarantined 12 invalid records, refreshed dbt model, reran Dagster asset. All 27 assertions passing.
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-lg bg-emerald-950 border border-emerald-800 text-xs font-mono text-emerald-300">
              AUDIT VERIFIED
            </span>
          </div>
        )}

        {/* TAB NAVIGATION BAR */}
        <div className="border-b border-zinc-800 flex overflow-x-auto gap-2 pb-px font-mono text-xs">
          <button
            onClick={() => setActiveTab('nodes')}
            className={`px-4 py-2.5 border-b-2 font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'nodes'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            1. Pipeline Nodes & Health
          </button>

          <button
            onClick={() => setActiveTab('mcp')}
            className={`px-4 py-2.5 border-b-2 font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'mcp'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            2. MCP Investigation Log
          </button>

          <button
            onClick={() => setActiveTab('diagnosis')}
            className={`px-4 py-2.5 border-b-2 font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'diagnosis'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            3. AI Diagnosis Report
          </button>

          <button
            onClick={() => setActiveTab('remediation')}
            className={`px-4 py-2.5 border-b-2 font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'remediation'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            4. Governance & Remediation
          </button>

          <button
            onClick={() => setActiveTab('verification')}
            className={`px-4 py-2.5 border-b-2 font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'verification'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            5. Audit & Verification
          </button>
        </div>

        {/* TAB CONTENTS */}
        <div className="min-h-[400px]">
          {/* TAB 1: PIPELINE NODES & HEALTH */}
          {activeTab === 'nodes' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {initialNodes.map((node) => (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-5 rounded-2xl bg-[#0C101A] border transition-all cursor-pointer space-y-3 hover:scale-[1.01] ${
                      node.status === 'FAILED'
                        ? 'border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.08)]'
                        : node.status === 'WARNING'
                        ? 'border-amber-500/40'
                        : 'border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold text-zinc-500 uppercase">
                        {node.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          node.status === 'HEALTHY'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : node.status === 'WARNING'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                        }`}
                      >
                        {node.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">{node.name}</h4>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{node.description}</p>
                    </div>

                    <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                      <span>{node.tech}</span>
                      <span className="text-cyan-400 hover:underline">View Specs →</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* NODE DETAIL MODAL */}
              {selectedNode && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div className="bg-[#0C101A] border border-zinc-800 p-6 rounded-2xl max-w-lg w-full space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">{selectedNode.category}</span>
                        <h3 className="text-lg font-bold text-white font-mono">{selectedNode.name}</h3>
                      </div>
                      <button
                        onClick={() => setSelectedNode(null)}
                        className="text-xs font-mono text-zinc-400 hover:text-white px-2 py-1 bg-zinc-800 rounded"
                      >
                        CLOSE [X]
                      </button>
                    </div>

                    <p className="text-sm text-zinc-300">{selectedNode.description}</p>

                    <div className="space-y-2">
                      <div className="text-xs font-mono text-cyan-400">Technical Metadata:</div>
                      <div className="p-3 rounded-xl bg-black/60 font-mono text-xs space-y-1 text-zinc-300">
                        {Object.entries(selectedNode.metrics).map(([key, val]) => (
                          <div key={key} className="flex justify-between border-b border-zinc-800/50 py-1">
                            <span className="text-zinc-500">{key}:</span>
                            <span className="text-zinc-200">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MCP INVESTIGATION LOG */}
          {activeTab === 'mcp' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>FastMCP Stdio Investigation Audit Trail</span>
                <span>22 Registered Tools • Read-Only Transport</span>
              </div>

              <div className="space-y-3 font-mono">
                {mcpToolSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-xl bg-[#0C101A] border border-zinc-800/80 space-y-2 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-[10px] font-bold">
                          #{step.step}
                        </span>
                        <span className="text-cyan-300 font-bold">{step.tool}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px]">
                        {step.status}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400">{step.purpose}</p>

                    <div className="p-2.5 rounded bg-black/50 text-[11px] space-y-1">
                      <div className="text-zinc-500">Arguments: {JSON.stringify(step.args)}</div>
                      <div className="text-zinc-300">Summary: {step.resultSummary}</div>
                      <div className="text-emerald-400 font-semibold">Extracted Evidence: {step.factExtracted}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AI DIAGNOSIS REPORT */}
          {activeTab === 'diagnosis' && (
            <div className="p-6 rounded-2xl bg-[#0C101A] border border-zinc-800/80 space-y-5 font-mono">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs text-cyan-400">DETERMINISTIC DIAGNOSIS REPORT</span>
                  <h3 className="text-xl font-bold text-white mt-1">Incident INC-2026-0814 Root Cause</h3>
                </div>
                <span className="px-3 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs">
                  CONFIDENCE: 98.4%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-black/50 border border-zinc-800 space-y-2">
                  <div className="text-rose-400 font-bold">Diagnosed Root Cause:</div>
                  <p className="text-zinc-300 leading-relaxed">
                    Ingestion batch #8812 payload contained 12 malformed record objects missing required <code className="text-rose-300">email</code> fields, violating non-null assertion on <code className="text-rose-300">stg_customers</code> model.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-zinc-800 space-y-2">
                  <div className="text-amber-400 font-bold">Affected Downstream Assets:</div>
                  <ul className="list-disc list-inside text-zinc-300 space-y-1">
                    <li>stg_customers (dbt View - Failed)</li>
                    <li>customers_mart (dbt Table - Blocked)</li>
                    <li>executive_revenue_dashboard (Dagster Asset - Warning)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GOVERNANCE & REMEDIATION ENGINE */}
          {activeTab === 'remediation' && (
            <div className="p-6 rounded-2xl bg-[#0C101A] border border-zinc-800/80 space-y-6 font-mono">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs text-rose-400 uppercase">HUMAN-IN-THE-LOOP GOVERNANCE GATE</span>
                  <h3 className="text-xl font-bold text-white mt-1">Allowlisted Remediation Plan</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-950/60 px-3 py-1 rounded border border-amber-800">
                  <Clock className="w-3.5 h-3.5" />
                  TTL: 29m 40s
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs text-zinc-400">Proposed Recovery Steps (Allowlisted Only):</div>

                <div className="p-3.5 rounded-xl bg-black/50 border border-zinc-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-cyan-400 font-bold">1. quarantine_invalid_records</span>
                    <p className="text-zinc-400 mt-0.5">Isolate 12 malformed rows into raw_customers_quarantine table</p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded text-[10px]">RISK: LOW</span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/50 border border-zinc-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-cyan-400 font-bold">2. refresh_dbt_model</span>
                    <p className="text-zinc-400 mt-0.5">Re-run dbt model stg_customers with clean dataset</p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded text-[10px]">RISK: LOW</span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/50 border border-zinc-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-cyan-400 font-bold">3. rerun_dagster_asset</span>
                    <p className="text-zinc-400 mt-0.5">Re-materialize customers_mart & downstream checks</p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded text-[10px]">RISK: LOW</span>
                </div>
              </div>

              {incidentStatus === 'PENDING_APPROVAL' && (
                <div className="pt-3 flex justify-end">
                  <button
                    onClick={handleApproveRemediation}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Approve & Execute Remediation
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: AUDIT & VERIFICATION */}
          {activeTab === 'verification' && (
            <div className="p-6 rounded-2xl bg-[#0C101A] border border-zinc-800/80 space-y-5 font-mono">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs text-teal-400">POST-REMEDIATION VERIFICATION AUDIT</span>
                  <h3 className="text-xl font-bold text-white mt-1">Assertion Quality Checks</h3>
                </div>
                <span
                  className={`px-3 py-1 rounded text-xs ${
                    incidentStatus === 'RESOLVED'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                  }`}
                >
                  {incidentStatus === 'RESOLVED' ? 'AUDIT PASSED (100%)' : 'PENDING REMEDIATION'}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-black/50 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-zinc-200 font-bold">dbt assertion: stg_customers_email_null_check</span>
                    <p className="text-zinc-500 mt-0.5">Expected: 0 nulls. Actual: {incidentStatus === 'RESOLVED' ? '0 nulls' : '12 nulls'}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      incidentStatus === 'RESOLVED' ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                    }`}
                  >
                    {incidentStatus === 'RESOLVED' ? 'PASSED' : 'FAILED'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/50 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-zinc-200 font-bold">Dagster asset check: customers_mart</span>
                    <p className="text-zinc-500 mt-0.5">Status: {incidentStatus === 'RESOLVED' ? 'Materialized & Healthy' : 'Blocked'}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      incidentStatus === 'RESOLVED' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                    }`}
                  >
                    {incidentStatus === 'RESOLVED' ? 'PASSED' : 'BLOCKED'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
