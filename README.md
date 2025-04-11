# Freelance Platform Website

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

## Full Project Structure

```
freelance-platform-website/
│── 📁 backend/               # Node.js & Express server
    │── 📁 drizzle/           # drizzle configuration
    │   │── schema.ts         # Database schema definition (all models)
    │   │── migrations/       # Database migrations
    │── 📁 src/
    │   │── 📁 config/        # Configuration files
    │   │   │── db.ts         # drizzle database connection
    │   │   │── redis.ts      # Redis caching client setup
    │   │   └── dotenv.ts     # Environment variables setup
    │   │── 📁 middleware/    # Authentication & authorization middleware
    │   │   │── authMiddleware.ts # JWT & Role-Based Access (RBAC)
    │   │   │── rateLimit.ts  # Rate limiting (security)
    │   │   └── upload.ts     # Media uploads middleware
    │   │── 📁 routes/        # API routes (Modular)
    │   │   │── authRoutes.ts         # Signup, login, JWT, 2FA
    │   │   │── userRoutes.ts         # User profile & account actions
    │   │   │── jobRoutes.ts          # Job posting & applications
    │   │   │── socialRoutes.ts       # Posts, comments, likes
    │   │   │── chatRoutes.ts         # Real-time messaging
    │   │   │── mediaRoutes.ts        # File uploads & management
    │   │   │── pageRoutes.ts         # Custom pages & page builder
    │   │   │── groupRoutes.ts        # Group creation & management
    │   │   │── blogRoutes.ts         # Blog posts & comments
    │   │   │── friendRoutes.ts       # Friend requests & connections
    │   │   │── adminRoutes.ts        # Admin controls
    │   │   └── paymentRoutes.ts      # Payment processing
    │   │── 📁 controllers/       # Business logic (separates concerns)
    │   │   │── authController.ts     # Auth logic (JWT, Argon2, Redis, 2FA)
    │   │   │── userController.ts     # User-related functions
    │   │   │── jobController.ts      # Job-related functions
    │   │   │── socialController.ts   # Social networking functions
    │   │   │── chatController.ts     # Chat & messaging functions
    │   │   │── mediaController.ts    # Media upload & management
    │   │   │── pageController.ts     # Custom pages & page builder
    │   │   │── groupController.ts    # Group management functions
    │   │   │── blogController.ts     # Blog management functions
    │   │   │── friendController.ts   # Friend connection functions
    │   │   │── adminController.ts    # Admin functions
    │   │   └── paymentController.ts  # Payment processing
    │   │── 📁 utils/             # Utility functions
    │   │   │── jwt.ts            # JWT helper functions
    │   │   │── email.ts          # Email sending for OTP
    │   │   │── logger.ts         # Logging system
    │   │   │── argon2.ts         # Argon2 password hashing
    │   │   │── encryption.ts     # End-to-end encryption for chat
    │   │   └── fileStorage.ts    # File handling utilities
    │   │── 📁 services/          # Business logic services
    │   │   │── authService.ts      # Authentication service
    │   │   │── userService.ts      # User service
    │   │   │── jobService.ts       # Job posting & matching service
    │   │   │── socialService.ts    # Social networking service
    │   │   │── chatService.ts      # Real-time messaging service
    │   │   │── mediaService.ts     # Media handling service
    │   │   │── pageService.ts      # Page builder service
    │   │   │── groupService.ts     # Group management service
    │   │   │── blogService.ts      # Blog handling service
    │   │   │── friendService.ts    # Friend networking service
    │   │   │── adminService.ts     # Admin service
    │   │   └── paymentService.ts   # Payment processing service
    │   │── 📁 validators/        # Input validation
    │   │   │── authValidator.ts    # Validate auth inputs
    │   │   │── userValidator.ts    # Validate user inputs
    │   │   │── jobValidator.ts     # Validate job inputs
    │   │   │── socialValidator.ts  # Validate social content
    │   │   │── mediaValidator.ts   # Validate file uploads
    │   │   └── paymentValidator.ts # Validate payment data
    │   │── 📁 websockets/        # Real-time functionality
    │   │   │── chatSocket.ts      # Chat websocket handling
    │   │   │── notificationSocket.ts # Real-time notifications
    │   │── app.ts                # Express server setup
    │   └── server.ts             # Entry point
    │── 📁 tests/                 # API testing (Jest, Supertest)
    │   │── auth.test.ts          # Test authentication flow
    │   │── jobs.test.ts          # Test job posting & applications
    │   │── social.test.ts        # Test social networking features
    │   │── chat.test.ts          # Test messaging functionality
    │── 📁 docs/                  # API documentation (Swagger/Postman)
    │   │── api-docs.yaml         # OpenAPI/Swagger specification
    │   └── installation-guide.md # Step-by-step installer guide
    │── .env                      # Environment variables
    │── .gitignore                # Ignore sensitive files
    │── package.json              # Project metadata & dependencies
    └── README.md                 # Project documentation
```
```
This structure better supports the feature requirements:

1. **Job Portal** - Added dedicated routes, controllers, and services for job posting/searching
2. **Social Networking** - Added components for posts, friends, groups, and media
3. **Chat System** - Added websockets folder for real-time communication with E2E encryption
4. **Pages & Blogs** - Added dedicated modules for content management
5. **Installer Guide** - Added to docs folder for step-by-step setup
6. **Payment Processing** - Essential for a freelance marketplace
```

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
