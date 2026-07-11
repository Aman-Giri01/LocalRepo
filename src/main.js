// import projects from '../api/projects.json'
// const projectContainer = document.querySelector('.portfolio-container');
// const template = document.querySelector("#template");


//     projects.forEach((projs) => {
//       const { name, image, link,desc } = projs;

//       const clone = document.importNode(template.content, true);
//       clone.querySelector('.ProjectName').textContent = name;
//       clone.querySelector('.ProjectImage').src = image;
//       clone.querySelector('.ProjectImage').alt = name;
//       clone.querySelector('.desc').textContent = desc;
//       clone.querySelector('.visit-link').href = link || "#";

//       projectContainer.append(clone);
//     });
  
import projects from '../api/projects.json'

/* =========================================================
   Counter backend (Abacus - free, no signup/API key needed)
   Docs: https://abacus.jasoncameron.dev/
   Change COUNTER_NAMESPACE if you fork this site, so your
   counters don't collide with anyone else's.
========================================================= */
const COUNTER_NAMESPACE = "amangiri-portfolio-dev";
const COUNTER_BASE = "https://abacus.jasoncameron.dev";

async function hitCounter(key) {
  try {
    const res = await fetch(`${COUNTER_BASE}/hit/${COUNTER_NAMESPACE}/${key}`);
    const data = await res.json();
    return data.value ?? 0;
  } catch (err) {
    console.warn("Counter service unavailable:", err);
    return null;
  }
}

async function getCounter(key) {
  try {
    const res = await fetch(`${COUNTER_BASE}/get/${COUNTER_NAMESPACE}/${key}`);
    if (res.status === 404) return 0;
    const data = await res.json();
    return data.value ?? 0;
  } catch (err) {
    console.warn("Counter service unavailable:", err);
    return null;
  }
}

