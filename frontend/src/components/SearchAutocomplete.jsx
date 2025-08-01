import React, { useState, useEffect, useRef } from 'react';

function SearchAutocomplete({ experiences, onSelect }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const matched = [];

    experiences.forEach(exp => {
      // match name
      if (exp.name.toLowerCase().includes(lowerQuery)) {
        matched.push(exp.name);
      } else {
        // match tags
        const matchingTags = exp.tags.filter(tag => tag.toLowerCase().includes(lowerQuery));
        matched.push(...matchingTags);
      }
    });

    // Deduplicate suggestions
    const uniqueSuggestions = [...new Set(matched)].slice(0, 10);

    setSuggestions(uniqueSuggestions);
    setShowDropdown(true);
  }, [query, experiences]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (suggestion) => {
    setQuery(suggestion);
    setShowDropdown(false);
    if (onSelect) onSelect(suggestion);
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="Search experiences or tags..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => query && setShowDropdown(true)}
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full rounded mt-1 max-h-48 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="p-2 hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={() => handleSelect(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchAutocomplete;
