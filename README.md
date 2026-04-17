# pi-opencode

OpenCode provider extension for [pi](https://github.com/mariozechner/pi-coding-agent) coding agent.

Access OpenCode Zen (cash balance) and OpenCode Go (subscription credits) models.

## Features

- **opencode-zen** / **opencode-zen-anthropic**: Pay-as-you-go (https://opencode.ai/zen)
- **opencode-go** / **opencode-go-anthropic**: Subscription credits (https://opencode.ai/zen/go)
- **40+ models**: GPT, Claude, Gemini, GLM, Kimi, Qwen, MiniMax, and more

## Prerequisites

- [pi](https://github.com/mariozechner/pi-coding-agent) installed
- OpenCode account at https://opencode.ai/auth

## Installation

### Option 1: Git URL (Recommended)

Add to your pi `settings.json` (`~/.pi/agent/settings.json`):

```json
{
  "packages": [
    "git:https://github.com/awtotty/pi-opencode.git"
  ]
}
```

### Option 2: Clone locally

```bash
git clone https://github.com/awtotty/pi-opencode.git ~/.pi/agent/extensions/pi-opencode
```

## Configuration

### 1. Get your API key

1. Sign up at https://opencode.ai/auth
2. Add billing for Zen or subscribe to Go
3. Copy your API key

### 2. Set the environment variable

```bash
export OPENCODE_API_KEY="your-api-key-here"
```

Add to shell profile (~/.bashrc, ~/.zshrc, etc.) to persist.

### 3. Reload pi

```
/reload
```

## Usage

### Select a provider and model

```
/model opencode-zen/gpt-5.1
/model opencode-go-anthropic/minimax-m2.7
```

Or use `/model` to browse all available options.

### Available Providers

| Provider | API | Endpoint |
|----------|-----|----------|
| opencode-zen | OpenAI Chat Completions | https://opencode.ai/zen/v1/chat/completions |
| opencode-zen-anthropic | Anthropic Messages | https://opencode.ai/zen/v1/messages |
| opencode-go | OpenAI Chat Completions | https://opencode.ai/zen/go/v1/chat/completions |
| opencode-go-anthropic | Anthropic Messages | https://opencode.ai/zen/go/v1/messages |

> MiniMax M2.7 and M2.5 use the Anthropic Messages API. All other models use OpenAI Chat Completions.

## Troubleshooting

### "No API key" error

```bash
echo $OPENCODE_API_KEY
```

If empty, set it and reload pi:

```bash
export OPENCODE_API_KEY="your-key"
/reload
```

### Extension not loading

Run `/reload` after changes.

### Model not found

Verify the model name is correct. Model IDs are case-sensitive.

## Development

```bash
# Clone the repository
git clone https://github.com/awtotty/pi-opencode.git
cd pi-opencode

# Test locally
pi -e ./src/index.ts
```

## License

MIT

## Links

- [pi coding agent](https://github.com/mariozechner/pi-coding-agent)
- [OpenCode Zen](https://opencode.ai/docs/zen/)
- [OpenCode Go](https://opencode.ai/docs/go/)
- [OpenCode](https://opencode.ai/auth)
