// JMO Management System — API Client
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

const API_URL = '/api/v1'

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const csrfToken = getCookie('csrf_token')
        if (csrfToken && ['post', 'put', 'patch', 'delete'].includes(config.method || '')) {
          config.headers['X-CSRF-Token'] = csrfToken
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Clear auth cookies and redirect to login
          document.cookie = 'session_id=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          document.cookie = 'csrf_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<T>(url, config)
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.post<T>(url, data, config)
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.put<T>(url, data, config)
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.patch<T>(url, data, config)
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.delete<T>(url, config)
  }

  // File upload
  async upload<T>(url: string, formData: FormData, onProgress?: (progress: number) => void) {
    return this.client.post<T>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          onProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
        }
      },
    })
  }
}

export const api = new ApiClient()

// Types
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    page_size: number
    total_count: number
    total_pages: number
  }
}

export interface ErrorResponse {
  error: {
    code: string
    message: string
    details?: Array<{ field: string; message: string }>
  }
}

export interface SuccessResponse {
  message: string
}

// API Endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    activate: '/auth/activate',
  },
  students: {
    list: '/students',
    create: '/students',
    get: (id: string) => `/students/${id}`,
    update: (id: string) => `/students/${id}`,
    transfer: (id: string) => `/students/${id}/transfer`,
    withdraw: (id: string) => `/students/${id}/withdraw`,
    attendance: (id: string) => `/students/${id}/attendance`,
    results: (id: string) => `/students/${id}/results`,
    performance: (id: string) => `/students/${id}/performance`,
    import: '/students/import',
    export: '/students/export',
  },
  teachers: {
    list: '/teachers',
    create: '/teachers',
    get: (id: string) => `/teachers/${id}`,
    update: (id: string) => `/teachers/${id}`,
    deactivate: (id: string) => `/teachers/${id}/deactivate`,
    reactivate: (id: string) => `/teachers/${id}/reactivate`,
    resendInvite: (id: string) => `/teachers/${id}/resend-invite`,
    batches: (id: string) => `/teachers/${id}/batches`,
    updateBatches: (id: string) => `/teachers/${id}/batches`,
  },
  academicYears: {
    list: '/academic-years',
    create: '/academic-years',
    activate: (id: string) => `/academic-years/${id}/activate`,
  },
  classes: {
    list: '/classes',
    create: '/classes',
    get: (id: string) => `/classes/${id}`,
    update: (id: string) => `/classes/${id}`,
    delete: (id: string) => `/classes/${id}`,
  },
  batches: {
    list: '/batches',
    create: '/batches',
    get: (id: string) => `/batches/${id}`,
    update: (id: string) => `/batches/${id}`,
    students: (id: string) => `/batches/${id}/students`,
    sessions: (id: string) => `/batches/${id}/sessions`,
    generateSessions: (id: string) => `/batches/${id}/sessions/generate`,
  },
  attendance: {
    list: '/attendance',
    bulk: '/attendance/batch',
    update: (id: string) => `/attendance/${id}`,
    sync: '/attendance/sync',
    stats: '/attendance/stats',
  },
  olympiads: {
    list: '/olympiads',
    create: '/olympiads',
    get: (id: string) => `/olympiads/${id}`,
    update: (id: string) => `/olympiads/${id}`,
    status: (id: string) => `/olympiads/${id}/status`,
  },
  papers: {
    list: '/papers',
    create: '/papers',
    get: (id: string) => `/papers/${id}`,
    update: (id: string) => `/papers/${id}`,
    newVersion: (id: string) => `/papers/${id}/new-version`,
  },
  sections: {
    create: '/sections',
    update: (id: string) => `/sections/${id}`,
    delete: (id: string) => `/sections/${id}`,
  },
  questions: {
    create: '/questions',
    update: (id: string) => `/questions/${id}`,
    delete: (id: string) => `/questions/${id}`,
    bulk: '/questions/bulk',
  },
  answers: {
    key: (paperId: string) => `/answers/key/${paperId}`,
    createKey: '/answers/key',
    newKeyVersion: (id: string) => `/answers/key/${id}/new-version`,
    student: '/answers/student',
    studentBulk: '/answers/student/bulk',
    getStudent: (studentId: string, paperId: string) => `/answers/student/${studentId}/${paperId}`,
  },
  omr: {
    upload: '/omr/upload',
    list: '/omr',
    get: (id: string) => `/omr/${id}`,
    confirm: (id: string) => `/omr/${id}/confirm`,
    retry: (id: string) => `/omr/${id}/retry`,
  },
  results: {
    list: '/results',
    calculate: '/results/calculate',
    get: (id: string) => `/results/${id}`,
    publish: '/results/publish',
    unpublish: '/results/unpublish',
    export: '/results/export',
  },
  rankings: {
    list: '/rankings',
    export: '/rankings/export',
  },
  reports: {
    attendance: '/reports/attendance',
    results: '/reports/results',
    studentProgress: '/reports/student-progress',
    download: (id: string) => `/reports/${id}/download`,
  },
  awards: {
    list: '/awards',
    create: '/awards',
    update: (id: string) => `/awards/${id}`,
    autoAssign: '/awards/auto-assign',
    assign: '/awards/assign',
    generateCertificates: '/awards/certificates/generate',
    getCertificate: (id: string) => `/awards/certificates/${id}`,
  },
}