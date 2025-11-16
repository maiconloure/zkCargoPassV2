// API client for backend communication
/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL: string
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787/api';

interface ApiError {
  error: string;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  walletAddress?: string;
  emailVerified: boolean;
  createdAt: string;
}

export interface Document {
  id: string;
  userId: string;
  documentType: 'cargo_manifest' | 'bill_of_lading' | 'customs_declaration' | 'certificate' | 'invoice' | 'other';
  documentNumber: string;
  title: string;
  description?: string;
  status: 'pending' | 'verified' | 'rejected' | 'processing';
  fileUrl?: string;
  fileHash?: string;
  zkProofHash?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    const body = options.body;
    const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

    if (isFormData && headers['Content-Type']) {
      delete headers['Content-Type'];
    }

    if (!isFormData && body !== undefined && body !== null && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error((data as ApiError).error || 'Request failed');
    }

    return data as T;
  }

  // Auth endpoints
  async register(email: string, password: string, name: string, walletAddress?: string) {
    const response = await this.request<{
      message: string;
      user: User;
      token: string;
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, walletAddress }),
    });
    this.setToken(response.token);
    return response;
  }

  async login(email: string, password: string) {
    const response = await this.request<{
      message: string;
      user: User;
      token: string;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(response.token);
    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.setToken(null);
    }
  }

  async getCurrentUser() {
    return this.request<{ user: User }>('/auth/me');
  }

  // User endpoints
  async updateProfile(data: { name?: string; email?: string; walletAddress?: string }) {
    return this.request<{ message: string; user: User }>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request<{ message: string }>('/users/me/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async getActivityLogs() {
    return this.request<{ activities: ActivityLog[] }>('/users/me/activity');
  }

  async getAllUsers() {
    return this.request<{ users: User[] }>('/users');
  }

  async updateUserStatus(userId: string, isActive: boolean) {
    return this.request<{ message: string }>(`/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive }),
    });
  }

  // Document endpoints
  async createDocument(data: {
    documentType: Document['documentType'];
    documentNumber: string;
    title: string;
    description?: string;
    fileUrl?: string;
    fileHash?: string;
    metadata?: Record<string, any>;
  }) {
    return this.request<{ message: string; document: Document }>('/documents', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getDocuments() {
    return this.request<{ documents: Document[] }>('/documents');
  }

  async getDocument(id: string) {
    return this.request<{ document: Document; verifications: any[] }>(`/documents/${id}`);
  }

  async updateDocument(id: string, data: Partial<Omit<Document, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>) {
    return this.request<{ message: string; document: Document }>(`/documents/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteDocument(id: string) {
    return this.request<{ message: string }>(`/documents/${id}`, {
      method: 'DELETE',
    });
  }

  async verifyDocument(id: string, verificationStatus: 'approved' | 'rejected', comments?: string) {
    return this.request<{ message: string; status: string }>(`/documents/${id}/verify`, {
      method: 'POST',
      body: JSON.stringify({ verificationStatus, comments }),
    });
  }

  async uploadDocument(params: {
    file: File;
    documentType?: Document['documentType'];
    documentNumber?: string;
  }) {
    const formData = new FormData();
    formData.append('file', params.file);

    if (params.documentType) {
      formData.append('documentType', params.documentType);
    }

    if (params.documentNumber) {
      formData.append('documentNumber', params.documentNumber);
    }

    return this.request<{
      message: string;
      document: Document;
      extractedData?: Record<string, any>;
      warnings?: string[];
    }>('/documents/upload', {
      method: 'POST',
      body: formData,
    });
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();

// Export the class for testing or multiple instances
export default ApiClient;
