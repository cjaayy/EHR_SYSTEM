// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const newPatientModal = document.getElementById('new-patient-modal');
const appointmentModal = document.getElementById('appointment-modal');
const notificationsModal = document.getElementById('notifications-modal');
const notificationsList = document.getElementById('notifications-list');
const notificationsModalList = document.getElementById('notifications-modal-list');
const recentPatientsList = document.getElementById('recent-patients');
const patientSelect = document.getElementById('patient-select');

// Sample data for recent patients
const recentPatients = [
    { name: 'John Doe', lastVisit: '2023-10-01' },
    { name: 'Jane Smith', lastVisit: '2023-09-25' },
    { name: 'Alice Johnson', lastVisit: '2023-09-20' }
];

// Function to populate recent patients list
function populateRecentPatients() {
    recentPatientsList.innerHTML = ''; // Clear existing list
    recentPatients.forEach(patient => {
        const listItem = document.createElement('li');
        listItem.textContent = `${patient.name} - Last Visit: ${patient.lastVisit}`;
        recentPatientsList.appendChild(listItem);
    });
}

// Enhanced sidebar navigation
document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    function setActiveItem(clickedItem) {
        // Remove active state from all items
        sidebarItems.forEach(item => {
            item.classList.remove('active', 'text-blue-600', 'bg-blue-50');
        });
        
        // Add active state to clicked item
        clickedItem.classList.add('active', 'text-blue-600', 'bg-blue-50');
        
        // Update content based on tab
        const tabId = clickedItem.getAttribute('data-tab');
        updateMainContent(tabId);
    }

    function updateMainContent(tabId) {
        // You can add specific content updates for each tab here
        console.log(`Switched to ${tabId} tab`);
        
        // Hide all content sections first
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show the selected section
        const selectedSection = document.getElementById(`${tabId}-section`);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }
    }

    // Add click handlers to each sidebar item
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveItem(this);
            
            // Update URL hash
            const hash = this.getAttribute('href');
            history.pushState(null, '', hash);
        });

        // Add hover effects
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.classList.add('bg-gray-50');
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.classList.remove('bg-gray-50');
            }
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.slice(1);
        const correspondingItem = document.querySelector(`[data-tab="${hash}"]`);
        if (correspondingItem) {
            setActiveItem(correspondingItem);
        }
    });

    // Set initial active state based on URL hash or default to dashboard
    const initialHash = window.location.hash.slice(1) || 'dashboard';
    const initialItem = document.querySelector(`[data-tab="${initialHash}"]`);
    if (initialItem) {
        setActiveItem(initialItem);
    }

    // Populate recent patients list
    populateRecentPatients();
});

// Function to handle adding a new patient
function handleAddPatient() {
    const patientName = document.querySelector('#new-patient-modal input[placeholder="Enter patient name"]').value;
    const patientDOB = document.querySelector('#new-patient-modal input[type="date"]').value;
    const patientContact = document.querySelector('#new-patient-modal input[placeholder="Enter contact number"]').value;

    if (patientName && patientDOB && patientContact) {
        // Add patient to recent patients list
        const newPatient = { name: patientName, lastVisit: new Date().toISOString().split('T')[0] };
        recentPatients.push(newPatient);
        populateRecentPatients();

        // Add patient to patient records
        const patientRecordsList = document.getElementById('patient-records-list');
        const recordItem = document.createElement('li');
        recordItem.textContent = `${patientName} - DOB: ${patientDOB} - Contact: ${patientContact}`;
        patientRecordsList.appendChild(recordItem);

        alert('Patient added successfully');
        document.getElementById('new-patient-modal').style.display = 'none';
    } else {
        alert('Please fill in all fields');
    }
}

// Rest of your existing code...
// (keep all your other event listeners and functions)