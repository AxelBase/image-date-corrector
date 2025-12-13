<script>
  import { getCaptureDate, updateCaptureDate } from '$lib/exifLogic.js';
  import JSZip from 'jszip';
  import { fade, fly, slide } from 'svelte/transition';

  let files = [];
  let images = [];
  let error = '';
  let dragOver = false;
  let applyToAll = false;
  let globalDate = '';
  let globalTime = '00:00:00';

  function processFiles(selectedFiles) {
    error = '';
    if (!selectedFiles || selectedFiles.length === 0) return;

    const validFiles = Array.from(selectedFiles).filter(f => f.type.startsWith('image/jpeg'));
    if (validFiles.length === 0) {
      error = 'No valid JPEG images found.';
      return;
    }

    files = validFiles;
    images = [];

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const jpegData = ev.target.result;
        try {
          const { date, time, hasDate, hasExifSection } = getCaptureDate(jpegData);
          images = [...images, {
            file,
            jpegData,
            name: file.name,
            date,
            time,
            hasDate,
            hasExifSection,
            newDate: date,
            newTime: time
          }];
        } catch (err) {
          console.warn(`Skipping ${file.name}`);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function handleFileSelect(e) { processFiles(e.target.files); }
  function handleDrop(e) { e.preventDefault(); dragOver = false; processFiles(e.dataTransfer.files); }
  function handleDragOver(e) { e.preventDefault(); dragOver = true; }
  function handleDragLeave() { dragOver = false; }

  function removeImage(name) { images = images.filter(img => img.name !== name); }
  function removeAll() { images = []; }

  $: if (applyToAll && images.length > 0) {
    images = images.map(img => ({
      ...img,
      newDate: globalDate || img.date,
      newTime: globalTime || img.time
    }));
  }

  async function handleBatchDownload() {
    if (images.length === 0) return;
    const zip = new JSZip();
    let processedCount = 0;

    for (const img of images) {
      if (!img.newDate || !img.newTime) {
        error = `Please set date and time for "${img.name}"`;
        return;
      }
      try {
        const updatedJpeg = updateCaptureDate(img.jpegData, img.newDate, img.newTime);
        const blob = dataURLtoBlob(updatedJpeg);
        const correctedName = img.name.replace(/(\.jpe?g)$/i, '-corrected$1');
        zip.file(correctedName, blob);
        processedCount++;
      } catch (err) { console.warn(`Failed to process ${img.name}:`, err); }
    }

    if (processedCount === 0) {
      error = 'No images could be processed.';
      return;
    }

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(content);
      a.download = `corrected-images-${new Date().toISOString().slice(0,10)}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch (err) { error = 'Failed to generate ZIP.'; }
  }

  function dataURLtoBlob(dataURL) {
    const [header, data] = dataURL.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const bstr = atob(data);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  }
</script>

<svelte:head>
  <title>EXIF Image Date and Time Changer — Fix EXIF dates in your photos privately</title>
  <meta name="description" content="Free client-side web tool to correct or add EXIF capture dates to JPEGs. Batch support, no uploads, zero tracking." />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="EXIF Image Date and Time Changer — Fix EXIF dates privately" />
  <meta property="og:description" content="Fix or add capture dates to your photos in seconds — entirely in your browser." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://axelbase.github.io/image-date-corrector/" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container pb-5">
  
  <section id="home" class="mb-5 pt-3">
    <div class="text-center mb-5" in:fade={{ duration: 800 }}>
      <h1 class="display-4 mb-3">EXIF Image Date and Time Changer</h1>
      <p class="lead" style="color: var(--color-text-muted);">Batch process your JPEGs and fix EXIF data instantly.</p>
    </div>

    <input id="file-input" type="file" accept="image/jpeg,image/jpg" multiple class="d-none" on:change={handleFileSelect} />

    <div in:fly={{ y: 30, duration: 800, delay: 200 }}>
        <label for="file-input" aria-label="Upload JPEG images..." 
        class="upload-zone p-5 text-center mb-4 position-relative user-select-none d-block glass"
        class:drag-active={dragOver}
        on:drop|preventDefault={handleDrop} 
        on:dragover|preventDefault={handleDragOver}
        on:dragleave={handleDragLeave} 
        on:dragend={handleDragLeave}>
        
        <div class="display-4 mb-3 text-wine"><i class="bi bi-cloud-arrow-up-fill"></i></div>
        <p class="h5 mb-2 fw-bold text-wine">
            {#if dragOver}Drop your JPEGs here!{:else}Drag & drop JPEG images here{/if}
        </p>
        <p class="small text-muted">or click to browse</p>
        </label>
    </div>

    {#if error}
      <div class="alert alert-danger rounded-4 shadow-sm border-0" transition:slide>{error}</div>
    {/if}

    {#if images.length > 0}
      <div class="glass p-4 rounded-4 mb-4" transition:slide>
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div class="form-check form-switch">
            <input type="checkbox" class="form-check-input" id="applyAll" bind:checked={applyToAll} style="width: 3em; height: 1.5em; cursor: pointer;"/>
            <label class="form-check-label fw-bold ms-2 pt-1" for="applyAll">Apply to All</label>
          </div>

          <button class="btn btn-outline-danger btn-sm" on:click={removeAll}>
            <i class="bi bi-trash"></i> Remove All
          </button>
        </div>

        {#if applyToAll}
          <div class="row mt-4 g-3" transition:slide>
            <div class="col-md-6">
              <label for="global-date" class="form-label text-muted fw-bold small text-uppercase">Global Date</label>
              <input id="global-date" type="date" class="form-control" bind:value={globalDate} />
            </div>
            <div class="col-md-6">
              <label for="global-time" class="form-label text-muted fw-bold small text-uppercase">Global Time</label>
              <input id="global-time" type="time" class="form-control" bind:value={globalTime} step="1" />
            </div>
          </div>
        {/if}
      </div>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
        {#each images as img (img.name)}
          <div class="col" transition:fly={{ y: 20, duration: 400 }}>
            <div class="card h-100 position-relative">
              <button 
                aria-label="Remove {img.name}" class="position-absolute btn btn-danger rounded-circle shadow opacity-0 hover:opacity-100 transition-opacity d-flex align-items-center justify-content-center"
                style="top: 10px; right: 10px; width: 35px; height: 35px; z-index: 10; padding: 0;"
                on:click|stopPropagation={() => removeImage(img.name)}
              >
                <i class="bi bi-x-lg" style="font-size: 1rem;"></i>
              </button>

              <div class="card-img-wrapper" style="height: 200px; overflow: hidden;">
                <img src={img.jpegData} alt="" class="card-img-top w-100 h-100" style="object-fit: cover;" />
              </div>
              
              <div class="card-body d-flex flex-column">
                <h6 class="card-title text-truncate mb-3 text-wine" title={img.name}>{img.name}</h6>

                {#if !applyToAll}
                  <div class="mb-2"><input type="date" class="form-control form-control-sm" bind:value={img.newDate} /></div>
                  <div class="mb-2"><input type="time" class="form-control form-control-sm" bind:value={img.newTime} step="1" /></div>
                {/if}

                {#if !img.hasDate}
                  <small class="badge bg-warning bg-opacity-25 text-warning mt-auto align-self-start">Original EXIF Not Found- Enter Here</small>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>

      <div class="text-center pb-5">
        <button class="btn btn-success btn-lg px-5 shadow" on:click={handleBatchDownload} 
          disabled={images.length === 0 || images.some(img => !img.newDate || !img.newTime)}>
          <i class="bi bi-download me-2"></i> Download Corrected (.zip)
        </button>
      </div>
    {/if}
  </section>

  <hr class="my-5" style="border-color: var(--wine-red); opacity: 0.2;">

<section id="about" class="py-5 scroll-margin-offset">
  <div class="glass p-5 rounded-4 text-center">
    <h2 class="mb-4">About EXIF Image Date and Time Changer</h2>
    <p class="lead" style="color: var(--color-text-muted);">
      A completely client-side web tool that fixes or adds EXIF capture dates to your JPEG photos — with zero uploads, zero tracking, and zero compromise on privacy.
    </p>
    <div class="mt-5 text-start mx-auto" style="max-width: 800px;">
      <p>
        The EXIF Image Date and Time Changer was created for anyone who has ever opened their photo library only to find memories scattered across the wrong years. Phone cameras sometimes skip the <strong>DateTimeOriginal</strong> tag. Messaging apps strip EXIF when you share a picture. Scanned old prints arrive without timestamps. The result? Your timeline is broken.
      </p>
      <p>
        This tool fixes that — permanently and safely. It runs 100% in your browser using JavaScript and the excellent <strong>piexifjs</strong> library. Your images never leave your device, and we collect absolutely nothing. No cookies, no analytics, no server logs — just pure client-side processing.
      </p>
      <p>
        Whether you’re restoring a family archive, fixing years of phone photos, or preparing images for Google Photos and Apple Photos timelines, this tool lets you set accurate capture dates and times with confidence.
      </p>
      <p>
        Key highlights:
      </p>
      <ul class="list-unstyled mt-4">
        <li class="mb-3"><strong>Privacy-first:</strong> No data ever leaves your browser</li>
        <li class="mb-3"><strong>Batch support:</strong> Fix dozens or hundreds at once</li>
        <li class="mb-3"><strong>Global or individual editing:</strong> Apply the same date to all or adjust one by one</li>
        <li class="mb-3"><strong>Zero quality loss:</strong> Only EXIF is changed, pixels untouched</li>
        <li class="mb-3"><strong>Works offline:</strong> After loading, no internet required</li>
        <li class="mb-3"><strong>Free and open-source</strong> — forever</li>
      </ul>
      <p class="mt-4">
        This is not a service — it’s a utility you can trust.
      </p>
    </div>
  </div>
</section>
<section id="how-to" class="py-5 scroll-margin-offset">
  <h2 class="mb-4 text-center">How to Use</h2>
  <div class="row g-4 text-center mb-5">
    <div class="col-md-4">
      <div class="glass p-4 h-100 rounded-4">
        <div class="h1 text-wine mb-3">1</div>
        <h5>Upload Your Photos</h5>
        <p class="text-muted">
          Drag and drop one or more JPEG files into the upload zone, or click to browse. You can process single images or entire folders at once — there is no limit.
        </p>
      </div>
    </div>
    <div class="col-md-4">
      <div class="glass p-4 h-100 rounded-4">
        <div class="h1 text-wine mb-3">2</div>
        <h5>Edit Capture Dates</h5>
        <p class="text-muted">
          Each image shows a preview. Use the date/time fields to set the correct capture moment. Tick <strong>“Apply same date & time to all”</strong> for batch events.
        </p>
      </div>
    </div>
    <div class="col-md-4">
      <div class="glass p-4 h-100 rounded-4">
        <div class="h1 text-wine mb-3">3</div>
        <h5>Download Corrected Files</h5>
        <p class="text-muted">
          Click “Download All” to get a ZIP with your corrected images. Each file is named with a <code>-corrected.jpg</code> suffix and contains the new EXIF date.
        </p>
      </div>
    </div>
  </div>

  <div class="mt-5 text-center mx-auto" style="max-width: 800px;">
    <p>
      That’s literally it. No login, no installation, no hidden uploads. Everything happens instantly in your browser, and you get perfect, quality-preserved JPEGs ready for Google Photos, Apple Photos, or your archive.
    </p>
  </div>
</section><section id="faq" class="py-5 mb-5 scroll-margin-offset">
  <h2 class="text-center mb-5">Frequently Asked Questions</h2>
  <div class="glass p-4 rounded-4">
    <div class="accordion accordion-flush" id="faqAccordion">

      <div class="accordion-item bg-transparent">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed bg-transparent shadow-none fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#q1" style="color: var(--color-text-main);">
            Is my data private and safe?
          </button>
        </h2>
          <div id="q1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body text-muted">
              Absolutely. 100% client-side. Your images are never uploaded or transmitted. Everything happens in your browser’s memory and is gone when you close the tab.
            </div>
          </div>
        </div>

      <div class="accordion-item bg-transparent">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed bg-transparent shadow-none fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#q2" style="color: var(--color-text-main);">
            Will this reduce image quality?
          </button>
        </h2>
          <div id="q2" class="accordion-collapse collapse" data-bs-target="#q2">
            <div class="accordion-body text-muted">
              No. Only the EXIF section is modified — the JPEG compression data is left completely untouched, so quality is pixel-perfect.
            </div>
          </div>
        </div>

      <div class="accordion-item bg-transparent">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed bg-transparent shadow-none fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#q3" style="color: var(--color-text-main);">
            Can it add dates to images with no EXIF?
          </button>
        </h2>
          <div id="q3" class="collapse" data-bs-parent="#q3">
            Yes! It creates a valid EXIF section from scratch when none exists.
          </div>
        </div>

      <div class="accordion-item bg-transparent">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed bg-transparent shadow-none fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#q4" style="color: var(--color-text-main);">
            Does it work with Google Photos and Apple Photos?
          </button>
        </h2>
          <div id="q4" class="collapse" data-bs-target="#q4">
            <div class="accordion-body text-muted">
              Yes. Both platforms primarily use the DateTimeOriginal tag — exactly what this tool edits.
            </div>
          </div>
        </div>

      <div class="accordion-item bg-transparent">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed bg-transparent shadow-none fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#q5" style="color: var(--color-text-main);">
            Is there a file size limit?
          </button>
        </h2>
          <div id="q5" class="collapse" data-bs-target="#q5">
            <div class="accordion-body text-muted">
              Only your browser memory. Most users process hundreds of images without issues.
            </div>
          </div>
        </div>

      <div class="accordion-item bg-transparent">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed bg-transparent shadow-none fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#q6" style="color: var(--color-text-main);">
            Can I use it offline?
          </button>
        </h2>
          <div id="q6" class="collapse" data-bs-target="#q6">
            <div class="accordion-body text-muted">
              Yes! After the first load, bookmarklet or save the page locally.
            </div>
          </div>
        </div>
    </div>
  </div>
</section>
</div>

<style>
  .user-select-none { user-select: none; }
  .upload-zone { border: 2px dashed var(--wine-red); cursor: pointer; transition: all 0.3s; }
  .upload-zone:hover, .drag-active { background: rgba(94, 33, 41, 0.05); transform: scale(1.02); }
  .scroll-margin-offset { scroll-margin-top: 140px; }
  
  /* Show remove button on card hover */
  .card:hover .opacity-0 { opacity: 1 !important; }
  .transition-opacity { transition: opacity 0.2s ease; }
</style>