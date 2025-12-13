<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy | EXIF Image Date and Time Changer</title>
  <meta name="description" content="We collect no data. All EXIF processing happens entirely in your browser for complete privacy." />
  <meta property="og:title" content="Privacy Policy | EXIF Image Date and Time Changer" />
  <meta property="og:description" content="We collect no data. All EXIF processing happens entirely in your browser for complete privacy." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Privacy Policy</p>
  </div>

  <article class="prose">
    <h1>Privacy Policy</h1>

    <p class="post-meta">Effective Date: December 13, 2025</p>

    <h2>1. Our Commitment to Privacy</h2>
    <p>The <strong>EXIF Image Date and Time Changer</strong> is a fully client-side web tool that allows you to correct or add EXIF capture dates to JPEG images. <strong>We do not collect, store, transmit, or process any personal data or images</strong>. All operations occur entirely within your browser, ensuring your photos and metadata remain private and never leave your device.</p>

    <h2>2. No Data Collection</h2>
    <p>We intentionally designed this tool to operate without any data collection. Specifically, we do not gather:</p>
    <ul>
      <li><strong>Personal information</strong> such as names, email addresses, or IP addresses</li>
      <li><strong>Image content</strong> or any uploaded files</li>
      <li><strong>EXIF metadata</strong> from your photos</li>
      <li><strong>Usage statistics</strong>, analytics, or tracking data</li>
      <li><strong>Cookies</strong>, local storage persistence, or session identifiers</li>
    </ul>
    <p>Because everything processes locally using JavaScript, <em>your data never touches any server</em>.</p>

    <h2>3. How the Tool Functions</h2>
    <p>When you use the EXIF Image Date and Time Changer:</p>
    <ul>
      <li>Images are read directly in your browser using the File API</li>
      <li>EXIF data is parsed and modified using client-side libraries</li>
      <li>Corrected images are generated as downloadable files on your device</li>
      <li>Batch ZIP creation happens locally using browser capabilities</li>
    </ul>
    <p><strong>No information is ever sent externally</strong>. Temporary memory usage clears when you close the tab or refresh the page.</p>

    <h2>4. Third-Party Services</h2>
    <p>We do not integrate any third-party analytics, advertising, or tracking services. The tool uses only open-source JavaScript libraries loaded via CDN for functionality, but these do not track or collect user data.</p>

    <h2>5. Security and Responsibility</h2>
    <p>Since no data is transmitted, there is no server-side risk. We recommend using the tool on trusted devices with up-to-date browsers for optimal security. You remain responsible for the security of your local environment and any downloaded files.</p>

    <h2>6. Children's Privacy</h2>
    <p>This tool is not directed at children under 13. We do not knowingly collect any information from children.</p>

    <h2>7. Changes to This Policy</h2>
    <p>We may update this Privacy Policy occasionally. Changes will be reflected on this page with an updated effective date.</p>

    <h2>8. Contact</h2>
    <p>For questions about this policy, please open an issue on our public GitHub repository.</p>

    <p class="italic-note"><strong>Your privacy is our priority</strong> — we built this tool to respect it completely by collecting absolutely nothing.</p>
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