const express = require('express');
const path = require('path');
const projectData = require('../data/projectData');

const app = express();

        //set ejs as the view engine:
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

    //serve static files from the /public folder
app.use(express.static(path.join(__dirname, '../public')));


    //start data once
let initialized=false;

const initializeData = async ()=>{
  if (!initialized){
    await projectData.initialize();
    initialized = true;
  
  }


};

        //--> home route
app.get('/', async (req, res)=>{
  
  try{
    await initializeData();
    const projects = await projectData.getAllProjects();
    res.render('home', { projects: projects.slice(0, 3) });
  } 
  catch (err){
    res.status(404).render('404', {
      message: "Im sorry, we are unable to find what you're looking for"
    });
  
  }
});

//about me route
app.get('/about', (req, res)=>{
  res.render('about');
});

//projects route...
app.get('/solutions/projects', async (req, res)=>{
  try{
    await initializeData();
    
    if (req.query.sector){
      const projects = await projectData.getProjectsBySector(req.query.sector);
      res.render('projects', { projects: projects });
    } 
    
    else{
      const projects = await projectData.getAllProjects();
      res.render('projects', { projects: projects });
    
    }
  } 
  catch (err){
    res.status(404).render('404', { message: err });
  }


});

    //individual project route:
app.get('/solutions/projects/:id', async (req, res)=>{
  
    try{

    await initializeData();
    const project = await projectData.getProjectById(req.params.id);
    res.render('project', { project: project });
       } 
  
    catch (err){
    res.status(404).render('404', { message: err });
                }
});

//404 route --> must be the last
app.use((req, res)=>{
  res.status(404).render('404', {message: "Im sorry, we are unable to find what you're looking for"});

});

module.exports = app;








