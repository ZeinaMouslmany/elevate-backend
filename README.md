# Admin Authentication Backend

A secure Express.js backend service providing JWT-based authentication for admin access to the Zeinab Saad Elevate coaching platform.

## Features

- **JWT Authentication**: Secure token-based authentication with configurable expiration
- **Password Security**: Bcrypt hashing for secure password storage
- **MongoDB Integration**: Robust database connectivity with Mongoose ODM
- **RESTful API**: Clean, well-structured API endpoints
- **Error Handling**: Comprehensive error handling and logging
- **CORS Support**: Cross-origin resource sharing configuration
- **Environment Configuration**: Secure environment variable management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcryptjs for password hashing
- **Development**: nodemon for hot reloading

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   └── adminController.js   # Admin authentication logic
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   └── Admin.js             # Admin user schema
├── routes/
│   └── admin.js             # Admin API routes
├── scripts/
│   └── setupAdmin.js        # Admin account setup script
├── .env                     # Environment variables (not committed)
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── server.js               # Application entry point
└── README.md              # This file
```

## Installation

1. **Clone the repository and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```
   
   Required environment variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ADMIN_PASSWORD=your_admin_password
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```

4. **Set up admin account:**
   ```bash
   npm run setup-admin
   ```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on the configured port (default: 5000).

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
  - Body: `{ "password": "admin_password" }`
  - Response: `{ "token": "jwt_token" }`

- `GET /api/admin/profile` - Get admin profile (requires authentication)
  - Headers: `Authorization: Bearer <jwt_token>`
  - Response: Admin profile data

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with hot reloading
- `npm run setup-admin` - Initialize admin account with default password

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication with expiration
- **Environment Variables**: Sensitive data stored securely in environment files
- **Input Validation**: Request validation and sanitization
- **Error Handling**: Secure error responses without exposing sensitive information

## Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

### Environment Setup
1. Ensure MongoDB is running and accessible
2. Configure environment variables in `.env` file
3. Run the admin setup script before starting the application

### Testing
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure code quality
5. Submit a pull request

## License

This project is part of the Zeinab Saad Elevate coaching platform. All rights reserved.

## Deployment on Render

This backend is configured for deployment on Render.com.

### Prerequisites
- A Render account
- MongoDB database (MongoDB Atlas recommended)
- Cloudinary account (for image uploads)

### Deployment Steps

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/AbbasSk2004/elevate-backend.git
   git push -u origin main
   ```

2. **Create a new Web Service on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `AbbasSk2004/elevate-backend`
   - Select the repository and branch

3. **Configure the service:**
   - **Name**: `elevate-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Choose your preferred plan (Free tier available)

4. **Set Environment Variables:**
   In the Render dashboard, go to "Environment" and add:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A secure random string for JWT signing
   - `ADMIN_PASSWORD` - Admin password for initial setup
   - `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY` - Your Cloudinary API key
   - `CLOUDINARY_API_SECRET` - Your Cloudinary API secret
   - `NODE_ENV` - Set to `production`
   - `PORT` - Render automatically sets this, but you can set it to `10000` if needed

5. **Deploy:**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application
   - Wait for the deployment to complete

6. **Post-Deployment:**
   - Once deployed, run the admin setup script via Render's shell:
     ```bash
     npm run setup-admin
     ```
   - Or use Render's console to execute the setup script

### Using render.yaml (Alternative Method)

If you prefer using the `render.yaml` configuration file:
1. The `render.yaml` file is already included in the repository
2. In Render dashboard, select "Apply render.yaml" when creating the service
3. Render will automatically configure the service based on the YAML file
4. You'll still need to set the environment variables manually in the dashboard

### Important Notes

- **MongoDB**: Ensure your MongoDB Atlas cluster allows connections from Render's IP addresses (0.0.0.0/0 for development, or specific IPs for production)
- **CORS**: The backend is configured to accept requests from any origin. Update CORS settings in `server.js` if you need to restrict access
- **Health Check**: Render will automatically check if your service is running on the configured port
- **Logs**: Monitor your application logs in the Render dashboard for debugging

### Updating the Deployment

After making changes to your code:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Render will automatically detect the push and redeploy your service.

## Support

For technical support or questions, please contact the development team.
