<?php
// Add this to your theme's functions.php file

// Enqueue custom styles and scripts for the Jornal landing page
function enqueue_jornal_landing_assets() {
    if (is_page_template('page-jornal-landing.php')) {
        // Enqueue Google Fonts
        wp_enqueue_style(
            'jornal-fonts',
            'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap',
            array(),
            '1.0.0'
        );
        
        // Add custom CSS for better performance
        wp_add_inline_style('jornal-fonts', '
            .jornal-landing * {
                box-sizing: border-box;
            }
            
            .jornal-landing {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
        ');
    }
}
add_action('wp_enqueue_scripts', 'enqueue_jornal_landing_assets');

// Add custom body class for the Jornal landing page
function add_jornal_landing_body_class($classes) {
    if (is_page_template('page-jornal-landing.php')) {
        $classes[] = 'jornal-landing-page';
    }
    return $classes;
}
add_filter('body_class', 'add_jornal_landing_body_class');

// Remove default WordPress styles on the landing page for cleaner look
function remove_default_styles_jornal_landing() {
    if (is_page_template('page-jornal-landing.php')) {
        // Remove theme styles that might interfere
        wp_dequeue_style('wp-block-library');
        wp_dequeue_style('wp-block-library-theme');
        wp_dequeue_style('wc-block-style');
    }
}
add_action('wp_enqueue_scripts', 'remove_default_styles_jornal_landing', 100);

// Add meta tags for better SEO and social sharing
function jornal_landing_meta_tags() {
    if (is_page_template('page-jornal-landing.php')) {
        echo '<meta name="description" content="Transforma tu rutina familiar con el Jornal de 21 Días. Reflexiones diarias, versículos bíblicos y actividades para integrar fe y aprendizaje.">';
        echo '<meta property="og:title" content="Jornal de 21 Días - Educación Cristocéntrica">';
        echo '<meta property="og:description" content="Guía diaria con versículos, reflexiones y actividades para establecer rutinas espirituales en tu homeschool.">';
        echo '<meta property="og:type" content="product">';
        echo '<meta name="twitter:card" content="summary_large_image">';
    }
}
add_action('wp_head', 'jornal_landing_meta_tags');
?>
