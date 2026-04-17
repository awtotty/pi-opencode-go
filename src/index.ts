/**
 * OpenCode Zen/Go Provider Extension
 *
 * Gives pi access to OpenCode Zen (cash balance) and Go (subscription credits) models.
 *
 * Setup:
 *   1. Subscribe at https://opencode.ai/auth and get your API key
 *   2. Set the env var: export OPENCODE_API_KEY="your-key-here"
 *   3. Use /model in pi to select a model
 *
 * Four providers, because each source has two different API types:
 *   - opencode-zen           : OpenAI Chat Completions (https://opencode.ai/zen/v1)
 *   - opencode-zen-anthropic : Anthropic Messages       (https://opencode.ai/zen)
 *   - opencode-go            : OpenAI Chat Completions (https://opencode.ai/zen/go/v1)
 *   - opencode-go-anthropic  : Anthropic Messages       (https://opencode.ai/zen/go)
 *
 * Docs: https://opencode.ai/docs/zen/ | https://opencode.ai/docs/go/
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

type Modality = "text" | "image";
interface ModelDef {
	id: string;
	name: string;
	reasoning: boolean;
	input: readonly Modality[];
	contextWindow: number;
	maxTokens: number;
}

const OAI_COMPAT = {
	supportsDeveloperRole: false,
	supportsReasoningEffort: false,
	maxTokensField: "max_tokens" as const,
};

function toOpenAIModel(m: ModelDef) {
	return {
		id: m.id,
		name: m.name,
		reasoning: m.reasoning,
		input: [...m.input] as Modality[],
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: m.contextWindow,
		maxTokens: m.maxTokens,
		compat: OAI_COMPAT,
	};
}

function toAnthropicModel(m: ModelDef) {
	return {
		id: m.id,
		name: m.name,
		reasoning: m.reasoning,
		input: [...m.input] as Modality[],
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
		contextWindow: m.contextWindow,
		maxTokens: m.maxTokens,
	};
}

// ───────── OpenCode Zen ─────────

// OpenAI Chat Completions compatible models (GPT / Gemini / Qwen / GLM / Kimi / etc.)
const ZEN_OPENAI_MODELS: ModelDef[] = [
	// GPT
	{ id: "gpt-5.4", name: "GPT 5.4", reasoning: true, input: ["text"], contextWindow: 200000, maxTokens: 32000 },
	{ id: "gpt-5.4-pro", name: "GPT 5.4 Pro", reasoning: true, input: ["text"], contextWindow: 200000, maxTokens: 32000 },
	{ id: "gpt-5.4-mini", name: "GPT 5.4 Mini", reasoning: true, input: ["text"], contextWindow: 200000, maxTokens: 32000 },
	{ id: "gpt-5.4-nano", name: "GPT 5.4 Nano", reasoning: false, input: ["text"], contextWindow: 128000, maxTokens: 16384 },
	{ id: "gpt-5.3-codex", name: "GPT 5.3 Codex", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 32000 },
	{ id: "gpt-5.3-codex-spark", name: "GPT 5.3 Codex Spark", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 32000 },
	{ id: "gpt-5.2", name: "GPT 5.2", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 32000 },
	{ id: "gpt-5.2-codex", name: "GPT 5.2 Codex", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 32000 },
	{ id: "gpt-5.1", name: "GPT 5.1", reasoning: true, input: ["text", "image"], contextWindow: 128000, maxTokens: 16384 },
	{ id: "gpt-5.1-codex-max", name: "GPT 5.1 Codex Max", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 64000 },
	{ id: "gpt-5.1-codex", name: "GPT 5.1 Codex", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 32000 },
	{ id: "gpt-5.1-codex-mini", name: "GPT 5.1 Codex Mini", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 16384 },
	{ id: "gpt-5", name: "GPT 5", reasoning: true, input: ["text", "image"], contextWindow: 128000, maxTokens: 16384 },
	{ id: "gpt-5-codex", name: "GPT 5 Codex", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 32000 },
	{ id: "gpt-5-nano", name: "GPT 5 Nano", reasoning: false, input: ["text"], contextWindow: 128000, maxTokens: 16384 },

	// Gemini
	{ id: "gemini-3.1-pro", name: "Gemini 3.1 Pro", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 32768 },
	{ id: "gemini-3-pro", name: "Gemini 3 Pro", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 32768 },
	{ id: "gemini-3-flash", name: "Gemini 3 Flash", reasoning: true, input: ["text", "image"], contextWindow: 128000, maxTokens: 16384 },

	// Open models via chat completions
	{ id: "qwen3.6-plus", name: "Qwen 3.6 Plus", reasoning: false, input: ["text"], contextWindow: 1000000, maxTokens: 65536 },
	{ id: "qwen3.5-plus", name: "Qwen 3.5 Plus", reasoning: false, input: ["text"], contextWindow: 1000000, maxTokens: 65536 },
	{ id: "minimax-m2.5-free", name: "MiniMax M2.5 Free", reasoning: false, input: ["text"], contextWindow: 128000, maxTokens: 16384 },
	{ id: "glm-5.1", name: "GLM 5.1", reasoning: true, input: ["text"], contextWindow: 128000, maxTokens: 16384 },
	{ id: "glm-5", name: "GLM 5", reasoning: true, input: ["text"], contextWindow: 128000, maxTokens: 16384 },
	{ id: "glm-4.7", name: "GLM 4.7", reasoning: true, input: ["text"], contextWindow: 128000, maxTokens: 16384 },
	{ id: "glm-4.6", name: "GLM 4.6", reasoning: true, input: ["text"], contextWindow: 128000, maxTokens: 16384 },
	{ id: "kimi-k2.5", name: "Kimi K2.5", reasoning: true, input: ["text", "image"], contextWindow: 262144, maxTokens: 65536 },
	{ id: "kimi-k2", name: "Kimi K2", reasoning: true, input: ["text", "image"], contextWindow: 262144, maxTokens: 65536 },
	{ id: "kimi-k2-thinking", name: "Kimi K2 Thinking", reasoning: true, input: ["text", "image"], contextWindow: 262144, maxTokens: 65536 },
	{ id: "big-pickle", name: "Big Pickle", reasoning: false, input: ["text"], contextWindow: 128000, maxTokens: 16384 },
	{ id: "nemotron-3-super-free", name: "Nemotron 3 Super Free", reasoning: false, input: ["text"], contextWindow: 128000, maxTokens: 16384 },
];

// Anthropic Messages API models (Claude family + MiniMax)
const ZEN_ANTHROPIC_MODELS: ModelDef[] = [
	{ id: "claude-opus-4-7", name: "Claude Opus 4.7", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 32000 },
	{ id: "claude-opus-4-6", name: "Claude Opus 4.6", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 32000 },
	{ id: "claude-opus-4-5", name: "Claude Opus 4.5", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 32000 },
	{ id: "claude-opus-4-1", name: "Claude Opus 4.1", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 32000 },
	{ id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 32000 },
	{ id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 16384 },
	{ id: "claude-sonnet-4", name: "Claude Sonnet 4", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 16384 },
	{ id: "claude-haiku-4-5", name: "Claude Haiku 4.5", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 8192 },
	{ id: "claude-3-5-haiku", name: "Claude Haiku 3.5", reasoning: true, input: ["text", "image"], contextWindow: 200000, maxTokens: 8192 },
	{ id: "minimax-m2.5", name: "MiniMax M2.5", reasoning: false, input: ["text"], contextWindow: 1000000, maxTokens: 65536 },
];

// ───────── OpenCode Go ─────────

const GO_OPENAI_MODELS: ModelDef[] = [
	{ id: "glm-5.1", name: "GLM 5.1", reasoning: true, input: ["text"], contextWindow: 128000, maxTokens: 16384 },
	{ id: "glm-5", name: "GLM 5", reasoning: true, input: ["text"], contextWindow: 128000, maxTokens: 16384 },
	{ id: "kimi-k2.5", name: "Kimi K2.5", reasoning: true, input: ["text", "image"], contextWindow: 262144, maxTokens: 65536 },
	{ id: "mimo-v2-pro", name: "MiMo V2 Pro", reasoning: true, input: ["text"], contextWindow: 128000, maxTokens: 32768 },
	{ id: "mimo-v2-omni", name: "MiMo V2 Omni", reasoning: true, input: ["text", "image"], contextWindow: 128000, maxTokens: 32768 },
	{ id: "qwen3.6-plus", name: "Qwen 3.6 Plus", reasoning: false, input: ["text"], contextWindow: 1000000, maxTokens: 65536 },
	{ id: "qwen3.5-plus", name: "Qwen 3.5 Plus", reasoning: false, input: ["text"], contextWindow: 1000000, maxTokens: 65536 },
];

const GO_ANTHROPIC_MODELS: ModelDef[] = [
	{ id: "minimax-m2.7", name: "MiniMax M2.7", reasoning: true, input: ["text"], contextWindow: 1000000, maxTokens: 65536 },
	{ id: "minimax-m2.5", name: "MiniMax M2.5", reasoning: false, input: ["text"], contextWindow: 1000000, maxTokens: 65536 },
];

export default function (pi: ExtensionAPI) {
	// Zen — OpenAI Chat Completions
	pi.registerProvider("opencode-zen", {
		baseUrl: "https://opencode.ai/zen/v1",
		apiKey: "OPENCODE_API_KEY",
		api: "openai-completions",
		models: ZEN_OPENAI_MODELS.map(toOpenAIModel),
	});

	// Zen — Anthropic Messages (Claude family + MiniMax)
	pi.registerProvider("opencode-zen-anthropic", {
		baseUrl: "https://opencode.ai/zen",
		apiKey: "OPENCODE_API_KEY",
		api: "anthropic-messages",
		models: ZEN_ANTHROPIC_MODELS.map(toAnthropicModel),
	});

	// Go — OpenAI Chat Completions
	pi.registerProvider("opencode-go", {
		baseUrl: "https://opencode.ai/zen/go/v1",
		apiKey: "OPENCODE_API_KEY",
		api: "openai-completions",
		models: GO_OPENAI_MODELS.map(toOpenAIModel),
	});

	// Go — Anthropic Messages (MiniMax)
	pi.registerProvider("opencode-go-anthropic", {
		baseUrl: "https://opencode.ai/zen/go",
		apiKey: "OPENCODE_API_KEY",
		api: "anthropic-messages",
		models: GO_ANTHROPIC_MODELS.map(toAnthropicModel),
	});
}
