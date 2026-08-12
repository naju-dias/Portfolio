"use client";

export default function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="footer-back-to-top"
      aria-label="Voltar ao topo"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
        />
      </svg>
    </button>
  );
}