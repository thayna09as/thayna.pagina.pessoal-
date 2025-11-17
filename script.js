// Configuração do Element SDK
const defaultConfig = {
    page_title: "Thayna",
    welcome_message: "Bem-vindo ao meu mundo!",
    thay_description: "Conte sobre Thay...",
    jesus_description: "Conte sobre Jesus...",
    familia_description: "Conte sobre sua família...",
    amigos_description: "Conte sobre seus amigos...",
    estudos_description: "Conte sobre seus estudos..."
};

let config = { ...defaultConfig };
let currentSlide = 0;
const totalSlides = 6;

async function onConfigChange(newConfig) {
    config = { ...config, ...newConfig };
    
    // Atualizar título da página
    const titleElement = document.getElementById('page-title');
    if (titleElement) {
        titleElement.textContent = config.page_title || defaultConfig.page_title;
    }
    
    // Atualizar mensagem de boas-vindas
    const welcomeElement = document.getElementById('welcome-message');
    if (welcomeElement) {
        welcomeElement.textContent = config.welcome_message || defaultConfig.welcome_message;
    }

    // Atualizar descrições das seções
    const descriptions = [
        { id: 'thay-description', key: 'thay_description' },
        { id: 'jesus-description', key: 'jesus_description' },
        { id: 'familia-description', key: 'familia_description' },
        { id: 'amigos-description', key: 'amigos_description' },
        { id: 'estudos-description', key: 'estudos_description' }
    ];

    descriptions.forEach(desc => {
        const element = document.getElementById(desc.id);
        if (element) {
            element.textContent = config[desc.key] || defaultConfig[desc.key];
        }
    });
}

function mapToCapabilities(config) {
    return {
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["page_title", config.page_title || defaultConfig.page_title],
        ["welcome_message", config.welcome_message || defaultConfig.welcome_message],
        ["thay_description", config.thay_description || defaultConfig.thay_description],
        ["jesus_description", config.jesus_description || defaultConfig.jesus_description],
        ["familia_description", config.familia_description || defaultConfig.familia_description],
        ["amigos_description", config.amigos_description || defaultConfig.amigos_description],
        ["estudos_description", config.estudos_description || defaultConfig.estudos_description]
    ]);
}

// Inicializar SDK quando disponível
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
    config = window.elementSdk.config;
}

// Funções do menu
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

function showSection(sectionId) {
    // Esconder todas as seções
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar a seção selecionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Atualizar menu ativo
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });

    // Encontrar e ativar o item do menu correspondente
    const activeMenuItem = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeMenuItem) {
        activeMenuItem.classList.add('active');
    }

    // Fechar menu em dispositivos móveis
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
    }
}

// Fechar menu ao clicar fora dele
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove('open');
    }
});

// Funções do carrossel
function updateCarousel() {
    const carousel = document.getElementById('carousel');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (carousel) {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function currentSlideFunc(n) {
    currentSlide = n - 1;
    updateCarousel();
}

// Auto-play do carrossel
setInterval(nextSlide, 4000);

// Aplicar configuração inicial
onConfigChange(config);