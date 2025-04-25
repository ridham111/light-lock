"use client";

import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
  icon?: React.ReactNode;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', icon, helperText, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (props.onFocus) props.onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (props.onBlur) props.onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      if (props.onChange) props.onChange(e);
    };

    return (
      <div className="w-full">
        <div className="relative">
          <motion.label 
            htmlFor={id} 
            className={`block text-sm font-medium mb-1 transition-colors duration-200 ${
              error 
                ? 'text-red-500 dark:text-red-400' 
                : isFocused 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
            }`}
            initial={{ y: 0 }}
            animate={isFocused || hasValue ? { y: 0 } : { y: 0 }}
          >
            {label}
          </motion.label>
          
          <div className="relative">
            {icon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
              </div>
            )}
            
            <motion.input
              ref={ref}
              id={id}
              className={`
                w-full px-3 py-2 border rounded-md shadow-sm transition-all duration-200
                focus:outline-none focus:ring-2 
                ${icon ? 'pl-10' : ''}
                ${error 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                } 
                ${className}
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                hover:border-gray-400 dark:hover:border-gray-500
              `}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              {...props}
              whileFocus={{ scale: 1.01 }}
            />
            
            {isFocused && !error && (
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        </div>
        
        <AnimatedMessage show={!!error} message={error} type="error" />
        <AnimatedMessage show={!!helperText && !error} message={helperText} type="helper" />
      </div>
    );
  }
);

interface AnimatedMessageProps {
  show: boolean;
  message?: string;
  type: 'error' | 'helper';
}

const AnimatedMessage: React.FC<AnimatedMessageProps> = ({ show, message, type }) => {
  if (!show || !message) return null;
  
  const textColor = type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400';
  
  return (
    <motion.p 
      className={`mt-1 text-sm ${textColor}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      {message}
    </motion.p>
  );
};

Input.displayName = 'Input';

export default Input;

