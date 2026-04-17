/**
 * OpenCode Go Provider Extension
 *
 * Gives pi access to OpenCode Go models ($10/month subscription for open coding models).
 *
 * Setup:
 *   1. Subscribe to Go at https://opencode.ai/auth and copy your API key
 *   2. Set the env var: export OPENCODE_GO_API_KEY="your-key-here"
 *   3. Use /model in pi to select an opencode-go model
 *
 * Models are split across two providers because Go uses two different API types:
 *   - opencode-go: OpenAI-compatible completions (GLM, Kimi, MiMo, Qwen)
 *   - opencode-go-anthropic: Anthropic Messages API (MiniMax M2.7, M2.5)
 *
 * Docs: https://opencode.ai/docs/go/
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  // ─── OpenAI-compatible completions models ───────────────────────────
  // Endpoint: https://opencode.ai/zen/go/v1/chat/completions
  pi.registerProvider("opencode-go", {
    baseUrl: "https://opencode.ai/zen/go/v1",
    apiKey: "OPENCODE_GO_API_KEY",
    api: "openai-completions",
    models: [
      {
        id: "glm-5.1",
        name: "GLM 5.1",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 128000,
        maxTokens: 16384,
        compat: {
          supportsDeveloperRole: false,
          supportsReasoningEffort: false,
          maxTokensField: "max_tokens",
        },
      },
      {
        id: "glm-5",
        name: "GLM 5",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 128000,
        maxTokens: 16384,
        compat: {
          supportsDeveloperRole: false,
          supportsReasoningEffort: false,
          maxTokensField: "max_tokens",
        },
      },
      {
        id: "kimi-k2.5",
        name: "Kimi K2.5",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 262144,
        maxTokens: 65536,
        compat: {
          supportsDeveloperRole: false,
          supportsReasoningEffort: false,
          maxTokensField: "max_tokens",
        },
      },
      {
        id: "mimo-v2-pro",
        name: "MiMo V2 Pro",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 128000,
        maxTokens: 32768,
        compat: {
          supportsDeveloperRole: false,
          supportsReasoningEffort: false,
          maxTokensField: "max_tokens",
        },
      },
      {
        id: "mimo-v2-omni",
        name: "MiMo V2 Omni",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 128000,
        maxTokens: 32768,
        compat: {
          supportsDeveloperRole: false,
          supportsReasoningEffort: false,
          maxTokensField: "max_tokens",
        },
      },
      {
        id: "qwen3.6-plus",
        name: "Qwen 3.6 Plus",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 1000000,
        maxTokens: 65536,
        compat: {
          supportsDeveloperRole: false,
          supportsReasoningEffort: false,
          maxTokensField: "max_tokens",
        },
      },
      {
        id: "qwen3.5-plus",
        name: "Qwen 3.5 Plus",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 1000000,
        maxTokens: 65536,
        compat: {
          supportsDeveloperRole: false,
          supportsReasoningEffort: false,
          maxTokensField: "max_tokens",
        },
      },
    ],
  });

  // ─── Anthropic Messages API models ──────────────────────────────────
  // Endpoint: https://opencode.ai/zen/go/v1/messages
  pi.registerProvider("opencode-go-anthropic", {
    baseUrl: "https://opencode.ai/zen/go",
    apiKey: "OPENCODE_GO_API_KEY",
    api: "anthropic-messages",
    models: [
      {
        id: "minimax-m2.7",
        name: "MiniMax M2.7",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 1000000,
        maxTokens: 65536,
      },
      {
        id: "minimax-m2.5",
        name: "MiniMax M2.5",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 1000000,
        maxTokens: 65536,
      },
    ],
  });
}