<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms and Conditions | EXIF Image Date and Time Changer</title>
  <meta name="description" content="Terms of use for the EXIF Image Date and Time Changer — a free, client-side EXIF date correction tool." />
  <meta property="og:title" content="Terms and Conditions | EXIF Image Date and Time Changer" />
  <meta property="og:description" content="Terms of use for the EXIF Image Date and Time Changer — a free, client-side EXIF date correction tool." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Terms and Conditions</p>
  </div>

  <article class="prose">
    <h1>Terms and Conditions</h1>

    <p class="post-meta">Effective Date: December 13, 2025</p>

    <h2>1. Acceptance of Terms</h2>
    <p>By accessing or using the <strong>EXIF Image Date and Time Changer</strong> (the "Tool"), you agree to be bound by these Terms and Conditions. This is a free, open-source, client-side web utility provided as-is for correcting EXIF capture dates in JPEG images. If you do not agree with any part of these terms, please do not use the Tool.</p>

    <h2>2. Nature of the Tool</h2>
    <p>The Tool operates entirely within your web browser. <strong>No data is uploaded, stored, or transmitted</strong> to any server. All image processing and EXIF modifications occur locally on your device using JavaScript. You are solely responsible for the images you process and the resulting files.</p>

    <h2>3. License and Usage</h2>
    <p>You are granted a <strong>non-exclusive, royalty-free license</strong> to use the Tool for personal or commercial purposes. You may process unlimited images, create corrected copies, and distribute those copies as needed. However, you must not:</p>
    <ul>
      <li>Modify or redistribute the Tool's source code without retaining original attribution</li>
      <li>Use the Tool for unlawful purposes or to infringe third-party rights</li>
      <li>Attempt to reverse-engineer or extract proprietary algorithms beyond the open-source code</li>
      <li>Claim the Tool as your own creation</li>
    </ul>

    <h2>4. No Warranty</h2>
    <p>The Tool is provided <strong>"as is"</strong> without any warranties, expressed or implied, including but not limited to accuracy, reliability, or fitness for a particular purpose. We do not guarantee that the Tool will meet your requirements or produce error-free results. <em>Use at your own risk</em>.</p>

    <h2>5. Limitation of Liability</h2>
    <p>We shall not be liable for any direct, indirect, incidental, or consequential damages arising from use of the Tool, including but not limited to data loss, image corruption, or incorrect metadata. Since no data is collected, we cannot restore or recover any processed files.</p>

    <h2>6. Intellectual Property</h2>
    <p>The Tool's source code is open-source and available publicly. All rights to the design and implementation remain with the original author unless explicitly transferred.</p>

    <h2>7. Changes to Terms</h2>
    <p>We reserve the right to modify these Terms at any time. Continued use after changes constitutes acceptance of the new terms.</p>

    <h2>8. Governing Law</h2>
    <p>These terms shall be governed by general internet usage principles and applicable open-source licensing.</p>

    <p class="italic-note">Thank you for using the <strong>EXIF Image Date and Time Changer</strong> — a tool built with privacy and simplicity in mind.</p>
  </article>
</div>

<style>
  .post-layout {
    max-width: 800px;
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }
  .breadcrumbs a {
    color: var(--wine-red);
    text-decoration: none;
  }
  .breadcrumbs a:hover {
    text-decoration: underline;
  }
  .breadcrumbs p {
    margin: 0;
  }

  .prose {
    line-height: 1.8;
  }

  .prose .post-meta {
    color: var(--color-text-muted);
    font-size: 0.9rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--glass-border);
    padding-bottom: 1rem;
  }

  .prose h1,
  .prose h2{
    color: var(--wine-red);
    font-weight: 700;
  }

  .prose h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .prose h2 {
    margin-top: 2.5rem;
    border-bottom: 1px solid var(--glass-border);
    padding-bottom: 0.5rem;
  }

  .prose p {
    color: var(--color-text-main);
  }

  .prose ul {
    list-style-type: '→ ';
    padding-left: 1.5rem;
    color: var(--color-text-main);
  }
  .prose ul li::marker {
    color: var(--wine-accent);
  }
  .prose ul li {
    padding-left: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .prose .italic-note {
    font-style: italic;
    color: var(--color-text-muted);
    text-align: center;
    margin-top: 3rem;
    font-size: 1.1rem;
  }

</style>