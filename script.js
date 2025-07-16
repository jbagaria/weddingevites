// Script to handle live preview updates

// Get references to form inputs
const brideNameInput = document.getElementById('brideNameInput');
const groomNameInput = document.getElementById('groomNameInput');
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const venueNameInput = document.getElementById('venueNameInput');
const venueAddrInput = document.getElementById('venueAddrInput');
const greetingInput = document.getElementById('greetingInput');
const storyInput = document.getElementById('storyInput');
const galleryInput = document.getElementById('galleryInput');
const includeStoryCheckbox = document.getElementById('includeStory');
const includeGalleryCheckbox = document.getElementById('includeGallery');
const includeRSVPCheckbox = document.getElementById('includeRSVP');
const photoInput = document.getElementById('photoInput');

// References to preview elements
const previewNames = document.getElementById('previewNames');
const previewGreeting = document.getElementById('previewGreeting');
const previewDate = document.getElementById('previewDate');
const previewTime = document.getElementById('previewTime');
const previewTimeContainer = document.getElementById('previewTimeContainer');
const previewVenueName = document.getElementById('previewVenueName');
const previewVenueAddr = document.getElementById('previewVenueAddr');
const addressLine = document.getElementById('addressLine');
const mapLink = document.getElementById('mapLink');
const previewPhoto = document.getElementById('previewPhoto');
const storySection = document.getElementById('storySection');
const previewStory = document.getElementById('previewStory');
const gallerySection = document.getElementById('gallerySection');
const galleryGrid = document.getElementById('galleryGrid');
const rsvpSection = document.getElementById('rsvpSection');
const rsvpForm = document.getElementById('rsvpForm');
const guestbookMessages = document.getElementById('guestbookMessages');

// Update preview for couple's names
function updateNames() {
  const name1 = brideNameInput.value.trim();
  const name2 = groomNameInput.value.trim();
  if (name1 && name2) {
    previewNames.textContent = name1 + ' & ' + name2;
  } else if (name1 || name2) {
    // If only one name is provided, show it without "&"
    previewNames.textContent = name1 || name2;
  } else {
    previewNames.textContent = '';
  }
}

// Update preview for date and time
function updateDateTime() {
  const dateVal = dateInput.value;
  const timeVal = timeInput.value;
  // Format date
  if (dateVal) {
    const dateObj = new Date(dateVal);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    previewDate.textContent = formattedDate;
  } else {
    previewDate.textContent = '';
  }
  // Format time (to 12-hour AM/PM format)
  if (timeVal) {
    let [hours, minutes] = timeVal.split(':');
    hours = parseInt(hours);
    minutes = parseInt(minutes);
    let ampm = 'AM';
    let displayHour = hours;
    if (hours === 0) {
      displayHour = 12;
      ampm = 'AM';
    } else if (hours === 12) {
      displayHour = 12;
      ampm = 'PM';
    } else if (hours > 12) {
      displayHour = hours - 12;
      ampm = 'PM';
    } else {
      displayHour = hours;
      ampm = 'AM';
    }
    const minuteStr = minutes < 10 ? '0' + minutes : '' + minutes;
    previewTime.textContent = displayHour + ':' + minuteStr + ' ' + ampm;
    previewTimeContainer.style.display = 'inline';
  } else {
    previewTime.textContent = '';
    previewTimeContainer.style.display = 'none';
  }
}

// Update preview for venue name and address
function updateVenue() {
  const venueName = venueNameInput.value.trim();
  const venueAddr = venueAddrInput.value.trim();
  previewVenueName.textContent = venueName;
  if (venueAddr) {
    previewVenueAddr.textContent = venueAddr;
    // Update the Google Maps link when an address is provided
    mapLink.href = 'https://maps.google.com/?q=' + encodeURIComponent(venueAddr);
    mapLink.style.display = 'inline';
    addressLine.style.display = 'block';
  } else {
    previewVenueAddr.textContent = '';
    mapLink.href = '#';
    mapLink.style.display = 'none';
    addressLine.style.display = 'none';
  }
}

