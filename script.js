/* ============================================
   K9 NAIL DESIGNER - SCRIPT.JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ============ MENU MOBILE ============
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');

            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function (e) {
        if (navbar && !navbar.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // ============ HEADER SCROLL ============
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ============ SCROLL SUAVE E LINK ATIVO ============
    const sections = document.querySelectorAll('section[id]');

    function activeLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', activeLink);

    // ============ BOTÃO VOLTAR AO TOPO ============
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============ FORMULÁRIO DE CONTATO ============
    const formContato = document.getElementById('form-contato');

    if (formContato) {
        formContato.addEventListener('submit', function (e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const email = document.getElementById('email').value.trim();
            const servico = document.getElementById('servico').value;
            const mensagem = document.getElementById('mensagem').value.trim();

            // Validação básica
            if (!nome || !telefone || !email || !servico || !mensagem) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Validação de e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }

            // Monta a mensagem para o WhatsApp
            const textoWhatsApp = 
                `*Nova Mensagem - K9 Nail Designer*%0A%0A` +
                `*Nome:* ${encodeURIComponent(nome)}%0A` +
                `*Telefone:* ${encodeURIComponent(telefone)}%0A` +
                `*E-mail:* ${encodeURIComponent(email)}%0A` +
                `*Serviço:* ${encodeURIComponent(servico)}%0A` +
                `*Mensagem:* ${encodeURIComponent(mensagem)}`;

            const numeroWhatsApp = '5522996187173';
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${textoWhatsApp}`;

            // Abre o WhatsApp
            window.open(urlWhatsApp, '_blank');

            // Feedback visual
            const botao = formContato.querySelector('button[type="submit"]');
            const textoOriginal = botao.innerHTML;
            botao.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
            botao.style.background = 'linear-gradient(135deg, #06D6A0 0%, #00B4D8 100%)';

            setTimeout(() => {
                botao.innerHTML = textoOriginal;
                botao.style.background = '';
                formContato.reset();
            }, 3000);
        });
    }

    // ============ ANIMAÇÃO DE ENTRADA (SCROLL REVEAL) ============
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animarElementos = document.querySelectorAll(
        '.servico-card, .depoimento-card, .galeria-item, .info-card, .info-item'
    );

    animarElementos.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
        observer.observe(el);
    });

    // ============ EFEITO RIPPLE NOS BOTÕES ============
    const botoes = document.querySelectorAll('.btn, .btn-agendar');

    botoes.forEach(botao => {
        botao.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';

            // Garante que o botão tenha position relative
            if (getComputedStyle(this).position === 'static') {
                this.style.position = 'relative';
            }
            this.style.overflow = 'hidden';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Adiciona keyframe do ripple dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ============ CONTADOR ANIMADO (HERO STATS) ============
    const statsNumeros = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        const rect = heroStats.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            statsAnimated = true;

            statsNumeros.forEach(stat => {
                const texto = stat.textContent.trim();
                const numero = parseInt(texto.replace(/\D/g, ''));
                const sufixo = texto.replace(/[0-9]/g, '');

                if (isNaN(numero)) return;

                let atual = 0;
                const incremento = numero / 50;
                const duracao = 1500;
                const passo = duracao / 50;

                const timer = setInterval(() => {
                    atual += incremento;
                    if (atual >= numero) {
                        stat.textContent = numero + sufixo;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(atual) + sufixo;
                    }
                }, passo);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    setTimeout(animateStats, 500);

    // ============ EFEITO PARALLAX SUAVE NO HERO ============
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = scrolled * 0.3 + 'px';
            }
        });
    }

    // ============ ANO ATUAL NO FOOTER ============
    const footerAno = document.querySelector('.footer-bottom p:first-child');
    if (footerAno) {
        const anoAtual = new Date().getFullYear();
        footerAno.innerHTML = footerAno.innerHTML.replace('2026', anoAtual);
    }

    // ============ TOOLTIP NOS ÍCONES SOCIAIS ============
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function () {
            const title = this.getAttribute('title');
            if (title) {
                this.setAttribute('aria-label', title);
            }
        });
    });

    console.log('%c✨ K9 Nail Designer ✨', 'background: linear-gradient(135deg, #FF2D95, #9D4EDD); color: white; padding: 10px 20px; border-radius: 10px; font-size: 16px; font-weight: bold;');
    console.log('%cSite carregado com sucesso! 💅', 'color: #FF2D95; font-size: 14px; font-weight: bold;');

});
