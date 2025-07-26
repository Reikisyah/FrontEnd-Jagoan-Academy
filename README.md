# Jagoan Academy Frontend

Frontend aplikasi pembelajaran online Jagoan Academy yang dibangun dengan React.js dan Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd jagoan-academy-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   Copy `.env` file dan sesuaikan dengan konfigurasi API backend Anda:
   ```bash
   cp .env .env.local
   ```
   
   Edit `.env.local` sesuai kebutuhan:
   ```
   REACT_APP_API_BASE_URL=http://localhost:8000/api
   ```

4. **Start development server**
   ```bash
   npm start
   ```
   
   Aplikasi akan berjalan di http://localhost:3000

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── DashboardHeader.jsx
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   └── ...
├── pages/               # Page components
│   ├── Auth/           # Login & Register
│   ├── Dashboard/      # Dashboard pages
│   └── Homepage/       # Landing pages
├── utils/
│   └── api/            # API functions
└── App.jsx             # Main app component
```

## 🛠️ Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run dev` - Alternative start command

## 🎨 Tech Stack

- **React 18** - Frontend framework
- **React Router 6** - Routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **SweetAlert2** - Notifications
- **Recharts** - Charts and graphs

## 🔧 Configuration

### API Configuration
Edit file `src/utils/api/baseApi.js` untuk mengonfigurasi API endpoint:

```javascript
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://default-api-url.com/api'
```

### Tailwind CSS
Konfigurasi Tailwind ada di `tailwind.config.js`. Customize sesuai kebutuhan design system.

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_BASE_URL` | Backend API URL | `http://localhost:8000/api` |
| `REACT_APP_ENV` | Environment | `development` |

## 📱 Features

- ✅ Authentication (Login/Register)
- ✅ Multi-role dashboard (Student, Mentor, Admin)
- ✅ Course management
- ✅ User profile management
- ✅ Responsive design
- ✅ Modern UI/UX

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is private and proprietary.