/* script.js */

document.addEventListener('DOMContentLoaded', () => {
  // Toggle Menu
  const toggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('.nav-list');
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // FAQ Acordeão - Modificado para abrir apenas o primeiro por padrão e adicionar ícone de seta
  const questions = document.querySelectorAll('.faq-question');

  // Adiciona a seta para todas as perguntas e abre a primeira por padrão
  questions.forEach((btn, index) => {
    // Adiciona o ícone de seta
    const arrowIcon = document.createElement('i');
    arrowIcon.classList.add('fas', 'fa-chevron-down'); // Ícone de seta para baixo
    btn.appendChild(arrowIcon);

    const answer = btn.nextElementSibling;

    // Se for o primeiro item, abre e gira a seta
    if (index === 0) {
      answer.style.display = 'block';
      btn.classList.add('open'); // Adiciona classe para estilização da seta
      arrowIcon.classList.add('rotated'); // Gira a seta
    } else {
      answer.style.display = 'none'; // Garante que os outros estejam fechados
    }

    btn.addEventListener('click', () => {
      // Fecha todas as outras respostas e reseta suas setas
      questions.forEach(otherBtn => {
        if (otherBtn !== btn) { // Não altera o botão clicado
          otherBtn.nextElementSibling.style.display = 'none';
          otherBtn.classList.remove('open');
          otherBtn.querySelector('.fa-chevron-down').classList.remove('rotated');
        }
      });

      // Alterna a exibição da resposta clicada
      const isCurrentlyOpen = answer.style.display === 'block';
      answer.style.display = isCurrentlyOpen ? 'none' : 'block';
      btn.classList.toggle('open', !isCurrentlyOpen); // Adiciona/remove a classe 'open'
      arrowIcon.classList.toggle('rotated', !isCurrentlyOpen); // Gira a seta

    });
  });

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      // Apenas scroll se o link estiver na mesma página
      if (this.hostname === location.hostname && this.pathname === location.pathname) {
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      } else {
        // Para links entre páginas, permita o comportamento padrão
        window.location.href = this.href;
      }
    });
  });

  // Validação simples
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const telefone = form.telefone.value.trim();
      if (!nome || !email || !telefone) {
        e.preventDefault();
        alert('Preencha todos os campos obrigatórios.');
      }
    });
  }

  // Interatividade dos Cards de Pacotes (Apenas na página de serviços)
  const planCards = document.querySelectorAll('.plan-cards .card:not(.destaque)'); // Seleciona todos os cards, exceto o de destaque

  planCards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove a classe 'selected' de todos os outros cards
      planCards.forEach(otherCard => {
        otherCard.classList.remove('selected');
      });
      // Adiciona a classe 'selected' ao card clicado
      card.classList.add('selected');
    });
  });
});