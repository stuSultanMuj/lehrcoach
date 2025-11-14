// ==================== JOURNEY STEPS DATA ==================== 
const journeySteps = [
    {
        step: 1,
        title: 'Lehrstelle finden',
        desc: 'Durchsuche tausende Lehrstellen in der ganzen Schweiz. Intelligente Filter helfen dir, deine Traumlehrstelle zu finden.',
        icon: '🔍',
        class: 'blue'
    },
    {
        step: 2,
        title: 'Professionell bewerben',
        desc: 'KI-gestützte Bewerbungsoptimierung. Erstelle professionelle Lebensläufe und Motivationsschreiben in Minuten.',
        icon: '📄',
        class: 'cyan'
    },
    {
        step: 3,
        title: 'Alles an einem Ort',
        desc: 'Behalte den Überblick über alle Bewerbungen. Wir benachrichtigen dich sofort bei Rückmeldungen und unterstützen bei Vertragsverhandlungen.',
        icon: '🏠',
        class: 'orange'
    },
    {
        step: 4,
        title: 'Lehre meistern',
        desc: 'Digitales Lehrtagebuch, Zusammenarbeit mit deinem Lehrbetrieb und persönliche Begleitung während der gesamten Lehrzeit.',
        icon: '🎓',
        class: 'teal'
    },
    {
        step: 5,
        title: 'Karriere starten',
        desc: 'Nach erfolgreichem Abschluss unterstützen wir dich bei deinen nächsten Karriereschritten und Weiterbildungsmöglichkeiten.',
        icon: '📈',
        class: 'emerald'
    }
];

// ==================== RENDER JOURNEY STEPS ==================== 
function renderJourneySteps() {
    const container = document.getElementById('journeySteps');
    container.innerHTML = journeySteps.map((step, index) => {
        const rightLayout = index % 2 !== 0 ? 'right-layout' : '';
        const classMap = {
            'blue': 'step-blue',
            'cyan': 'step-cyan',
            'orange': 'step-orange',
            'teal': 'step-teal',
            'emerald': 'step-emerald'
        };
        const contentClassMap = {
            'blue': 'step-blue-content',
            'cyan': 'step-cyan-content',
            'orange': 'step-orange-content',
            'teal': 'step-teal-content',
            'emerald': 'step-emerald-content'
        };
        return `
            <div class="journey-step ${rightLayout}" data-step="${index}">
                <div class="step-content ${contentClassMap[step.class]}">
                    <span class="step-number" style="color: currentColor;">Schritt ${step.step}</span>
                    <h3 class="step-title">${step.title}</h3>
                    <p class="step-desc">${step.desc}</p>
                </div>
                <div class="step-icon ${classMap[step.class]}">${step.icon}</div>
            </div>
        `;
    }).join('');
}

// ==================== NAVBAR SCROLL EFFECT ==================== 
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Journey section scroll-triggered activation and progress line
    const journeySection = document.getElementById('journey');
    if (!journeySection) return;

    const rect = journeySection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
    const activeStep = Math.min(Math.floor(scrollProgress * 5), 4);

    const steps = document.querySelectorAll('.journey-step');
    steps.forEach((step, index) => {
        if (index <= activeStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Update progress line height
    const journeySteps = document.getElementById('journeySteps');
    if (journeySteps) {
        const totalHeight = journeySteps.scrollHeight;
        const progressHeight = (activeStep + 1) * (totalHeight / 5);
        journeySteps.style.setProperty('--progress-height', progressHeight + 'px');
    }
});

// ==================== TAB SWITCHING ==================== 
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = 'grid';
        selectedTab.classList.add('active');
    }

    // Highlight selected button
    document.querySelector(`.tab-button.${tabName}`).classList.add('active');
}

// ==================== SCROLL TO SECTION ==================== 
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================== MOBILE MENU TOGGLE ==================== 
document.getElementById('navToggle').addEventListener('click', function() {
    this.classList.toggle('active');
});

// ==================== INITIALIZATION ==================== 
document.addEventListener('DOMContentLoaded', () => {
    renderJourneySteps();
});
