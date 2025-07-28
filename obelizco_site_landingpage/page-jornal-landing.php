<?php
/*
Template Name: Jornal Landing Page
*/

get_header(); ?>

<style>
/* Custom CSS for Jornal Landing Page */
.jornal-landing {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #1f2937;
}

.jornal-landing .serif-font {
    font-family: 'DM Serif Display', Georgia, serif;
}

/* Hero Section */
.hero-section {
    background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fde68a 100%);
    padding: 80px 0;
    position: relative;
    overflow: hidden;
}

.hero-section::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%);
    animation: float 20s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-20px, -20px) rotate(180deg); }
}

.hero-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 2;
}

.hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    background: rgba(34, 197, 94, 0.1);
    color: #166534;
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 24px;
    transition: all 0.3s ease;
}

.hero-badge:hover {
    background: rgba(34, 197, 94, 0.15);
    transform: scale(1.05);
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 400;
    line-height: 1.1;
    margin-bottom: 24px;
    color: #1f2937;
}

.hero-title .highlight {
    color: #d97706;
    position: relative;
}

.hero-title .highlight::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 12px;
    background: #fbbf24;
    opacity: 0.3;
    border-radius: 6px;
    transition: all 0.3s ease;
}

.hero-title .highlight:hover::after {
    opacity: 0.5;
    height: 16px;
}

.hero-description {
    font-size: 1.25rem;
    color: #6b7280;
    margin-bottom: 32px;
    line-height: 1.7;
}

.hero-rating {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
}

.stars {
    display: flex;
    margin-right: 12px;
}

.star {
    color: #fbbf24;
    font-size: 20px;
    transition: transform 0.2s ease;
}

.star:hover {
    transform: scale(1.2);
}

.hero-price {
    font-size: 3rem;
    font-weight: 700;
    color: #d97706;
    margin-bottom: 32px;
}

