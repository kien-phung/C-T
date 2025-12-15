import express from 'express';
import blogRoute from './blog.route.js';
import customerRoute from './customer.route.js';
import newsletterRoute from './newsletter.route.js';
import projectRoute from './project.route.js';
import productRoute from './product.route.js';
import solutionRoute from './solution.route.js';
import policyRoute from './policy.route.js';
import teamMemberRoute from './team.member.route.js';
import certificateRoute from './certificate.route.js';
import contactRoute from './contact.route.js';
import adminAuthRoute from './admin.auth.route.js';
import adminContactRoute from './admin.contact.route.js';
import adminUserRoute from './admin.user.route.js';
import adminBlogRoute from './admin.blog.route.js';
import adminProjectRoute from './admin.project.route.js';
import adminProductRoute from './admin.product.route.js';
import adminSolutionRoute from './admin.solution.route.js';
import adminPolicyRoute from './admin.policy.route.js';
import adminCustomerRoute from './admin.customer.route.js';
import adminUploadRoute from './admin.upload.route.js';

const router = express.Router();

const routes = [
    { path: '/blogs', router: blogRoute },
    { path: '/customers', router: customerRoute },
    { path: '/newsletters', router: newsletterRoute },
    { path: '/projects', router: projectRoute },
    { path: '/products', router: productRoute },
    { path: '/solutions', router: solutionRoute },
    { path: '/policies', router: policyRoute },
    { path: '/team-members', router: teamMemberRoute },
    { path: '/certificates', router: certificateRoute },
    { path: '/contacts', router: contactRoute },
    // Admin routes
    { path: '/admin/auth', router: adminAuthRoute },
    { path: '/admin/contacts', router: adminContactRoute },
    { path: '/admin/users', router: adminUserRoute },
    { path: '/admin/blogs', router: adminBlogRoute },
    { path: '/admin/projects', router: adminProjectRoute },
    { path: '/admin/products', router: adminProductRoute },
    { path: '/admin/solutions', router: adminSolutionRoute },
    { path: '/admin/policies', router: adminPolicyRoute },
    { path: '/admin/customers', router: adminCustomerRoute },
    { path: '/admin/uploads', router: adminUploadRoute },
];

routes.forEach(route => {
    router.use(route.path, route.router);
});

export default router;
