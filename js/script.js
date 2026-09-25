const navButton = document.getElementsByClassName("nav-item");
const destinationButton = document.getElementsByClassName("destination-button");
const crewButton = document.getElementsByClassName("crew-control-btn");

const content = document.getElementById("planet_name");
const description = document.getElementById("planet_description");
const distance = document.getElementById("planet_distance");
const travel = document.getElementById("planet_travel");
const image = document.getElementById("planet_img");

const crewRole = document.getElementById("crew_role");
const crewName = document.getElementById("crew_name");
const crewDesc = document.getElementById("crew_description");
const crewImage = document.getElementById("crew_img");

const techName = document.getElementById("tech_name");
const techDesc = document.getElementById("tech_description");
const techImage = document.getElementById("tech_img");

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname == "/html/index.html") {
    navButton[0].style.boxShadow = "0 3px 0 0 #ffffff";
  } else if (window.location.pathname == "/html/destination.html") {
    navButton[1].style.boxShadow = "0 3px 0 0 #ffffff";
  } else if (window.location.pathname == "/html/crew.html") {
    navButton[2].style.boxShadow = "0 3px 0 0 #ffffff";
  } else if (window.location.pathname == "/html/technology.html") {
    navButton[3].style.boxShadow = "0 3px 0 0 #ffffff";
  }
});

function exploreFunc() {
  if ((window.location.href = "./destination.html"));
}

async function getInfo() {
  try {
    const url = "./data/data.json";
    const response = await fetch(url);
    const data = await response.json();

    function getPlanetInfo(planet) {
      content.innerHTML = planet.name.toUpperCase();
      description.innerHTML = planet.description;
      distance.innerHTML = planet.distance.toUpperCase();
      travel.innerHTML = planet.travel.toUpperCase();
      image.src = planet.images.png;
    }

    document.addEventListener("click", (entity) => {
      const destinationId = entity.target.id.replace("destination-", "");
      const planet = data.destinations.find(
        (item) => item.name.toLowerCase() == destinationId
      );
      if (planet) {
        getPlanetInfo(planet);
        document.querySelectorAll(".inter-dest").forEach((button) => {
          button.classList.remove("active");
          button.classList.remove("in-1");
        });
        entity.target.classList.add("active");
      }
    });

    if (window.location.pathname == "/html/crew.html") {
      crewImage.style.marginTop = "120px";
      crewImage.style.width = "514px";
      crewImage.style.height = "700px";
    }

    function getCrewInfo(crewInfo) {
      crewRole.innerHTML = crewInfo.role;
      crewName.innerHTML = crewInfo.name.toUpperCase();
      crewDesc.innerHTML = crewInfo.bio;
      crewImage.src = crewInfo.images.png;
    }

    document.addEventListener("click", (entity) => {
      const crewId = entity.target.id.replace("crew-", "");
      const crew = data.crew.find((item) => item.crewId == crewId);
      if (crew) {
        document.querySelectorAll(".inter-crew").forEach((button) => {
          button.classList.remove("active");
          button.classList.remove("in-2");
        });
        entity.target.classList.add("active");
        getCrewInfo(crew);
      }
    });

    function getTechnologyInfo(technologyInfo) {
      techName.innerHTML = technologyInfo.name.toUpperCase();
      techDesc.innerHTML = technologyInfo.description;
      techImage.src = technologyInfo.images.portrait;
    }

    document.addEventListener("click", (entity) => {
      const techId = entity.target.id.replace("tech-", "");
      const tech = data.technology.find((item) => item.techId == techId);
      if (tech) {
        document.querySelectorAll(".inter-tech").forEach((button) => {
          button.classList.remove("active");
          button.classList.remove("in-3");
          getTechnologyInfo(tech);
        });
        entity.target.classList.add("in-3");
      }
    });
  } catch (e) {
    console.log(e);
  }
}

getInfo();
