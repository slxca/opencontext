# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in OpenContext, please report it responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

Instead, please email: **security@slxca.com**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

You should receive a response within 48 hours. We will work with you to understand and address the issue before any public disclosure.

## Scope

This security policy applies to:
- The `opencontext-mcp` npm package
- The OpenContext MCP server

## Security Considerations

OpenContext MCP is designed with security in mind:

- **No network access**: The server communicates only over stdio
- **Local storage only**: Files are written to the local filesystem
- **No remote code execution**: Only markdown files are processed
- **No authentication needed**: The server runs locally with your MCP client

## Best Practices

When using OpenContext MCP:

- Review `.opencontext/` files before committing them to version control
- Use `.gitignore` if context should remain private
- Be cautious with prompts that instruct agents to save sensitive information
