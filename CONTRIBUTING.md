# Contributing to CountryDeepLens

Thank you for your interest in contributing to CountryDeepLens! We welcome contributions from the community. This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Guidelines](#development-guidelines)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)
- [Community](#community)

## 🤝 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 14.0.0)
- npm or yarn
- Git

### Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/countrydeeplens.git
   cd countrydeeplens
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/original/countrydeeplens.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   cd client && npm install && cd ..
   ```
5. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💡 How to Contribute

### Types of Contributions

- 🐛 **Bug fixes** - Fix existing issues
- ✨ **Features** - Add new functionality
- 📚 **Documentation** - Improve docs or add examples
- 🎨 **UI/UX** - Improve user interface and experience
- 🧪 **Tests** - Add or improve test coverage
- 🔧 **Tools** - Development tools and scripts

### Finding Issues to Work On

- Check the [Issues](https://github.com/yourusername/countrydeeplens/issues) page
- Look for issues labeled `good first issue` or `help wanted`
- Comment on issues you'd like to work on to avoid duplicate work

## 🛠️ Development Guidelines

### Code Style

- Follow the existing code style in the project
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use TypeScript types appropriately

### Commit Messages

Use clear, descriptive commit messages following this format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(api): add population filtering endpoint
fix(ui): resolve flag display issue on mobile
docs(readme): update installation instructions
```

### API Development

- Follow RESTful conventions
- Include proper error handling
- Add input validation
- Update Swagger documentation
- Test endpoints thoroughly

### Frontend Development

- Use responsive design principles
- Ensure accessibility (WCAG guidelines)
- Optimize for performance
- Test on multiple browsers and devices
- Follow component composition patterns

### Testing

- Write unit tests for new features
- Test edge cases and error conditions
- Ensure existing tests still pass
- Test both API and frontend functionality

## 📝 Submitting Changes

### Pull Request Process

1. **Update your branch** with the latest changes:
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Run tests** to ensure everything works:
   ```bash
   npm test
   cd client && npm test && cd ..
   ```

3. **Commit your changes** with clear messages

4. **Push to your fork**:
   ```bash
   git push origin your-feature-branch
   ```

5. **Create a Pull Request**:
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Fill out the PR template
   - Describe what changes you made and why

### PR Template

Please use this template when creating pull requests:

```markdown
## Description
Brief description of the changes made

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing performed
- [ ] All existing tests pass

## Screenshots (if applicable)
Add screenshots of UI changes

## Additional Notes
Any additional information or context
```

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs actual behavior
- **Environment details** (OS, browser, Node.js version)
- **Screenshots** if applicable
- **Console errors** or logs

### Feature Requests

For feature requests, please include:

- **Clear description** of the proposed feature
- **Use case** - why would this be useful?
- **Implementation ideas** if you have any
- **Mockups or examples** if applicable

## 🌍 Community

- **Discussions**: Use GitHub Discussions for questions and general discussion
- **Issues**: Report bugs and request features
- **Pull Requests**: Submit code changes
- **Discord/Slack**: Join our community chat (if available)

## 📞 Getting Help

If you need help:

1. Check the [README.md](README.md) for setup and usage instructions
2. Search existing issues and discussions
3. Ask in GitHub Discussions
4. Contact maintainers directly

## 🎉 Recognition

Contributors will be:
- Listed in the project's contributors file
- Mentioned in release notes
- Recognized for their valuable contributions

Thank you for contributing to CountryDeepLens! 🌍✨
