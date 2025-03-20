

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t'>
      <div className='p-5 flex-center'>
        {currentYear} AI Survey App. All Rights reserved.
      </div>
    </footer>
  );
};

export default Footer;