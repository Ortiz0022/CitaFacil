import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 cursor-pointer select-none';

  const variants = {
    primary: 'bg-[#204E59] text-white hover:bg-[#16363E] active:scale-95 shadow-[0_4px_14px_0_rgba(32,78,89,0.3)]',
    secondary: 'bg-[#95D5D2] text-[#204E59] hover:bg-[#82C2BF] active:scale-95 shadow-[0_4px_14px_0_rgba(149,213,210,0.3)]',
    outline: 'border-2 border-[#95D5D2]/50 text-[#204E59] hover:border-[#204E59] hover:bg-[#95D5D2]/10 active:scale-95',
    ghost: 'text-[#204E59] hover:bg-[#95D5D2]/10 active:scale-95',
    danger: 'bg-[#F26C6D] text-white hover:bg-[#D95B5C] active:scale-95 shadow-[0_4px_14px_0_rgba(242,108,109,0.3)]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled || loading ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
