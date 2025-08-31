const express = require('express');
const router = express.Router();
const jobBoardService = require('../services/jobBoardService');
const matchingService = require('../services/matchingService');
const cacheService = require('../services/cacheService');
const Joi = require('joi');

// Schema for job search input validation
const jobSearchSchema = Joi.object({
    location: Joi.string().optional(),
    salary: Joi.number().optional(),
    experienceLevel: Joi.string().valid('entry', 'mid', 'senior').optional(),
    remote: Joi.boolean().optional()
});

// Schema for job matching input validation
const jobMatchSchema = Joi.object({
    skills: Joi.array().items(Joi.string()).required()
});

// POST /jobs/search - Search jobs across multiple job boards
router.post('/search', async (req, res) => {
    const { error } = jobSearchSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const jobs = await jobBoardService.searchJobs(req.body);
        res.json(jobs);
    } catch (err) {
        res.status(500).send('Error searching for jobs');
    }
});

// GET /jobs - Get all found jobs with pagination
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const jobs = await cacheService.getJobs(page, limit);
        res.json(jobs);
    } catch (err) {
        res.status(500).send('Error retrieving jobs');
    }
});

// GET /jobs/:id - Get specific job details
router.get('/:id', async (req, res) => {
    try {
        const job = await cacheService.getJobById(req.params.id);
        if (!job) return res.status(404).send('Job not found');
        res.json(job);
    } catch (err) {
        res.status(500).send('Error retrieving job details');
    }
});

// POST /jobs/match - Match jobs to user skills
router.post('/match', async (req, res) => {
    const { error } = jobMatchSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const matchedJobs = await matchingService.matchJobs(req.body.skills);
        res.json(matchedJobs);
    } catch (err) {
        res.status(500).send('Error matching jobs');
    }
});

// GET /jobs/boards - List available job board integrations
router.get('/boards', (req, res) => {
    const boards = jobBoardService.getAvailableBoards();
    res.json(boards);
});

// GET /health - Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).send('OK');
});

module.exports = router;