.hero-image {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    height: 400px;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.hero-image:hover {
    transform: scale(1.02);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.hero-image svg {
    width: 120px;
    height: 120px;
    color: white;
    transition: transform 0.3s ease;
}

.hero-image:hover svg {
    transform: scale(1.1);
}

/* CTA Button */
.cta-button {
    display: inline-flex;
    align-items: center;
    background: #d97706;
    color: white;
    padding: 16px 32px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.125rem;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    box-shadow: 0 10px 25px -5px rgba(217, 119, 6, 0.3);
}

.cta-button:hover {
    background: #b45309;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 20px 40px -10px rgba(217, 119, 6, 0.4);
    color: white;
    text-decoration: none;
}

.cta-button svg {
    margin-right: 8px;
    transition: transform 0.3s ease;
}

.cta-button:hover svg {
    transform: scale(1.1);
}

/* What's Included Section */
.included-section {
    padding: 100px 0;
    background: white;
}

.section-title {
    text-align: center;
    font-size: 3rem;
    font-weight: 400;
    margin-bottom: 80px;
    color: #1f2937;
}

.section-title .highlight {
    color: #d97706;
    position: relative;
}

.section-title .highlight::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 12px;
    background: #fbbf24;
    opacity: 0.3;
    border-radius: 6px;
}

.included-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.included-item {
    display: flex;
    align-items: flex-start;
    transition: transform 0.3s ease;
}

.included-item:hover {
    transform: translateX(8px);
}

.check-icon {
    color: #10b981;
    margin-right: 16px;
    margin-top: 4px;
    flex-shrink: 0;
    transition: transform 0.3s ease;
}

.included-item:hover .check-icon {
    transform: scale(1.2);
}

.included-content h3 {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 8px;
    font-size: 1.125rem;
}

.included-content p {
    color: #6b7280;
    line-height: 1.6;
}

/* Testimonials Section */
.testimonials-section {
    padding: 100px 0;
    background: #f9fafb;
}

.testimonials-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.testimonial-card {
    background: white;
    padding: 40px;
    border-radius: 24px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.testimonial-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

.testimonial-stars {
    display: flex;
    margin-bottom: 24px;
}

.testimonial-text {
    font-style: italic;
    color: #4b5563;
    margin-bottom: 24px;
    line-height: 1.7;
    font-size: 1.125rem;
}

.testimonial-author {
    display: flex;
    align-items: center;
}

.author-avatar {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    margin-right: 16px;
    transition: transform 0.3s ease;
}

.testimonial-card:hover .author-avatar {
    transform: scale(1.1) rotate(5deg);
}

.author-info h4 {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 4px;
}

.author-info p {
    color: #6b7280;
    font-size: 0.875rem;
}

/* Final CTA Section */
.final-cta {
    padding: 100px 0;
    background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
    color: white;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.final-cta::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
}

.final-cta-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 2;
}

.final-cta h2 {
    font-size: 3rem;
    font-weight: 400;
    margin-bottom: 24px;
}

.final-cta .highlight {
    color: #fbbf24;
}

.final-cta p {
    font-size: 1.25rem;
    margin-bottom: 32px;
    opacity: 0.9;
}

.final-cta .hero-price {
    color: white;
    margin-bottom: 32px;
}

.cta-button-white {
    background: white;
    color: #d97706;
}

.cta-button-white:hover {
    background: #f3f4f6;
    color: #b45309;
}

.guarantee-text {
    font-size: 0.875rem;
    opacity: 0.8;
    margin-top: 16px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-grid {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    .included-grid {
        grid-template-columns: 1fr;
    }
    
    .testimonials-grid {
        grid-template-columns: 1fr;
    }
    
    .section-title {
        font-size: 2.5rem;
    }
    
    .final-cta h2 {
        font-size: 2.5rem;
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 2rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .final-cta h2 {
        font-size: 2rem;
    }
    
    .testimonial-card {
        padding: 24px;
    }
}
</style>

<div class="jornal-landing">
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="hero-content">
            <div class="hero-grid">
                <div>
                    <div class="hero-badge">
                        ⭐ MÁS POPULAR
                    </div>
                    <h1 class="hero-title serif-font">
                        Jornal de <span class="highlight">21 Días</span>
                    </h1>
                    <p class="hero-description">
                        Transforma tu rutina familiar con reflexiones diarias, versículos bíblicos y actividades diseñadas para integrar fe y aprendizaje desde el primer día.
                    </p>
                    <div class="hero-rating">
                        <div class="stars">
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                        </div>
                        <span>4.9/5 • 500+ familias</span>
                    </div>
                    <div class="hero-price serif-font">$29 USD</div>
                    <a href="#comprar" class="cta-button">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Comprar Ahora
                    </a>
                </div>
                <div class="hero-image">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                    </svg>
                </div>
            </div>
        </div>
    </section>

    <!-- What's Included Section -->
    <section class="included-section">
        <h2 class="section-title serif-font">
            Qué Incluye el <span class="highlight">Jornal</span>
        </h2>
        <div class="included-grid">
            <div class="included-item">
                <svg class="check-icon" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <div class="included-content">
                    <h3>21 Reflexiones Diarias</h3>
                    <p>Meditaciones centradas en Cristo para comenzar cada día con propósito</p>
                </div>
            </div>
            
            <div class="included-item">
                <svg class="check-icon" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <div class="included-content">
                    <h3>Versículos Temáticos</h3>
                    <p>Escrituras seleccionadas para fortalecer la fe familiar</p>
                </div>
            </div>
            
            <div class="included-item">
                <svg class="check-icon" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <div class="included-content">
                    <h3>Actividades Prácticas</h3>
                    <p>Ejercicios para aplicar las enseñanzas en la vida diaria</p>
                </div>
            </div>
            
            <div class="included-item">
                <svg class="check-icon" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <div class="included-content">
                    <h3>Preguntas de Reflexión</h3>
                    <p>Para profundizar en la aplicación personal y familiar</p>
                </div>
            </div>
            
            <div class="included-item">
                <svg class="check-icon" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <div class="included-content">
                    <h3>Rutinas Espirituales</h3>
                    <p>Estructura para establecer hábitos cristianos duraderos</p>
                </div>
            </div>
            
            <div class="included-item">
                <svg class="check-icon" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <div class="included-content">
                    <h3>Guía de Implementación</h3>
                    <p>Instrucciones paso a paso para usar el jornal efectivamente</p>
                </div>
            </div>
            
            <div class="included-item">
                <svg class="check-icon" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <div class="included-content">
                    <h3>Formato PDF Imprimible</h3>
                    <p>Diseño hermoso y funcional para imprimir en casa</p>
                </div>
            </div>
            
            <div class="included-item">
                <svg class="check-icon" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <div class="included-content">
                    <h3>Acceso de por Vida</h3>
                    <p>Descarga inmediata y acceso permanente al contenido</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
        <h2 class="section-title serif-font">
            Lo que Dicen las <span class="highlight">Familias</span>
        </h2>
        <div class="testimonials-grid">
            <div class="testimonial-card">
                <div class="testimonial-stars">
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                </div>
                <p class="testimonial-text">
                    "El Jornal transformó completamente nuestras mañanas. Ahora comenzamos cada día con Cristo en el centro, y mis hijos han desarrollado un amor genuino por la Palabra de Dios."
                </p>
                <div class="testimonial-author">
                    <div class="author-avatar">MG</div>
                    <div class="author-info">
                        <h4>María García</h4>
                        <p>Madre de 3, Colombia</p>
                    </div>
                </div>
            </div>
            
            <div class="testimonial-card">
                <div class="testimonial-stars">
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                </div>
                <p class="testimonial-text">
                    "Después de usar el Jornal por 21 días, establecimos rutinas que han perdurado por meses. Es increíble cómo algo tan simple puede tener un impacto tan profundo."
                </p>
                <div class="testimonial-author">
                    <div class="author-avatar">AL</div>
                    <div class="author-info">
                        <h4>Ana López</h4>
                        <p>Madre de 2, México</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Final CTA Section -->
    <section class="final-cta">
        <div class="final-cta-content">
            <h2 class="serif-font">
                Comienza tu Transformación <span class="highlight">Hoy</span>
            </h2>
            <p>
                Únete a las 500+ familias que ya han transformado su educación en casa con el Jornal de 21 Días.
            </p>
            <div class="hero-price serif-font">$29 USD</div>
            <a href="#comprar" class="cta-button cta-button-white">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
                Obtener el Jornal Ahora
            </a>
            <p class="guarantee-text">
                Descarga inmediata • Garantía de 30 días • Acceso de por vida
            </p>
        </div>
    </section>
</div>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<script>
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.testimonial-card, .included-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
</script>

<?php get_footer(); ?>
