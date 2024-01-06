export const Link = ({ href, children }) => {
    return (
      <a
        className="px-[5px] cursor-none underline underline-offset-[3.5px] hover:no-underline transition-all inline-block"
        href={href}
        data-hover-pointer
      >
        {children}
      </a>
    );
  };
