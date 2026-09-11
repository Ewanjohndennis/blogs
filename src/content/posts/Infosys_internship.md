---
title: "Infosys Springboard AI Internship: Building RTIIS"
date: 2026-04-15
type: "internship"
summary: "Shipped a multi-agent market intelligence platform with parallel execution, RAG knowledge retrieval, and PyTorch LSTM forecasting during Infosys Springboard Virtual Internship 6.0."
tags: ["Multi-Agent", "PyTorch", "RAG", "Groq", "Streamlit", "MongoDB"]
link: "https://github.com/Ewanjohndennis/RealTimeMarketIntelli"
draft: false
---

During my virtual internship as an **AI Engineer Intern** at **Infosys Springboard (Batch 6.0)** from February 2026 to April 2026, I designed and built **RTIIS** (*Real-Time Industry Insight & Strategic Intelligence System*) — a production-ready, multi-agent strategic intelligence system.

The core objective was to move away from static, single-prompt AI wrappers and engineer a collaborative multi-agent architecture capable of pulling real-time market data, running financial time-series forecasting, and outputting C-suite-ready competitive analysis.

---

## The Core Problem

Enterprise market intelligence teams waste hundreds of hours manually aggregating financial reports, scanning Google News RSS feeds, tracking competitor search trends, and assembling executive briefings.

RTIIS solves this by allowing an admin user to configure a target company (and its competitors) once. The platform then persists this configuration globally using MongoDB Atlas and triggers a parallel AI agent pipeline that delivers live, refreshed strategic intelligence to every authenticated employee dashboard.

---

## Architecture & Multi-Agent Pipeline

To keep dashboard loading times under 10 seconds while running multiple LLM inference tasks and data fetches, I structured the orchestrator using a concurrent execution pipeline via `ThreadPoolExecutor`.

### System Workflow


```

```
                    ┌──────────────────────────┐
                    │       Streamlit UI       │
                    │  Role-based · Wide layout │
                    └────────────┬─────────────┘
                                 │
                         ┌───────▼────────┐
                         │  Orchestrator  │
                         │  run_pipeline  │
                         └───────┬────────┘
                                 │
                ┌────────────────┼────────────────┐
                │   PARALLEL     │   EXECUTION    │
                ▼                ▼                ▼
         news_agent      competitor_agent   financial_agent
        (RSS + RAG)      (Trends + RAG)    (yfinance + RAG)
                │                │                │
                └────────────────┼────────────────┘
                                 │ combined output
                          ┌──────┴──────┐
                          │  PARALLEL   │
                ┌─────────▼──┐     ┌────▼────────────┐
                │ chief_agent│     │improvement_agent │
                │ (brief)    │     │(recommendations) │
                └────────────┘     └─────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   Streamlit Dashboard   │
                    │  News · Competitors ·    │
                    │  Financials · Strategy · │
                    │  Forecasting · PDF ·     │
                    │  Email Report           │
                    └─────────────────────────┘

```

```

1. **Parallel Ingestion Layer:** `news_agent`, `competitor_agent`, and `financial_agent` fire simultaneously.
2. **Retrieval-Augmented Generation (RAG):** RAG queries are factored out into `search_company_knowledge()` inside the orchestrator. Rather than having each agent make redundant vector queries, domain knowledge from Sentence Transformers is retrieved once and shared across all agents.
3. **Synthesis Layer:** Once the parallel agents complete their tasks, `chief_agent` (which synthesizes a 5-point executive brief) and `improvement_agent` (which generates actionable `[Action] → [Impact]` recommendations) run in parallel over the aggregated output.
4. **Time-Series Forecasting:** A 2-layer stacked PyTorch LSTM model runs historical stock price regressions to forecast future market trajectories.

---

## Key Features & Deliverables

- **Role-Based Session State:** Admin panel controls company selection and MongoDB Atlas config persistence; Employee view displays live auto-refreshing intelligence.
- **Auto Competitor Detection:** An automated LLM fallback identifies top industry rivals if competitors are not entered manually.
- **Financial Analytics:** 12-metric financial comparison matrix (P/E, ROE, Gross Margin, EPS, etc.) powered by `yfinance` with custom header sessions to avoid scraping blocks.
- **Automated PDF & Email Dispatch:** ReportLab generates complete intelligence summaries on demand, with a one-click SMTP integration sending the report via Zoho Mail (`smtp.zoho.in:465`).

---

## Tech Stack Overview

| Component | Technology Used |
| --- | --- |
| **LLM Inference** | Groq (`llama-3.3-70b-versatile`) |
| **Agent Orchestration** | Custom Python orchestrator with `ThreadPoolExecutor` |
| **RAG & Vector Search** | Sentence Transformers + Custom Vector Index |
| **Forecasting** | PyTorch (2-Layer Stacked LSTM) |
| **Database** | MongoDB Atlas (`global_company_config`) |
| **Frontend UI** | Streamlit + Plotly + Custom CSS |
| **Automated Delivery** | ReportLab (PDF) + `smtplib` (Zoho Mail SMTP) |

---

## Engineering Challenges & Real-World Lessons

### 1. The LLM Provider Rotation Strategy

Building on free-tier infrastructure taught me the importance of graceful degradation and modular API abstraction. During development, rate limits were hit across multiple providers, forcing rapid architecture pivots. 

`project/llm.py` evolved into a well-documented failover pipeline:
1. **Groq (`llama-3.3-70b-versatile`)** — *Primary (Fast inference, reliable limits)*
2. **HuggingFace InferenceClient** — *Fallback 1*
3. **OpenRouter** — *Fallback 2*
4. **Azure OpenAI** — *Initial baseline*

### 2. Thread-Safe State Management

Running multi-threaded agent pipelines inside Streamlit required careful isolation of session states and thread locks when writing temporary execution logs and RAG context matrices.

---

## Conclusion & Impact

The Infosys Springboard Virtual Internship was a solid deep-dive into practical AI engineering. Building RTIIS reinforced that delivering real-world enterprise AI solutions requires far more than model prompt tuning — it demands robust concurrent pipelines, thread-safe databases, optimized vector search, and fallback resilience.
