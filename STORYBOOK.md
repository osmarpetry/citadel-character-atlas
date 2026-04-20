# 📚 Storybook & Visual Testing Setup

This project uses [Storybook](https://storybook.js.org/) for component development and [Chromatic](https://www.chromatic.com/) for visual testing, following the official [Storybook Visual Testing documentation](https://storybook.js.org/docs/writing-tests/visual-testing).

## 🚀 Quick Start

### Running Storybook Locally

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006` where you can:

- Browse all component stories
- Test components in isolation
- Use the Visual Tests addon panel
- Switch between light/dark themes
- Test different locales (EN/DE/FR)

### Building Storybook

```bash
npm run build-storybook
```

## 🎨 Citadel Theme Integration

Our Storybook is fully integrated with the Citadel Character Atlas design system:

- **Custom Theme**: Citadel color palette derived from portal-forward atlas colors
- **Theme Toggle**: Light/Dark mode switching in toolbar
- **Internationalization**: Stories support EN/DE/FR locales
- **Responsive Testing**: All stories are responsive-ready

## 📖 Available Stories

### Components

- **LanguageSwitcher**: Language selection for English, German, French
- **Navigation**: Complete navigation with gradients and theming
- **CharacterList**: Apollo Client integration with mocked data

### Design System

- **Color Palette**: Complete Citadel color documentation
- **Component Showcase**: All themed components in action
- **Full Design System**: Comprehensive design system overview

## 🔍 Visual Testing with Chromatic

### Setup Visual Testing

1. **Install the Visual Tests addon** (already included):

   ```bash
   npx storybook@latest add @chromatic-com/storybook
   ```

2. **Sign in to Chromatic** in the Visual Tests addon panel in Storybook

3. **Create or select a project** in your Chromatic account

4. **Run your first visual test** by clicking "Catch a UI change"

### Running Visual Tests

#### In Storybook UI

- Use the **Visual Tests addon panel** in Storybook
- Click the "Run tests" button to capture snapshots
- Review changes directly in the addon

#### Command Line

```bash
npm run chromatic
```

#### Automated CI/CD

Visual tests run automatically on:

- Push to `main` or `develop` branches
- Pull requests to `main`

### Environment Variables

Set up your Chromatic project token:

```bash
# .env.local
CHROMATIC_PROJECT_TOKEN=your_project_token_here
```

Or set it as a GitHub secret: `CHROMATIC_PROJECT_TOKEN`

## 🧪 Testing Features

### Mocked GraphQL Data

- **Apollo Client**: Fully mocked with `MockedProvider`
- **Loading States**: Simulated loading spinners
- **Error States**: Error handling visualization
- **Character Data**: Citadel character mocks

### Accessibility Testing

- **Built-in a11y addon**: Automatic accessibility checks
- **Color contrast**: Citadel theme accessibility validation
- **Keyboard navigation**: Focus management testing

### Responsive Testing

- **Multiple viewports**: Mobile, tablet, desktop
- **Theme variations**: Light/dark mode testing
- **Locale testing**: Multi-language support

## 📁 File Structure

```
.storybook/
├── main.ts              # Storybook configuration
├── preview.ts           # Global decorators and parameters
└── vitest.setup.ts      # Vitest integration

components/
├── **/*.stories.tsx     # Component stories
└── ...

stories/
├── DesignSystem.stories.tsx  # Design system documentation
└── ...

.github/workflows/
└── chromatic.yml        # CI/CD for visual testing

chromatic.config.json    # Chromatic configuration
```

## 🎯 Best Practices

### Writing Stories

1. **Use descriptive names**: Clear story titles and descriptions
2. **Include all states**: Default, loading, error, empty states
3. **Test interactions**: Use play functions for user interactions
4. **Document props**: Use controls and docs for prop documentation

### Visual Testing

1. **Baseline snapshots**: First run creates baselines
2. **Review changes**: Always review visual diffs before accepting
3. **Accept intentional changes**: Use the addon to accept intended updates
4. **CI integration**: Let CI handle automated testing

### Accessibility

1. **Color contrast**: Ensure Citadel colors meet WCAG standards
2. **Focus management**: Test keyboard navigation
3. **Screen readers**: Verify ARIA labels and descriptions

## 🔧 Configuration

### Chromatic Configuration (`chromatic.config.json`)

```json
{
  "projectToken": "CHROMATIC_PROJECT_TOKEN",
  "buildScriptName": "build-storybook",
  "exitZeroOnChanges": true,
  "exitOnceUploaded": true,
  "zip": true,
  "autoAcceptChanges": "main"
}
```

### Key Features Enabled

- **Zip uploads**: Faster uploads for large projects
- **Auto-accept on main**: Automatic baseline updates
- **Exit zero on changes**: CI-friendly exit codes
- **Debug mode**: Detailed logging when needed

## 🚀 Deployment

### Manual Deployment

```bash
npm run chromatic
```

### Automated Deployment

- **GitHub Actions**: Automatic on push/PR
- **Baseline Management**: Auto-accept changes on main branch
- **PR Checks**: Visual regression detection

## 📚 Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Chromatic Visual Testing Guide](https://storybook.js.org/docs/writing-tests/visual-testing)
- [Rick and Morty API](https://rickandmortyapi.com/)
- [Hero UI Documentation](https://heroui.com/)

---

**Citadel systems online.** 🚀 Your atlas components are now ready for interdimensional visual testing!
