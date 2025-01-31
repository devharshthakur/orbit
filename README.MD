# 🚀 Orbit: Web-Based PDF Compression Tool

Welcome to **Orbit**, your ultimate solution for efficient and secure PDF compression right from your browser. Whether you're a professional needing to optimize large documents or an individual looking to save space, Orbit has got you covered! 🌟

## 📚 Table of Contents

- [✨ Project Overview](#-project-overview)
- [📁 Project Structure](#-project-structure)
- [💻 Web Application](#-web-application)
  - [🔍 Features](#-features)
  - [🛠️ Technologies](#️-technologies)
- [⚙️ API Service](#️-api-service)
  - [🔍 Features](#-features-1)
  - [🛠️ Technologies](#️-technologies-1)
- [🚀 Getting Started](#-getting-started)
- [📷 Demo](#-demo)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

## ✨ Project Overview

Orbit is a **web-based PDF compression tool** designed to help users reduce the size of their PDF files without compromising quality. Leveraging the power of modern web technologies and a robust backend API, Orbit ensures a seamless and secure compression experience.

### 🌟 Key Benefits

- **Easy to Use**: Simple drag-and-drop interface for quick uploads.
- **Fast Compression**: Optimizes PDFs in seconds.
- **Secure**: All processing happens in-browser; your files never leave your device.
- **High-Quality Output**: Maintains readability and image quality.
- **Free**: Accessible to everyone without any cost.

## 📁 Project Structure

Orbit is a **monorepo** comprising two main applications: the **Web Frontend** and the **API Backend**. Below is an overview of the project's structure:

| Directory          | Description                                           |
|--------------------|-------------------------------------------------------|
| `/apps/web`        | **Frontend** built with [Next.js](https://nextjs.org)  |
| `/apps/api`        | **Backend API** built with [NestJS](https://nestjs.com) |
| `/database`        | Database scripts and configurations                   |
| `/libs`            | Shared libraries and utilities                        |
| `/scripts`         | Automation and deployment scripts                     |
| `/prisma`          | **Prisma** ORM schema and migrations                  |
| `/docker`          | Docker configurations for containerization            |
| `/configs`         | Project-wide configuration files                      |

## 💻 Web Application

The frontend of Orbit is built using **Next.js**, providing a fast, scalable, and SEO-friendly user interface.

### 🔍 Features

- **Drag & Drop Upload**: Easily upload multiple PDF files.
- **Compression Settings**: Choose between lossless, medium, and extreme compression levels.
- **Real-Time Progress**: Visual feedback on compression progress.
- **Download Compressed PDFs**: Securely download your optimized files.
- **User Authentication**: Secure access with [Clerk](https://clerk.dev) integration.
- **Dashboard**: View compression history and statistics.
- **Responsive Design**: Accessible on all devices.

### 🛠️ Technologies

- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **TypeScript**: Enhanced JavaScript with static typing.
- **React Hook Form**: Manage form state efficiently.
- **Radix UI**: Accessible and unstyled UI components.
- **Prisma**: ORM for database interactions.
- **Vercel**: Deployment platform for Next.js applications.

## ⚙️ API Service

The backend API, built with **NestJS**, handles the heavy lifting of PDF compression, ensuring fast and reliable performance.

### 🔍 Features

- **PDF Compression**: Utilizes **Ghostscript** for efficient PDF optimization.
- **Secure Endpoints**: Protects data with robust authentication mechanisms.
- **Logging & Monitoring**: Keeps track of all operations for maintenance and debugging.
- **Dockerized Deployment**: Easily deployable using Render.

### 🛠️ Technologies

- **NestJS**: Progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeScript**: Ensures type safety and improved developer experience.
- **Prisma**: Simplifies database access and migrations.
- **Docker**: Containerizes the API for consistent environments.
- **PostgreSQL**: Reliable and robust relational database system.
- **Axios**: Handles HTTP requests for communication between frontend and backend.

## 🚀 Getting Started

Follow these steps to set up Orbit locally for development and testing purposes.

### � prerequisites

- **Node.js**: Ensure you have Node.js v20 or later installed.
- **Docker**: Required for running the PostgreSQL database.
- **pnpm**: Fast, disk space-efficient package manager.

### 📦 Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/devharshthakur/orbit.git
   cd orbit
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Setup Environment Variables**

   Create a `.env` file in the root directory and configure the necessary environment variables.

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/orbit
   ```

   > **Note:** This configuration is applicable if you made the database using the default/recommended values.

4. **Run Database Scripts**

   ```bash
   pnpm db:create
   pnpm db:start
   ```

5. **Start the API Server**

   ```bash
   pnpm start:api
   ```

6. **Start the Web Frontend**

   ```bash
   pnpm start:web
   ```

7. **Access the Application**

   Open [http://localhost:3000](http://localhost:3000) in your browser to use Orbit.


## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork the Project**
2. **Create your Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your Changes**

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

## 📝 License

Distributed under the [MIT License](LICENSE). See `LICENSE` for more information.

---