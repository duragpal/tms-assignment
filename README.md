

<div align="center">



\# 🚀 ProjectFlow



\### Task Management with Role-Based Access Control



A full-stack project management application built with \*\*Next.js 15\*\*, \*\*Node.js\*\*, \*\*Express\*\*, and \*\*MongoDB\*\*. Create projects, assign tasks, track progress, and manage your team — all in one beautifully designed dashboard.



\[!\[Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)

\[!\[React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)

\[!\[Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)

\[!\[MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb)](https://www.mongodb.com/)

\[!\[Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

\[!\[License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)



\[Demo](#-demo-credentials) • \[Features](#-features) • \[Installation](#%EF%B8%8F-installation) • \[API](#-api-reference) • \[Deployment](#-deployment)



</div>



\---



\## 🌟 Demo Credentials



Try the app instantly with these pre-seeded test accounts:



| Role | Email | Password |

|------|-------|----------|

| 👑 \*\*Admin\*\* | `admin@gmail.com` | `admin123` |

| 👤 \*\*User\*\* | `user@gmail.com` | `user123` |



> \*\*Live Demo:\*\* \[https://tms-assignment.vercel.app/](https://tms-assignment.vercel.app/) 



\---



\## ✨ Features



\### 🔐 Authentication \& Authorization

\- Secure \*\*JWT-based\*\* authentication

\- \*\*bcrypt\*\* password hashing

\- \*\*Role-Based Access Control (RBAC)\*\* — Admin vs Member

\- Protected routes via Next.js middleware



\### 📂 Project Management

\- Create, edit, and delete projects

\- Customize with \*\*vibrant colors\*\* 🎨

\- \*\*Team management\*\* — add/remove members

\- Track project status: Active, On Hold, Completed



\### ✅ Task Management

\- Create tasks with title, description, priority \& due dates

\- \*\*Kanban board\*\* view (Todo → In Progress → Done)

\- Assign tasks to team members

\- Filter by status, priority, or assignee

\- \*\*Overdue detection\*\* with visual alerts ⚠️



\### 📊 Dashboard

\- Real-time statistics — total, in progress, completed, overdue

\- Recent activity feed

\- Project \& task counts at a glance

\- Beautiful gradient stat cards



\### 🎨 UI/UX

\- \*\*Glass-morphism\*\* design with backdrop blur

\- \*\*Vibrant gradients\*\* (violet → fuchsia → amber)

\- Fully \*\*responsive\*\* (mobile, tablet, desktop)

\- Toast notifications via Sonner

\- Smooth animations \& transitions



\---



\## 🛠️ Tech Stack



\### Frontend

\- \*\*\[Next.js 15](https://nextjs.org/)\*\* — App Router with React 19

\- \*\*\[Tailwind CSS 4](https://tailwindcss.com/)\*\* — Utility-first styling

\- \*\*\[shadcn/ui](https://ui.shadcn.com/)\*\* — Beautiful accessible components

\- \*\*\[Lucide Icons](https://lucide.dev/)\*\* — Icon library

\- \*\*\[Axios](https://axios-http.com/)\*\* — HTTP client

\- \*\*\[Sonner](https://sonner.emilkowal.ski/)\*\* — Toast notifications

\- \*\*\[date-fns](https://date-fns.org/)\*\* — Date utilities



\### Backend

\- \*\*\[Node.js](https://nodejs.org/)\*\* + \*\*\[Express](https://expressjs.com/)\*\* — REST API

\- \*\*\[MongoDB](https://www.mongodb.com/)\*\* + \*\*\[Mongoose](https://mongoosejs.com/)\*\* — Database \& ODM

\- \*\*\[JWT](https://jwt.io/)\*\* — Token-based auth

\- \*\*\[bcryptjs](https://github.com/dcodeIO/bcrypt.js)\*\* — Password hashing

\- \*\*\[express-validator](https://express-validator.github.io/)\*\* — Input validation



\---



\## 📁 Project Structure



```

projectflow/

├── backend/

│   ├── controllers/        # Business logic

│   ├── middleware/         # Auth \& RBAC middleware

│   ├── models/             # Mongoose schemas

│   ├── routes/             # API endpoints

│   ├── seed.js             # Demo data seeder

│   ├── server.js           # Entry point

│   └── package.json

│

├── frontend/

│   ├── app/

│   │   ├── (auth)/         # Login, Signup pages

│   │   ├── (dashboard)/    # Dashboard, Projects, Tasks

│   │   ├── globals.css

│   │   └── layout.jsx

│   ├── components/

│   │   ├── ui/             # shadcn components

│   │   ├── Sidebar.jsx

│   │   └── TaskCard.jsx

│   ├── context/

│   │   └── AuthContext.jsx

│   ├── lib/

│   │   ├── api.js

│   │   └── utils.js

│   ├── middleware.js       # Route protection

│   └── package.json

│

└── README.md

```



\---



\## 🚀 Quick Start



\### Prerequisites



\- \*\*Node.js\*\* v18 or higher

\- \*\*MongoDB\*\* (local or \[Atlas](https://www.mongodb.com/cloud/atlas))

\- \*\*npm\*\* or \*\*yarn\*\*



\---



\## ⚙️ Installation



\### 1️⃣ Clone the repository



```bash

git clone https://github.com/yourusername/projectflow.git

cd projectflow

```



\### 2️⃣ Set up the Backend



```bash

cd backend

npm install

```



Create a `.env` file in the `backend/` directory:



```env

PORT=5000

MONGO\_URI=mongodb://localhost:27017/projectflow

JWT\_SECRET=your\_super\_secret\_key\_change\_this\_in\_production

JWT\_EXPIRES\_IN=7d

CLIENT\_URL=http://localhost:3000

```



Start the backend:



```bash

npm run dev

```



Backend runs at \*\*http://localhost:5000\*\* ✅



\### 3️⃣ Seed Demo Data (Optional)



To create demo users (Admin \& User) and sample projects:



```bash

cd backend

node seed.js

```



This will create:

\- Admin: `admin@gmail.com` / `admin123`

\- User: `user@gmail.com` / `user123`

\- Sample projects and tasks



\### 4️⃣ Set up the Frontend



```bash

cd ../frontend

npm install

```



Create a `.env.local` file in the `frontend/` directory:



```env

NEXT\_PUBLIC\_API\_URL=http://localhost:5000/api

```



Start the frontend:



```bash

npm run dev

```



Frontend runs at \*\*http://localhost:3000\*\* ✅



\### 5️⃣ Open the App



Navigate to \*\*http://localhost:3000\*\* and log in with the demo credentials!



\---



\## 🌱 Demo Data Seeder



Create a file `backend/seed.js`:



```javascript

const mongoose = require('mongoose');

const User = require('./models/User');

const Project = require('./models/Project');

const Task = require('./models/Task');

require('dotenv').config();



async function seed() {

&#x20; try {

&#x20;   await mongoose.connect(process.env.MONGO\_URI);

&#x20;   console.log('✅ Connected to MongoDB');



&#x20;   // Clear existing data

&#x20;   await User.deleteMany({});

&#x20;   await Project.deleteMany({});

&#x20;   await Task.deleteMany({});



&#x20;   // Create demo users

&#x20;   const admin = await User.create({

&#x20;     name: 'Admin User',

&#x20;     email: 'admin@gmail.com',

&#x20;     password: 'admin123',

&#x20;     role: 'Admin',

&#x20;   });



&#x20;   const user = await User.create({

&#x20;     name: 'Demo User',

&#x20;     email: 'user@gmail.com',

&#x20;     password: 'user123',

&#x20;     role: 'Member',

&#x20;   });



&#x20;   // Create demo projects

&#x20;   const project1 = await Project.create({

&#x20;     name: 'Marketing Campaign',

&#x20;     description: 'Q4 marketing campaign for product launch',

&#x20;     owner: admin.\_id,

&#x20;     members: \[admin.\_id, user.\_id],

&#x20;     color: '#8b5cf6',

&#x20;     status: 'Active',

&#x20;   });



&#x20;   const project2 = await Project.create({

&#x20;     name: 'Website Redesign',

&#x20;     description: 'Modernize the company website with new branding',

&#x20;     owner: user.\_id,

&#x20;     members: \[user.\_id, admin.\_id],

&#x20;     color: '#ec4899',

&#x20;     status: 'Active',

&#x20;   });



&#x20;   // Create demo tasks

&#x20;   await Task.create(\[

&#x20;     {

&#x20;       title: 'Design landing page mockup',

&#x20;       description: 'Create Figma mockups for the new homepage',

&#x20;       project: project2.\_id,

&#x20;       assignedTo: user.\_id,

&#x20;       createdBy: admin.\_id,

&#x20;       status: 'In Progress',

&#x20;       priority: 'High',

&#x20;       dueDate: new Date(Date.now() + 5 \* 24 \* 60 \* 60 \* 1000),

&#x20;     },

&#x20;     {

&#x20;       title: 'Write blog post',

&#x20;       description: 'Draft a 1500-word article about new features',

&#x20;       project: project1.\_id,

&#x20;       assignedTo: user.\_id,

&#x20;       createdBy: admin.\_id,

&#x20;       status: 'Todo',

&#x20;       priority: 'Medium',

&#x20;       dueDate: new Date(Date.now() + 7 \* 24 \* 60 \* 60 \* 1000),

&#x20;     },

&#x20;     {

&#x20;       title: 'Set up analytics tracking',

&#x20;       project: project1.\_id,

&#x20;       assignedTo: admin.\_id,

&#x20;       createdBy: admin.\_id,

&#x20;       status: 'Done',

&#x20;       priority: 'Low',

&#x20;     },

&#x20;   ]);



&#x20;   console.log('🌱 Database seeded successfully!');

&#x20;   console.log('\\n📧 Demo Credentials:');

&#x20;   console.log('   Admin: admin@gmail.com / admin123');

&#x20;   console.log('   User:  user@gmail.com  / user123\\n');

&#x20;   process.exit(0);

&#x20; } catch (err) {

&#x20;   console.error('❌ Seed error:', err);

&#x20;   process.exit(1);

&#x20; }

}



seed();

```



Run with:

```bash

node seed.js

```



\---



\## 📡 API Reference



\### Base URL

```

http://localhost:5000/api

```



\### 🔐 Authentication



| Method | Endpoint | Description | Auth |

|--------|----------|-------------|------|

| POST | `/auth/signup` | Register new user | ❌ |

| POST | `/auth/login` | Login user | ❌ |

| GET | `/auth/me` | Get current user | ✅ |



\### 📂 Projects



| Method | Endpoint | Description | Auth |

|--------|----------|-------------|------|

| GET | `/projects` | List all projects | ✅ |

| POST | `/projects` | Create project | ✅ |

| GET | `/projects/:id` | Get project details | ✅ |

| PUT | `/projects/:id` | Update project | ✅ Owner/Admin |

| DELETE | `/projects/:id` | Delete project | ✅ Owner/Admin |

| POST | `/projects/:id/members` | Add member | ✅ Owner/Admin |



\### ✅ Tasks



| Method | Endpoint | Description | Auth |

|--------|----------|-------------|------|

| GET | `/tasks` | List tasks (filterable) | ✅ |

| POST | `/tasks` | Create task | ✅ |

| PUT | `/tasks/:id` | Update task | ✅ |

| DELETE | `/tasks/:id` | Delete task | ✅ Owner/Admin |



\### 📊 Dashboard



| Method | Endpoint | Description | Auth |

|--------|----------|-------------|------|

| GET | `/dashboard/stats` | Get statistics | ✅ |



\### 👥 Users



| Method | Endpoint | Description | Auth |

|--------|----------|-------------|------|

| GET | `/users` | List all users | ✅ |



\---



\## 🔒 Role-Based Access Control



| Action | Admin | Project Owner | Member | Assignee |

|--------|:-----:|:-------------:|:------:|:--------:|

| View all projects | ✅ | Own only | Own only | — |

| Create project | ✅ | ✅ | ✅ | — |

| Edit/Delete project | ✅ | ✅ (own) | ❌ | — |

| Add team members | ✅ | ✅ | ❌ | — |

| Create task | ✅ | ✅ | ✅ (if member) | — |

| Edit task fully | ✅ | ✅ | ❌ | — |

| Update task status | ✅ | ✅ | — | ✅ |

| Delete task | ✅ | ✅ | ❌ | ❌ |



\---







\## 🧪 Testing the App



After login, try these workflows:



\### As Admin (`admin@gmail.com`)

\- ✅ View all projects across the system

\- ✅ Edit/delete any project or task

\- ✅ Add members to any project

\- ✅ Manage all users



\### As Member (`user@gmail.com`)

\- ✅ View only your own projects

\- ✅ Create new projects

\- ✅ Edit tasks assigned to you (status only)

\- ❌ Cannot delete others' projects/tasks



\---



\## 🐛 Troubleshooting



| Issue | Solution |

|-------|----------|

| `MongoDB connection failed` | Verify `MONGO\_URI` and that MongoDB is running |

| `CORS error` | Check `CLIENT\_URL` in backend `.env` matches frontend |

| `Network Error` on frontend | Confirm `NEXT\_PUBLIC\_API\_URL` includes `/api` |

| `401 Unauthorized` | Token expired — log in again |

| `Port already in use` | Change `PORT` in `.env` or kill process |



\---



\## 🤝 Contributing



Contributions are welcome! Please follow these steps:



1\. Fork the repository

2\. Create your feature branch (`git checkout -b feature/amazing-feature`)

3\. Commit your changes (`git commit -m 'Add amazing feature'`)

4\. Push to the branch (`git push origin feature/amazing-feature`)

5\. Open a Pull Request



\---







\## 👨‍💻 Author



\*\*Durag Pal Singh\*\*

\- GitHub: \[@duragpal](https://github.com/duragpal)







