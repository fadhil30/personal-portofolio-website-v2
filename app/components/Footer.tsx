export function Footer() {
  return (
    <footer id="contact" className="py-12 bg-zinc-950 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-6">Let&apos;s work together</h2>
        <p className="text-zinc-400 max-w-lg mx-auto mb-8">
          I&apos;m currently available for freelance projects and new
          opportunities. Feel free to reach out.
        </p>
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="mailto:contact@example.com"
            className="hover:text-white text-zinc-400 transition-colors"
          >
            Email
          </a>
          <a
            href="#"
            className="hover:text-white text-zinc-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="hover:text-white text-zinc-400 transition-colors"
          >
            GitHub
          </a>
        </div>
        <p className="text-zinc-600 text-sm">
          &copy; {new Date().getFullYear()} Fadhil.dev. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
