'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Bot } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/agents', label: 'Agents' },
    { href: '/run', label: 'Run Agent' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Disaster Orchestrator
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:flex sm:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200",
                  pathname === link.href
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200",
                    pathname === link.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}