function formatCount(n) {
  if (n === null || n === undefined) return "--";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

/* =========================================================
   Profile view counter (Home section)
========================================================= */
async function initProfileViewCounter() {
  const countEl = document.getElementById("profile-views-count");
  if (!countEl) return;

  const alreadyCountedThisSession = sessionStorage.getItem("profile-view-counted");

  if (alreadyCountedThisSession) {
    const value = await getCounter("profile-views");
    countEl.textContent = formatCount(value);
  } else {
    const value = await hitCounter("profile-views");
    sessionStorage.setItem("profile-view-counted", "1");
    countEl.textContent = formatCount(value);
  }
}

/* =========================================================
   Portfolio cards
========================================================= */
const projectContainer = document.querySelector('.portfolio-container');
const cardTemplate = document.querySelector("#template");
const modalTemplate = document.querySelector("#project-modal-template");

function buildFeatureGrid(container, features = []) {
  container.innerHTML = "";
  features.forEach((feature) => {
    const item = document.createElement("div");
    item.className = "project-feature-item";
    item.innerHTML = `<i class="${feature.icon || 'ri-checkbox-circle-line'}"></i><p>${feature.text}</p>`;
    container.append(item);
  });
}

function buildTechTags(container, techStack = []) {
  container.innerHTML = "";
  techStack.forEach((tech) => {
    const tag = document.createElement("span");
    tag.className = "tech-tag";
    tag.textContent = tech;
    container.append(tag);
  });
}

function openModal(backdrop, modal) {
  backdrop.style.display = "flex";
  document.body.classList.add("modal-open");
  setTimeout(() => {
    backdrop.classList.add("active");
    modal.classList.add("active");
  }, 10);
}

function closeModal(backdrop, modal) {
  backdrop.classList.remove("active");
  modal.classList.remove("active");
  setTimeout(() => {
    backdrop.style.display = "none";
    document.body.classList.remove("modal-open");
  }, 400);
}

function renderProjects() {
  if (!projectContainer || !cardTemplate) return;

  projects.forEach((project) => {
    const {
      id, name, image, link, desc, tag, live,
      problem, features, techStack,category
    } = project;

    /* ---------- Build the card ---------- */
    const cardClone = document.importNode(cardTemplate.content, true);
    const cardRoot = cardClone.querySelector(".card-with-modal");

    cardClone.querySelectorAll(".ProjectName").forEach(el => el.textContent = name);
    cardClone.querySelectorAll(".ProjectImage").forEach(el => { el.src = image; el.alt = name; });
    cardClone.querySelector(".desc").textContent = desc;
    cardClone.querySelector(".ProjectTag").textContent = category || "Personal Project";
    cardClone.querySelectorAll(".visit-link").forEach(el => el.href = link || "#");

    const statusBadge = cardClone.querySelector(".card-status-badge");
    if (live === false) {
      statusBadge.querySelector(".StatusText").textContent = "Demo";
      statusBadge.classList.add("offline");
    }

    projectContainer.append(cardClone);

    /* ---------- Build the details modal (appended once, at body level) ---------- */
    const modalClone = document.importNode(modalTemplate.content, true);
    const backdrop = modalClone.querySelector(".project-modal-backdrop");
    const modal = modalClone.querySelector(".project-modal");

    modalClone.querySelectorAll(".ProjectName").forEach(el => el.textContent = name);
    modalClone.querySelectorAll(".ProjectImage").forEach(el => { el.src = image; el.alt = name; });
    modalClone.querySelector(".desc").textContent = desc;
    modalClone.querySelector(".ProjectTag").textContent = tag || "Personal Project";
    modalClone.querySelectorAll(".visit-link").forEach(el => el.href = link || "#");

    const modalStatusBadge = modalClone.querySelector(".card-status-badge");
    if (live === false) {
      modalStatusBadge.querySelector(".StatusText").textContent = "Demo";
      modalStatusBadge.classList.add("offline");
    }

    const problemBox = modalClone.querySelector(".ProblemBox");
    if (problem) {
      modalClone.querySelector(".ProblemText").textContent = problem;
    } else {
      problemBox.style.display = "none";
    }

    buildFeatureGrid(modalClone.querySelector(".FeatureGrid"), features || []);
    if (!features || !features.length) {
      modalClone.querySelector(".FeatureGrid").style.display = "none";
    }

    buildTechTags(modalClone.querySelector(".TechStackTags"), techStack || []);
    if (!techStack || !techStack.length) {
      modalClone.querySelector(".TechStackTags").style.display = "none";
      modalClone.querySelector(".tech-stack-title").style.display = "none";
    }

    document.body.append(modalClone);

    /* ---------- Wire up interactions for this card ---------- */
    // Grab the just-appended card (last one in the container)
    const allCards = projectContainer.querySelectorAll(".card-with-modal");
    const thisCard = allCards[allCards.length - 1];

    const detailsBtn = thisCard.querySelector(".details-btn");
    const closeBtn = backdrop.querySelector(".modal-close-btn");

    detailsBtn.addEventListener("click", () => openModal(backdrop, modal));
    closeBtn.addEventListener("click", () => closeModal(backdrop, modal));
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal(backdrop, modal);
    });

    // View counter: count a "view" the first time this project's
    // Details modal is opened during the visit.
    const viewKey = `project-views-${id}`;
    const cardViewCountEl = thisCard.querySelector(".ViewCount");
    const modalViewCountEl = backdrop.querySelector(".ModalViewCount");

    getCounter(viewKey).then((value) => {
      cardViewCountEl.textContent = formatCount(value);
      modalViewCountEl.textContent = formatCount(value);
    });

    let viewCountedThisSession = false;
    detailsBtn.addEventListener("click", async () => {
      if (viewCountedThisSession) return;
      viewCountedThisSession = true;
      const value = await hitCounter(viewKey);
      cardViewCountEl.textContent = formatCount(value);
      modalViewCountEl.textContent = formatCount(value);
    });

    // Like counter: real-time, one like per visitor (stored locally)
    const likeKey = `project-likes-${id}`;
    const likeBtn = thisCard.querySelector(".like-btn");
    const cardLikeCountEl = thisCard.querySelector(".LikeCount");
    const modalLikeCountEl = backdrop.querySelector(".ModalLikeCount");
    const alreadyLiked = localStorage.getItem(`liked-${id}`) === "1";

    if (alreadyLiked) likeBtn.classList.add("liked");

    getCounter(likeKey).then((value) => {
      cardLikeCountEl.textContent = formatCount(value);
      modalLikeCountEl.textContent = formatCount(value);
    });

    likeBtn.addEventListener("click", async () => {
      if (likeBtn.classList.contains("liked")) return; // one like per visitor
      likeBtn.classList.add("liked", "like-pop");
      localStorage.setItem(`liked-${id}`, "1");

      const value = await hitCounter(likeKey);
      cardLikeCountEl.textContent = formatCount(value);
      modalLikeCountEl.textContent = formatCount(value);

      setTimeout(() => likeBtn.classList.remove("like-pop"), 300);
    });
  });
}

renderProjects();
initProfileViewCounter(); 
