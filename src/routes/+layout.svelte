<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { slide, fly } from 'svelte/transition';

  // --- Theme Logic ---
  function toggleTheme() {
    const current = document.body.dataset.bsTheme;
    document.body.dataset.bsTheme = current === 'dark' ? 'light' : 'dark';
  }

  // --- Buy Me A Coffee + Bitcoin Logic ---
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
        <button
          class="btn btn-coffee d-flex align-items-center gap-2 shadow-sm"
          on:click={toggleDropdown}
          aria-label="Support options"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z" />
          </svg>
          <span class="d-none d-sm-inline">Buy me a coffee</span>
        </button>

        {#if isDropdownOpen}
          <div
            class="bmac-dropdown glass mt-2"
            transition:fly={{ y: -8, duration: 220 }}
          >
            <a
              href="https://buymeacoffee.com/axelbase"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
            >
              <span class="amount">$3</span> One Coffee
            </a>
            <a
              href="https://buymeacoffee.com/axelbase"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
            >
              <span class="amount">$5</span> Two Coffees
            </a>
            <a
              href="https://buymeacoffee.com/axelbase"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
            >
              <span class="amount">$10</span> Three Coffees
            </a>

            <a
              href="https://buymeacoffee.com/axelbase"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
              class="custom-amount"
            >
              Custom Amount
            </a>

            <a
              href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
              class="custom-amount bitcoin-option"
            >
              Buy via Crypto (Bitcoin)
            </a>
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
  /* ── Coffee Button (adapted from File 1 but using wine-red theme) ── */
  .btn-coffee {
    background: var(--wine-red);
    color: white;
    border-radius: 50px;
    font-size: 0.9rem;
    padding: 8px 16px;
    border: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(94, 33, 41, 0.25);
  }

  .btn-coffee:hover {
    background: var(--wine-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(94, 33, 41, 0.35);
  }

  /* ── Dropdown (glass + File 1 style amounts) ── */
  .bmac-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 240px;
    border-radius: 16px;
    overflow: hidden;
    z-index: 1050;
  }

  .bmac-dropdown a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 18px;
    color: var(--color-text-main);
    text-decoration: none;
    font-size: 0.96rem;
    transition: all 0.2s ease;
  }

  .bmac-dropdown a:hover {
    background: rgba(94, 33, 41, 0.12);
    color: var(--wine-red);
    padding-left: 24px;
  }

  .bmac-dropdown .amount {
    font-weight: 700;
    color: var(--wine-red);
    font-size: 1.1rem;
    min-width: 38px;
  }

  .bmac-dropdown .custom-amount {
    font-weight: 600;
    color: var(--wine-red);
    border-top: 1px solid rgba(94, 33, 41, 0.18);
    justify-content: center !important;
    padding: 12px;
  }

  .bitcoin-option {
    color: #f7931a !important;
    font-weight: 600;
  }

  .bitcoin-option:hover {
    background: rgba(249, 163, 46, 0.12) !important;
    color: #f7931a !important;
  }

  /* Keep your existing styles for other elements */
  .navbar-brand-logo { height: 32px; width: auto; transition: transform 0.3s ease; }
  .logo-group:hover .navbar-brand-logo { transform: rotate(10deg) scale(1.1); }

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

  .btn-theme-toggle {
    width: 40px;
    height: 40px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--glass-border);
    background: rgba(255,255,255,0.1);
    color: var(--color-text-main);
    border-radius: 50%;
  }
  .btn-theme-toggle:hover {
    background: var(--wine-red);
    color: white;
  }

  :global([data-bs-theme="dark"]) .theme-icon { transform: rotate(360deg); }
  .theme-icon { transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
</style>