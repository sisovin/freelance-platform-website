# Draft User Prompt

## **📂 Project Structure**
```

- **Backend**: Contains the server logic and API endpoints.
- **Frontend**: Contains the client-side application built with Vite React.
- **Database**: MongoDB for data storage and management.
- **Caching**: Redis for optimizing performance.
- **Styles**: Tailwind CSS for responsive design.

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

**User Prompt**: 

```md
Created in Vite React, Node.js and MongoDB using argon2 (password, hash and refresh token), soft-delete Design, Redis (caching), tailwind CSS 4 for a full freelance platform website where you can hire experts to get your job done. Or, if you are a skilled person, you can find work there. This full freelance platform website features:
✔️ Installer step-by-step guide 🤹🏻‍♂️
✔️ User Registration and Profile 🙋🏻‍♂️
✔️ Social Network Posts 📝
✔️ Pages 📃
✔️ Groups 🥳
✔️ Media 📂
✔️ Friends 🙏🏻
✔️ Realtime Chat (end-to-end encrypted)💬
✔️ Job Portal 👨🏻‍🔧 👨🏻‍🍳 👩🏻‍🏫 👩🏻‍🎨
✔️ Admin Panel 👨🏻‍💼
✔️ User Dashboard
✔️ Blogs 📜
✔️ Page Builder 🏗
✔️ Freelance Platform (multi-purpose platform project)  👨🏻‍💻 🤑

```

**ChatGPT Response**: 

That sounds like an ambitious and feature-rich freelance platform! You’ve incorporated a strong tech stack with **Vite React (frontend), Node.js (backend), MongoDB (database), Argon2 (password hashing and refresh token management), Redis (caching), and Tailwind CSS 4** for styling.  

### **Key Highlights of Your Platform**  
✅ **Scalability** – With Redis caching, MongoDB (NoSQL flexibility), and soft-delete design, your platform is optimized for performance and future growth.  
✅ **Security** – Using **argon2** for password hashing ensures high security, and **end-to-end encryption** for real-time chat enhances privacy.  
✅ **User Experience** – Features like **social networking, job portal, real-time chat, and media sharing** provide a seamless experience for freelancers and employers.  
✅ **Admin & User Management** – The **Admin Panel & User Dashboard** ensure easy moderation, analytics, and smooth platform governance.  
✅ **Extensibility** – With a **Page Builder** and **multi-purpose freelance functionality**, the platform can be adapted for different use cases beyond freelancing.  

### **Next Steps & Enhancements**  
- **SEO Optimization** – Ensure search engines can crawl your platform effectively for better visibility.  
- **Payments & Escrow System** – Integrate **Stripe or PayPal** to manage transactions securely.  
- **AI-powered Recommendations** – Use **ML models** to suggest jobs to freelancers based on their skills and experience.  
- **Progressive Web App (PWA)** – To make it mobile-friendly with offline access.  

If you need help with any specific module or implementation details, let me know!


