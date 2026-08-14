interface FooterProps {
}

function Footer({}: FooterProps) {
   return (
      <footer className={"footer mt-auto fixed-bottom"}>
         <div className={"text-center"}>
            <span>&copy;{new Date().getFullYear()} ProfoundDistortion</span>
         </div>
      </footer>
   )
}

export default Footer;
