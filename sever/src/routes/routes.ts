import express from 'express';
import blogRoute from './blog.route.js';
import customerRoute from './customer.route.js';
import newsletterRoute from './newsletter.route.js';
import projectRoute from './project.route.js';
import productRoute from './product.route.js';
import solutionRoute from './solution.route.js';
import teamMemberRoute from './team.member.route.js';
import certificateRoute from './certificate.route.js';
import contactRoute from './contact.route.js';
import adminAuthRoute from './admin.auth.route.js';
import adminContactRoute from './admin.contact.route.js';

const router = express.Router();

const routes = [
    { path: '/blogs', router: blogRoute },
    { path: '/customers', router: customerRoute },
    { path: '/newsletters', router: newsletterRoute },
    { path: '/projects', router: projectRoute },
    { path: '/products', router: productRoute },
    { path: '/solutions', router: solutionRoute },
    { path: '/team-members', router: teamMemberRoute },
    { path: '/certificates', router: certificateRoute },
    { path: '/contacts', router: contactRoute },
    // Admin routes
    { path: '/admin/auth', router: adminAuthRoute },
    { path: '/admin/contacts', router: adminContactRoute },
];

routes.forEach(route => {
    router.use(route.path, route.router);
});

export default router;