// DOM Elements
const tutorForm = document.getElementById('tutorForm');
const tutorList = document.getElementById('tutorList');

// Fetch Tutors
const fetchTutors = async () => {
  const res = await fetch('/api/tutors');
  const tutors = await res.json();
  
  // Render Tutors
  tutorList.innerHTML = '';
  tutors.forEach((tutor) => {
    const li = document.createElement('li');
    li.textContent = `${tutor.name} - ${tutor.subject}`;
    tutorList.appendChild(li);
  });
};

// Add Tutor
tutorForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const subject = document.getElementById('subject').value;

  const newTutor = { name, subject };
  
  // Send POST request to server
  await fetch('/api/tutors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTutor),
  });

  // Refresh the list
  fetchTutors();
  tutorForm.reset();
});

// Initial Fetch
fetchTutors();
