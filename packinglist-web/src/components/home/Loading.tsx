import {PuffLoader} from "react-spinners";

interface LoadingProps {
}

function Loading({}: LoadingProps) {
   return (
      <div className={"row d-flex my-auto mx-auto py-5"}>
         <div className={"row justify-content-center"}>
            <PuffLoader color="#77b143"/>
         </div>
         <div className={"row justify-content-center fw-bolder"} style={{color: "#2d75b0"}}>
            Loading...
         </div>
      </div>
   );
}

export default Loading;
