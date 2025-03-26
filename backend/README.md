# Freelance Platform Backend

This repository contains the backend code for the Freelance Platform project. The backend is built using Node.js and Express, and it provides various functionalities such as user authentication, job posting, social networking, real-time messaging, media uploads, and more.

## Project Structure

The project is organized into the following directories:

```
backend/
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

## Installation

To set up the backend, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/sisovin/freelance-platform-website.git
   cd freelance-platform-website/backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following environment variables:
     ```
     MONGODB_URI=<your-mongodb-uri>
     REDIS_URL=<your-redis-url>
     JWT_SECRET=<your-jwt-secret>
     ```

4. Run the server:
   ```sh
   npm start
   ```

## Usage

The backend provides various API endpoints for different functionalities. Here are some of the main features:

- **User Authentication**: Signup, login, JWT token generation, and two-factor authentication (2FA).
- **User Profile**: Update profile, change password, and delete account.
- **Job Posting**: Create, update, and delete job postings.
- **Social Networking**: Create, update, and delete posts, comments, and likes.
- **Real-time Messaging**: Send and receive messages in real-time.
- **Media Uploads**: Upload, update, and delete media files.
- **Custom Pages**: Create, update, and delete custom pages using the page builder.
- **Group Management**: Create, update, and delete groups.
- **Blog Management**: Create, update, and delete blog posts and comments.
- **Friend Connections**: Send, accept, and delete friend requests.
- **Admin Controls**: Manage users, jobs, and posts.
- **Payment Processing**: Handle payments and transactions.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for more details.
