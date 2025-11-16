import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();


// Toggle the entire FAQ section
const faqToggle = document.querySelector('.faq-toggle');
const faqSection = document.querySelector('.faq-section');

faqToggle.addEventListener('click', () => {
  if (faqSection.style.maxHeight) {
    faqSection.style.maxHeight = null;
  } else {
    faqSection.style.maxHeight = faqSection.scrollHeight + 'px';
  }
});

// Individual FAQ items collapsible
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;

    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});
