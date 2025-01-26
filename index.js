        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Add your login logic here
            // For demo purposes, we'll just redirect to the main page
            if (username && password) {
                window.location.href = 'index.html';
            } else {
                alert('Please enter both username and password');
            }
        });
        
    new Vue({
      el: '#app',
      data: {
        searchQuery: '',
        filterBy: '',
        patients: [
          { id: 1, name: 'John Doe', dob: '1980-05-15', condition: 'Diabetes' },
          { id: 2, name: 'Jane Smith', dob: '1985-09-22', condition: 'Hypertension' },
          { id: 3, name: 'Alice Johnson', dob: '1990-03-08', condition: 'Asthma' },
          { id: 4, name: 'Bob Williams', dob: '1975-11-30', condition: 'Arthritis' }
        ],
        upcomingAppointments: [
          { id: 1, patient: { name: 'John Doe' }, date: '2023-04-15' },
          { id: 2, patient: { name: 'Jane Smith' }, date: '2023-04-20' },
          { id: 3, patient: { name: 'Alice Johnson' }, date: '2023-04-25' }
        ],
        showModal: false,
        modalTitle: '',
        modalType: '',
        selectedPatient: {},
        rescheduledDate: '',
        rescheduledTime: '',
        newPatient: {
          name: '',
          dob: '',
          condition: ''
        }
      },
      methods: {
        filterPatients() {
          alert(`Filtering patients by: ${this.filterBy} with query: ${this.searchQuery}`);
        },
        viewPatientInfo(patient) {
          this.modalTitle = `Patient Details - ${patient.name}`;
          this.modalType = 'patientInfo';
          this.selectedPatient = patient;
          this.showModal = true;
        },
        openAddPatientModal() {
          this.modalTitle = 'Add New Patient';
          this.modalType = 'addPatient';
          this.newPatient = { name: '', dob: '', condition: '' };
          this.showModal = true;
        },
        addPatient() {
          if (this.newPatient.name && this.newPatient.dob && this.newPatient.condition) {
            this.patients.push({ ...this.newPatient, id: this.patients.length + 1 });
            this.closeModal();
            alert('Patient added successfully!');
          } else {
            alert('Please fill in all fields.');
          }
        },
        viewCalendar() {
          alert('Navigating to calendar view.');
        },
        rescheduleAppointment(appointmentId) {
          const appointment = this.upcomingAppointments.find(a => a.id === appointmentId);
          this.modalTitle = `Reschedule Appointment for ${appointment.patient.name}`;
          this.modalType = 'appointment';
          this.rescheduledDate = moment(appointment.date).format('YYYY-MM-DD');
          this.rescheduledTime = moment(appointment.date).format('HH:mm');
          this.showModal = true;
        },
        saveRescheduledAppointment() {
          alert('Appointment rescheduled successfully.');
          this.closeModal();
        },
        closeModal() {
          this.showModal = false;
        }
      }
    });
