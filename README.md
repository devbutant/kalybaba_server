# yadetout_server

### 1. Clone the Repository:

Clone the repository you just created to your local machine using Git:

```bash
git clone https://github.com/devbutime/yadetout_server.git
```

### 2. Install Dependencies

Use the following command to install all necessary project dependencies:

```bash
pnpm i
```

### 3. Configure Environment Variables

Copy the example .env file to create your own .env file:

```bash
cp .env.example .env
```

Make sure to edit the .env file to include the correct values for your environment.

### 4. Migrate the Database

Use Prisma to reset and apply database migrations:

```bash
pnpx prisma migrate reset
```

### 5. Start the Development Server

Run the development server with the following command:

```bash
pnpm dev
```

### 6. Start Prisma Studio

To interact with your database visually using Prisma Studio, run the following command:
This will launch Prisma Studio in your browser, where you can view and edit your database records.

```bash
pnpx prisma studio
```

The development server should now be running. You can access the application at _http://localhost:3001_.
