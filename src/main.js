import projects from '../api/projects.json'
const projectContainer = document.querySelector('.portfolio-container');
const template = document.querySelector("#template");


    projects.forEach((projs) => {
      const { name, image, link,desc } = projs;

      const clone = document.importNode(template.content, true);
      clone.querySelector('.ProjectName').textContent = name;
      clone.querySelector('.ProjectImage').src = image;
      clone.querySelector('.ProjectImage').alt = name;
      clone.querySelector('.desc').textContent = desc;
      clone.querySelector('.visit-link').href = link || "#";

      projectContainer.append(clone);
    });
  
 
