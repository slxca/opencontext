# Contributing to OpenContext

Thanks for your interest in contributing to OpenContext.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b my-feature
   ```

## Development

```bash
pnpm build        # compile all packages
pnpm typecheck    # type-check without emitting
pnpm test         # run tests
pnpm lint         # lint web app
```

## Pull Requests

- Keep PRs focused on a single change
- Write clear commit messages
- Make sure `pnpm build`, `pnpm typecheck`, and `pnpm test` pass
- Update documentation if your change affects user-facing behavior
- Add tests for new functionality

## Code Style

- Strict TypeScript, no `any`
- Follow existing patterns in the codebase
- Keep changes minimal and focused

## Reporting Issues

- Use GitHub Issues for bugs and feature requests
- Include steps to reproduce for bugs
- Mention your environment (OS, Node version, MCP client)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
