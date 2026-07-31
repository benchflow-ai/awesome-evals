import type { EvalType } from '../types'

export const TYPE_COLORS: Record<EvalType, string> = {
  paper: '#3a5f86',
  benchmark: '#4a6b46',
  tool: '#6b4a78',
  talk: '#9a6a2c',
  blog: '#6b6557',
}

export const TYPE_LABELS: Record<EvalType, string> = {
  paper: 'Paper',
  benchmark: 'Benchmark',
  tool: 'Tool',
  talk: 'Talk',
  blog: 'Blog',
}

export const TYPE_ORDER: EvalType[] = ['paper', 'benchmark', 'tool', 'talk', 'blog']

/** The key concepts surfaced per section in the Learn view. */
export const CONCEPTS: Record<string, string[]> = {
  '1': ['Error analysis', 'Vibe-check → assertion', 'Evals as science'],
  '2': ["Verifier's Law", 'Benchmark = frozen RL env', 'Verifiable > judgeable', 'RLVR'],
  '3': ['The harness is the agent', 'Same model, opposite ranking', 'Weights + tools + harness'],
  '4': ['Five gradable surfaces', 'Trace vs output', 'OTel GenAI conventions'],
  '5': ['Offline vs online', 'Scorers & judges', 'CI gating', 'Tracing → datasets'],
  '6': ['Contamination', 'Saturation', 'Label errors flip rankings', 'Cost-controlled eval'],
  '7': ['Verifiable rewards', 'Difficulty calibration', 'Reward hacking', 'Env lifecycle'],
  '8': ['Critique-shadowing', 'Judge biases', 'Binary > Likert', 'Align to one expert'],
  '9': ['Outcome vs trajectory', 'pass@k vs pass^k', 'World-state grading', 'Multi-turn & tools'],
  '10': ['Prompt injection', 'The lethal trifecta', 'Action-authorization', 'Red-teaming at scale'],
}
