import express from 'express';
import { getAllPolicies } from '../controllers/policy.controller.js';

const policyRoute = express.Router();

// GET /api/policies - list published policies
policyRoute.get('/', getAllPolicies);

export default policyRoute;