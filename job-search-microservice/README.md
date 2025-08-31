# Job Search Microservice

This project is a Node.js microservice for automated job searching. It provides a REST API that allows users to search for jobs across multiple job boards, match jobs to user skills, and manage job data efficiently.

## Features

- **Express.js REST API**: A robust API server built with Express.js.
- **Job Board Integrations**: Integrates with multiple job boards including Indeed, LinkedIn, and Glassdoor.
- **Job Search**: Search jobs across various platforms with filters for location, salary, experience level, and remote work.
- **Job Matching**: Matches jobs to user skills using a dedicated algorithm.
- **Job Data Normalization**: Standardizes job data retrieved from different sources.
- **Job Deduplication**: Ensures that duplicate job listings are not returned.
- **Caching**: Utilizes Redis/MongoDB for caching job data to improve performance.
- **Rate Limiting**: Implements rate limiting for external API calls to prevent exceeding usage limits.
- **Health Check**: Provides a health check endpoint to monitor the service status.
- **Error Handling**: Includes middleware for error handling and response formatting.
- **Environment Configuration**: Uses environment variables for sensitive information management.

## API Endpoints

- **POST /jobs/search**: Search jobs across multiple job boards.
- **GET /jobs**: Retrieve all found jobs with pagination.
- **GET /jobs/:id**: Get details of a specific job.
- **POST /jobs/match**: Match jobs to user skills.
- **GET /jobs/boards**: List available job board integrations.
- **GET /health**: Health check endpoint.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd job-search-microservice
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory and add your configuration settings, including API keys and database connection strings.

4. **Run the application**:
   ```bash
   node server.js
   ```

5. **Access the API**:
   The API will be available at `http://localhost:3000`.

## Docker

To run the application in a Docker container, build the Docker image and run it:

```bash
docker build -t job-search-microservice .
docker run -p 3000:3000 job-search-microservice
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.