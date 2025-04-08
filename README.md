# 🚨 First Response Multiplayer – Notifications System

This is the full source code for the **Notifications System** originally developed for **First Response Multiplayer (FRMP)** — a FiveM-based roleplay project previously managed under **GTAPoliceMods**.

Following my recent departure from the team, I'm releasing this project to the community in hopes it serves as a helpful starting point or reference for others building notification systems in modern multiplayer frameworks.

---

## ✨ Features

- 🔔 Dynamic in-game notification system
- ⚡ Real-time feedback and event-based triggers
- 🎨 Styled using TailwindCSS for modern UI
- 🚀 Built with Vite for ultra-fast development
- 🧠 Hybrid logic across **TypeScript** (frontend) and **LUA** (FiveM backend)

---

## 🧰 Tech Stack

| Layer       | Technology          |
|------------|---------------------|
| Frontend    | TypeScript + Vite + TailwindCSS |
| Game Logic  | LUA (FiveM native)  |
| UI Runtime  | Browser-based NUI (CEF) |
| Deployment  | Self-hosted / FiveM Resource |

---
## 🚀 Getting Started

### Clone the Project

```bash
git clone https://github.com/YOUR_USERNAME/frmp-notifications.git
cd frmp-notifications
```

### 📦 Install Dependencies (Frontend)

```bash
npm install
```

### ⚙️ Start Dev Server (for NUI/CEF)

```bash
npm run dev
```

> You'll need to copy the build output into your FiveM `resources` folder once it's ready.

---

## 🏗️ Build for Production

```bash
npm run build
```

> Output will be generated in the `dist/` folder. You can configure this to be served as your NUI for a FiveM resource.

---

## 🧂 How to Use in Other Resources

### 🧪 Exports (Lua)

```lua
-- Basic Notification
exports['frmp-notifications']:SendNotification('success', 'Welcome', 'You have joined the server!')

-- Emergency Alert
exports['frmp-notifications']:SendEmergencyAlert('police', '10-80', 'Vespucci Blvd', 'Suspect fleeing in a red sports car.')
```

### 📣 Event Triggers (C# or server-side Lua)

```lua
TriggerEvent("notifications:sendNotification", "info", "Hello Officer", "This is a message from the server.")
TriggerEvent("notifications:sendEmergencyAlert", "ems", "CODE BLUE", "Pillbox Hill", "Unconscious individual on scene.")
```

---

### 🔁 Notification Types

- `success`
- `error`
- `info`
- `warning`

### 🚓 Emergency Types

- `police`
- `fire`
- `ems`

---

## 🧪 Test Commands (In-Game)

```bash
/testnotif   -- Shows a random notification
/testalert   -- Shows a random emergency alert
```

---

## ❤️ Contributing

Fork the repo, submit pull requests, and improve the system for the community. PRs welcome!

---

## 📄 License

MIT – do whatever you want, just don’t sell this as your own without credit.

---

## 🙏 Acknowledgements

Originally created for **GTAPoliceMods' FRMP project**, now open to the community for educational and development use.
```