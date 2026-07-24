# Developer Analytics

A modern web application for exploring GitHub developers and analyzing their public repositories using the GitHub GraphQL API.

![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxtdotjs)
![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss)

## ✨ Features

- Search GitHub users by username
- View detailed user profile information
- Browse repositories sorted by popularity
- Display repository statistics:
  - ⭐ Stars
  - 🍴 Forks
  - 💾 Repository size
  - 🗓 Creation and last update dates
- Display programming languages used in repositories
- Save favorite GitHub users
- Responsive UI
- Error handling for invalid usernames and API failures
- Loading states and user-friendly feedback

---

## 🖼 Screenshots

### Home

> Add screenshot here

```
public/screenshots/home.png
```

### User profile

> Add screenshot here

```
public/screenshots/profile.png
```

### Favorites

> Add screenshot here

```
public/screenshots/favorites.png
```

---

## 🛠 Tech Stack

### Frontend

- Nuxt 4
- Vue 3
- TypeScript
- Tailwind CSS

### State Management

- Pinia

### API

- GitHub GraphQL API
- Apollo Client

### Development

- ESLint
- Prettier

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/tuskkk/developer-analytics.git

cd developer-analytics
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file.

```env
GITHUB_TOKEN=your_github_personal_access_token
```

### Start development server

```bash
npm run dev
```

Application will be available at

```
http://localhost:3000
```

---

## 📦 Production build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

## 📁 Project Structure

```
.
├── app/
├── components/
├── composables/
├── graphql/
├── images/
├── layouts/
├── pages/
├── plugins/
├── public/
├── server/
├── stores/
├── types/
├── utils/
└── nuxt.config.ts
```

---

## 🔑 GitHub API

This application uses the GitHub GraphQL API.

You'll need a Personal Access Token with permission to read public repository data.

---

## 📈 Roadmap

- [x] Search GitHub users
- [x] User profile page
- [x] Repository statistics
- [x] Favorites
- [x] Error handling
- [x] Responsive layout
- [ ] Repository charts
- [ ] User activity visualization
- [ ] Dark mode
- [ ] Advanced repository filters

---

## 🤝 Contributing

Contributions are welcome!

Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

Aleksandra Tusińska

GitHub:
https://github.com/tuskkk