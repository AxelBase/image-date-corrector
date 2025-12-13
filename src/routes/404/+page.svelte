<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>404 Not Found | EXIF Image Date and Time Changer</title>
  <meta name="description" content="The page you are looking for could not be found. Return to the home page to correct EXIF dates in your photos." />
  <meta property="og:title" content="404 Not Found | EXIF Image Date and Time Changer" />
  <meta property="og:description" content="The page you are looking for could not be found. Return to the home page to correct EXIF dates in your photos." />
  <meta property="og:url" content="{base}/404" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>404 Not Found</p>
  </div>

  <article class="prose">
    <h1>404 — Page Not Found</h1>

    <p class="post-meta">Last Updated: December 13, 2025</p>

    <p>We’re sorry — the page you requested doesn’t exist. It may have been moved, renamed, or is temporarily unavailable. Don’t worry; the main tool is still here and ready to help you fix capture dates in your photos.</p>

    <h2>Where to go next</h2>
    <ul>
      <li><a href="{base}/">Home — Start correcting EXIF dates</a></li>
      <li><a href="{base}/blog">Blog — Learn more about EXIF and photo organization</a></li>
      <li><a href="{base}/privacy">Privacy Policy</a></li>
      <li><a href="{base}/terms">Terms and Conditions</a></li>
    </ul>

    <h2>Need help?</h2>
    <p>If you arrived here from a link that seems broken, or if you believe this page should exist, feel free to open an issue on the public GitHub repository. We appreciate your feedback and will address it promptly.</p>

    <p>Meanwhile, head back to the home page to continue fixing timelines in your photo library — all processing remains completely private and in-browser.</p>

    <p class="italic-note"><strong>Your photos. Your privacy. Your timeline.</strong> We’re here to help you get it right.</p>
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

  .prose a {
    color: var(--wine-red);
    text-decoration: underline;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .prose a:hover {
    color: var(--wine-accent);
    text-decoration: none;
  }
</style>