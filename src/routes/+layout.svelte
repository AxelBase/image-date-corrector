<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { slide, fly } from 'svelte/transition';

  // --- Theme Logic ---
  function toggleTheme() {
    const current = document.body.dataset.bsTheme;
    document.body.dataset.bsTheme = current === 'dark' ? 'light' : 'dark';
  }

  // --- Buy Me A Coffee Logic ---
  const paypalUsername = 'AxelLab427'; // Update later
  const donationAmounts = [1, 3, 5, 10];
  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }
</script>

<header class="fixed-top p-3 w-100" style="pointer-events: none; z-index: 1040;">
  <nav class="container glass rounded-pill px-4 py-2 d-flex justify-content-between align-items-center shadow-sm"
       style="pointer-events: auto; max-width: 1200px;">
    
    <div class="d-flex align-items-center gap-3">
      <a href="{base}/" class="d-flex align-items-center gap-2 logo-group text-decoration-none">
        <img src="{base}/AxelLab-Logo.ico" alt="Logo" class="navbar-brand-logo" />
        <span class="fw-bold fs-5 tracking-tight" style="color: var(--color-text-main);">AxelBase</span>
      </a>

      <div class="position-relative ms-2 ms-md-3" use:clickOutside on:click_outside={closeDropdown}>
        <button class="btn btn-coffee d-flex align-items-center gap-2" on:click={toggleDropdown}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" class="coffee-icon">
             <path d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z" />
          </svg>
          <span class="d-none d-sm-inline">Buy me a coffee</span>
        </button>

        {#if isDropdownOpen}
          <div class="dropdown-menu-custom glass" transition:slide={{ duration: 250 }}>
            {#each donationAmounts as amount}
              <a href="https://paypal.me/{paypalUsername}/{amount}" target="_blank" rel="noopener noreferrer" on:click={closeDropdown} class="donation-link">
                ${amount}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <div class="d-flex align-items-center gap-3">
      <ul class="nav d-none d-lg-flex align-items-center gap-1 m-0">
        <li class="nav-item"><a class="nav-link-custom" href="{base}/">Home</a></li>
        <li class="nav-item"><a class="nav-link-custom" href="{base}/#about">About</a></li>
        <li class="nav-item"><a class="nav-link-custom" href="{base}/#how-to">How to use</a></li>
        <li class="nav-item"><a class="nav-link-custom" href="{base}/#faq">FAQ</a></li>
        <li class="nav-item"><a class="nav-link-custom" href="{base}/blog">Blog</a></li>
      </ul>

      <button 
        class="btn-theme-toggle" 
        on:click={toggleTheme} 
        aria-label="Toggle Light/Dark Mode"
      >
        <i class="bi bi-moon-stars-fill theme-icon"></i>
      </button>

      <button class="d-lg-none btn border-0 p-0" type="button" aria-label="Menu">
        <i class="bi bi-grid-fill fs-2" style="color: var(--wine-red);"></i>
      </button>
    </div>
  </nav>
</header>

<main style="padding-top: 100px;">
  <slot />
</main>

<footer class="custom-footer glass border-top py-3">
  <div class="container d-flex flex-column flex-sm-row justify-content-between align-items-center">
    <span>© {new Date().getFullYear()} AxelBase Image Date Corrector</span>
    <div class="footer-links">
      <a href="{base}/privacy">Privacy</a>
      <span class="mx-2">•</span>
      <a href="{base}/terms">Terms</a>
    </div>
  </div>
</footer>

<style>
  .navbar-brand-logo { height: 32px; width: auto; transition: transform 0.3s ease; }
  .logo-group:hover .navbar-brand-logo { transform: rotate(10deg) scale(1.1); }

  /* Nav Links */
  .nav-link-custom {
    color: var(--color-text-muted);
    font-weight: 500;
    position: relative;
    padding: 0.5rem 1rem;
    transition: color 0.3s;
  }
  .nav-link-custom:hover { color: var(--wine-red); }
  .nav-link-custom::after {
    content: ''; position: absolute; width: 0; height: 2px;
    bottom: 5px; left: 50%; background-color: var(--wine-red);
    transition: all 0.3s ease-in-out; transform: translateX(-50%); border-radius: 2px;
  }
  .nav-link-custom:hover::after { width: 60%; }

  /* Coffee Button */
  .btn-coffee {
    background: #5E2129; /* Wine Red */
    color: white;
    border-radius: 50px;
    font-size: 0.85rem;
    padding: 6px 14px;
    border: none;
    box-shadow: 0 4px 10px rgba(94, 33, 41, 0.2);
  }
  .btn-coffee:hover {
    background: #7a2b36;
    transform: translateY(-2px);
  }
  .coffee-icon { animation: steam 2s infinite ease-out; }
  @keyframes steam { 0% { opacity: 0.8; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-4px); } }

  /* Dropdown */
  .dropdown-menu-custom {
    position: absolute; top: 115%; left: 0; min-width: 120px;
    padding: 0.5rem; border-radius: 16px; z-index: 1050;
    display: flex; flex-direction: column;
  }
  .donation-link {
    display: block; padding: 8px; text-align: center; border-radius: 10px;
    font-weight: bold; color: var(--wine-red); transition: background 0.2s;
  }
  .donation-link:hover { background: rgba(94, 33, 41, 0.1); }

  /* Footer */
  .custom-footer {
    position: relative; bottom: 0; width: 100%; z-index: 1030;
    font-size: 0.85rem; color: var(--color-text-muted);
  }
  .footer-links a { color: var(--color-text-main); font-weight: 500; }
  .footer-links a:hover { color: var(--wine-red); text-decoration: underline; }

  /* Theme Icon Rotation */
  :global([data-bs-theme="dark"]) .theme-icon { transform: rotate(360deg); }
  .theme-icon { transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
</style>