
# Chat Application

This project is a real-time chat application built with Node.js, Express.js, and Socket.IO, Dockerized, and deployed on AWS EC2. The application supports user authentication, real-time messaging, group chat functionality, and retrieval of message history via an API.

## Project Structure

```
chat-app/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── messageController.js
│   │   └── groupController.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── messageModel.js
│   │   └── groupModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── messageRoutes.js
│   │   └── groupRoutes.js
│   ├── utils/
│   │   ├── authMiddleware.js
│   │   └── socket.js
│   └── app.js
├── config/
│   └── db.js
├── .env
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## Database Design

The application uses MySQL with the following schema:

- **User**: Stores user details like `id`, `username`, `password`, `createdAt` and `updatedAt`.
- **Group**: Stores group details like `id`, `name`,`createdAt` and `updatedAt`.
- **GroupMember**: Associates users with groups, storing `id`, `userId`, `groupId`.
- **Message**: Stores messages with `id`, `content`, `senderId`, `groupId`, `createdAt` and `updatedAt`.

## API Collection

For a collection of all APIs, refer to the following document:
[Collection of All APIs](https://drive.google.com/file/d/16D9Kp0_Sbe6z6emm6AbvpbeopYvBlMc2/view?usp=sharing)

## API Endpoints
## Important Note

Make sure to include the `Authorization` header with a Bearer token to use the API.

### User Authentication

#### Register
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Request**:
  ```json
  {
    "username": "example",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  {
    "status":true,
    "msg": "User registered successfully."
  }
  ```

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request**:
  ```json
  {
    "username": "example",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt-token",
    "status": true
  }
  ```
#### Create Group
- **URL**: `/api/groups`
- **Method**: `POST`
- **Request**:
  ```json
  {
    "name": "Group Name",
    "members": ["1", "2"]
  }
  ```
   members: Array of user IDs that will be added to the group.

- **Response**:
  ```json
  {
    "id": 2,
    "name": "Group Name",
    "updatedAt": "2024-08-28T15:53:53.675Z",
    "createdAt": "2024-08-28T15:53:53.675Z"
  }
  ```

### Messaging

#### Send Group Message
- **URL**: `/api/groups/{groupId}/messages`
- **Method**: `POST`
- **Request params**:groupId
- **Request**:
  ```json
  {
    "senderId": "1",
    "content": "Hello, Group! message"
  }
  ```
- **Response**:
  ```json
  {
    "id": 5,
    "senderId": "1",
    "groupId": "2",
    "content": "Hello, This is a Group message",
    "updatedAt": "2024-08-28T15:56:30.134Z",
    "createdAt": "2024-08-28T15:56:30.134Z"
  }
  ```
  #### Create Group
- **URL**: `/api/groups`
- **Method**: `POST`
- **Request**:
  ```json
  {
    "name": "Group Name",
    "members": ["1", "2"]
  }
  ```
   members: Array of user IDs that will be added to the group.

- **Response**:
  ```json
  {
    "id": 2,
    "name": "Group Name",
    "updatedAt": "2024-08-28T15:53:53.675Z",
    "createdAt": "2024-08-28T15:53:53.675Z"
  }
  ```

#### Get Message History
- **URL**: `/api/messages/history`
- **Method**: `GET`
- **Query Parameters**:

- userId (string): The ID of the user whose message history is being retrieved.
- withUserId (string, optional): The ID of the other user for direct messages.
- groupId (string, optional): The ID of the group for group messages.
- page (number, optional): The page number for pagination.
- pageSize (number, optional): The number of messages per page.
- **Response**: (Direct message)
  ```json
  {
    "count": 2,
    "rows": [
        {
            "id": 2,
            "senderId": "1",
            "receiverId": "2",
            "groupId": null,
            "content": "Test msg 2",
            "createdAt": "2024-08-28T15:48:16.000Z",
            "updatedAt": "2024-08-28T15:48:16.000Z"
        },
        {
            "id": 3,
            "senderId": "1",
            "receiverId": "2",
            "groupId": null,
            "content": "hi There",
            "createdAt": "2024-08-28T15:48:56.000Z",
            "updatedAt": "2024-08-28T15:48:56.000Z"
        }
    ]
  }
  ```
  - **Response**: (Group message)
  ```json
  {
      "count": 2,
    "rows": [
        {
            "id": 4,
            "senderId": "1",
            "receiverId": null,
            "groupId": "2",
            "content": "Hello, Group!",
            "createdAt": "2024-08-28T15:54:41.000Z",
            "updatedAt": "2024-08-28T15:54:41.000Z"
        },
        {
            "id": 5,
            "senderId": "1",
            "receiverId": null,
            "groupId": "2",
            "content": "Hello, Group! message",
            "createdAt": "2024-08-28T15:56:30.000Z",
            "updatedAt": "2024-08-28T15:56:30.000Z"
        }
    ]
  }
  ```

## Deployment

The application is Dockerized and deployed on AWS EC2. The Docker Compose file handles the setup of the application and the MySQL database.

### Steps to Run Locally

1. **Clone the repository**:
    ```bash
    git clone https://github.com/karthik-s-s/chat-app.git
    cd chat-app
    ```

2. **Set up environment variables**:
   - Create a `.env` file in the root directory with the following content:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASS=password
     DB_NAME=chat
     PORT=3000
     JWT_SECRET=your_jwt_secret
     ```

3. **Build and run the application**:
    ```bash
    docker-compose up --build
    ```

4. **Access the application through POSTMAN with base URL**:
   - Use this base url with the endpoint specified above.

   - The application will be available at `http://13.48.48.215:3000`.

## Hosted on AWS

The application is hosted on AWS EC2 instance. You can access it using the following URL:

- **URL**: [http://13.48.48.215:3000](http://13.48.48.215:3000)

