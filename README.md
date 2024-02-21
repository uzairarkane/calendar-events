### Project Setup Instructions

To set up this project, follow the steps below:

#### 1. Install Dependencies

Run the following command to install project dependencies:

```bash
npm install
```

#### 2. Set Environment Variables

Ensure you have the following environment variables set. You can add them to a `.env` file in the project root directory. You can use `.env.example` as a template.

```dotenv
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
REDIRECT_URI=http://localhost:3333/google/callback
```

#### 3. Run Migrations

After setting the environment variables, run the migrations using the following command:

```bash
node ace migration:run
```

#### 4. Start the Server

Start the server with the following command:

```bash
node ace serve --watch
```

### Endpoints Overview

Once the server is running, you can utilize the following endpoints in the specified order:

1. **Signup**: 
   - Endpoint: `/signup`
   - Parameters: `name`, `email`, `password`
   - Description: Register a new user with a name, email, and password.

2. **Login**: 
   - Endpoint: `/login`
   - Parameters: `email`, `password`
   - Description: Authenticate a user with their email and password.

3. **Get Google Auth URL**: 
   - Endpoint: `/google/auth-url`
   - Description: Retrieve the Google authentication URL. Place the retrieved URL in any browser to log into your Google account.

4. **Get Events List**: 
   - Endpoint: `/google/events`
   - Description: Retrieve a list of events.

### Note

- Make sure to replace `your_google_client_id` and `your_google_client_secret` with your actual Google OAuth client ID and client secret.
- Ensure that your Google OAuth credentials are correctly configured in the Google Developer Console.
- For detailed usage and API documentation, refer to the project's codebase and documentation files.

This README provides a brief overview of the project setup and endpoints. For detailed information and instructions, refer to the project's documentation and codebase.
