import type React from "react";
import { forwardRef, InputHTMLAttributes } from "react";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  prefix?: string;
  suffix?: string;
  action?: {
    icon: JSX.Element;
    action: () => void;
  };
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, description, prefix, suffix, action, error, ...rest }: InputProps,
  ref
) {
  return (
    <div>
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {/*  */}
      <div className="relative flex rounded-md shadow-sm">
        {prefix && (
          <span className="inline-flex items-center rounded-l-md border-gray-300 bg-orange-200 px-3 font-mono text-sm">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          className={`flex h-10 w-full rounded-md bg-orange-100 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            prefix ? "rounded-l-none" : ""
          } ${action ? "rounded-r-none" : ""}`}
          {...rest}
        />
        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 font-mono">
            <span className="text-gray-500 sm:text-sm" id="price-currency">
              {suffix}
            </span>
          </div>
        )}
        {action && (
          <button
            type="button"
            onClick={action.action}
            className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md bg-orange-200 px-4 py-2 text-sm font-medium hover:bg-orange-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {action.icon}
          </button>
        )}
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {description && (
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          {description}
        </p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      )}
    </div>
  );
});