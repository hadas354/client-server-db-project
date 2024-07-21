# Tast Master

## Overview
This project is a web application that allows users to manage and track their daily tasks. It provides a user-friendly interface for adding, editing, and deleting tasks, as well as marking them as completed.

## Features
- User Authentication
  - Register a new account
  - Log in to existing account
  - Log out

- Task Management
  - Add new tasks with title, description, and due date
  - Edit existing tasks
  - Delete tasks
  - Mark tasks as completed or uncompleted

- Task Viewing Options
  - View all tasks
  - Filter tasks by status (completed/uncompleted)
  - Sort tasks by due date or creation date

- User Interface
  - Clean and intuitive design
  - Responsive layout for both desktop and mobile devices
  - Dark mode toggle for comfortable viewing in low-light environments

- Data Persistence
  - Tasks are saved to the database and persist between sessions


## Technologies Used
- Frontend: React.js
- Backend: Node.js with Express.js
- Database: MySQL
- Authentication: JSON Web Tokens (JWT)
- Styling: CSS with Flexbox

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/download/package-manager) (v14 or later)
- [MySQL](https://dev.mysql.com/downloads/mysql/) (v5.7 or later)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) (optional, for database management)

### Installation
1. Clone the repository:

```bash
git clone https://github.com/hadas354/client-server-db-project.git
```

2. Navigate to the project directory:

```bash
cd client-server-db-project
```

3. Install dependencies:

```bash
npm install
```

### Running the Application
1. Start the database:

```bash
npm run db
```

2. In a new terminal, start the server:

```bash
npm run server
```

4. In another terminal, start the Vite development server for the frontend:

```bash
npm run start
```

4. Open your browser and navigate to `http://localhost:3000`

## Contributing
- [Yokheved](https://github.com/yokheved)
- [Hadas354](https://github.com/hadas354)

Contributions are welcome! Please feel free to submit a Pull Request.