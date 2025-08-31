const axios = require('axios');
const { jobBoardConfig } = require('../config/jobBoards');
const Job = require('../models/Job');
const { normalizeJobData } = require('../utils/jobNormalizer');

const jobBoardAPIs = {
    indeed: async (query, location) => {
        const response = await axios.get(jobBoardConfig.indeed.url, {
            params: {
                q: query,
                l: location,
                api_key: jobBoardConfig.indeed.apiKey
            }
        });
        return response.data.results;
    },
    linkedin: async (query, location) => {
        const response = await axios.get(jobBoardConfig.linkedin.url, {
            params: {
                keywords: query,
                location: location,
                api_key: jobBoardConfig.linkedin.apiKey
            }
        });
        return response.data.results;
    },
    glassdoor: async (query, location) => {
        const response = await axios.get(jobBoardConfig.glassdoor.url, {
            params: {
                jobTitle: query,
                location: location,
                api_key: jobBoardConfig.glassdoor.apiKey
            }
        });
        return response.data.response.jobListings;
    }
};

const searchJobs = async (query, location) => {
    const jobPromises = Object.values(jobBoardAPIs).map(api => api(query, location));
    const results = await Promise.all(jobPromises);
    const allJobs = results.flat();
    return normalizeJobData(allJobs);
};

module.exports = {
    searchJobs
};