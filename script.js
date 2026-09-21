const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
}, {threshold:.08});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const closeModal = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); };
document.querySelectorAll('.work-media[data-img]').forEach(item => item.addEventListener('click', () => {
  modalImg.src = item.dataset.img;
  modalImg.alt = item.dataset.title;
  modalTitle.textContent = item.dataset.title;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
}));
document.querySelector('.modal-close')?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if(e.target === modal) closeModal(); });

// Enquiry flow: gives the visitor a reliable choice if their computer has no
// default mail application registered for mailto: links.
const enquiryModal = document.getElementById('enquiry-modal');
const openEnquiry = () => {
  enquiryModal?.classList.add('open');
  enquiryModal?.setAttribute('aria-hidden','false');
};
const closeEnquiry = () => {
  enquiryModal?.classList.remove('open');
  enquiryModal?.setAttribute('aria-hidden','true');
};
document.querySelectorAll('.enquiry-trigger').forEach(btn => btn.addEventListener('click', openEnquiry));
document.querySelectorAll('[data-enquiry-close]').forEach(el => el.addEventListener('click', closeEnquiry));

const copyEmail = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
copyEmail?.addEventListener('click', async () => {
  const email = 'mark_publications@yahoo.co.in';
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = 'Email copied.';
  } catch {
    copyStatus.textContent = email;
  }
});

// Make direct email links attempt mailto normally. If no mail client is
// configured, the visitor gets the enquiry chooser instead of a dead click.
document.querySelectorAll('a[data-email]').forEach(link => {
  link.addEventListener('click', () => {
    setTimeout(() => {
      if (document.visibilityState === 'visible') openEnquiry();
    }, 900);
  });
});

document.addEventListener('keydown', e => {
  if(e.key === 'Escape') { closeModal(); closeEnquiry(); }
});
