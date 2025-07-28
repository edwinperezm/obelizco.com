<?php
/**
 * Custom footer for Jornal Landing Page
 */
?>

<!-- Minimal footer for landing page -->
<footer style="background: #1f2937; color: white; padding: 40px 0; text-align: center;">
    <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <p style="margin: 0; opacity: 0.8; font-size: 0.875rem;">
            &copy; <?php echo date('Y'); ?> obe&liz.co - Educación cristocéntrica en el hogar. Todos los derechos reservados.
        </p>
        <div style="margin-top: 20px;">
            <a href="<?php echo home_url('/privacy-policy'); ?>" style="color: #9ca3af; text-decoration: none; margin: 0 15px; font-size: 0.875rem;">Política de Privacidad</a>
            <a href="<?php echo home_url('/terms'); ?>" style="color: #9ca3af; text-decoration: none; margin: 0 15px; font-size: 0.875rem;">Términos de Uso</a>
            <a href="<?php echo home_url('/contact'); ?>" style="color: #9ca3af; text-decoration: none; margin: 0 15px; font-size: 0.875rem;">Contacto</a>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
