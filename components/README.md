# Components

This folder contains reusable React components for the application.

## ProtectedRoute

A client component that wraps protected routes and handles authentication checks.

Usage:
```jsx
import ProtectedRoute from '@/components/ProtectedRoute';

export default function MyPage() {
  return (
    <ProtectedRoute>
      <div>Protected content</div>
    </ProtectedRoute>
  );
}
```

For admin routes:
```jsx
<ProtectedRoute requireAdmin={true}>
  <div>Admin content</div>
</ProtectedRoute>
```

