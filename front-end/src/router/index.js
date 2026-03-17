import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/opened/landing/Home.vue'

import SendSMS from  '../views/opened/landing/apidocs/SendSMS.vue'
import BulkSend from "../views/opened/landing/apidocs/BulkSend.vue";
import Otp from  '../views/opened/landing/apidocs/OTP.vue'
import Verify from  '../views/opened/landing/apidocs/Verify.vue'
import Balance from  '../views/opened/landing/apidocs/Balance.vue'
import Status from  '../views/opened/landing/apidocs/Status.vue'
import About from  '../views/opened/landing/about.vue'
import Products from  '../views/opened/landing/products.vue'
import Pricing from  '../views/opened/landing/plans.vue'

import Login from '../views/opened/auth/login.vue'

import ResetPassword from '../views/opened/auth/ResetPassword.vue'
import ForgotPasssword from '../views/opened/auth/forgotPassword.vue'
import ActivateEmailMessage from '../views/opened/landing/activateEmailMessage.vue'
import Registration from '../views/opened/auth/login.vue'
import ForgotPassword from '../views/opened/auth/forgotPassword.vue';
import Reset from '../views/opened/auth/reset.vue';
import AccessDenied from "../views/opened/auth/accessDenied.vue";
import first_dash from '../views/closed/first_dash.vue'
import dashboard from '../views/closed/dashboard.vue'


import RoleView from '../views/closed/Roles/RoleView.vue'
import PermissionView from '../views/closed/Permissions/PermissionView.vue'
import TeamView from '../views/closed/Teams/TeamView.vue'
import TagesView from '../views/closed/Tages/TageView.vue'
import GroupContactsView from '../views/closed/Contactgroups/ContactGroupView.vue'
import ContactsView from '../views/closed/Contacts/ContactsView.vue'
import TemplatesView from '../views/closed/Templates/TemplateView.vue'
import TokensView from '../views/closed/Tokens/TokenView.vue'
import MessagesView from '../views/closed/Messages/MessageView.vue'
import IdentifierView from '../views/closed/Identifiers/IdentifierView.vue'




