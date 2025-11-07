const fs = require('fs');
const path = require('path');

let projects=[];

//to initialize function and load project data:
function initialize(){
  return new Promise((resolve, reject)=>{
    fs.readFile(path.join(__dirname, 'projectData.json'), 'utf8', (err, data)=>{
      
      if (err){
        reject("Unable to read file");
      
        return;
      
            }
      
      try{
        projects = JSON.parse(data);
        resolve();

      } catch (parseErr){
            reject("Unable to parse JSON data");
      
          }
    });
  });


}

//get all projects
function getAllProjects(){
  return new Promise((resolve, reject)=>{
    
    if (projects.length === 0){

      reject("No projects available");
      
      return;
    }
    
    resolve(projects);
  
  });
}

      //get project by id
function getProjectById(id){
  return new Promise((resolve, reject)=>{
  
  const project = projects.find(p => p.id == id);
    
    if (project){
        resolve(project);
    } 
    else{
         reject("Unable to find project");
    
        }
  });
}

//get projects by sector
function getProjectsBySector(sector){

  return new Promise((resolve, reject)=>{
  
  const filteredProjects = projects.filter(p => p.sector.toLowerCase() === sector.toLowerCase());
    if (filteredProjects.length>0){
      resolve(filteredProjects);
    } 
    
    else{
        reject(`No projects found for sector: ${sector}`);
    }
  });
}

module.exports = {initialize, getAllProjects, getProjectById,getProjectsBySector};





