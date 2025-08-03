const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Doctor endpoints
  async getDoctors(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/doctors?${queryString}`);
  }

  async getDoctor(id) {
    return this.request(`/doctors/${id}`);
  }

  async getDoctorAvailability(id) {
    return this.request(`/doctors/${id}/availability`);
  }

  async getDoctorAvailabilityByDate(id, date) {
    return this.request(`/doctors/${id}/availability/${date}`);
  }

  async getSpecialties() {
    return this.request('/doctors/specialties/list');
  }

  // Appointment endpoints
  async createAppointment(appointmentData) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  async getAppointments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/appointments?${queryString}`);
  }

  async getAppointment(id) {
    return this.request(`/appointments/${id}`);
  }

  async updateAppointmentStatus(id, status, cancellationReason = null, cancelledBy = null) {
    return this.request(`/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, cancellationReason, cancelledBy }),
    });
  }

  async updateAppointment(id, appointmentData) {
    return this.request(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    });
  }

  async deleteAppointment(id) {
    return this.request(`/appointments/${id}`, {
      method: 'DELETE',
    });
  }

  async getAppointmentStats() {
    return this.request('/appointments/stats/overview');
  }

  // User endpoints
  async register(userData) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getProfile() {
    return this.request('/users/profile');
  }

  async updateProfile(profileData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(passwordData) {
    return this.request('/users/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  }

  async getUserAppointments() {
    return this.request('/users/appointments');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService; 