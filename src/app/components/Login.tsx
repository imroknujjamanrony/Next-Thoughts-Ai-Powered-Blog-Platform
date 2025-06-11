'use client';

import { useState } from 'react';

type LoginForm = {
  email: string;
  password: string;
};

type Errors = Partial<Record<keyof LoginForm, string>>;

export default function Login() {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!form.email.includes('@')) newErrors.email = 'Invalid email format';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('✅ Login Data:', form);
      // Submit to login API here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">🔐 Login to Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full p-3 border rounded-lg bg-base-100"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full p-3 border rounded-lg bg-base-100"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-white font-semibold"
          >
            🚀 Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-primary font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