const routes = [
  {
    path: "/", name: "/",
    component: Home,
    meta:
      { requiresGuest: true }
  },
  {
    path: "/login", name: "login",
    component: Login,
    meta:
      { requiresGuest: true }
  },

  {
    path: "/register", name: "register",
    component: Registration,
    meta:
      { requiresGuest: true }
  },

  {
    path: "/send-sms", name: "/send-sms",
    component: SendSMS,
    meta:
      { requiresGuest: true }
  },


    {
    path: "/bulk-sms", name: "/bulk-sms",
    component: BulkSend,
    meta:
      { requiresGuest: true }
  },

    {
    path: "/otp", name: "/otp",
    component: Otp,
    meta:
      { requiresGuest: true }
  },

    {
    path: "/verify", name: "/verify",
    component: Verify,
    meta:
      { requiresGuest: true }
  },

    {
    path: "/balance", name: "/balance",
    component: Balance,
    meta:
      { requiresGuest: true }
  },


   {
    path: "/status", name: "/status",
    component: Status,
    meta:
      { requiresGuest: true }
  },


    {
    path: "/about", name: "/about",
    component: About,
    meta:
      { requiresGuest: true }
  },


    {
    path: "/products", name: "/products",
    component: Products,
    meta:
      { requiresGuest: true }
  },

  {
    path: "/pricing", name: "/pricing",
    component: Pricing,
    meta:
      { requiresGuest: true }
  },

  {
    path: "/email-activate-message", name: "email-activate-message",
    component: ActivateEmailMessage,
    meta:
      { requiresGuest: true }
  },
  // router/index.js
   {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPasssword,
    props: true
  },
    {
      path: "/:lang/reset-password",
      name: "ResetPassword",
      component: ResetPassword,
      props: true, // passes route params as props
    },
  ,
  {
    path: "/dashboard", name: "dashboard",
    component: dashboard,
    meta:
      { requiresGuest: true },
      children: [
      {
        path: "schedules",
        name: "Schedules-view",
        component: () => import('../views/closed/Schedules/SchedulesView.vue'),
      },
      {
        path: "schedules/add",
        name: "Schedules-add",
        component: () => import('../views/closed/Schedules/AddSchedules.vue'),
      },
      {
        path: "schedules/edit/:id",
        name: "Schedules-edit",
        component: () => import('../views/closed/Schedules/EditSchedules.vue'),
        props: true,
      },
      {
        path: "schedules/detail/:id",
        name: "Schedules-detail",
        component: () => import('../views/closed/Schedules/SchedulesDetail.vue'),
        props: true,
      },

      {
        path: "sendernames",
        name: "SendeNames-view",
        component: () => import('../views/closed/SenderNames/SendeNamesView.vue'),
      },
      {
        path: "sendernames/add",
        name: "SendeNames-add",
        component: () => import('../views/closed/SenderNames/AddSendeNames.vue'),
      },
      {
        path: "sendernames/edit/:id",
        name: "SendeNames-edit",
        component: () => import('../views/closed/SenderNames/EditSendeNames.vue'),
        props: true,
      },
      {
        path: "sendernames/detail/:id",
        name: "SendeNames-detail",
        component: () => import('../views/closed/SenderNames/SendeNamesDetail.vue'),
        props: true,
      },

      {
        path: "contactfields",
        name: "ContactFields-view",
        component: () => import('../views/closed/ContactFields/ContactFieldsView.vue'),
      },
      {
        path: "contactfields/add",
        name: "ContactFields-add",
        component: () => import('../views/closed/ContactFields/AddContactFields.vue'),
      },
      {
        path: "contactfields/edit/:id",
        name: "ContactFields-edit",
        component: () => import('../views/closed/ContactFields/EditContactFields.vue'),
        props: true,
      },
      {
        path: "contactfields/detail/:id",
        name: "ContactFields-detail",
        component: () => import('../views/closed/ContactFields/ContactFieldsDetail.vue'),
        props: true,
      },

      {
        path: "users",
        name: "Users-view",
        component: () => import('../views/closed/users/UsersView.vue'),
      },
      {
        path: "users/add",
        name: "Users-add",
        component: () => import('../views/closed/users/AddUsers.vue'),
      },
      {
        path: "users/edit/:id",
        name: "Users-edit",
        component: () => import('../views/closed/users/EditUsers.vue'),
        props: true,
      },
      {
        path: "users/detail/:id",
        name: "Users-detail",
        component: () => import('../views/closed/users/UsersDetail.vue'),
        props: true,
      },

      {
        path: "first-dash", name: "first-dash",
        component: first_dash,
      },

      {
        path: "role-view", name: "Role-view",
        component: RoleView,
      },

        {
        path: "permission-view", name: "Permission-view",
        component: PermissionView,
      },
        {
        path: "team-view", name: "Team-view",
        component: TeamView,
      },

       {
        path: "team-view", name: "Team-view",
        component: TeamView,
      },

        {
        path: "tags-view", name: "Tage-view",
        component: TagesView,
      },

        {
        path: "Contactsgroup-view", name: "ContactGroup-view",
        component: GroupContactsView,
      },
        {
        path: "contacts-view", name: "Contacts-view",
        component: ContactsView,
      },

       {
        path: "template-view", name: "Template-view",
        component: TemplatesView,
      },

         {
        path: "token-view", name: "Token-view",
        component: TokensView,
      },
         {
        path: "message-view", name: "Message-view",
        component: MessagesView,
      },
     {
        path: "identifier-view", name: "Identifier-view",
        component: IdentifierView,
      },
    
    ]
  },
  { path: "/forgot-password", name: "forgotPassword", component: ForgotPassword },
  { path: "/reset/:token", name: "reset", component: Reset, meta: { requiresGuest: true } },
  { path: "/:pathMatch(.*)*", name: "accessDenied", component: AccessDenied, meta: { requiresGuest: true } },
];

const router = createRouter({
  // mode: 'hash',
  history: createWebHistory(),
  routes, // ✅ no spread needed
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const requiredRole = to.meta.role;

  if (requiresAuth) {
    if (!isAuthenticated) {
      next("/login");
    } else if (requiredRole && userRole !== requiredRole) {
      localStorage.clear();
      next("/login");
    } else {
      next();
    }
  } else if (requiresGuest) {
    next();
  } else {
    next();
  }
});

export default router;
