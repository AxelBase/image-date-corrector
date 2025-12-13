<script lang="ts">
  import { base } from '$app/paths';

  const posts = [
    {
      href: '/blog/posts/post1',
      title: 'What is the EXIF Image Date and Time Changer?',
      description: 'An introduction to this privacy-first, client-side web tool that fixes or adds EXIF capture dates to JPEG images without uploading anything.'
    },
    {
      href: '/blog/posts/post2',
      title: 'How EXIF Date Correction Works In-Browser',
      description: 'A technical breakdown of reading, modifying, and rewriting EXIF DateTimeOriginal tags entirely in the browser using piexifjs.'
    },
    {
      href: '/blog/posts/post3',
      title: 'Why Many Phone Photos Lack Capture Dates',
      description: 'Explaining why modern smartphone cameras often omit the DateTimeOriginal EXIF tag and how this tool solves that problem.'
    },
    {
      href: '/blog/posts/post4',
      title: 'Adding EXIF Dates to Images with No Metadata',
      description: 'How the tool safely creates valid EXIF sections from scratch when images have no metadata at all, while preserving image quality.'
    },
    {
      href: '/blog/posts/post5',
      title: 'Batch Processing Multiple Photos at Once',
      description: 'Learn how to correct dates across dozens of images simultaneously with individual or global date/time controls and ZIP download.'
    },
    {
      href: '/blog/posts/post6',
      title: 'Preserving Image Quality During EXIF Updates',
      description: 'Technical details on how piexifjs inserts metadata without re-encoding or compressing the original JPEG data.'
    },
    {
      href: '/blog/posts/post7',
      title: 'Fixing Photo Timelines in Google Photos & Apple Photos',
      description: 'How correcting the EXIF DateTimeOriginal tag ensures your images appear in the correct chronological order in major photo libraries.'
    }
  ];
</script>

<svelte:head>
  <title>Blog | EXIF Image Date and Time Changer</title>
  <meta name="description" content="Technical insights, tutorials, and guides for using the EXIF Image Date and Time Changer — a client-side tool for fixing EXIF capture dates in JPEG photos." />
</svelte:head>

<div class="container fade-in blog-index">
  <header class="blog-header">
    <h1><i class="bi bi-journal-richtext"></i> Blog: EXIF Date Insights</h1>
    <p class="subtitle">
      Deep dives into EXIF metadata, capture date issues, client-side processing, and best practices for organizing your photo library using the EXIF Image Date and Time Changer.
    </p>
  </header>

  <div class="posts-grid">
    {#each posts as post}
      <a href="{base}{post.href}" class="card post-card glass">
        <div class="card-body">
          <h2 class="post-title">{post.title}</h2>
          <p class="post-description">{post.description}</p>
          <span class="read-more">Read Article &rarr;</span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .blog-index {
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .blog-header {
    text-align: center;
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--glass-border);
    padding-bottom: 2rem;
  }

  .blog-header h1 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
    color: var(--wine-red);
  }

  .subtitle {
    font-size: 1.1rem;
    color: var(--color-text-muted);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .post-card {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: var(--transition-smooth);
  }

  .post-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(94, 33, 41, 0.25);
  }

  .post-card .card-body {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1.75rem;
  }

  .post-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--wine-red);
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  .post-description {
    color: var(--color-text-muted);
    flex-grow: 1;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .read-more {
    color: var(--wine-accent);
    font-weight: 600;
    font-size: 1rem;
    align-self: flex-start;
    transition: transform 0.3s ease;
  }

  .post-card:hover .read-more {
    transform: translateX(8px);
  }
</style>