// Update preview for the invitation message/greeting
function updateGreeting() {
  const text = greetingInput.value.trim();
  previewGreeting.textContent = text || '';
}

// Update preview for "Our Story" text
function updateStory() {
  const storyText = storyInput.value.trim();
  if (storyText) {
    // Preserve line breaks in the story text
    previewStory.innerHTML = storyText.replace(/\n/g, '<br>');
  } else {
    previewStory.textContent = '';
  }
}

// Attach event listeners to form fields for live updates
brideNameInput.addEventListener('input', updateNames);
groomNameInput.addEventListener('input', updateNames);
dateInput.addEventListener('input', updateDateTime);
timeInput.addEventListener('input', updateDateTime);
venueNameInput.addEventListener('input', updateVenue);
venueAddrInput.addEventListener('input', updateVenue);
greetingInput.addEventListener('input', updateGreeting);
storyInput.addEventListener('input', updateStory);

// Toggle optional sections on checkbox changes
includeStoryCheckbox.addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('storyFields').classList.remove('hidden');
    storySection.classList.remove('hidden');
  } else {
    document.getElementById('storyFields').classList.add('hidden');
    storySection.classList.add('hidden');
  }
});
includeGalleryCheckbox.addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('galleryFields').classList.remove('hidden');
    gallerySection.classList.remove('hidden');
  } else {
    document.getElementById('galleryFields').classList.add('hidden');
    gallerySection.classList.add('hidden');
    // Clear any existing gallery images when gallery is turned off
    galleryGrid.innerHTML = '';
    galleryInput.value = '';
  }
});
includeRSVPCheckbox.addEventListener('change', function() {
  if (this.checked) {
    rsvpSection.classList.remove('hidden');
  } else {
    rsvpSection.classList.add('hidden');
  }
});

// Main photo upload preview
photoInput.addEventListener('change', function() {
  const file = photoInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewPhoto.src = e.target.result;
      previewPhoto.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  } else {
    // If no file (or file removed), hide the image
    previewPhoto.src = '';
    previewPhoto.classList.add('hidden');
  }
});

// Gallery photos upload preview (multiple images)
galleryInput.addEventListener('change', function() {
  const files = Array.from(galleryInput.files);
  galleryGrid.innerHTML = ''; // clear previous thumbnails
  if (files.length > 0) {
    // Read and display each image in order
    let index = 0;
    function readNext() {
      if (index >= files.length) return;
      const file = files[index];
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        galleryGrid.appendChild(img);
        index++;
        readNext();
      };
      reader.readAsDataURL(file);
    }
    readNext();
  }
});

// Handle RSVP form submissions (add to guestbook list)
rsvpForm.addEventListener('submit', function(e) {
  e.preventDefault();
  // Validate required fields: name and attending (radio)
  const nameField = rsvpForm.elements['guestName'];
  const attendingValue = rsvpForm.elements['attending'].value;  // "Yes" or "No"
  if (!nameField.value.trim() || !attendingValue) {
    // If validation fails, show default validation UI
    rsvpForm.reportValidity();
    return;
  }
  const name = nameField.value.trim();
  const attending = attendingValue;
  const message = rsvpForm.elements['message'].value.trim();
  // Create a new guestbook entry element
  const entryDiv = document.createElement('div');
  entryDiv.classList.add('guest-entry');
  const p1 = document.createElement('p');
  // Escape HTML to avoid any HTML injection in output
  p1.innerHTML = '<strong>Name:</strong> ' + escapeHtml(name) + ' &nbsp; <strong>Attending:</strong> ' + escapeHtml(attending);
  entryDiv.appendChild(p1);
  if (message) {
    const p2 = document.createElement('p');
    p2.textContent = message;
    entryDiv.appendChild(p2);
  }
  guestbookMessages.appendChild(entryDiv);
  rsvpForm.reset();  // clear the form fields for the next entry
});

// Utility function to escape HTML special characters in a string
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(match) {
    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return escapeMap[match];
  });
}

// Initialize preview with default values on page load
updateNames();
updateDateTime();
updateVenue();
updateGreeting();
// (Story, Gallery, RSVP sections start hidden by default)
