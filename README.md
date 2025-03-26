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
    │── 📁 mongodb/           # MongoDB configuration
    │   │── schema.js         # Database schema definition (all models)
    │   │── migrations/       # Database migrations
    │── 📁 src/
    │   │── 📁 config/        # Configuration files
    │   │   │── db.js         # MongoDB database connection
    │   │   │── redis.js      # Redis caching client setup
    │   │   └── dotenv.js     # Environment variables setup
    │   │── 📁 middleware/    # Authentication & authorization middleware
    │   │   │── authMiddleware.js # JWT & Role-Based Access (RBAC)
    │   │   │── rateLimit.js  # Rate limiting (security)
    │   │   └── upload.js     # Media uploads middleware
    │   │── 📁 routes/        # API routes (Modular)
    │   │   │── authRoutes.js         # Signup, login, JWT, 2FA
    │   │   │── userRoutes.js         # User profile & account actions
    │   │   │── jobRoutes.js          # Job posting & applications
    │   │   │── socialRoutes.js       # Posts, comments, likes
    │   │   │── chatRoutes.js         # Real-time messaging
    │   │   │── mediaRoutes.js        # File uploads & management
    │   │   │── pageRoutes.js         # Custom pages & page builder
    │   │   │── groupRoutes.js        # Group creation & management
    │   │   │── blogRoutes.js         # Blog posts & comments
    │   │   │── friendRoutes.js       # Friend requests & connections
    │   │   │── adminRoutes.js        # Admin controls
    │   │   └── paymentRoutes.js      # Payment processing
    │   │── 📁 controllers/       # Business logic (separates concerns)
    │   │   │── authController.js     # Auth logic (JWT, Argon2, Redis, 2FA)
    │   │   │── userController.js     # User-related functions
    │   │   │── jobController.js      # Job-related functions
    │   │   │── socialController.js   # Social networking functions
    │   │   │── chatController.js     # Chat & messaging functions
    │   │   │── mediaController.js    # Media upload & management
    │   │   │── pageController.js     # Custom pages & page builder
    │   │   │── groupController.js    # Group management functions
    │   │   │── blogController.js     # Blog management functions
    │   │   │── friendController.js   # Friend connection functions
    │   │   │── adminController.js    # Admin functions
    │   │   └── paymentController.js  # Payment processing
    │   │── 📁 utils/             # Utility functions
    │   │   │── jwt.js            # JWT helper functions
    │   │   │── email.js          # Email sending for OTP
    │   │   │── logger.js         # Logging system
    │   │   │── argon2.js         # Argon2 password hashing
    │   │   │── encryption.js     # End-to-end encryption for chat
    │   │   └── fileStorage.js    # File handling utilities
    │   │── 📁 services/          # Business logic services
    │   │   │── authService.js      # Authentication service
    │   │   │── userService.js      # User service
    │   │   │── jobService.js       # Job posting & matching service
    │   │   │── socialService.js    # Social networking service
    │   │   │── chatService.js      # Real-time messaging service
    │   │   │── mediaService.js     # Media handling service
    │   │   │── pageService.js      # Page builder service
    │   │   │── groupService.js     # Group management service
    │   │   │── blogService.js      # Blog handling service
    │   │   │── friendService.js    # Friend networking service
    │   │   │── adminService.js     # Admin service
    │   │   └── paymentService.js   # Payment processing service
    │   │── 📁 validators/        # Input validation
    │   │   │── authValidator.js    # Validate auth inputs
    │   │   │── userValidator.js    # Validate user inputs
    │   │   │── jobValidator.js     # Validate job inputs
    │   │   │── socialValidator.js  # Validate social content
    │   │   │── mediaValidator.js   # Validate file uploads
    │   │   └── paymentValidator.js # Validate payment data
    │   │── 📁 websockets/        # Real-time functionality
    │   │   │── chatSocket.js      # Chat websocket handling
    │   │   │── notificationSocket.js # Real-time notifications
    │   │── app.js                # Express server setup
    │   └── server.js             # Entry point
    │── 📁 tests/                 # API testing (Jest, Supertest)
    │   │── auth.test.js          # Test authentication flow
    │   │── jobs.test.js          # Test job posting & applications
    │   │── social.test.js        # Test social networking features
    │   │── chat.test.js          # Test messaging functionality
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
