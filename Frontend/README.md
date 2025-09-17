# Disaster Orchestrator Frontend

A modern Next.js frontend for the Disaster Orchestrator backend system. This application provides an intuitive interface to manage and execute disaster response agents.

## Features

- **Agent Management**: Browse and view all available disaster response agents
- **Agent Execution**: Run agents with custom inputs and view real-time results
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Error Handling**: Comprehensive error states and loading indicators
- **Type Safety**: Full TypeScript implementation

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Disaster Orchestrator backend running on `http://localhost:5000`

### Installation

1. **Clone and navigate to the project directory**
   ```bash
   cd disaster-orchestrator-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` if your backend runs on a different URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build

To create a production build:

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js 13+ App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home page
│   ├── agents/            # Agents listing page
│   └── run/               # Agent execution page
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── Navbar.tsx        # Navigation component
│   ├── AgentCard.tsx     # Individual agent display
│   ├── AgentList.tsx     # Agents grid with loading states
│   └── RunForm.tsx       # Agent execution form
├── lib/                  # Utilities and configurations
│   ├── api.ts           # API client functions
│   └── utils.ts         # General utilities
└── types/               # TypeScript type definitions
    └── agent.ts         # Agent-related types
```

## API Integration

The frontend expects your backend to provide these endpoints:

### GET /agents
Returns a list of available agents:
```json
[
  {
    "id": "agent-1",
    "name": "Emergency Response Coordinator",
    "description": "Coordinates emergency response activities..."
  }
]
```

### POST /agents/run
Executes an agent with the provided input:

**Request:**
```json
{
  "agent_id": "agent-1",
  "input": "Handle earthquake response in downtown area"
}
```

**Response:**
```json
{
  "result": "Emergency response plan activated. Dispatching teams..."
}
```

## Configuration

### Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API base URL (default: `http://localhost:5000`)

### Customization

- **Styling**: Modify `tailwind.config.ts` and component styles
- **API Client**: Update `lib/api.ts` for different backend configurations
- **Components**: Customize UI components in the `components/` directory

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Pages**: Add files to the `app/` directory
2. **New Components**: Create components in `components/`
3. **API Changes**: Update `lib/api.ts` and `types/agent.ts`
4. **Styling**: Use Tailwind classes or extend the configuration

## Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Ensure your Python backend is running on the correct port
   - Check the `NEXT_PUBLIC_API_URL` environment variable
   - Verify CORS is properly configured in your backend

2. **Build Errors**
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Clear Next.js cache: `rm -rf .next`

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check that `globals.css` imports are correct

### Backend Requirements

Your Python backend should:
- Run on `http://localhost:5000` (or update the environment variable)
- Enable CORS for frontend requests
- Return JSON responses in the expected format
- Handle errors gracefully with appropriate HTTP status codes

## Support

For issues related to:
- **Frontend**: Check browser console and network requests
- **Backend Integration**: Verify API endpoints and response formats
- **Styling**: Review Tailwind CSS documentation and component implementations