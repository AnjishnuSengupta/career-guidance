import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CareerCompass</h3>
            <p className="text-muted-foreground">
              Guiding students of Classes 11 and 12 to make informed career choices based on their interests and skills.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/quiz" className="text-muted-foreground hover:text-primary transition-colors">
                  Career Quiz
                </Link>
              </li>
              <li>
                <Link href="/streams" className="text-muted-foreground hover:text-primary transition-colors">
                  Academic Streams
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <p className="text-muted-foreground mb-2">Have questions? Reach out to our career counselors.</p>
            <Link
              href="/contact"
              className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-border text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} CareerCompass. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
