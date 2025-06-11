'use client';

import { useState } from 'react';

type SignupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Errors = Partial<Record<keyof SignupForm, string>>;

export default function Signup() {
  const [form, setForm] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.includes('@')) newErrors.email = 'Invalid email format';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('✅ Signup Data:', form);
      // Submit to API or auth provider
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">📝 Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full p-3 border rounded-lg bg-base-100"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full p-3 border rounded-lg bg-base-100"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-white font-semibold"
          >
            ✅ Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-primary font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
