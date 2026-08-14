import {type FormEvent} from "react";
import {ArrowLeft} from "react-bootstrap-icons";

interface BackButtonProps {
   url?: string | null,
   onclick?: (e: FormEvent<HTMLButtonElement>) => void | null
}

function BackButton({url, onclick}: BackButtonProps) {
   const handleBackClick = (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (onclick) {
         onclick(e);
      } else if (url) {
         window.location.href = url;
      } else {
         window.history.back();
      }
   };

   return (
      <div className={"mb-4 pl-back-button"}>
         <button type={"button"} className={"btn btn-outline-secondary"} onClick={handleBackClick}><ArrowLeft/> Back</button>
      </div>
   )
}

export default BackButton;
