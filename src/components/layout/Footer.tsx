import Link from "next/link";

export function Footer() {
  return <footer className="border-t border-slate-200 bg-white">
    <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-8 text-sm text-slate-600 sm:flex-row sm:px-8">
      <p>© {new Date().getFullYear()} Human Civilization Atlas</p>
      <p>Explore the stories, people, and ideas that shaped our world.</p>
      <Link href="/" className="font-medium text-slate-900 underline-offset-4 hover:underline">Back to top</Link>
    </div>
  </footer>;
}
