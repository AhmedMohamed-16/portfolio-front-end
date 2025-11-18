import { Routes } from '@angular/router';
 import { Home } from './layout/home/home';
 import { About } from './layout/about/about';
import { Notfound } from './notfound/notfound';
import { Dashboard } from './dashboard/dashboard';
import { Layout } from './layout/layout';
import { Home as HomeDashboard } from './dashboard/home/home';
import { About as AboutDashboard } from './dashboard/about/about';
import { Projects as ProjectsDashboard } from './dashboard/projects/projects';
import { Contact as ContactDashboard } from './dashboard/contact/contact';


import { Projects } from './layout/projects/projects';
import { Skills } from './layout/skills/skills';
import { Skills as SkillsDashboard } from './dashboard/skills/skills';
import { Contact } from './layout/contact/contact';
import { Footer } from './dashboard/shared/footer/footer';
import { Submissions } from './dashboard/submissions/submissions';

export const routes: Routes = [
   {path:'', component:Layout, children:[
 {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:Home},
    {path:'about',component:About},
    {path:'contact',component:Contact},
    {path:'projects',component:Projects},
    {path:'skills',component:Skills},
   ]},

    {path:"dashboard",component:Dashboard,children:[
         {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeDashboard},
        {path:'about',component:AboutDashboard},
        {path:'contact',component:ContactDashboard},
        {path:'projects',component:ProjectsDashboard},
        {path:'skills',component:SkillsDashboard},
        {path:'footer',component:Footer},
        {path:'submissions',component:Submissions},
    ]},
   {path:'**', component:Notfound},
];
