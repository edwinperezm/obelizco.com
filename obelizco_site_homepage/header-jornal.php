<?php
/**
 * Custom header for Jornal Landing Page
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <!-- Preload critical fonts -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    
    <?php wp_head(); ?>
    
    <!-- Critical CSS for above-the-fold content -->
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .jornal-landing {
            min-height: 100vh;
        }
        
        /* Hide default WordPress admin bar on landing page */
        .admin-bar .jornal-landing {
            margin-top: -32px;
        }
        
        @media screen and (max-width: 782px) {
            .admin-bar .jornal-landing {
                margin-top: -46px;
            }
        }
    </style>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Minimal header for landing page -->
<header class="jornal-header" style="position: absolute; top: 20px; left: 20px; z-index: 1000;">
    <a href="<?php echo home_url(); ?>" style="color: #1f2937; text-decoration: none; font-weight: 600; font-size: 1.125rem;">
        ← Volver a obe&liz.co
    </a>
</header>
