const jobBoards = {
    indeed: {
        apiKey: process.env.INDEED_API_KEY,
        endpoint: 'https://api.indeed.com/ads/apisearch',
    },
    linkedin: {
        apiKey: process.env.LINKEDIN_API_KEY,
        endpoint: 'https://api.linkedin.com/v2/jobs',
    },
    glassdoor: {
        apiKey: process.env.GLASSDOOR_API_KEY,
        endpoint: 'https://api.glassdoor.com/api/apiJobSearch',
    },
};

module.exports = jobBoards;