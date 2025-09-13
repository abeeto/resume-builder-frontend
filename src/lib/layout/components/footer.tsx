export const Footer = () => {
  return (
    <footer className="wrapper">
      <div className="flex">
        <p className="text-xs">
          {new Date().getFullYear()} -{' '}
          <a
            href="https:www.github.com/abeeto"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made with Love by Abhinav Thota
          </a>
        </p>
      </div>
    </footer>
  );
};
