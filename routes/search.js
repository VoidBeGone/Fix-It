const jobRequests = require("../models/jobRequestModel");
const users = require("../models/userModel");
const { CohereClient } = require('cohere-ai');
require('dotenv').config()


const cohere = new CohereClient({
    token: process.env.PORT,
  });



const getJobRequests = async (req, res) =>{
    const allJobRequests = await jobRequests.find({});
    res.status(200).json(allJobRequests);
}

const queryJobRequests = async (req, res) => {
    const query = req.body.query;
    const rerank = await cohere.v2.rerank({
        jobRequests,
        query: query,
        topN: 4,
        model: 'rerank-english-v3.0',
    });
    res.status(200).json(rerank);
}

const serviceQuery = async (req, res) => {
    const { service } = req.params

    const jobs = await jobRequestsModel.find({service: service})

    if (!jobs) {
        return res.status(404).json({error: 'No such job requests exists'})
    }

    res.status(200).json(jobs)
    
}


