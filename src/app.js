import config from './data/config.json';
import projects from './data/projects.json';

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && value) element.textContent = value;
};

const createLink = (label, href, external = false) => {
  const link = document.createElement('a');
  link.textContent = label;
  link.href = href;
  if (external) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  return link;
};

const initials = config.name
  .trim()
  .split(/\s+/)
  .map((part) => part[0])
  .join('')
  .toUpperCase();

document.title = `${config.name} | Portfolio`;
document.documentElement.lang = 'en';
document.documentElement.style.setProperty('--color-background', config.colors.background);
document.documentElement.style.setProperty('--color-surface', config.colors.surface);
document.documentElement.style.setProperty('--color-text', config.colors.text);
document.documentElement.style.setProperty('--color-muted', config.colors.muted);
document.documentElement.style.setProperty('--color-accent', config.colors.accent);
const metaDescription = document.querySelector('meta[name="description"]');
if (metaDescription) {
  metaDescription.content = `${config.name} — ${config.profession}.`;
}

setText('[data-brand-initials]', initials);
setText('[data-profession]', config.profession);
setText('[data-headline]', config.headline);
setText('[data-name]', config.name);
setText('[data-footer-name]', config.name);
setText('[data-year]', String(new Date().getFullYear()));

const aboutContainer = document.querySelector('[data-profile="about"]');
for (const paragraph of config.about) {
  const element = document.createElement('p');
  const headingSeparator = paragraph.indexOf(': ');
  if (headingSeparator > 0) {
    const heading = document.createElement('strong');
    heading.textContent = `${paragraph.slice(0, headingSeparator)}: `;
    element.append(heading, document.createTextNode(paragraph.slice(headingSeparator + 2)));
  } else {
    element.textContent = paragraph;
  }
  aboutContainer.append(element);
}

const skillsContainer = document.querySelector('[data-skills]');
for (const skill of config.skills) {
  const item = document.createElement('li');
  item.textContent = skill;
  skillsContainer.append(item);
}

const projectsContainer = document.querySelector('[data-projects]');
for (const project of projects) {
  const card = document.createElement('article');
  card.className = 'project-card';

  const top = document.createElement('div');
  top.className = 'project-card-top';
  const category = document.createElement('p');
  category.className = 'project-category';
  category.textContent = project.category;
  top.append(category);
  if (project.isExample) {
    const example = document.createElement('span');
    example.className = 'example-label';
    example.textContent = 'Template example';
    top.append(example);
  }

  const title = document.createElement('h3');
  title.textContent = project.name;
  const description = document.createElement('p');
  description.className = 'project-description';
  description.textContent = project.description;
  const technologyList = document.createElement('ul');
  technologyList.className = 'technology-list';
  technologyList.setAttribute('aria-label', 'Technologies');
  for (const technology of project.technologies) {
    const technologyItem = document.createElement('li');
    technologyItem.textContent = technology;
    technologyList.append(technologyItem);
  }

  card.append(top, title, description, technologyList);
  if (project.url) {
    const projectLink = createLink('View project ↗', project.url, true);
    projectLink.className = 'project-link';
    card.append(projectLink);
  }
  projectsContainer.append(card);
}

const contactLinks = document.querySelector('[data-contact-links]');
if (config.contact.email) {
  contactLinks.append(createLink('Email me ↗', `mailto:${config.contact.email}`));
}
if (config.contact.github) {
  contactLinks.append(createLink('GitHub ↗', config.contact.github, true));
}
if (config.contact.linkedin) {
  contactLinks.append(createLink('LinkedIn ↗', config.contact.linkedin, true));
}
if (config.contact.website) {
  contactLinks.append(createLink('Website ↗', config.contact.website, true));
}

const menuToggle = document.querySelector('[data-menu-toggle]');
const siteHeader = document.querySelector('[data-site-header]');
const closeMenu = (restoreFocus = false) => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  siteHeader.removeAttribute('data-menu-open');
  if (restoreFocus) menuToggle.focus();
};

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
  siteHeader.toggleAttribute('data-menu-open', !isExpanded);
});

siteHeader.querySelectorAll('.primary-navigation a').forEach((link) => {
  link.addEventListener('click', () => closeMenu());
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu(true);
  }
});

window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 769px)').matches) closeMenu();
});
