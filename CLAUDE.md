# CLAUDE.md - AI Assistant Guide

## Repository Overview

**Repository Name:** cloudetest
**Type:** Test/Development Repository
**Current State:** Minimal setup - primarily for testing and experimentation
**Last Updated:** 2025-12-09

### Purpose
This is a test repository used for experimentation and development. It currently contains minimal content and serves as a sandbox environment.

## Repository Structure

```
cloudetest/
├── .git/                 # Git version control
├── README.md            # Basic repository description
└── CLAUDE.md           # This file - AI assistant guide
```

### Current Files

- **README.md** (1 line) - Basic repository title
- **CLAUDE.md** - Comprehensive guide for AI assistants (this file)

## Development Workflows

### Git Branch Strategy

This repository uses a Claude-specific branching pattern:

- **Branch Naming Convention:** `claude/claude-md-<session-id>`
- **Current Branch:** `claude/claude-md-miyoh28x44djx9oo-018b5rh5s6xk81UMFt2S4MFG`
- **Important:** All development work should be done on feature branches starting with `claude/` and ending with the matching session ID

### Git Operations Best Practices

#### Pushing Changes
```bash
# Always use -u flag to set upstream
git push -u origin <branch-name>

# Branch names MUST start with 'claude/' and end with session ID
# Failure to follow this will result in 403 HTTP errors
```

#### Network Resilience
- Retry failed push/fetch/pull operations up to 4 times
- Use exponential backoff: 2s, 4s, 8s, 16s
- Example: `git push` fails → wait 2s → retry → fails → wait 4s → retry

#### Committing Changes
- Use clear, descriptive commit messages
- Follow conventional commit format when applicable
- Never skip hooks unless explicitly required
- Avoid `git commit --amend` unless explicitly requested or fixing pre-commit hook issues

### Development Guidelines

#### Code Quality
1. **Security First**
   - Never introduce common vulnerabilities (XSS, SQL injection, command injection, etc.)
   - Follow OWASP top 10 security guidelines
   - Validate input at system boundaries
   - Trust internal code and framework guarantees

2. **Avoid Over-Engineering**
   - Only make changes that are directly requested or clearly necessary
   - Keep solutions simple and focused
   - Don't add features beyond what was asked
   - Don't create abstractions for one-time operations
   - Three similar lines of code is better than premature abstraction

3. **Minimal Changes**
   - Bug fixes don't need surrounding code cleanup
   - Don't add comments/docstrings to unchanged code
   - Only add error handling for realistic scenarios
   - Delete unused code completely (no `_var` renaming, no `// removed` comments)

#### Tool Usage Preferences

**File Operations:**
- Use `Read` tool for reading files (not `cat`/`head`/`tail`)
- Use `Edit` tool for editing files (not `sed`/`awk`)
- Use `Write` tool for creating files (not `echo >` or `cat <<EOF`)
- Use `Glob` for finding files by pattern (not `find` or `ls`)
- Use `Grep` for searching content (not `grep` or `rg` via Bash)

**Search Operations:**
- For open-ended codebase exploration, use Task tool with `subagent_type=Explore`
- For specific file patterns, use `Glob` tool
- For content search, use `Grep` tool
- Examples of when to use Explore agent:
  - "Where are errors handled?"
  - "What is the codebase structure?"
  - "How do API endpoints work?"

**Task Management:**
- Use `TodoWrite` tool for complex multi-step tasks (3+ steps)
- Mark exactly ONE task as `in_progress` at a time
- Complete tasks immediately after finishing (don't batch completions)
- Remove tasks that are no longer relevant

#### Parallel Operations

When multiple independent operations are needed, execute them in parallel:

```markdown
# Good - Parallel execution
- Read file1.ts, file2.ts, and file3.ts simultaneously
- Run git status and git diff in parallel

# Bad - Sequential when not needed
- Read file1.ts, wait, then read file2.ts, wait, then read file3.ts
```

Only run operations sequentially when they have dependencies:
```bash
# Sequential because commit depends on add
git add . && git commit -m "message" && git push
```

## Key Conventions

### Documentation Style
- Use GitHub-flavored Markdown
- Keep responses concise for CLI display
- Output directly to user (don't use echo/comments to communicate)
- Avoid emojis unless explicitly requested
- Focus on technical accuracy over validation

### Code References
When referencing code, use the pattern: `file_path:line_number`

Example: "The initialization occurs in src/app.ts:42"

### Communication Style
- Professional and objective
- Prioritize technical accuracy over agreement
- No excessive praise or validation
- Provide concrete implementation steps without time estimates
- Never suggest timelines ("this will take 2-3 weeks")

## Project-Specific Information

### Current State
This repository is in its initial state with minimal content. As the project grows, update this section with:

- Technology stack and dependencies
- Build and test commands
- Environment setup instructions
- API documentation locations
- Deployment procedures
- Testing strategies
- Code organization patterns
- Naming conventions

### Future Sections to Add

As the codebase develops, consider adding:

```markdown
## Technology Stack
- Language: [To be determined]
- Framework: [To be determined]
- Database: [To be determined]
- Testing: [To be determined]

## Build and Run
[Add commands once project setup is complete]

## Testing
[Add testing procedures and commands]

## Architecture
[Document system architecture and design patterns]

## API Documentation
[Link to or describe API endpoints]

## Environment Variables
[Document required environment variables]

## Deployment
[Document deployment process]

## Common Tasks
[Document frequent development tasks]

## Troubleshooting
[Common issues and solutions]
```

## GitHub CLI

**Note:** The GitHub CLI (`gh`) is not available in this environment. For GitHub issues and pull requests, request necessary information directly from users.

## Updates and Maintenance

This file should be updated when:
- New technologies or dependencies are added
- Project structure changes significantly
- Development workflows are modified
- New conventions are established
- Common issues or solutions are discovered

**Maintainers:** Keep this file current to ensure AI assistants have accurate context.

---

*This CLAUDE.md file was generated to help AI assistants understand and work effectively with this repository. Update it as the project evolves.*
