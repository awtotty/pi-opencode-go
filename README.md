# pi-opencode

Extension for the [pi](https://github.com/mariozechner/pi-coding-agent) coding agent, to add OpenCode as a provider. 🙂

## Features

- [**Dozens of open and closed models**](https://models.dev/?sort=provider&order=asc&search=OpenCode)  
  (Please raise an issue, if you find a model in this list, thats not available with this extension)

- **opencode-go**: [Subscription service](https://opencode.ai/go) 
- **opencode-zen**: [Pay-as-you-go](https://opencode.ai/zen)

## Prerequisites

- Install [pi](https://github.com/earendil-works/pi) and npm.
- Create an OpenCode account: https://opencode.ai/auth 
- Pay for the service (Go is strongly recommended), and [copy the API key.](https://opencode.ai/workspace/wrk_01KR5R14VMRPHGAACY61PYWNM6/keys) 

## Installation

Add this to your pi `settings.json` (`~/.pi/agent/settings.json`):

```json
{
  "packages": [
    "git:https://github.com/ShalokShalom/pi-opencode.git"
  ]
}
```

### Recommended Configuration

This is currently the recommended setup, so long as M3 is free on the Zen tier, and generally the strongest model on the subscription model.  
(The free version is limited to a 256k context window, while the paid Go subscription is able to utilize the full 1 million token.)

```json
{
  "packages": [
    "git:https://github.com/ShalokShalom/pi-opencode.git"
  ],
  "model": "opencode-go-anthropic/minimax-m3",
  "small_model": "opencode-zen-anthropic/minimax-m3-free"
}
```

## Set the API key

Add this line to your shell configuration: 

```bash
# Bash, Zsh, etc
export OPENCODE_API_KEY="your-api-key-here"
```

```fish
# Fish
set -Ux OPENCODE_API_KEY "your-api-key-here"
```

(`~/.bashrc`, `~/.zshrc`, `~/.config/fish/config.fish`)

### Open pi

**First**, open a new shell to load the config (`exec bash`, `exec zsh`, `exec fish`).  
**Then** open `pi`.

## Usage

### Select a provider and model

Type `/model` to select a model. 

You can also select one directly via the full path:

```bash
/model opencode-go-anthropic/minimax-m3
/model opencode-zen/gpt-5.5
```

### Available Provider

| Provider | API | Endpoint |
|----------|-----|----------|
| opencode-go | OpenAI Chat Completions | https://opencode.ai/zen/go/v1/chat/completions |
| opencode-zen | OpenAI Chat Completions | https://opencode.ai/zen/v1/chat/completions |
| opencode-go-anthropic | Anthropic Messages | https://opencode.ai/zen/go/v1/messages |
| opencode-zen-anthropic | Anthropic Messages | https://opencode.ai/zen/v1/messages |

The Anthropic Messages API provides you with Claude and MiniMax models.  
All the other models come from the OpenAI API.

## Development

```bash
# Clone the repository
git clone https://github.com/ShalokShalom/pi-opencode.git
cd pi-opencode

# Test locally
pi -e ./src/index.ts
```

## Troubleshooting

### "No API key" error

Try:

```bash
echo $OPENCODE_API_KEY
```

This shows you your API key, if you had set it.  
If you see no such key, you have to first set it as shown [here.](#set-the-API-key).

### Extension is not loading successfully

Run `/reload` after changes.

### Model is not found

Verify that the model name is correct; [they are case-sensitive.](https://models.dev/?sort=provider&order=asc&search=OpenCode)
Otherwise, [rise an issue.](https://github.com/shalokshalom/pi-opencode/issues/new)

## License

MIT

## Links

- [pi coding agent](https://github.com/mariozechner/pi-coding-agent)
- [OpenCode Go](https://opencode.ai/docs/go/)
- [OpenCode Zen](https://opencode.ai/docs/zen/)
- [OpenCode](https://opencode.ai/auth)
