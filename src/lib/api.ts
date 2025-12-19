// import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
// import { useAuthStore } from "@/store/auth-store";

// const baseURL = process.env.NEXT_PUBLIC_API_PUBLIC;

// export const api = axios.create({
//   baseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// // Token refresh functionality
// let isRefreshing = false;
// let failedQueue: Array<{
//   resolve: (value?: any) => void;
//   reject: (error?: any) => void;
// }> = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach(({ resolve, reject }) => {
//     if (error) {
//       reject(error);
//     } else {
//       resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// // Helper function to check if we should attempt token refresh
// const shouldRefreshToken = (
//   error: AxiosError,
//   originalRequest: any
// ): boolean => {
//   // Don't refresh on auth endpoints
//   const authEndpoints = [
//     "/auth/login",
//     "/auth/register",
//     "/auth/refresh",
//     "/auth/logout",
//   ];
//   const isAuthEndpoint = authEndpoints.some((endpoint) =>
//     originalRequest.url?.includes(endpoint)
//   );

//   if (isAuthEndpoint) {
//     return false;
//   }

//   // Don't refresh if we're on auth pages (client-side check)
//   if (typeof window !== "undefined") {
//     const authPaths = [
//       "/sign-in",
//       "/sign-up",
//       "/forgot-password",
//       "/reset-password",
//     ];
//     const currentPath = window.location.pathname;
//     const isAuthPage = authPaths.some((path) => currentPath.startsWith(path));

//     if (isAuthPage) {
//       return false;
//     }
//   }

//   // Don't refresh if no refresh token exists
//   if (typeof window !== "undefined") {
//     const hasRefreshToken = document.cookie
//       .split("; ")
//       .some((row) => row.startsWith("refreshToken="));

//     if (!hasRefreshToken) {
//       return false;
//     }
//   }

//   return true;
// };

// // Add a request interceptor to add the auth token to requests
// api.interceptors.request.use(
//   (config) => {
//     const token = useAuthStore.getState().token; // get token from your store
//     if (token) {
//       config.headers = config.headers ?? {};
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


// const refreshTokens = async (): Promise<boolean> => {
//   try {
//     const response = await axios.post(
//       `${baseURL}/auth/refresh`,
//       {}, // Empty body since refresh token is in cookies
//       { withCredentials: true }
//     );

//     if (response.status === 200) {
//       // Tokens are set as cookies by the backend
//       return true;
//     }
//     return false;
//   } catch (error) {
//     return false;
//   }
// };

// // Response interceptor for handling token expiration
// api.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & {
//       _retry?: boolean;
//     };

//     // Check if error is 401 (Unauthorized) and we haven't already tried to refresh
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       shouldRefreshToken(error, originalRequest)
//     ) {
//       if (isRefreshing) {
//         // If already refreshing, queue this request
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(() => {
//             return api(originalRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshSuccess = await refreshTokens();

//         if (refreshSuccess) {
//           processQueue(null);
//           isRefreshing = false;

//           // Retry the original request
//           return api(originalRequest);
//         } else {
//           // Refresh failed, redirect to login
//           processQueue(new Error("Token refresh failed"), null);
//           isRefreshing = false;

//           // Only redirect if not already on auth page
//           if (
//             typeof window !== "undefined" &&
//             !window.location.pathname.startsWith("/sign-in")
//           ) {
//             window.location.href = "/sign-in";
//           }
//           return Promise.reject(error);
//         }
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         isRefreshing = false;

//         // Only redirect if not already on auth page
//         if (
//           typeof window !== "undefined" &&
//           !window.location.pathname.startsWith("/sign-in")
//         ) {
//           window.location.href = "/sign-in";
//         }
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor to handle errors
// // apiClient.interceptors.response.use(
// //   (response: AxiosResponse) => response,
// //   (error: AxiosError) => {
// //     if (error.response?.status === 401) {
// //       // Handle unauthorized access using the store
// //       useAuthStore.getState().logout();
// //     }
// //     return Promise.reject(error);
// //   }
// // );















// // import axios from "axios";
// // import { useAuthStore } from "@/store/auth-store";

// // export const api = axios.create({
// //   baseURL: process.env.NEXT_PUBLIC_API_URL,
// //   withCredentials: true,
// // });

// // // Add a request interceptor to attach the access token automatically
// // api.interceptors.request.use(
// //   (config) => {
// //     // Access Zustand store's getState method to get current token
// //     // const accessToken = useAuthStore.getState().accessToken;

// //     // if (accessToken) {
// //     //   config.headers = config.headers ?? {};
// //     //   config.headers['Authorization'] = `Bearer ${accessToken}`;
// //     // }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );


import axios, {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/store/auth-store";

const baseURL = process.env.NEXT_PUBLIC_API_PUBLIC;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/* -------------------------------------------------------------------------- */
/*                            Token Refresh Queue                              */
/* -------------------------------------------------------------------------- */

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

/* -------------------------------------------------------------------------- */
/*                       Refresh Token Eligibility Check                       */
/* -------------------------------------------------------------------------- */

const shouldRefreshToken = (
  error: AxiosError,
  originalRequest: AxiosRequestConfig
): boolean => {
  const authEndpoints = [
    "/auth/login",
    "/auth/register",
    "/auth/refresh",
    "/auth/logout",
  ];

  if (authEndpoints.some((endpoint) => originalRequest.url?.includes(endpoint))) {
    return false;
  }

  if (typeof window !== "undefined") {
    const authPages = [
      "/sign-in",
      "/sign-up",
      "/forgot-password",
      "/reset-password",
    ];

    if (authPages.some((path) => window.location.pathname.startsWith(path))) {
      return false;
    }

    const hasRefreshToken = document.cookie
      .split("; ")
      .some((row) => row.startsWith("refreshToken="));

    if (!hasRefreshToken) {
      return false;
    }
  }

  return true;
};

/* -------------------------------------------------------------------------- */
/*                         Request Interceptor (JWT)                           */
/* -------------------------------------------------------------------------- */

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (requestError) => Promise.reject(requestError)
);

/* -------------------------------------------------------------------------- */
/*                            Refresh Token Call                               */
/* -------------------------------------------------------------------------- */

const refreshTokens = async (): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/refresh`,
      {},
      { withCredentials: true }
    );

    return response.status === 200;
  } catch {
    return false;
  }
};

/* -------------------------------------------------------------------------- */
/*                      Response Interceptor (401 Logic)                       */
/* -------------------------------------------------------------------------- */

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (axiosError: AxiosError) => {
    const originalRequest = axiosError.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      axiosError.response?.status === 401 &&
      !originalRequest._retry &&
      shouldRefreshToken(axiosError, originalRequest)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((queueError) => Promise.reject(queueError));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const success = await refreshTokens();

        if (success) {
          processQueue(null);
          isRefreshing = false;
          return api(originalRequest);
        }

        processQueue(new Error("Token refresh failed"));
        isRefreshing = false;
      } catch (refreshErr) {
        processQueue(refreshErr);
        isRefreshing = false;
      }

      if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith("/sign-in")
      ) {
        window.location.href = "/sign-in";
      }

      return Promise.reject(axiosError);
    }

    return Promise.reject(axiosError);
  }
);
