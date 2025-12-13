import piexif from 'piexifjs';

export function getCaptureDate(jpegData) {
  try {
    const exifObj = piexif.load(jpegData);

    // If load succeeds, there is at least some EXIF
    const hasExifSection = true;

    const dateStr = exifObj['Exif']?.[piexif.ExifIFD.DateTimeOriginal];
    let date = '';
    let time = '00:00:00';
    let hasDate = false;

    if (dateStr && dateStr.trim()) {
      const [datePart, timePart] = dateStr.split(' ');
      date = datePart.replace(/:/g, '-');
      time = timePart || '00:00:00';
      hasDate = true;
    } else {
      const now = new Date();
      date = now.toISOString().slice(0, 10);
      time = now.toTimeString().slice(0, 8);
      hasDate = false;
    }

    return { date, time, hasDate, hasExifSection };
  } catch (e) {
    // No EXIF at all — piexif.load throws
    const now = new Date();
    return {
      date: now.toISOString().slice(0, 10),
      time: now.toTimeString().slice(0, 8),
      hasDate: false,
      hasExifSection: false  // No existing EXIF
    };
  }
}

export function updateCaptureDate(jpegData, newDate, newTime) {
  try {
    let exifObj;
    try {
      exifObj = piexif.load(jpegData);
    } catch (e) {
      // No existing EXIF → create minimal valid structure
      exifObj = {
        "0th": {},
        "Exif": {},
        "GPS": {},
        "Interop": {},
        "1st": {},
        "thumbnail": null
      };
    }

    const formatted = newDate.replace(/-/g, ':') + ' ' + newTime;

    // Set DateTimeOriginal
    exifObj['Exif'][piexif.ExifIFD.DateTimeOriginal] = formatted;

    // Also set general DateTime in 0th IFD
    exifObj['0th'][piexif.ImageIFD.DateTime] = formatted;

    // Add required minimal 0th tags if missing (piexifjs needs them for valid dump/insert)
    if (!exifObj['0th'][piexif.ImageIFD.XResolution]) {
      exifObj['0th'][piexif.ImageIFD.XResolution] = [72, 1];
    }
    if (!exifObj['0th'][piexif.ImageIFD.YResolution]) {
      exifObj['0th'][piexif.ImageIFD.YResolution] = [72, 1];
    }
    if (!exifObj['0th'][piexif.ImageIFD.Software]) {
      exifObj['0th'][piexif.ImageIFD.Software] = "Simple Image Date Corrector";
    }

    const exifBytes = piexif.dump(exifObj);
    return piexif.insert(exifBytes, jpegData);
  } catch (e) {
    console.error(e);
    throw new Error('Failed to update/add EXIF');
  }
}