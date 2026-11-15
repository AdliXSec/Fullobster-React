#!/bin/bash
find react-app/src -name "*.jsx" -type f | while read file; do
  sed -i 's/text-slate-800/text-slate-800 dark:text-slate-100/g' "$file"
  sed -i 's/text-slate-700/text-slate-700 dark:text-slate-200/g' "$file"
  sed -i 's/text-slate-600/text-slate-600 dark:text-slate-300/g' "$file"
  sed -i 's/text-slate-500/text-slate-500 dark:text-slate-400/g' "$file"
  sed -i 's/text-slate-400/text-slate-400 dark:text-slate-500/g' "$file"
  
  sed -i 's/bg-white\/60/bg-white\/60 dark:bg-slate-900\/60/g' "$file"
  sed -i 's/bg-white\/50/bg-white\/50 dark:bg-slate-900\/50/g' "$file"
  sed -i 's/bg-white\/40/bg-white\/40 dark:bg-slate-900\/40/g' "$file"
  
  sed -i 's/border-white\/80/border-white\/80 dark:border-slate-700\/50/g' "$file"
  sed -i 's/border-slate-100/border-slate-100 dark:border-slate-800/g' "$file"
  sed -i 's/border-slate-200/border-slate-200 dark:border-slate-700/g' "$file"
  
  sed -i 's/hover:bg-slate-100\/50/hover:bg-slate-100\/50 dark:hover:bg-slate-800\/50/g' "$file"
  sed -i 's/hover:bg-slate-100/hover:bg-slate-100 dark:hover:bg-slate-800/g' "$file"
  sed -i 's/hover:text-slate-600/hover:text-slate-600 dark:hover:text-slate-300/g' "$file"

  sed -i 's/bg-blue-500\/10/bg-blue-500\/10 dark:bg-blue-900\/30/g' "$file"
  sed -i 's/bg-blue-50 /bg-blue-50 dark:bg-blue-900\/30 /g' "$file"
  sed -i 's/text-blue-600/text-blue-600 dark:text-blue-400/g' "$file"
  sed -i 's/text-blue-500/text-blue-500 dark:text-blue-400/g' "$file"

  sed -i 's/bg-emerald-50 /bg-emerald-50 dark:bg-emerald-900\/30 /g' "$file"
  sed -i 's/text-emerald-600/text-emerald-600 dark:text-emerald-400/g' "$file"
  
  sed -i 's/bg-rose-50 /bg-rose-50 dark:bg-rose-900\/30 /g' "$file"
  sed -i 's/text-rose-500/text-rose-500 dark:text-rose-400/g' "$file"
  sed -i 's/text-rose-600/text-rose-600 dark:text-rose-400/g' "$file"
  
  sed -i 's/bg-amber-50 /bg-amber-50 dark:bg-amber-900\/30 /g' "$file"
  sed -i 's/text-amber-600/text-amber-600 dark:text-amber-400/g' "$file"
done
