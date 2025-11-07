/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Hiran Borba Student ID: 147216220 Date: 11/05/2025
*
* Published URL: 
*
********************************************************************************/


const express = require('express');
const path = require('path');
const projectData = require('./data/projectData');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

//to set ejs as view engine
app.set('view engine', 'ejs');

//serve static files from /public folder
app.use(express.static('public'));

      //initialize project data and start server
projectData.initialize()
  .then(()=>{
    
    app.get('/', (req, res)=>{ //home route
      projectData.getAllProjects() //to get first 3 projects for the home page
        .then((projects)=>{ res.render('home', {projects: projects.slice(0, 3)});
        })
        .catch((err)=>{ res.status(404).render('404', {message: "I'm sorry, we're unable to find what you're looking for"});
        });
    });

            //about route
    app.get('/about', (req, res)=>{res.render('about');
      });

    //projects route with optional sector query parameter
    app.get('/solutions/projects', (req, res)=>{
      //to check if theres a sector query parameter
        if (req.query.sector){
              //get projects by sector
          projectData.getProjectsBySector(req.query.sector)
            .then((projects) => {res.render('projects', { projects: projects });
            })
          .catch((err) => {res.status(404).render('404', { message: err });
         });
      }else{
                                //get all projects
        projectData.getAllProjects()
          .then((projects)=>{res.render('projects', { projects: projects });
          })
          .catch((err) =>{res.status(404).render('404', {message: "I'm sorry, we're unable to find what you're looking for"});
          });
      }
    
    });

    //route for individual
    app.get('/solutions/projects/:id', (req, res)=>{projectData.getProjectById(req.params.id)
        .then((project) => {res.render('project', { project: project });
        })
        .catch((err) =>{res.status(404).render('404', { message: err });
        });

    });

      //404 route(must be last one)
    app.use((req, res)=>{res.status(404).render('404', {message: "I'm sorry, we're unable to find what you're looking for"});
    });

      //start the server
    app.listen(HTTP_PORT, () =>{console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err)=>{
    console.log(`failed to starting data: ${err}`);
  });








  