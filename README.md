# StudyBuds

![StudentSync Banner](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=for-the-badge&logo=postgresql)

StudyBuds is a modern social learning platform designed to help university students connect, share resources, and succeed together. It enables students to discover study groups, share files, and collaborate in real-time.

🚀 **Live Demo:** [https://study-buds-zeta.vercel.app/](https://study-buds-zeta.vercel.app/)

---

## 🌟 Key Features

*   **Social Discovery**: Browse and search for study rooms by course name or university.
*   **Private & Public Groups**: Create open communities or private, password-protected study groups for focused collaboration.
*   **Secure Authentication**: Robust user management powered by [Clerk](https://clerk.com), ensuring secure sign-ins and identity protection.
*   **Resource Sharing**: Seamless file uploads and sharing using [UploadThing](https://uploadthing.com), allowing members to distribute notes, PDFs, and assignments.
*   **Real-time Interaction**: Instant updates and responsive UI for a fluid user experience.
*   **Modern UI/UX**: A polished, responsive interface built with Shadcn/UI and Tailwind CSS, featuring dark mode support and smooth animations.

## 🛠️ Tech Stack

Built with the latest web technologies to ensure performance, scalability, and developer experience:

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
*   **Database**: [PostgreSQL](https://www.postgresql.org/) (hosted on [Neon](https://neon.tech/))
*   **ORM**: [Prisma](https://www.prisma.io/)
*   **Authentication**: [Clerk](https://clerk.com/)
*   **File Storage**: [UploadThing](https://uploadthing.com/)
*   **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started Locally

Follow these steps to set up the project locally on your machine.

**Prerequisites**

*   Node.js (v18+)
*   npm

**Installation**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/studentsync.git
    cd studentsync
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add the following keys:
    ```env
    DATABASE_URL="postgresql://..."
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
    CLERK_SECRET_KEY="sk_test_..."
    UPLOADTHING_SECRET="sk_live_..."
    UPLOADTHING_APP_ID="..."
    ```

4.  **Initialize the Database:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

*Built by Simon Bartos.*
