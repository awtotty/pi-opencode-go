# pi-extension-opencode-go

OpenCode Go provider extension for [pi](https://github.com/mariozechner/pi-coding-agent) coding agent.

This extension gives pi access to OpenCode Go models - a $10/month subscription service that provides access to various open coding models.

## Features

- **OpenAI-compatible models**: GLM 5.1, GLM 5, Kimi K2.5, MiMo V2 Pro, MiMo V2 Omni, Qwen 3.6 Plus, Qwen 3.5 Plus
- **Anthropic-compatible models**: MiniMax M2.7, MiniMax M2.5

## Prerequisites

- [pi](https://github.com/mariozechner/pi-coding-agent) installed
- OpenCode Go subscription at https://opencode.ai/auth

## Installation

### Option 1: Git URL (Recommended)

Add to your pi `settings.json` (`~/.pi/agent/settings.json`):

```json
{
  "packages": [
    "git:https://github.com/mariozechner/pi-extension-opencode-go.git"
  ]
}
```

### Option 2: Clone locally

```bash
git clone https://github.com/mariozechner/pi-extension-opencode-go.git ~/.pi/agent/extensions/opencode-go
```

### Option 3: Global install via npm

```bash
npm install -g pi-extension-opencode-go
```

Then add to settings.json:

```json
{
  "packages": [
    "npm:pi-extension-opencode-go"
  ]
}
```

## Configuration

### 1. Get your API key

1. Subscribe to OpenCode Go at https://opencode.ai/auth
2. Copy your API key from the dashboard

### 2. Set the environment variable

```bash
export OPENCODE_GO_API_KEY="your-api-key-here"
```

Add this to your shell profile (~/.bashrc, ~/.zshrc, etc.) to persist it.

### 3. Reload pi

```
/reload
```

## Usage

### Select a model

Use the `/model` command to switch to an OpenCode Go model:

```
/model glm-5.1
```

Or cycle through models with `Ctrl+P`.

### Available Models

#### OpenAI-compatible (opencode-go provider)

| Model | Reasoning | Vision | Context Window |
|-------|-----------|--------|----------------|
| GLM 5.1 | ✅ | ❌ | 128K |
| GLM 5 | ✅ | ❌ | 128K |
| Kimi K2.5 | ✅ | ✅ | 262K |
| MiMo V2 Pro | ✅ | ❌ | 128K |
| MiMo V2 Omni | ✅ | ✅ | 128K |
| Qwen 3.6 Plus | ❌ | ❌ | 1M |
| Qwen 3.5 Plus | ❌ | ❌ | 1M |

#### Anthropic-compatible (opencode-go-anthropic provider)

| Model | Reasoning | Vision | Context Window |
|-------|-----------|--------|----------------|
| MiniMax M2.7 | ✅ | ❌ | 1M |
| MiniMax M2.5 | ❌ | ❌ | 1M |

## Troubleshooting

### "No API key" error

Make sure you've set the `OPENCODE_GO_API_KEY` environment variable:

```bash
echo $OPENCODE_GO_API_KEY
```

If empty, set it and reload pi:

```bash
export OPENCODE_GO_API_KEY="your-key"
pi
```

### Extension not loading

Check that the extension path is correct in settings.json and run `/reload`.

### Model not found

Verify the model name is correct. Model IDs are case-sensitive.

## Development

```bash
# Clone the repository
git clone https://github.com/mariozechner/pi-extension-opencode-go.git
cd pi-extension-opencode-go

# Install dependencies (if any)
npm install

# Test locally with pi
pi -e ./src/index.ts
```

## License

MIT

## Links

- [pi coding agent](https://github.com/mariozechner/pi-coding-agent)
- [OpenCode Go](https://opencode.ai/docs/go/)
- [OpenCode Go Subscription](https://opencode.ai/auth)