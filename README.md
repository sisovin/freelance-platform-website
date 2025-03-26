# freelance-platform-website

## Description

This project is a full freelance platform website created using Vite React, Node.js, and MongoDB. It features argon2 for password hashing and refresh tokens, soft-delete design, Redis for caching, and Tailwind CSS 4 for styling. The platform allows users to hire experts to get their jobs done or find work if they are skilled professionals. The main features of the platform include:

- Installer step-by-step guide
- User Registration and Profile
- Social Network Posts
- Pages
- Groups
- Media
- Friends
- Realtime Chat (end-to-end encrypted)
- Job Portal
- Admin Panel
- User Dashboard
- Blogs
- Page Builder
- Freelance Platform (multi-purpose platform project)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sisovin/freelance-platform-website.git
   ```
2. Navigate to the project directory:
   ```bash
   cd freelance-platform-website
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up the environment variables by creating a `.env` file in the root directory and adding the necessary variables:
   ```env
   MONGODB_URI=<your_mongodb_uri>
   REDIS_URL=<your_redis_url>
   JWT_SECRET=<your_jwt_secret>
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Follow the installer step-by-step guide to set up the platform.
3. Register a new user account and complete your profile.
4. Explore the various features of the platform, such as creating social network posts, joining groups, uploading media, and more.

## Contributing

We welcome contributions to the project! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b my-feature-branch
   ```
3. Make your changes and commit them with a descriptive commit message:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push your changes to your forked repository:
   ```bash
   git push origin my-feature-branch
   ```
5. Create a pull request to the main repository, describing your changes and the problem they solve.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
